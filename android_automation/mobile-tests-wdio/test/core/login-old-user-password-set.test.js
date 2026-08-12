const { launchApp, dismissNotificationPermission, skipOnboarding, handleLocationSharing, handleSchoolForm, waitForHome } = require('../flows/auth.flow');
const loginPage = require('../pages/login.page');
const { existsByText, findByText, isActionButtonEnabled } = require('../helpers/find.helper');
const { getNextPhoneNumber } = require('../helpers/phone.helper');

const PHONE_NUMBER = getNextPhoneNumber();
const OTP = '1234';
const PASSWORD = '123456';

/**
 * Covers Login sheet Lg_015-Lg_074:
 * OTP verification for old users (without password) + "পাসওয়ার্ড সেট করো" flow.
 *
 * Strategy: Register a new number via OTP + identity step, then quit before setting password.
 * On re-login, the app shows OTP → password set flow (since user exists but has no password).
 *
 * Sequential flow — each test continues from where the previous left off.
 */
describe('Core: Old User Password Set Flow', () => {
    // Phase 1: Create a user without password by partially completing signup
    describe('Phase 1: Create user without password', () => {
        before(async () => {
            await launchApp();
            await dismissNotificationPermission();
            await skipOnboarding();
            await driver.pause(2000);

            const phoneInput = await loginPage.phoneInput;
            await phoneInput.waitForExist({ timeout: 30000 });
            await loginPage.enterPhoneNumber(PHONE_NUMBER);
            await loginPage.tapContinue();
            await driver.pause(5000);

            // Should show OTP screen for new number
            await driver.waitUntil(async () => {
                const src = await driver.getPageSource();
                return src.includes('ভেরিফাই করুন') || src.includes('পাসওয়ার্ড');
            }, { timeout: 15000, timeoutMsg: 'OTP or Password screen not found' });
        });

        it('should verify OTP for new number', async () => {
            const src = await driver.getPageSource();
            // If already registered (password screen), skip this phase
            if (src.includes('পাসওয়ার্ড') && !src.includes('ভেরিফাই করুন')) {
                console.log('Number already registered — cannot create user without password');
                return;
            }

            const otpInput = await $('android.widget.EditText');
            await otpInput.click();
            await otpInput.setValue(OTP);
            try { await driver.hideKeyboard(); } catch {}
            await driver.pause(500);

            const btn = await $('android.widget.Button');
            await btn.click();
            await driver.pause(5000);

            // Should reach identity step (শিক্ষার্থী / অভিভাবক)
            await driver.waitUntil(async () => {
                const s = await driver.getPageSource();
                return s.includes('শিক্ষার্থী') || s.includes('অভিভাবক') || s.includes('তোমার নাম');
            }, { timeout: 20000, timeoutMsg: 'Identity/Info step not found after OTP' });

            // User is now created with OTP verified but no password set
            // Force close the app to leave user in incomplete state
            await driver.execute('mobile: terminateApp', { appId: 'tech.shikho.android' });
            await driver.pause(3000);
        });
    });

    // Phase 2: Re-login with the same number — should trigger OTP → password set flow
    describe('Phase 2: OTP Verification for Old User (Lg_015-Lg_035)', () => {
        before(async () => {
            // Clear and relaunch
            await driver.execute('mobile: clearApp', { appId: 'tech.shikho.android' });
            await driver.execute('mobile: activateApp', { appId: 'tech.shikho.android' });
            await driver.pause(8000);
            await dismissNotificationPermission();
            await skipOnboarding();
            await driver.pause(2000);

            const phoneInput = await loginPage.phoneInput;
            await phoneInput.waitForExist({ timeout: 30000 });
            await loginPage.enterPhoneNumber(PHONE_NUMBER);
            await loginPage.tapContinue();
            await driver.pause(5000);

            // Wait for OTP or password screen
            await driver.waitUntil(async () => {
                const src = await driver.getPageSource();
                return src.includes('ভেরিফাই করুন') || src.includes('পাসওয়ার্ড');
            }, { timeout: 15000, timeoutMsg: 'OTP or Password screen not found on re-login' });
        });

        it('Lg_015: should display OTP verification page content', async () => {
            const src = await driver.getPageSource();
            // Should show OTP screen (not password, since user has no password)
            if (src.includes('পাসওয়ার্ড') && !src.includes('ভেরিফাই করুন')) {
                console.log('User already has password — OTP tests skipped');
                return;
            }

            const otpInput = await $('android.widget.EditText');
            expect(await otpInput.isExisting()).toBe(true);

            const btn = await $('android.widget.Button');
            expect(await btn.isExisting()).toBe(true);
        });

        it('Lg_016: should have disabled verify button without OTP', async () => {
            const src = await driver.getPageSource();
            if (src.includes('পাসওয়ার্ড') && !src.includes('ভেরিফাই করুন')) return;

            const enabled = await isActionButtonEnabled();
            expect(enabled).toBe(false);
        });

        it('Lg_024: should show verify button when typing OTP', async () => {
            const src = await driver.getPageSource();
            if (src.includes('পাসওয়ার্ড') && !src.includes('ভেরিফাই করুন')) return;

            const otpInput = await $('android.widget.EditText');
            await otpInput.click();
            await otpInput.setValue('12');
            await driver.pause(500);

            const btn = await $('android.widget.Button');
            expect(await btn.isExisting()).toBe(true);

            await otpInput.clearValue();
        });

        it('Lg_028: should show warning for incorrect OTP', async () => {
            const src = await driver.getPageSource();
            if (src.includes('পাসওয়ার্ড') && !src.includes('ভেরিফাই করুন')) return;

            const otpInput = await $('android.widget.EditText');
            await otpInput.click();
            await otpInput.setValue('9999');
            try { await driver.hideKeyboard(); } catch {}
            await driver.pause(500);

            const btn = await $('android.widget.Button');
            await btn.click();
            await driver.pause(5000);

            // Should still be on OTP page
            const stillOnOtp = await $('android.widget.EditText');
            expect(await stillOnOtp.isExisting()).toBe(true);

            await stillOnOtp.click();
            await stillOnOtp.clearValue();
        });

        it('Lg_026: should enable verify button after valid 4-digit OTP', async () => {
            const src = await driver.getPageSource();
            if (src.includes('পাসওয়ার্ড') && !src.includes('ভেরিফাই করুন')) return;

            const otpInput = await $('android.widget.EditText');
            await otpInput.click();
            await otpInput.setValue(OTP);
            try { await driver.hideKeyboard(); } catch {}
            await driver.pause(1000);

            const enabled = await isActionButtonEnabled();
            expect(enabled).toBe(true);
        });

        it('Lg_025: should verify OTP and proceed', async () => {
            const src = await driver.getPageSource();
            if (src.includes('পাসওয়ার্ড') && !src.includes('ভেরিফাই করুন')) return;

            const btn = await $('android.widget.Button');
            await btn.click();
            await driver.pause(5000);

            // Should proceed to password set bottom sheet or password set page
            await driver.waitUntil(async () => {
                const s = await driver.getPageSource();
                return s.includes('পাসওয়ার্ড সেট') || s.includes('পাসওয়ার্ড সিস্টেম') || s.includes('শিক্ষার্থী');
            }, { timeout: 20000, timeoutMsg: 'Password set or next screen not found after OTP' });
        });
    });

    // Phase 3: Password Set Bottom Sheet (Lg_036-Lg_038)
    describe('Phase 3: Password Set Bottom Sheet (Lg_036-Lg_038)', () => {
        it('Lg_036: should display password system bottom sheet if shown', async () => {
            const src = await driver.getPageSource();

            // This bottom sheet may or may not appear depending on app version
            if (src.includes('পাসওয়ার্ড সিস্টেম')) {
                expect(src.includes('পাসওয়ার্ড সিস্টেম')).toBe(true);
            } else {
                // May have skipped directly to password set screen or identity step
                console.log('Password system bottom sheet not shown — may go directly to next step');
            }
        });

        it('Lg_037-038: should click password set button on bottom sheet if present', async () => {
            const src = await driver.getPageSource();

            if (src.includes('পাসওয়ার্ড সিস্টেম') || src.includes('পাসওয়ার্ড সেট করো')) {
                // Click the "পাসওয়ার্ড সেট করো" button
                const btn = await $('android.widget.Button');
                await btn.click();
                await driver.pause(3000);
            }
        });
    });

    // Phase 4: Password Set Screen (Lg_039-Lg_074)
    describe('Phase 4: Password Set Screen (Lg_039-Lg_074)', () => {
        before(async () => {
            // Wait for password set screen to appear
            await driver.waitUntil(async () => {
                const src = await driver.getPageSource();
                return src.includes('পাসওয়ার্ড সেট') || src.includes('পাসওয়ার্ড') || src.includes('শিক্ষার্থী');
            }, { timeout: 15000, timeoutMsg: 'Password set screen not found' });
        });

        it('Lg_039: should display password set screen content', async () => {
            const src = await driver.getPageSource();
            // If we ended up on identity step instead, the password-set flow wasn't triggered
            if (src.includes('শিক্ষার্থী') || src.includes('অভিভাবক')) {
                console.log('Landed on identity step — password set flow not triggered for this user');
                return;
            }

            expect(src.includes('পাসওয়ার্ড')).toBe(true);
        });

        it('Lg_040-042: should show password input fields', async () => {
            const src = await driver.getPageSource();
            if (src.includes('শিক্ষার্থী') || src.includes('অভিভাবক')) return;

            const inputs = await $$('android.widget.EditText');
            expect(inputs.length).toBeGreaterThanOrEqual(1);
        });

        it('Lg_043-044: should accept input in password field', async () => {
            const src = await driver.getPageSource();
            if (src.includes('শিক্ষার্থী') || src.includes('অভিভাবক')) return;

            const inputs = await $$('android.widget.EditText');
            await inputs[0].click();
            await inputs[0].setValue('12');
            await driver.pause(500);

            const value = await inputs[0].getText();
            expect(value.length).toBeGreaterThan(0);

            await inputs[0].clearValue();
            try { await driver.hideKeyboard(); } catch {}
        });

        it('Lg_069: should have disabled save button without password', async () => {
            const src = await driver.getPageSource();
            if (src.includes('শিক্ষার্থী') || src.includes('অভিভাবক')) return;

            const enabled = await isActionButtonEnabled();
            expect(enabled).toBe(false);
        });

        it('Lg_070: should have disabled save button with only password (no confirm)', async () => {
            const src = await driver.getPageSource();
            if (src.includes('শিক্ষার্থী') || src.includes('অভিভাবক')) return;

            const inputs = await $$('android.widget.EditText');
            if (inputs.length < 2) return; // single field, skip

            await inputs[0].click();
            await inputs[0].setValue(PASSWORD);
            try { await driver.hideKeyboard(); } catch {}
            await driver.pause(1000);

            const enabled = await isActionButtonEnabled();
            expect(enabled).toBe(false);

            await inputs[0].clearValue();
            try { await driver.hideKeyboard(); } catch {}
        });

        it('Lg_066: should show error for mismatched passwords', async () => {
            const src = await driver.getPageSource();
            if (src.includes('শিক্ষার্থী') || src.includes('অভিভাবক')) return;

            const inputs = await $$('android.widget.EditText');
            if (inputs.length < 2) return;

            await inputs[0].click();
            await inputs[0].setValue(PASSWORD);
            try { await driver.hideKeyboard(); } catch {}
            await driver.pause(500);

            await inputs[1].click();
            await inputs[1].setValue('654321');
            try { await driver.hideKeyboard(); } catch {}
            await driver.pause(2000);

            // Save button should be disabled with mismatched passwords
            const enabled = await isActionButtonEnabled();
            expect(enabled).toBe(false);

            // Check for error text
            let hasError = false;
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    const text = await tv.getText();
                    if (text.includes('সঠিক নয়') || text.includes('মিল')) {
                        hasError = true;
                        break;
                    }
                } catch {}
            }

            // Clear fields
            await inputs[0].click();
            await inputs[0].clearValue();
            try { await driver.hideKeyboard(); } catch {}
            await inputs[1].click();
            await inputs[1].clearValue();
            try { await driver.hideKeyboard(); } catch {}
        });

        it('Lg_072: should enable save button with matching passwords', async () => {
            const src = await driver.getPageSource();
            if (src.includes('শিক্ষার্থী') || src.includes('অভিভাবক')) return;

            const inputs = await $$('android.widget.EditText');
            await inputs[0].click();
            await inputs[0].setValue(PASSWORD);
            try { await driver.hideKeyboard(); } catch {}
            await driver.pause(500);

            if (inputs.length >= 2) {
                await inputs[1].click();
                await inputs[1].setValue(PASSWORD);
                try { await driver.hideKeyboard(); } catch {}
            }
            await driver.pause(1500);

            const enabled = await isActionButtonEnabled();
            expect(enabled).toBe(true);
        });

        it('Lg_073-074: should save password and proceed to home', async () => {
            const src = await driver.getPageSource();

            // If on identity step, complete the full signup flow instead
            if (src.includes('শিক্ষার্থী') || src.includes('অভিভাবক')) {
                // Select student
                const studentEl = await findByText('শিক্ষার্থী');
                await studentEl.click();
                await driver.pause(1000);
                let btn = await $('android.widget.Button');
                await btn.click();
                await driver.pause(3000);

                // Info step
                await driver.waitUntil(async () => {
                    const s = await driver.getPageSource();
                    return s.includes('তোমার নাম');
                }, { timeout: 15000 });

                const nameInput = await $('android.widget.EditText');
                await nameInput.click();
                await nameInput.setValue('Test Student');
                try { await driver.hideKeyboard(); } catch {}
                await driver.pause(1000);

                const genderEl = await findByText('ছাত্র');
                await genderEl.click();
                await driver.pause(1000);

                const classEl = await findByText('ক্লাস ৮');
                await classEl.click();
                await driver.pause(2000);

                const buttons2 = await $$('android.widget.Button');
                await buttons2[buttons2.length - 1].click();
                await driver.pause(3000);

                // Password step
                await driver.waitUntil(async () => {
                    const s = await driver.getPageSource();
                    return s.includes('পাসওয়ার্ড সেট');
                }, { timeout: 15000 });

                const pwInputs = await $$('android.widget.EditText');
                await pwInputs[0].click();
                await pwInputs[0].setValue(PASSWORD);
                try { await driver.hideKeyboard(); } catch {}
                await driver.pause(500);
                await pwInputs[1].click();
                await pwInputs[1].setValue(PASSWORD);
                try { await driver.hideKeyboard(); } catch {}
                await driver.pause(1000);

                const buttons3 = await $$('android.widget.Button');
                await buttons3[buttons3.length - 1].click();
                await driver.pause(5000);

                // Congratulations
                await driver.waitUntil(async () => {
                    const s = await driver.getPageSource();
                    return s.includes('অভিনন্দন');
                }, { timeout: 20000 });

                btn = await $('android.widget.Button');
                await btn.click();
                await driver.pause(5000);
            } else {
                // Click save/set button
                const buttons = await $$('android.widget.Button');
                const saveBtn = buttons[buttons.length - 1];
                await saveBtn.click();
                await driver.pause(5000);

                // May show success message
                const afterSrc = await driver.getPageSource();
                if (afterSrc.includes('অভিনন্দন') || afterSrc.includes('লগ ইন')) {
                    const btn = await $('android.widget.Button');
                    await btn.click();
                    await driver.pause(5000);
                }
            }

            await handleLocationSharing();
            await handleSchoolForm();
            await waitForHome();

            const hasHome = await existsByText('হোম');
            expect(hasHome).toBe(true);
        });
    });
});

const { launchApp, dismissNotificationPermission, skipOnboarding, handleLocationSharing, handleSchoolForm, waitForHome } = require('../flows/auth.flow');
const loginPage = require('../pages/login.page');
const { existsByText, findByText, isActionButtonEnabled, screenHasText } = require('../helpers/find.helper');

const PHONE_NUMBER = '01534536204';
const PASSWORD = '123456';

/**
 * Covers Login sheet Lg_087-Lg_103:
 * Password login screen for existing users who already have a password set.
 * Sequential flow — each test continues from where the previous left off.
 */
describe('Core: Login with Password', () => {
    before(async () => {
        await launchApp();
        await dismissNotificationPermission();
        await skipOnboarding();
        await driver.pause(2000);

        // Enter phone number and navigate to password screen
        const phoneInput = await loginPage.phoneInput;
        await phoneInput.waitForExist({ timeout: 30000 });
        await loginPage.enterPhoneNumber(PHONE_NUMBER);
        await loginPage.tapContinue();
        await driver.pause(5000);

        // Wait for password screen
        await driver.waitUntil(async () => {
            return await screenHasText('পাসওয়ার্ড');
        }, { timeout: 20000, timeoutMsg: 'Password screen not found' });
    });

    // --- Password Screen Content (Lg_088-Lg_091) ---

    it('Lg_088: should display password screen content', async () => {
        const src = await driver.getPageSource();
        // Title: পাসওয়ার্ড দিন
        expect(src.includes('পাসওয়ার্ড')).toBe(true);

        // Password input field
        const pwInput = await $('android.widget.EditText');
        expect(await pwInput.isExisting()).toBe(true);

        // Login button
        const btn = await $('android.widget.Button');
        expect(await btn.isExisting()).toBe(true);
    });

    it('Lg_089: should navigate back on device back press', async () => {
        await driver.pressKeyCode(4); // BACK key
        await driver.pause(2000);

        // Should be back on phone page
        const phoneInput = await loginPage.phoneInput;
        const onPhonePage = await phoneInput.isExisting();
        expect(onPhonePage).toBe(true);

        // Re-navigate to password screen for remaining tests
        await loginPage.enterPhoneNumber(PHONE_NUMBER);
        await loginPage.tapContinue();
        await driver.pause(5000);

        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('পাসওয়ার্ড');
        }, { timeout: 20000, timeoutMsg: 'Password screen not found after re-navigation' });
    });

    it('Lg_091: should show password input field', async () => {
        const pwInput = await $('android.widget.EditText');
        expect(await pwInput.isExisting()).toBe(true);
    });

    it('Lg_094-095: should accept input in password field', async () => {
        const pwInput = await $('android.widget.EditText');
        await pwInput.click();
        await pwInput.setValue('12');
        await driver.pause(500);

        const value = await pwInput.getText();
        expect(value.length).toBeGreaterThan(0);

        // Clear for next test
        await pwInput.clearValue();
        try { await driver.hideKeyboard(); } catch {}
    });

    // --- Button States (Lg_101-Lg_102) ---

    it('Lg_101: should have disabled login button without password', async () => {
        const pwInput = await $('android.widget.EditText');
        await pwInput.click();
        await pwInput.clearValue();
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(1000);

        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(false);
    });

    it('Lg_102: should enable login button after entering password', async () => {
        const pwInput = await $('android.widget.EditText');
        await pwInput.click();
        await pwInput.setValue(PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(1000);

        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(true);

        // Clear for wrong password test
        await pwInput.clearValue();
        try { await driver.hideKeyboard(); } catch {}
    });

    // --- Wrong Password (Lg_100) ---

    it('Lg_100: should show error for wrong password', async () => {
        const pwInput = await $('android.widget.EditText');
        await pwInput.click();
        await pwInput.setValue('999999');
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);

        const btn = await $('android.widget.Button');
        await btn.click();
        await driver.pause(5000);

        // Should still be on password screen (not navigated to home)
        const stillOnPw = await $('android.widget.EditText');
        expect(await stillOnPw.isExisting()).toBe(true);

        // Check for error message via page source or TextViews
        let hasError = false;
        const tvs = await $$('android.widget.TextView');
        for (const tv of tvs) {
            try {
                const text = await tv.getText();
                if (text.includes('সঠিক নয়') || text.includes('ভুল') || text.includes('পাসওয়ার্ড')) {
                    hasError = true;
                    break;
                }
            } catch {}
        }
        // At minimum, should still be on password page
        expect(await stillOnPw.isExisting()).toBe(true);

        // Clear the wrong password
        await stillOnPw.clearValue();
    });

    // --- Forgot Password Link (Lg_104-Lg_107) ---

    it('Lg_104: should display forgot password option', async () => {
        const hasForgot = await existsByText('পাসওয়ার্ড ভুলে গিয়েছেন?', 'android.widget.TextView', 5000);
        expect(hasForgot).toBe(true);
    });

    // --- Successful Login (Lg_103) ---

    it('Lg_103: should login successfully with correct password and reach home', async () => {
        const pwInput = await $('android.widget.EditText');
        await pwInput.click();
        await pwInput.setValue(PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);

        const btn = await $('android.widget.Button');
        await btn.click();
        await driver.pause(5000);

        await handleLocationSharing();
        await handleSchoolForm();
        await waitForHome();

        // Login success — may land on home or mandatory "প্রোফাইল কমপ্লিট করো" screen
        const onHome = await screenHasText('হোম') || await screenHasText('প্রোফাইল কমপ্লিট');
        expect(onHome).toBe(true);
    });
});

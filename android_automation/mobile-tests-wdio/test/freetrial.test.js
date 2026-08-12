const onboardingPage = require('./pages/onboarding.page');
const loginPage = require('./pages/login.page');
const { findByText, findByTextContains, existsByText } = require('./helpers/find.helper');

const PHONE_NUMBER = '01867000019';
const PASSWORD = '123456';

describe('Program Enrollment', () => {
    before(async () => {
        await driver.execute('mobile: clearApp', { appId: 'tech.shikho.android' });
        await driver.execute('mobile: activateApp', { appId: 'tech.shikho.android' });
        await driver.pause(5000);

        try {
            const allowBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
            await allowBtn.waitForExist({ timeout: 10000 });
            await allowBtn.click();
            await driver.pause(2000);
        } catch {}

        if (await onboardingPage.isDisplayed()) {
            await onboardingPage.tapContinue();
            await driver.pause(3000);
        }

        // Login with existing account
        expect(await loginPage.isDisplayed()).toBe(true);
        await loginPage.enterPhoneNumber(PHONE_NUMBER);
        await loginPage.tapContinue();
        await driver.pause(5000);

        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('পাসওয়ার্ড');
        }, { timeout: 15000, timeoutMsg: 'Password screen not found' });

        const pwInput = await $('android.widget.EditText');
        await pwInput.waitForExist({ timeout: 15000 });
        await pwInput.click();
        await pwInput.setValue(PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);
        const loginBtn = await $('android.widget.Button');
        await loginBtn.click();
        await driver.pause(5000);

        // Handle location sharing
        try {
            let hasLocation = false;
            const tvs2 = await $$('android.widget.TextView');
            for (const tv of tvs2) {
                try {
                    if ((await tv.getText()).includes('লোকেশন')) { hasLocation = true; break; }
                } catch {}
            }
            if (hasLocation) {
                const locBtn = await $('android.widget.Button');
                await locBtn.click();
                await driver.pause(2000);
                try {
                    const allowLocBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")');
                    await allowLocBtn.waitForExist({ timeout: 10000 });
                    await allowLocBtn.click();
                    await driver.pause(3000);
                } catch {}
            }
        } catch {}

        // Handle school info sheet
        await driver.pause(3000);
        let src = await driver.getPageSource();
        if (src.includes('স্কুল / কলেজের বিভাগ')) {
            let editTexts = await $$('android.widget.EditText');
            await editTexts[0].click();
            await driver.pause(2000);
            const d1 = await findByText('Dhaka');
            await d1.click();
            await driver.pause(2000);
            editTexts = await $$('android.widget.EditText');
            await editTexts[1].click();
            await driver.pause(2000);
            const d2 = await findByText('Dhaka');
            await d2.click();
            await driver.pause(2000);
            editTexts = await $$('android.widget.EditText');
            await editTexts[2].click();
            await editTexts[2].setValue('ideal');
            await driver.pause(1000);
            await driver.pressKeyCode(4);
            await driver.pause(2000);
            let saveBtn = await $('android.widget.Button');
            await saveBtn.click();
            await driver.waitUntil(async () => {
                const s = await driver.getPageSource();
                return s.includes('IDEAL');
            }, { timeout: 15000, timeoutMsg: 'School name not resolved' });
            await driver.pause(1000);
            saveBtn = await $('android.widget.Button');
            await saveBtn.click();
            await driver.pause(3000);
        }

        // Wait for home screen
        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()) === 'হোম') return true;
                } catch {}
            }
            return false;
        }, { timeout: 20000, timeoutMsg: 'Home screen not found' });
    });

    it('should navigate to enrollment and reach payment page', async () => {
        await driver.pause(2000);

        // === SCROLL DOWN TO "অন্যান্য কোর্স" SECTION ===
        // Use aggressive normal swipes (no UiScrollable to avoid accidental clicks)
        let foundClass8 = false;
        for (let s = 0; s < 40 && !foundClass8; s++) {
            await driver.execute('mobile: swipeGesture', {
                left: 100, top: 800, width: 800, height: 1200, direction: 'up', percent: 0.5
            });
            await driver.pause(1000);

            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()) === 'Class 8 SSC 2029') {
                        foundClass8 = true;
                        break;
                    }
                } catch {}
            }
        }
        expect(foundClass8).toBe(true);

        // One more small swipe to bring detail button into view
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 1500, width: 600, height: 400, direction: 'up', percent: 0.3
        });
        await driver.pause(1500);

        // Click "বিস্তারিত দেখো" for Class 8 — the only full-width [71, button
        let btns = await $$('android.widget.Button');
        let targetBtn = null;
        for (const btn of btns) {
            try {
                const b = await btn.getAttribute('bounds');
                const m = b.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
                if (m && parseInt(m[1]) === 71 && (parseInt(m[3]) - parseInt(m[1])) > 900) {
                    targetBtn = btn;
                    break;
                }
            } catch {}
        }
        if (!targetBtn) {
            // Fallback: last [71, button
            for (let i = btns.length - 1; i >= 0; i--) {
                try {
                    const b = await btns[i].getAttribute('bounds');
                    if (b && b.startsWith('[71,')) { targetBtn = btns[i]; break; }
                } catch {}
            }
        }
        expect(targetBtn).not.toBeNull();
        await targetBtn.click();
        await driver.pause(5000);

        // === COURSE DETAIL PAGE ===
        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()).includes('প্রোগ্রামে ভর্তি হও')) return true;
                } catch {}
            }
            return false;
        }, { timeout: 20000, timeoutMsg: 'Course detail not loaded' });

        // Click enrollment button (wide button near bottom)
        btns = await $$('android.widget.Button');
        for (const btn of btns) {
            try {
                const b = await btn.getAttribute('bounds');
                const m = b.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
                if (m && (parseInt(m[3]) - parseInt(m[1])) > 900) {
                    await btn.click();
                    break;
                }
            } catch {}
        }
        await driver.pause(5000);

        // === BATCH CONFIRM ===
        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()).includes('এগিয়ে যাও') ||
                        (await tv.getText()).includes('এসএসসি')) return true;
                } catch {}
            }
            return false;
        }, { timeout: 20000, timeoutMsg: 'Batch confirm not found' });

        const confirmBtn = await $('android.widget.Button');
        await confirmBtn.click();
        await driver.pause(5000);

        // === PHASE SELECTION ===
        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()).includes('Phase 1')) return true;
                } catch {}
            }
            return false;
        }, { timeout: 15000, timeoutMsg: 'Phase selection not found' });

        // Select Phase 1 and continue
        await driver.execute('mobile: clickGesture', { x: 540, y: 1720 });
        await driver.pause(2000);
        const phaseBtn = await $('android.widget.Button');
        await phaseBtn.click();
        await driver.pause(5000);

        // === CHECKOUT ===
        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    const t = await tv.getText();
                    if (t.includes('সর্বমোট') || t.includes('ভর্তির বিস্তারিত')) return true;
                } catch {}
            }
            return false;
        }, { timeout: 15000, timeoutMsg: 'Checkout not found' });

        // Accept terms
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 1600, width: 600, height: 400, direction: 'up', percent: 0.3
        });
        await driver.pause(1000);
        const cbs = await $$('android.widget.CheckBox');
        for (const cb of cbs) {
            try {
                if ((await cb.getAttribute('checked')) === 'false') {
                    await cb.click();
                    await driver.pause(500);
                }
            } catch {}
        }

        // Click enrollment button
        btns = await $$('android.widget.Button');
        for (const btn of btns) {
            try {
                const b = await btn.getAttribute('bounds');
                const m = b.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
                if (m && (parseInt(m[3]) - parseInt(m[1])) > 900 && parseInt(m[2]) > 2000) {
                    await btn.click();
                    break;
                }
            } catch {}
        }
        await driver.pause(8000);

        // === PAYMENT PAGE ===
        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()).includes('পেমেন্ট')) return true;
                } catch {}
            }
            return false;
        }, { timeout: 15000, timeoutMsg: 'Payment page not found' });

        const src = await driver.getPageSource();
        expect(src).toContain('পেমেন্ট');

        // Navigate back to home
        for (let i = 0; i < 8; i++) {
            await driver.pressKeyCode(4);
            await driver.pause(1000);
            // Check if we're on home
            const tvs3 = await $$('android.widget.TextView');
            let onHome = false;
            for (const tv of tvs3) {
                try {
                    if ((await tv.getText()) === 'হোম') { onHome = true; break; }
                } catch {}
            }
            if (onHome) break;
        }

        // Re-activate app in case we exited
        await driver.execute('mobile: activateApp', { appId: 'tech.shikho.android' });
        await driver.pause(2000);

        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()) === 'হোম') return true;
                } catch {}
            }
            return false;
        }, { timeout: 15000, timeoutMsg: 'Home not reached' });
    });
});

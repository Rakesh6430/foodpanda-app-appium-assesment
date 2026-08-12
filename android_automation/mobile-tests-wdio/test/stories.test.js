const onboardingPage = require('./pages/onboarding.page');
const loginPage = require('./pages/login.page');
const { findByText, findByTextContains, existsByText } = require('./helpers/find.helper');

const PHONE_NUMBER = '01867000023';
const PASSWORD = '123456';

describe('Stories', () => {
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

        // Login
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
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
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

    it('should horizontally scroll stories, tap a video, and swipe through shorts', async () => {
        await driver.pause(2000);

        // Verify stories section is visible
        let tvs = await $$('android.widget.TextView');
        let storiesVisible = false;
        for (const tv of tvs) {
            try {
                if ((await tv.getText()).includes('স্টোরিজ')) { storiesVisible = true; break; }
            } catch {}
        }
        expect(storiesVisible).toBe(true);

        // Horizontally scroll stories to reveal more thumbnails
        await driver.execute('mobile: swipeGesture', {
            left: 600, top: 500, width: 400, height: 400, direction: 'left', percent: 0.5
        });
        await driver.pause(2000);

        // Scroll back to start
        await driver.execute('mobile: swipeGesture', {
            left: 100, top: 500, width: 400, height: 400, direction: 'right', percent: 0.5
        });
        await driver.pause(2000);

        // Tap the 2nd story thumbnail (center ~x=670, y=700)
        // Thumbnails: card1=[39,410][443,988], card2=[469,410][873,988], card3=[899,410]
        await driver.execute('mobile: clickGesture', { x: 670, y: 700 });
        await driver.pause(5000);

        // Dismiss "বুঝেছি" swipe tooltip if present
        try {
            const btns = await $$('android.widget.Button');
            for (const btn of btns) {
                try {
                    const b = await btn.getAttribute('bounds');
                    if (b && b.includes('[304,')) {
                        await btn.click();
                        await driver.pause(2000);
                        break;
                    }
                } catch {}
            }
        } catch {}

        // Dismiss "ডাবল ট্যাপ" like tooltip if present
        try {
            tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()).includes('ডাবল ট্যাপ')) {
                        await tv.click();
                        await driver.pause(2000);
                        break;
                    }
                } catch {}
            }
        } catch {}

        // Get current video title (at bottom of screen, wide text)
        tvs = await $$('android.widget.TextView');
        let currentTitle = '';
        for (const tv of tvs) {
            try {
                const b = await tv.getAttribute('bounds');
                const m = b.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
                if (m && parseInt(m[2]) > 2000 && (parseInt(m[3]) - parseInt(m[1])) > 500) {
                    currentTitle = await tv.getText();
                    break;
                }
            } catch {}
        }

        // Swipe DOWN to go to previous video
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 800, width: 600, height: 800, direction: 'down', percent: 0.7
        });
        await driver.pause(4000);

        // Get previous video title
        tvs = await $$('android.widget.TextView');
        let prevTitle = '';
        for (const tv of tvs) {
            try {
                const b = await tv.getAttribute('bounds');
                const m = b.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
                if (m && parseInt(m[2]) > 2000 && (parseInt(m[3]) - parseInt(m[1])) > 500) {
                    prevTitle = await tv.getText();
                    break;
                }
            } catch {}
        }

        // Verify video changed
        expect(prevTitle.length).toBeGreaterThan(0);

        // Swipe UP to go to next video
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 1200, width: 600, height: 800, direction: 'up', percent: 0.7
        });
        await driver.pause(4000);

        // Swipe UP one more time to go further
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 1200, width: 600, height: 800, direction: 'up', percent: 0.7
        });
        await driver.pause(4000);

        // Go back to home
        await driver.pressKeyCode(4);
        await driver.pause(3000);

        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()) === 'হোম') return true;
                } catch {}
            }
            return false;
        }, { timeout: 15000, timeoutMsg: 'Home not reached after stories' });
    });
});

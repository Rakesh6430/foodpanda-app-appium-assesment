const onboardingPage = require('./pages/onboarding.page');
const loginPage = require('./pages/login.page');
const { findByText, findByTextContains, existsByText } = require('./helpers/find.helper');

const PHONE_NUMBER = '01867000023';
const PASSWORD = '123456';

describe('Shikho AI', () => {
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

    it('should open Shikho AI, dismiss dialogs, ask a question and get a response', async () => {
        await driver.pause(2000);

        // Navigate to Shikho AI via bottom tab
        let tvs = await $$('android.widget.TextView');
        for (const tv of tvs) {
            try {
                if ((await tv.getText()) === 'শিখো AI') { await tv.click(); break; }
            } catch {}
        }
        await driver.pause(8000);

        // Get WebView bounds for coordinate mapping
        const webviews = await $$('android.webkit.WebView');
        let wvBounds = '[0,0][1080,2400]';
        for (const wv of webviews) {
            try { wvBounds = await wv.getAttribute('bounds'); } catch {}
        }
        const wvM = wvBounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
        const wvX = parseInt(wvM[1]), wvY = parseInt(wvM[2]), wvW = parseInt(wvM[3]) - wvX;
        const dpr = wvW / 411;

        // Switch to WebView
        await driver.switchContext('WEBVIEW_tech.shikho.android');
        await driver.pause(2000);

        // Verify video tutorial dialog is present with YouTube iframe
        const hasIframe = await driver.execute(`return !!document.querySelector('iframe[src*="youtube"]')`);
        expect(hasIframe).toBe(true);

        // Close video tutorial dialog (click the visible X icon)
        await driver.execute(`
            const icons = document.querySelectorAll('[data-testid="icon-xIcon"]');
            for (const icon of icons) {
                const r = icon.getBoundingClientRect();
                if (r.x > 0) {
                    const target = icon.closest('.cursor-pointer') || icon.parentElement;
                    const rect = target.getBoundingClientRect();
                    ['pointerdown','mousedown','pointerup','mouseup','click'].forEach(t => {
                        target.dispatchEvent(new PointerEvent(t, {bubbles:true, cancelable:true, clientX:rect.x+rect.width/2, clientY:rect.y+rect.height/2}));
                    });
                    break;
                }
            }
        `);
        await driver.pause(3000);

        // Close welcome/subject selection dialog
        await driver.execute(`
            const dialogs = document.querySelectorAll('[role="dialog"]');
            for (const d of dialogs) {
                if (window.getComputedStyle(d).display === 'none') continue;
                const icon = d.querySelector('[data-testid="icon-xIcon"]');
                if (icon) {
                    const target = icon.closest('.cursor-pointer') || icon.parentElement;
                    const rect = target.getBoundingClientRect();
                    ['pointerdown','mousedown','pointerup','mouseup','click'].forEach(t => {
                        target.dispatchEvent(new PointerEvent(t, {bubbles:true, cancelable:true, clientX:rect.x+rect.width/2, clientY:rect.y+rect.height/2}));
                    });
                    break;
                }
            }
        `);
        await driver.pause(3000);

        // Verify all dialogs are dismissed
        const dialogCount = await driver.execute(`
            let vis = 0;
            document.querySelectorAll('[role="dialog"]').forEach(d => {
                if (window.getComputedStyle(d).display !== 'none') vis++;
            });
            return vis;
        `);
        expect(dialogCount).toBe(0);

        // Verify textarea is visible
        const taExists = await driver.execute(`
            const ta = document.querySelector('textarea');
            return ta && ta.offsetParent !== null;
        `);
        expect(taExists).toBe(true);

        // Type question using native keyboard (triggers React state properly)
        await driver.switchContext('NATIVE_APP');
        const taNativeX = Math.round(wvX + 206 * dpr);
        const taNativeY = Math.round(wvY + 354 * dpr);
        await driver.execute('mobile: clickGesture', { x: taNativeX, y: taNativeY });
        await driver.pause(2000);

        const editTexts = await $$('android.widget.EditText');
        expect(editTexts.length).toBeGreaterThan(0);
        await editTexts[editTexts.length - 1].setValue('বাংলা ভাষায় স্বরবর্ণ কয়টি?');
        await driver.pause(2000);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(1000);

        // Verify text was entered
        await driver.switchContext('WEBVIEW_tech.shikho.android');
        const taValue = await driver.execute(`return document.querySelector('textarea')?.value || ''`);
        expect(taValue.length).toBeGreaterThan(0);

        // Find and click send button (rightmost small SVG button near textarea)
        const sendPos = await driver.execute(`
            const btns = document.querySelectorAll('button:not([disabled])');
            let rightmost = null;
            for (const b of btns) {
                const r = b.getBoundingClientRect();
                if (r.x > 200 && r.width <= 50 && r.y > 300 && b.querySelector('svg')) {
                    if (!rightmost || r.x > rightmost.x) {
                        rightmost = {x: r.x + r.width/2, y: r.y + r.height/2};
                    }
                }
            }
            return rightmost;
        `);
        expect(sendPos).not.toBeNull();

        await driver.switchContext('NATIVE_APP');
        const sendNativeX = Math.round(wvX + sendPos.x * dpr);
        const sendNativeY = Math.round(wvY + sendPos.y * dpr);
        await driver.execute('mobile: clickGesture', { x: sendNativeX, y: sendNativeY });
        await driver.pause(20000);

        // Verify AI responded
        await driver.switchContext('WEBVIEW_tech.shikho.android');

        // Wait for response to appear (usage counter changes from ০ to non-zero)
        await driver.waitUntil(async () => {
            const text = await driver.execute(`return document.body.innerText`);
            // Bengali digit ০ = 0, check if usage changed
            return !text.includes('আজকের ব্যবহার:\n০/') && text.includes('স্বরবর্ণ');
        }, { timeout: 30000, timeoutMsg: 'AI response not received' });

        const response = await driver.execute(`return document.body.innerText`);
        // The question should appear in the response
        expect(response).toContain('স্বরবর্ণ');

        // Go back to home by tapping home tab
        await driver.switchContext('NATIVE_APP');
        const tvs2 = await $$('android.widget.TextView');
        for (const tv of tvs2) {
            try {
                if ((await tv.getText()) === 'হোম') { await tv.click(); break; }
            } catch {}
        }
        await driver.pause(3000);
    });
});

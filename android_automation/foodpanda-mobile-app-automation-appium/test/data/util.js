const { $ } = require('@wdio/globals');

const APP_ID = 'tech.shikho.android';

class BasePage {

    async hideKeyboard() {
        try {
            await driver.hideKeyboard();
        } catch {
            // keyboard might not be visible
        }
    }

    //splash screen 
    async launchApp() {
    // Terminate first if running, then clear and relaunch
        try { await driver.execute('mobile: terminateApp', { appId: APP_ID }); } catch {}
        await driver.pause(2000);
        await driver.execute('mobile: clearApp', { appId: APP_ID });
        await driver.pause(2000);
        await driver.execute('mobile: activateApp', { appId: APP_ID });
        await driver.pause(10000);

        // Retry if app didn't launch (AccessibilityNodeInfo timeout recovery)
        try {
            await $('android.widget.TextView').waitForExist({ timeout: 10000 });
        } catch {
            // App may have crashed or UI not ready — retry once
            try { await driver.execute('mobile: terminateApp', { appId: APP_ID }); } catch {}
            await driver.pause(3000);
            await driver.execute('mobile: activateApp', { appId: APP_ID });
            await driver.pause(10000);
        }
  }  


    // Dismiss system notification permission popup if it appears (e.g. on first app launch).
    async dismissNotificationPopup() {
        try {
            const allowBtn = $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
            await allowBtn.waitForDisplayed({ timeout: 3000 });
            await allowBtn.click();
        } catch {
            // popup might not appear
        }
    }

    //  * Handle location sharing dialog if shown.
    //  * Uses page source check (avoids stale elements in Compose transitions).
    //  * Clicks via coordinate tap since Compose Button elements are often stale.
    //  */
    async  handleLocationSharing() {
        try {
            let hasLocation = false;
            try {
                const src = await driver.getPageSource();
                if (src.includes('লোকেশন') || src.includes('এগিয়ে যাও')) hasLocation = true;
            } catch {}
            if (hasLocation) {
                // Use coordinate tap — Compose Button elements cause stale element storms
                await driver.execute('mobile: clickGesture', { x: 540, y: 1800 });
                await driver.pause(3000);
                // Handle system location permission dialog
                try {
                    const allowLocBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")');
                    await allowLocBtn.waitForExist({ timeout: 10000 });
                    await allowLocBtn.click();
                    await driver.pause(3000);
                } catch {} //new UiSelector().className("android.widget.Button")
            }
        } catch {}
    }

    //scroll down
    async scrollToElement(text, maxScrolls = 5) {
        console.log(`🔽 Scrolling to find text: "${text}" (Max scrolls: ${maxScrolls})...`);
        
        const selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollForward()`;
        for (let i = 0; i < maxScrolls; i++) {
                try {
                    // Try to find the element
                    const el = await $(`android=new UiSelector().textContains("${text}")`);
                    if (await el.isExisting()) {
                        console.log(`✅ Successfully scrolled to "${text}".`);
                        return; // Found!
                    }
                    // If not found, scroll forward
                    await $(`android=${selector}`);
                    await driver.pause(1000);
                } catch (error) {
                    // If scroll fails, break
                    break;
                }
            }
        throw new Error(`❌ Could not find element with text "${text}" after ${maxScrolls} scrolls.`);
    }

    //scroll up
    async scrollUpToElement(text) {
        // scrollBackward() tells Android to swipe down on the glass, revealing elements UP the page
        const selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollBackward()`;
        await $(`android=${selector}`);
    }

    //scroll Horizontally
        async scrollHoritonallyToElement(text, maxScrolls) {
            const horizontalScroll = 'new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()';
            for (let i = 0; i < maxScrolls; i++) {
                try {
                    // Try to find the element
                    const el = await $(`android=new UiSelector().textContains("${text}")`);
                    if (await el.isExisting()) {
                        return; // Found!
                    }
                    // If not found, scroll forward
                    await $(`android=${horizontalScroll}`);
                    await driver.pause(1000);
                } catch (error) {
                    // If scroll fails, break
                    break;
                }
            }
            // Optionally, throw if not found after maxScrolls
        throw new Error(`Element with text "${text}" not found after ${maxScrolls} horizontal scrolls.`);

    }


    //scroll to bottom
    async scrollToEndByForward(maxScrolls) {
        for (let i = 0; i < maxScrolls; i++) {
            try {
                const scrollSelector = 'new UiScrollable(new UiSelector().scrollable(true)).scrollForward()';
                await $(`android=${scrollSelector}`);
                await driver.pause(500);
            } catch (e) {
                // If can't scroll further, break
                break;
            }
        }
    }

    //vertical scroll
    async scrollVerticalByPartial() {

        // Get device screen size
        const { width, height } = await driver.getWindowRect();
        const startX = Math.floor(width / 2);
        const startY = Math.floor(height * 0.4);
        const endX = startX;
        const endY = Math.floor(height * 0.1);

        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: startX, y: startY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerMove', duration: 500, x: endX, y: endY },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        await driver.pause(500);
        await driver.releaseActions();

    }


    async clearNumberField() {
        await this.inputUsernumber.clearValue();
    }

    
    async waitForVisible(element, timeout = 10000) {
        await element.waitForDisplayed({
            timeout,
            timeoutMsg: 'Element was not visible within timeout'
        });
    }

    async clickElement(element, timeout = 10000) {
        await this.waitForVisible(element, timeout);
        await element.click();
    }

    async typeText(element, value, timeout = 10000) {
        await this.waitForVisible(element, timeout);
        await element.setValue(value);
    }

    async getElementText(element, timeout = 10000) {
        await this.waitForVisible(element, timeout);
        return await element.getText();
    }

}
module.exports = new BasePage();

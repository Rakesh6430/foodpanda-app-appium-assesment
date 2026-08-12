const onboardingPage = require('./pages/onboarding.page');
const loginPage = require('./pages/login.page');
const { findByText, findByTextContains, existsByText } = require('./helpers/find.helper');

const PHONE_NUMBER = '01534536204';
const PASSWORD = '123456';

describe('Login', () => {
    before(async () => {
        // Dismiss notification permission dialog if shown
        try {
            const allowBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
            await allowBtn.waitForExist({ timeout: 10000 });
            await allowBtn.click();
            await driver.pause(2000);
        } catch {}

        // Handle onboarding if shown
        if (await onboardingPage.isDisplayed()) {
            await onboardingPage.tapContinue();
            await driver.pause(3000);
        }
    });

    it('should display the login screen', async () => {
        expect(await loginPage.isDisplayed()).toBe(true);
    });

    it('should show +88 country code by default', async () => {
        expect(await loginPage.getCountryCode()).toBe('+88');
    });

    it('should have privacy checkbox checked by default', async () => {
        expect(await loginPage.isPrivacyCheckboxChecked()).toBe(true);
    });

    it('should login successfully with password', async () => {
        await loginPage.enterPhoneNumber(PHONE_NUMBER);
        await loginPage.tapContinue();

        // Wait for page transition to password screen
        await driver.pause(3000);

        // Password screen shows "পাসওয়ার্ড দিন"
        const passwordScreenVisible = await existsByText('পাসওয়ার্ড দিন', 'android.widget.TextView', 15000);
        expect(passwordScreenVisible).toBe(true);

        // Enter 6-digit password
        const passwordInput = await $('android.widget.EditText');
        await passwordInput.waitForExist({ timeout: 15000 });
        await passwordInput.click();
        await passwordInput.setValue(PASSWORD);

        // Tap "লগ ইন" button
        await driver.pause(1000);
        const btn = await $('android.widget.Button');
        await btn.waitForExist({ timeout: 15000 });
        await btn.click();

        // Wait for login to complete
        await driver.pause(5000);

        // Handle "share location" screen if shown - tap the Button (এগিয়ে যাও)
        try {
            const locationBtn = await $('android.widget.Button');
            if (await locationBtn.isExisting()) {
                await locationBtn.click();
                await driver.pause(2000);

                // Grant system location permission - "While using the app"
                try {
                    const allowBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")');
                    await allowBtn.waitForExist({ timeout: 10000 });
                    await allowBtn.click();
                    await driver.pause(3000);
                } catch {}
            }
        } catch {}

        // Verify we reached the home screen - check for bottom nav
        const homeVisible = await existsByText('হোম', 'android.widget.TextView', 15000);
        expect(homeVisible).toBe(true);
    });
});

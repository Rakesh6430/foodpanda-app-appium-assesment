const { launchApp, dismissNotificationPermission, skipOnboarding, handleLocationSharing, handleSchoolForm, waitForHome } = require('../flows/auth.flow');
const loginPage = require('../pages/login.page');
const { existsByText } = require('../helpers/find.helper');

const PHONE_NUMBER = '01867000023';
const PASSWORD = '123456';

describe('Smoke: Login', () => {
    before(async () => {
        await launchApp();
        await dismissNotificationPermission();
        await skipOnboarding();
        // Wait for login page to fully load
        await driver.pause(2000);
    });

    it('should display login page with phone input and checkbox', async () => {
        // Phone input field exists
        const phoneInput = await loginPage.phoneInput;
        await phoneInput.waitForExist({ timeout: 15000 });
        expect(await phoneInput.isExisting()).toBe(true);

        // Country code +88 visible
        const countryCode = await loginPage.getCountryCode();
        expect(countryCode).toBe('+88');

        // Privacy checkbox exists
        const checkbox = await loginPage.privacyCheckbox;
        expect(await checkbox.isExisting()).toBe(true);
    });

    it('should login with valid credentials and reach home', async () => {
        await loginPage.enterPhoneNumber(PHONE_NUMBER);
        await loginPage.tapContinue();
        await driver.pause(5000);

        // Wait for password screen
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

        await handleLocationSharing();
        await handleSchoolForm();
        await waitForHome();

        const hasHome = await existsByText('হোম');
        expect(hasHome).toBe(true);
    });
});

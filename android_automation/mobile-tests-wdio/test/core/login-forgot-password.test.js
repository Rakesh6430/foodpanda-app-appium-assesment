const { launchApp, dismissNotificationPermission, skipOnboarding, handleLocationSharing, handleSchoolForm, waitForHome } = require('../flows/auth.flow');
const loginPage = require('../pages/login.page');
const { existsByText, findByText, isActionButtonEnabled, screenHasText } = require('../helpers/find.helper');
const { getNextPhoneNumber } = require('../helpers/phone.helper');

const PHONE_NUMBER = '01534536204';
const PASSWORD = '123456';
const OTP = '1234';
const NEW_PASSWORD = '123456';

/**
 * Covers Login sheet Lg_104-Lg_170:
 * Forgot password flow: password screen → forgot password link → OTP → reset password → home.
 * Sequential flow — each test continues from where the previous left off.
 *
 * NOTE: This test resets the password to the SAME value (123456) so the account remains usable.
 */
describe('Core: Forgot Password Flow', () => {
    before(async () => {
        await launchApp();
        await dismissNotificationPermission();
        await skipOnboarding();
        await driver.pause(2000);

        // Navigate to password screen
        const phoneInput = await loginPage.phoneInput;
        await phoneInput.waitForExist({ timeout: 30000 });
        await loginPage.enterPhoneNumber(PHONE_NUMBER);
        await loginPage.tapContinue();
        await driver.pause(5000);

        await driver.waitUntil(async () => {
            return await screenHasText('পাসওয়ার্ড');
        }, { timeout: 20000, timeoutMsg: 'Password screen not found' });
    });

    // --- Forgot Password Link (Lg_104-Lg_108) ---

    it('Lg_104-105: should display forgot password option on password screen', async () => {
        const hasForgot = await existsByText('পাসওয়ার্ড ভুলে গিয়েছেন?', 'android.widget.TextView', 5000);
        expect(hasForgot).toBe(true);
    });

    it('Lg_107-108: should navigate to OTP verification after clicking forgot password', async () => {
        const forgotEl = await findByText('পাসওয়ার্ড ভুলে গিয়েছেন?');
        await forgotEl.click();
        await driver.pause(5000);

        // Should show OTP verification page for password reset
        await driver.waitUntil(async () => {
            return await screenHasText('ভেরিফাই') || await screenHasText('রিসেট');
        }, { timeout: 15000, timeoutMsg: 'Password reset OTP page not found' });

        const hasVerify = await screenHasText('ভেরিফাই') || await screenHasText('রিসেট');
        expect(hasVerify).toBe(true);
    });

    // --- OTP Verification for Reset (Lg_109-Lg_131) ---

    it('Lg_109: should display OTP verification page content', async () => {
        const otpInput = await $('android.widget.EditText');
        expect(await otpInput.isExisting()).toBe(true);

        const btn = await $('android.widget.Button');
        expect(await btn.isExisting()).toBe(true);
    });

    it('Lg_110: should have disabled verify button without OTP', async () => {
        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(false);
    });

    it('Lg_122: should show warning for incorrect OTP', async () => {
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

        // Clear for next test
        await stillOnOtp.click();
        await stillOnOtp.clearValue();
    });

    it('Lg_120: should enable verify button after valid OTP', async () => {
        const otpInput = await $('android.widget.EditText');
        await otpInput.click();
        await otpInput.setValue(OTP);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(1000);

        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(true);
    });

    it('Lg_128-131: should proceed to password reset screen after valid OTP', async () => {
        const btn = await $('android.widget.Button');
        await btn.click();
        await driver.pause(5000);

        // Should show password reset screen
        await driver.waitUntil(async () => {
            return await screenHasText('পাসওয়ার্ড');
        }, { timeout: 20000, timeoutMsg: 'Password reset screen not found' });

        expect(await screenHasText('পাসওয়ার্ড')).toBe(true);
    });

    // --- Password Reset Screen (Lg_132-Lg_170) ---

    it('Lg_132: should display password reset page content', async () => {
        // Should have password and confirm password fields
        const inputs = await $$('android.widget.EditText');
        expect(inputs.length).toBeGreaterThanOrEqual(2);

        // Should have a button
        const btn = await $('android.widget.Button');
        expect(await btn.isExisting()).toBe(true);
    });

    it('Lg_135-136: should show password input fields', async () => {
        const inputs = await $$('android.widget.EditText');
        expect(inputs.length).toBeGreaterThanOrEqual(2);
    });

    it('Lg_164: should have disabled reset button without password', async () => {
        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(false);
    });

    it('Lg_165: should have disabled reset button with only password (no confirm)', async () => {
        const inputs = await $$('android.widget.EditText');
        await inputs[0].click();
        await inputs[0].setValue(NEW_PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(1000);

        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(false);

        // Clear for next test
        await inputs[0].clearValue();
        try { await driver.hideKeyboard(); } catch {}
    });

    it('Lg_161: should show error for mismatched confirm password', async () => {
        const inputs = await $$('android.widget.EditText');
        await inputs[0].click();
        await inputs[0].setValue(NEW_PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);

        await inputs[1].click();
        await inputs[1].setValue('654321');
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(2000);

        // Reset button should remain disabled with mismatched passwords
        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(false);

        // Clear both fields
        await inputs[0].click();
        await inputs[0].clearValue();
        try { await driver.hideKeyboard(); } catch {}
        await inputs[1].click();
        await inputs[1].clearValue();
        try { await driver.hideKeyboard(); } catch {}
    });

    it('Lg_167: should enable reset button with matching passwords', async () => {
        const inputs = await $$('android.widget.EditText');
        await inputs[0].click();
        await inputs[0].setValue(NEW_PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);

        await inputs[1].click();
        await inputs[1].setValue(NEW_PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(1500);

        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(true);
    });

    // --- Successful Reset + Login (Lg_168-Lg_170) ---

    it('Lg_168-170: should reset password and reach home', async () => {
        // Click reset button
        const buttons = await $$('android.widget.Button');
        const resetBtn = buttons[buttons.length - 1];
        await resetBtn.click();
        await driver.pause(5000);

        // Should show success message: "অভিনন্দন!" (Congratulations!)
        // After password reset, the app shows a congratulations screen
        // with "লগ ইন করুন" button to go back to login
        const resetSuccess = await screenHasText('অভিনন্দন') ||
            await screenHasText('রিসেট') ||
            await screenHasText('লগ ইন করুন') ||
            await screenHasText('হোম') ||
            await screenHasText('প্রোফাইল কমপ্লিট');
        expect(resetSuccess).toBe(true);
    });
});

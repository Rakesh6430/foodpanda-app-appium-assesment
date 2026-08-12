const onboardingPage = require('./pages/onboarding.page');
const loginPage = require('./pages/login.page');
const { findByText, existsByText } = require('./helpers/find.helper');

const PHONE_NUMBER = '01867000004';
const OTP = '1234';
const PASSWORD = '123456';

describe('Signup', () => {
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

    it('should complete the full signup journey', async () => {
        // === LOGIN SCREEN ===
        expect(await loginPage.isDisplayed()).toBe(true);

        // Enter phone number and continue
        await loginPage.enterPhoneNumber(PHONE_NUMBER);
        await loginPage.tapContinue();
        await driver.pause(5000);

        // === OTP SCREEN ===
        let pageSource = await driver.getPageSource();
        expect(pageSource).toContain('ভেরিফাই করুন');

        // Enter OTP and verify
        const otpInput = await $('android.widget.EditText');
        await otpInput.waitForExist({ timeout: 15000 });
        await otpInput.click();
        await otpInput.setValue(OTP);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);
        const verifyBtn = await $('android.widget.Button');
        await verifyBtn.click();

        // === STEP 1/3: Identity - wait for it to appear ===
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('শিক্ষার্থী') || src.includes('অভিভাবক');
        }, { timeout: 20000, timeoutMsg: 'Identity step (Step 1/3) not found' });

        // Select Student
        const studentEl = await findByText('শিক্ষার্থী');
        await studentEl.click();
        await driver.pause(1000);

        // Tap Continue
        const s1Btn = await $('android.widget.Button');
        await s1Btn.click();

        // === STEP 2/3: Info - wait for it ===
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('তোমার নাম');
        }, { timeout: 15000, timeoutMsg: 'Info step (Step 2/3) not found' });

        // Fill name
        const nameInput = await $('android.widget.EditText');
        await nameInput.waitForExist({ timeout: 15000 });
        await nameInput.click();
        await nameInput.setValue('Test Student');
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(1000);

        // Select gender "ছাত্র"
        const genderEl = await findByText('ছাত্র');
        await genderEl.click();
        await driver.pause(1000);

        // Select class ক্লাস ৮
        const classEl = await findByText('ক্লাস ৮');
        await classEl.click();
        await driver.pause(2000);

        // Tap Continue (last button - skip "ফিরে যাও")
        const buttons2 = await $$('android.widget.Button');
        await buttons2[buttons2.length - 1].click();

        // === STEP 3/3: Password - wait for it ===
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('পাসওয়ার্ড সেট');
        }, { timeout: 15000, timeoutMsg: 'Password step (Step 3/3) not found' });

        // Fill password and confirm password
        const pwInputs = await $$('android.widget.EditText');
        await pwInputs[0].click();
        await pwInputs[0].setValue(PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);

        await pwInputs[1].click();
        await pwInputs[1].setValue(PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(1000);

        // Tap Save (last button)
        const buttons3 = await $$('android.widget.Button');
        await buttons3[buttons3.length - 1].click();

        // === CONGRATULATIONS - wait for it ===
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('অভিনন্দন');
        }, { timeout: 20000, timeoutMsg: 'Congratulations screen not found' });

        // Tap Go to Homepage
        const homeBtn = await $('android.widget.Button');
        await homeBtn.click();
        await driver.pause(5000);

        // Handle location sharing if shown
        try {
            const locBtn = await $('android.widget.Button');
            if (await locBtn.isExisting()) {
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

        // After signup, app navigates to home (with optional school info sheet on top)
        // Verify we left the congratulations screen
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return !src.includes('অভিনন্দন');
        }, { timeout: 15000, timeoutMsg: 'Failed to navigate away from congratulations' });
    });
});

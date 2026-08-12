const onboardingPage = require('./pages/onboarding.page');
const loginPage = require('./pages/login.page');
const { findByText, findByTextContains, existsByText } = require('./helpers/find.helper');

const PHONE_NUMBER = '01867000007';
const OTP = '1234';
const PASSWORD = '123456';

describe('School Add', () => {
    before(async () => {
        // Reset app to start fresh
        await driver.execute('mobile: clearApp', { appId: 'tech.shikho.android' });
        await driver.execute('mobile: activateApp', { appId: 'tech.shikho.android' });
        await driver.pause(5000);

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

    it('should complete signup and add school info', async () => {
        // === SIGNUP FLOW ===
        expect(await loginPage.isDisplayed()).toBe(true);

        await loginPage.enterPhoneNumber(PHONE_NUMBER);
        await loginPage.tapContinue();
        await driver.pause(5000);

        // === OTP SCREEN ===
        let pageSource = await driver.getPageSource();
        expect(pageSource).toContain('ভেরিফাই করুন');

        const otpInput = await $('android.widget.EditText');
        await otpInput.waitForExist({ timeout: 15000 });
        await otpInput.click();
        await otpInput.setValue(OTP);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);
        const verifyBtn = await $('android.widget.Button');
        await verifyBtn.click();

        // === STEP 1/3: Identity ===
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('শিক্ষার্থী') || src.includes('অভিভাবক');
        }, { timeout: 20000, timeoutMsg: 'Identity step not found' });

        const studentEl = await findByText('শিক্ষার্থী');
        await studentEl.click();
        await driver.pause(1000);
        const s1Btn = await $('android.widget.Button');
        await s1Btn.click();

        // === STEP 2/3: Info ===
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('তোমার নাম');
        }, { timeout: 15000, timeoutMsg: 'Info step not found' });

        const nameInput = await $('android.widget.EditText');
        await nameInput.waitForExist({ timeout: 15000 });
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

        // === STEP 3/3: Password ===
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('পাসওয়ার্ড সেট');
        }, { timeout: 15000, timeoutMsg: 'Password step not found' });

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

        // === CONGRATULATIONS ===
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('অভিনন্দন');
        }, { timeout: 20000, timeoutMsg: 'Congratulations screen not found' });

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

        // === SCHOOL INFO SHEET ===
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('স্কুল / কলেজের বিভাগ');
        }, { timeout: 15000, timeoutMsg: 'School info sheet not found' });
        await driver.pause(2000);

        // Select Division: Dhaka
        let editTexts = await $$('android.widget.EditText');
        await editTexts[0].click();
        await driver.pause(2000);
        const dhakaDivision = await findByText('Dhaka');
        await dhakaDivision.click();
        await driver.pause(2000);

        // Select District: Dhaka
        editTexts = await $$('android.widget.EditText');
        await editTexts[1].click();
        await driver.pause(2000);
        const dhakaDistrict = await findByText('Dhaka');
        await dhakaDistrict.click();
        await driver.pause(2000);

        // Type school name: "ideal"
        editTexts = await $$('android.widget.EditText');
        await editTexts[2].click();
        await editTexts[2].setValue('ideal');
        await driver.pause(1000);

        // Dismiss keyboard (required for save button to work)
        await driver.pressKeyCode(4); // KEYCODE_BACK
        await driver.pause(2000);

        // Click Save - first click resolves school name
        let saveBtn = await $('android.widget.Button');
        await saveBtn.click();

        // Wait for school name to resolve
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('IDEAL');
        }, { timeout: 15000, timeoutMsg: 'School name not resolved' });
        await driver.pause(1000);

        // Click Save again - submits the form
        saveBtn = await $('android.widget.Button');
        await saveBtn.click();

        // Verify home screen with success message
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('সফলভাবে সেভ হয়েছে') || src.includes('হোম');
        }, { timeout: 15000, timeoutMsg: 'School save not confirmed' });

        const homeVisible = await existsByText('হোম', 'android.widget.TextView', 15000);
        expect(homeVisible).toBe(true);
    });
});

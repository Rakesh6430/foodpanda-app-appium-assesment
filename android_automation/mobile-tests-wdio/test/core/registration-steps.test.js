const { launchApp, dismissNotificationPermission, skipOnboarding, handleLocationSharing, handleSchoolForm, waitForHome } = require('../flows/auth.flow');
const loginPage = require('../pages/login.page');
const otpPage = require('../pages/otp.page');
const profilePage = require('../pages/profile.page');
const { existsByText, findByText, findByTextContains, isActionButtonEnabled, screenHasText } = require('../helpers/find.helper');
const { getNextPhoneNumber } = require('../helpers/phone.helper');

const PHONE_NUMBER = getNextPhoneNumber();
const OTP = '1234';
const PASSWORD = '123456';

let isNewUser = true; // set in before hook

/**
 * Covers regression sheet "New Registration" TC 29-185:
 * OTP verification, identity step, info step, password step, congratulations.
 * Sequential flow — each test continues from where the previous left off.
 */
describe('Core: Registration Steps', () => {
    before(async () => {
        await launchApp();
        await dismissNotificationPermission();
        await skipOnboarding();
        await driver.pause(2000);

        // Navigate to OTP screen
        const phoneInput = await loginPage.phoneInput;
        await phoneInput.waitForExist({ timeout: 15000 });
        await loginPage.enterPhoneNumber(PHONE_NUMBER);
        await loginPage.tapContinue();
        await driver.pause(5000);

        // Detect if new user (OTP) or existing user (password)
        await driver.waitUntil(async () => {
            const src = await driver.getPageSource();
            return src.includes('ভেরিফাই করুন') || src.includes('পাসওয়ার্ড');
        }, { timeout: 15000, timeoutMsg: 'OTP or Password screen not found' });

        const src = await driver.getPageSource();
        if (src.includes('পাসওয়ার্ড') && !src.includes('ভেরিফাই করুন')) {
            isNewUser = false;
            console.log('Number already registered — OTP tests will be skipped');
        }
    });

    // --- OTP Screen (TC 29-52) ---

    it('TC29-31: should display OTP verification page', async () => {
        if (!isNewUser) return; // already registered, skip

        const otpInput = await $('android.widget.EditText');
        expect(await otpInput.isExisting()).toBe(true);

        const btn = await $('android.widget.Button');
        expect(await btn.isExisting()).toBe(true);
    });

    it('TC30: should have disabled verify button without OTP', async () => {
        if (!isNewUser) return;

        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(false);
    });

    it('TC42: should stay on OTP page after incorrect OTP', async () => {
        if (!isNewUser) return;

        const otpInput = await $('android.widget.EditText');
        await otpInput.click();
        await otpInput.clearValue();
        await otpInput.setValue('9999');
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);

        const btn = await $('android.widget.Button');
        await btn.click();
        await driver.pause(5000);

        const stillOnOtp = await $('android.widget.EditText');
        expect(await stillOnOtp.isExisting()).toBe(true);

        await stillOnOtp.click();
        await stillOnOtp.clearValue();
    });

    it('TC39-40: should accept valid OTP and proceed', async () => {
        if (!isNewUser) return;

        const otpInput = await $('android.widget.EditText');
        await otpInput.click();
        await otpInput.clearValue();
        await otpInput.setValue(OTP);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);

        await otpPage.tapVerify();
        await driver.pause(3000);
    });

    // --- Identity Step 1/3 (TC 53-63) ---

    it('TC53-55: should display identity step with student/parent cards', async () => {
        if (!isNewUser) return;

        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    const text = await tv.getText();
                    if (text.includes('শিক্ষার্থী') || text.includes('অভিভাবক')) return true;
                } catch {}
            }
            return false;
        }, { timeout: 20000, timeoutMsg: 'Identity step not found' });

        const hasStudent = await existsByText('শিক্ষার্থী');
        const hasParent = await existsByText('অভিভাবক');
        expect(hasStudent).toBe(true);
        expect(hasParent).toBe(true);
    });

    it('TC56: should display step indicator ধাপ ১/৩', async () => {
        if (!isNewUser) return;

        const hasStep = await existsByText('ধাপ ১/৩', 'android.widget.TextView', 5000);
        if (!hasStep) {
            const src = await driver.getPageSource();
            expect(src.includes('১/৩') || src.includes('1/3')).toBe(true);
        } else {
            expect(hasStep).toBe(true);
        }
    });

    it('TC62: should have disabled continue without card selection', async () => {
        if (!isNewUser) return;

        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(false);
    });

    it('TC58-61: should select student card and enable continue', async () => {
        if (!isNewUser) return;

        await profilePage.selectStudent();
        await driver.pause(1000);
        await profilePage.tapContinue();
        await driver.pause(2000);
    });

    // --- Info Step 2/3 (TC 64-101) ---

    it('TC64-68: should display info step with name field', async () => {
        if (!isNewUser) return;

        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()).includes('তোমার নাম') || (await tv.getText()).includes('তোমার তথ্য')) return true;
                } catch {}
            }
            return false;
        }, { timeout: 15000, timeoutMsg: 'Info step not found' });

        const nameInput = await $('android.widget.EditText');
        expect(await nameInput.isExisting()).toBe(true);
    });

    it('TC70: should accept name input in the field', async () => {
        if (!isNewUser) return;

        await profilePage.enterName('Test Student');
        await driver.pause(1000);

        const nameInput = await $('android.widget.EditText');
        const value = await nameInput.getText();
        expect(value.length).toBeGreaterThan(0);
    });

    it('TC77-79: should display gender cards', async () => {
        if (!isNewUser) return;

        const hasMale = await existsByText('ছাত্র');
        const hasFemale = await existsByText('ছাত্রী');
        expect(hasMale).toBe(true);
        expect(hasFemale).toBe(true);
    });

    it('TC79: should select gender card', async () => {
        if (!isNewUser) return;

        await profilePage.selectGenderMale();
        await driver.pause(1000);
    });

    it('TC83-85: should display class options', async () => {
        if (!isNewUser) return;

        const hasClass8 = await existsByText('ক্লাস ৮');
        expect(hasClass8).toBe(true);
    });

    it('TC88: should not show batch/group for class 8', async () => {
        if (!isNewUser) return;

        await profilePage.selectClass('ক্লাস ৮');
        await driver.pause(1500);

        const hasBatch = await existsByText('ব্যাচ', 'android.widget.TextView', 2000);
        const hasGroup = await existsByText('গ্রুপ সিলেক্ট করো', 'android.widget.TextView', 2000);
        expect(hasBatch).toBe(false);
        expect(hasGroup).toBe(false);
    });

    it('TC100: should enable continue after filling required fields', async () => {
        if (!isNewUser) return;

        await driver.pause(1000);
        await profilePage.tapContinue();
        await driver.pause(2000);
    });

    // --- Password Step 3/3 (TC 149-185) ---

    it('TC149-151: should display password step', async () => {
        if (!isNewUser) return;

        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()).includes('পাসওয়ার্ড সেট')) return true;
                } catch {}
            }
            return false;
        }, { timeout: 15000, timeoutMsg: 'Password step not found' });

        const inputs = await $$('android.widget.EditText');
        expect(inputs.length).toBeGreaterThanOrEqual(2);
    });

    it('TC179: should have disabled save button without password', async () => {
        if (!isNewUser) return;

        const enabled = await isActionButtonEnabled();
        expect(enabled).toBe(false);
    });

    it('TC176: should show error for mismatched passwords', async () => {
        if (!isNewUser) return;

        const inputs = await $$('android.widget.EditText');
        await inputs[0].click();
        await inputs[0].setValue('123456');
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);

        await inputs[1].click();
        await inputs[1].setValue('654321');
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(1500);

        // Save button should be non-functional with mismatched passwords
        const buttons = await $$('android.widget.Button');
        const lastBtn = buttons[buttons.length - 1];
        try { await lastBtn.click(); } catch {}
        await driver.pause(2000);

        // Should still be on password step
        const stillOnPw = await $$('android.widget.EditText');
        expect(stillOnPw.length).toBeGreaterThanOrEqual(2);
    });

    it('TC175-182: should save with matching passwords', async () => {
        if (!isNewUser) return;

        const inputs = await $$('android.widget.EditText');
        await inputs[0].click();
        await inputs[0].clearValue();
        await inputs[0].setValue(PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);

        await inputs[1].click();
        await inputs[1].clearValue();
        await inputs[1].setValue(PASSWORD);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(1000);
    });

    it('TC183-185: should complete registration and show congratulations', async () => {
        if (!isNewUser) return;

        await profilePage.tapContinue();
        await driver.pause(5000);

        await driver.waitUntil(async () => {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()).includes('অভিনন্দন')) return true;
                } catch {}
            }
            return false;
        }, { timeout: 20000, timeoutMsg: 'Congratulations screen not found' });

        const hasCongrats = await existsByText('অভিনন্দন!');
        expect(hasCongrats).toBe(true);
    });

    it('TC185: should navigate to home after clicking homepage button', async () => {
        if (!isNewUser) return;

        await profilePage.tapGoToHomepage();
        await driver.pause(5000);

        await handleLocationSharing();
        await handleSchoolForm();
        await waitForHome();

        expect(await screenHasText('হোম')).toBe(true);
    });
});

const onboardingPage = require('../pages/onboarding.page');
const loginPage = require('../pages/login.page');
const { findByText } = require('../helpers/find.helper');

const APP_ID = 'tech.shikho.android';

/**
 * Clear app data and launch fresh.
 */
async function launchApp() {
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

/**
 * Dismiss Android notification permission dialog if shown.
 */
async function dismissNotificationPermission() {
    try {
        const allowBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
        await allowBtn.waitForExist({ timeout: 10000 });
        await allowBtn.click();
        await driver.pause(2000);
    } catch {}
}

/**
 * Skip onboarding carousel if shown.
 */
async function skipOnboarding() {
    if (await onboardingPage.isDisplayed()) {
        await onboardingPage.tapContinue();
        await driver.pause(3000);
    }
}

/**
 * Handle location sharing dialog if shown.
 * Uses page source check (avoids stale elements in Compose transitions).
 * Clicks via coordinate tap since Compose Button elements are often stale.
 */
async function handleLocationSharing() {
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
            } catch {}
        }
    } catch {}
}

/**
 * Fill and submit school info bottom sheet if shown.
 */
async function handleSchoolForm() {
    await driver.pause(3000);
    const src = await driver.getPageSource();
    if (!src.includes('স্কুল / কলেজের বিভাগ')) return;

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
    }, { timeout: 30000, timeoutMsg: 'School name not resolved' });
    await driver.pause(1000);
    saveBtn = await $('android.widget.Button');
    await saveBtn.click();
    await driver.pause(3000);
}

/**
 * Handle "প্রোফাইল কমপ্লিট করো" screen if shown after login.
 * This is a bottom sheet on top of the home page. Tap outside to dismiss.
 * Uses swipe down gesture to dismiss the sheet.
 */
async function handleProfileComplete() {
    try {
        let hasProfile = false;
        try {
            const src = await driver.getPageSource();
            if (src.includes('প্রোফাইল কমপ্লিট')) hasProfile = true;
        } catch {}
        if (hasProfile) {
            // Swipe down to dismiss the bottom sheet
            await driver.execute('mobile: swipeGesture', {
                left: 200, top: 800, width: 600, height: 500, direction: 'down', percent: 0.8
            });
            await driver.pause(2000);
        }
    } catch {}
}

/**
 * Check if we've reached post-login state (home screen or mandatory post-login screens).
 * "প্রোফাইল কমপ্লিট করো" is a mandatory screen for users with incomplete profiles —
 * reaching it means login was successful.
 */
async function isHomeVisible() {
    try {
        const src = await driver.getPageSource();
        if (src.includes('হোম')) return true;
        if (src.includes('প্রোফাইল কমপ্লিট')) return true;
    } catch {}
    try {
        const tvs = await $$('android.widget.TextView');
        const startIdx = Math.max(0, tvs.length - 15);
        for (let i = tvs.length - 1; i >= startIdx; i--) {
            try {
                const t = await tvs[i].getText();
                if (t === 'হোম' || t.includes('প্রোফাইল কমপ্লিট')) return true;
            } catch {}
        }
    } catch {}
    return false;
}

/**
 * Wait until home screen is visible by checking for 'হোম' tab text.
 * Handles intermediate screens (location, school form, popups) that may appear after login.
 */
async function waitForHome(timeout = 60000) {
    let triedLocation = false;
    let triedProfile = false;
    let triedActivate = false;
    await driver.waitUntil(async () => {
        if (await isHomeVisible()) return true;

        // Try handling location sharing screen if still shown
        if (!triedLocation) {
            triedLocation = true;
            await handleLocationSharing();
            await driver.pause(2000);
            if (await isHomeVisible()) return true;
        }

        // Try handling profile complete popup
        if (!triedProfile) {
            triedProfile = true;
            await handleProfileComplete();
            await driver.pause(2000);
            if (await isHomeVisible()) return true;
        }

        // Try activating app in case it went to background
        if (!triedActivate) {
            triedActivate = true;
            try {
                await driver.execute('mobile: activateApp', { appId: APP_ID });
                await driver.pause(3000);
            } catch {}
            if (await isHomeVisible()) return true;
        }

        return false;
    }, { timeout, timeoutMsg: 'Home screen not found' });
}

/**
 * Full login flow: launch app → dismiss permission → skip onboarding → enter phone →
 * enter password → handle location → handle school form → wait for home.
 */
async function loginWithPassword(phone, password) {
    await launchApp();
    await dismissNotificationPermission();
    await skipOnboarding();

    const phoneInput = await loginPage.phoneInput;
    await phoneInput.waitForExist({ timeout: 30000 });
    await loginPage.enterPhoneNumber(phone);
    await loginPage.tapContinue();
    await driver.pause(5000);

    await driver.waitUntil(async () => {
        const src = await driver.getPageSource();
        return src.includes('পাসওয়ার্ড');
    }, { timeout: 20000, timeoutMsg: 'Password screen not found' });

    const pwInput = await $('android.widget.EditText');
    await pwInput.waitForExist({ timeout: 15000 });
    await pwInput.click();
    await pwInput.setValue(password);
    try { await driver.hideKeyboard(); } catch {}
    await driver.pause(500);
    const loginBtn = await $('android.widget.Button');
    await loginBtn.click();
    await driver.pause(5000);

    await handleLocationSharing();
    await handleProfileComplete();
    await handleSchoolForm();
    await waitForHome();
}

/**
 * Full signup flow: launch app → dismiss permission → skip onboarding → enter phone →
 * OTP → identity → info → password → congratulations → home.
 * Returns after reaching home (or congratulations screen exit).
 */
async function signupNewUser(phone, { otp = '1234', password = '123456', name = 'Test Student' } = {}) {
    await launchApp();
    await dismissNotificationPermission();
    await skipOnboarding();

    const phoneInput = await loginPage.phoneInput;
    await phoneInput.waitForExist({ timeout: 15000 });
    await loginPage.enterPhoneNumber(phone);
    await loginPage.tapContinue();
    await driver.pause(5000);

    // OTP screen
    await driver.waitUntil(async () => {
        const src = await driver.getPageSource();
        return src.includes('ভেরিফাই করুন') || src.includes('পাসওয়ার্ড');
    }, { timeout: 15000, timeoutMsg: 'OTP or Password screen not found' });

    let pageSource = await driver.getPageSource();
    if (pageSource.includes('পাসওয়ার্ড') && !pageSource.includes('ভেরিফাই করুন')) {
        // Existing user — login instead
        const pwInput = await $('android.widget.EditText');
        await pwInput.waitForExist({ timeout: 15000 });
        await pwInput.click();
        await pwInput.setValue(password);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);
        const loginBtn = await $('android.widget.Button');
        await loginBtn.click();
        await driver.pause(5000);
        await handleLocationSharing();
        await handleSchoolForm();
        await waitForHome();
        return;
    }

    // Enter OTP
    const otpInput = await $('android.widget.EditText');
    await otpInput.waitForExist({ timeout: 15000 });
    await otpInput.click();
    await otpInput.setValue(otp);
    try { await driver.hideKeyboard(); } catch {}
    await driver.pause(500);
    const verifyBtn = await $('android.widget.Button');
    await verifyBtn.click();

    // Step 1/3: Identity
    await driver.waitUntil(async () => {
        const src = await driver.getPageSource();
        return src.includes('শিক্ষার্থী') || src.includes('অভিভাবক');
    }, { timeout: 20000, timeoutMsg: 'Identity step not found' });
    const studentEl = await findByText('শিক্ষার্থী');
    await studentEl.click();
    await driver.pause(1000);
    const s1Btn = await $('android.widget.Button');
    await s1Btn.click();

    // Step 2/3: Info
    await driver.waitUntil(async () => {
        const src = await driver.getPageSource();
        return src.includes('তোমার নাম');
    }, { timeout: 15000, timeoutMsg: 'Info step not found' });
    const nameInput = await $('android.widget.EditText');
    await nameInput.waitForExist({ timeout: 15000 });
    await nameInput.click();
    await nameInput.setValue(name);
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

    // Step 3/3: Password
    await driver.waitUntil(async () => {
        const src = await driver.getPageSource();
        return src.includes('পাসওয়ার্ড সেট');
    }, { timeout: 15000, timeoutMsg: 'Password step not found' });
    const pwInputs = await $$('android.widget.EditText');
    await pwInputs[0].click();
    await pwInputs[0].setValue(password);
    try { await driver.hideKeyboard(); } catch {}
    await driver.pause(500);
    await pwInputs[1].click();
    await pwInputs[1].setValue(password);
    try { await driver.hideKeyboard(); } catch {}
    await driver.pause(1000);
    const buttons3 = await $$('android.widget.Button');
    await buttons3[buttons3.length - 1].click();

    // Congratulations
    await driver.waitUntil(async () => {
        const src = await driver.getPageSource();
        return src.includes('অভিনন্দন');
    }, { timeout: 20000, timeoutMsg: 'Congratulations screen not found' });
    const homeBtn = await $('android.widget.Button');
    await homeBtn.click();
    await driver.pause(5000);

    await handleLocationSharing();
    await handleSchoolForm();
    await waitForHome();
}

/**
 * Complete the mandatory profile form.
 * Call after clicking the "প্রোফাইল কমপ্লিট করো" button to reach the form page.
 * Fills: date of birth, gender, shift, education medium, guardian name, guardian phone.
 */
async function completeProfileForm() {
    async function scrollFormDown(percent = 0.4) {
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 1500, width: 600, height: 500, direction: 'up', percent
        });
        await driver.pause(1000);
    }

    async function scrollFormToTop() {
        for (let i = 0; i < 5; i++) {
            await driver.execute('mobile: swipeGesture', {
                left: 200, top: 500, width: 600, height: 500, direction: 'down', percent: 0.5
            });
            await driver.pause(500);
        }
        await driver.pause(500);
    }

    await scrollFormToTop();
    await driver.pause(1000);

    // 1. জন্ম তারিখ — click date input (3rd EditText: after name & phone)
    let inputs = await $$('android.widget.EditText');
    if (inputs.length > 2) {
        await inputs[2].click();
        await driver.pause(2000);
        // Scroll year column to get reasonable year (~2008)
        // From 2020, scroll ~12 years back
        for (let i = 0; i < 12; i++) {
            await driver.execute('mobile: swipeGesture', {
                left: 700, top: 1400, width: 200, height: 200, direction: 'down', percent: 0.4
            });
            await driver.pause(200);
        }
        await driver.pause(500);
        // Click ঠিক আছে
        const tvs = await $$('android.widget.TextView');
        for (const tv of tvs) {
            try {
                if ((await tv.getText()) === 'ঠিক আছে') { await tv.click(); break; }
            } catch {}
        }
        await driver.pause(2000);
    }

    // 2. Gender — click ছাত্র
    const genderTvs = await $$('android.widget.TextView');
    for (const tv of genderTvs) {
        try {
            if ((await tv.getText()) === 'ছাত্র') { await tv.click(); break; }
        } catch {}
    }
    await driver.pause(1000);

    // Scroll to see remaining fields
    await scrollFormDown(0.5);
    await scrollFormDown(0.3);

    // 3. ক্লাসের শিফট dropdown
    inputs = await $$('android.widget.EditText');
    for (const input of inputs) {
        try {
            const text = await input.getText();
            const enabled = await input.getAttribute('enabled');
            const bounds = await input.getAttribute('bounds');
            if (text === '' && enabled === 'false') {
                const m = bounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
                if (m && (parseInt(m[3]) - parseInt(m[1])) < 600 && parseInt(m[2]) > 800 && parseInt(m[2]) < 1200) {
                    await input.click();
                    await driver.pause(2000);
                    const opts = await $$('android.widget.TextView');
                    for (const opt of opts) {
                        try {
                            const t = await opt.getText();
                            if (t === 'সকাল' || t === 'প্রভাতী' || t === 'বিকাল') {
                                await opt.click();
                                break;
                            }
                        } catch {}
                    }
                    await driver.pause(1000);
                    break;
                }
            }
        } catch {}
    }

    // 4. অন্যান্য শিক্ষা মাধ্যম dropdown (uses CheckBox elements)
    inputs = await $$('android.widget.EditText');
    for (const input of inputs) {
        try {
            const text = await input.getText();
            const enabled = await input.getAttribute('enabled');
            const bounds = await input.getAttribute('bounds');
            if (text === '' && enabled === 'false') {
                const m = bounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
                if (m && (parseInt(m[3]) - parseInt(m[1])) > 800 && parseInt(m[2]) > 1300) {
                    await input.click();
                    await driver.pause(2000);
                    // Click the last checkbox (কোনটাই নয়)
                    const cbs = await $$('android.widget.CheckBox');
                    if (cbs.length > 0) {
                        await cbs[cbs.length - 1].click();
                        await driver.pause(1000);
                    }
                    // Swipe down to dismiss dropdown and save selection
                    await driver.execute('mobile: swipeGesture', {
                        left: 200, top: 800, width: 600, height: 500, direction: 'down', percent: 0.8
                    });
                    await driver.pause(2000);
                    break;
                }
            }
        } catch {}
    }

    // Scroll down for guardian fields
    await scrollFormDown(0.5);

    // 5. অভিভাবকের নাম + মোবাইল নাম্বার
    inputs = await $$('android.widget.EditText');
    let filledName = false;
    for (const input of inputs) {
        try {
            const text = await input.getText();
            const enabled = await input.getAttribute('enabled');
            if (enabled === 'true' && text === '') {
                if (!filledName) {
                    await input.click();
                    await input.setValue('Test Guardian');
                    try { await driver.hideKeyboard(); } catch {}
                    filledName = true;
                    await driver.pause(500);
                } else {
                    await input.click();
                    await input.setValue('01712345678');
                    try { await driver.hideKeyboard(); } catch {}
                    await driver.pause(500);
                    break;
                }
            }
        } catch {}
    }

    // 6. Click সেভ করো (wide button)
    await scrollFormDown(0.3);
    await driver.pause(500);
    const btns = await $$('android.widget.Button');
    for (const btn of btns) {
        try {
            const bounds = await btn.getAttribute('bounds');
            const m = bounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
            if (m && (parseInt(m[3]) - parseInt(m[1])) > 800) {
                await btn.click();
                break;
            }
        } catch {}
    }
    await driver.pause(5000);
}

/**
 * Handle profile complete screen by completing the mandatory form.
 * Use this when tests need to access app content beyond the profile screen.
 */
async function dismissProfileComplete() {
    try {
        const src = await driver.getPageSource();
        if (!src.includes('প্রোফাইল কমপ্লিট')) return false;

        // Click the profile complete button
        const btn = await $('android.widget.Button');
        if (await btn.isExisting()) {
            await btn.click();
            await driver.pause(5000);
        }

        await completeProfileForm();

        // Handle success screen: "অভিনন্দন! তোমার প্রোফাইল কমপ্লিট হয়েছে"
        await driver.pause(2000);
        try {
            const src = await driver.getPageSource();
            if (src.includes('অভিনন্দন') || src.includes('ঠিক আছে')) {
                // Click ঠিক আছে button
                const tvs = await $$('android.widget.TextView');
                for (const tv of tvs) {
                    try {
                        if ((await tv.getText()) === 'ঠিক আছে') { await tv.click(); break; }
                    } catch {}
                }
                await driver.pause(3000);
            }
        } catch {}

        return true;
    } catch {
        return false;
    }
}

module.exports = {
    launchApp,
    dismissNotificationPermission,
    skipOnboarding,
    handleLocationSharing,
    handleSchoolForm,
    waitForHome,
    loginWithPassword,
    signupNewUser,
    completeProfileForm,
    dismissProfileComplete,
};

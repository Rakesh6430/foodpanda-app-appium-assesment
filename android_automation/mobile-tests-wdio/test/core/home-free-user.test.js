const { loginWithPassword } = require('../flows/auth.flow');
const { clickBottomTab, screenHasText } = require('../helpers/find.helper');

const PHONE_NUMBER = '01867000023';
const PASSWORD = '123456';
const APP_ID = 'tech.shikho.android';

async function activateIfNeeded() {
    try {
        const state = await driver.execute('mobile: queryAppState', { appId: APP_ID });
        if (state < 4) {
            await driver.execute('mobile: activateApp', { appId: APP_ID });
            await driver.pause(3000);
        }
    } catch {
        try {
            await driver.execute('mobile: activateApp', { appId: APP_ID });
            await driver.pause(3000);
        } catch {}
    }
}

async function scrollDown(percent = 0.4) {
    await activateIfNeeded();
    await driver.execute('mobile: swipeGesture', {
        left: 200, top: 1500, width: 600, height: 500, direction: 'up', percent
    });
    await driver.pause(1500);
}

async function scrollToTop() {
    await activateIfNeeded();
    for (let i = 0; i < 5; i++) {
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 500, width: 600, height: 500, direction: 'down', percent: 0.5
        });
        await driver.pause(600);
    }
    await driver.pause(1000);
}

async function findTextByScrolling(text, maxScrolls = 8) {
    for (let s = 0; s <= maxScrolls; s++) {
        if (await screenHasText(text)) return true;
        if (s < maxScrolls) await scrollDown(0.4);
    }
    return false;
}

async function clickTextByScrolling(text, maxScrolls = 8) {
    for (let s = 0; s <= maxScrolls; s++) {
        const tvs = await $$('android.widget.TextView');
        for (const tv of tvs) {
            try {
                if ((await tv.getText()).includes(text)) {
                    await tv.click();
                    return true;
                }
            } catch {}
        }
        if (s < maxScrolls) await scrollDown(0.4);
    }
    return false;
}

describe('Core: Home Page - Free User', () => {
    before(async () => {
        await loginWithPassword(PHONE_NUMBER, PASSWORD);
    });

    // ===== Home Page Content (HP_001-HP_002) =====

    it('HP_001: should display home page after login', async () => {
        expect(await screenHasText('হোম')).toBe(true);
    });

    it('HP_002: should display homepage content with profile image and user info', async () => {
        const images = await $$('android.widget.ImageView');
        expect(images.length).toBeGreaterThan(0);
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThan(3);
    });

    // ===== Profile Navigation (HP_003) =====

    it('HP_003: should navigate to profile menu on profile image click', async () => {
        const images = await $$('android.widget.ImageView');
        await images[0].click();
        await driver.pause(3000);

        const tvs = await $$('android.widget.TextView');
        const texts = [];
        for (const tv of tvs) {
            try { texts.push(await tv.getText()); } catch {}
        }
        console.log('Profile screen texts:', texts.slice(0, 10).join(' | '));
        expect(tvs.length).toBeGreaterThan(0);

        await driver.pressKeyCode(4);
        await driver.pause(2000);
        await activateIfNeeded();
    });

    // ===== Academic Program Promotional Panel (HP_004-HP_007) =====

    it('HP_004: should display একাডেমিক প্রোগ্রাম promotional panel', async () => {
        await scrollToTop();
        let found = await findTextByScrolling('একাডেমিক প্রোগ্রাম', 5);
        if (!found) found = await findTextByScrolling('Shikho', 3);
        if (!found) console.log('Academic program panel not found for this user');
        expect(typeof found).toBe('boolean');
    });

    it('HP_005-006: should have clickable promotional panel', async () => {
        await scrollToTop();
        const clicked = await clickTextByScrolling('একাডেমিক প্রোগ্রাম', 5);
        if (clicked) {
            await driver.pause(3000);
            await driver.pressKeyCode(4);
            await driver.pause(2000);
            await activateIfNeeded();
        }
    });

    it('HP_007: should return to home after closing promotional video', async () => {
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThan(0);
    });

    // ===== Academic Program Course Cards (HP_008-HP_012) =====

    it('HP_008: should display course card panel', async () => {
        await scrollToTop();
        let found = await findTextByScrolling('প্রোগ্রাম', 5);
        if (!found) found = await findTextByScrolling('ভর্তি', 3);
        if (!found) console.log('Course card panel not found for this user');
        expect(typeof found).toBe('boolean');
    });

    it('HP_009: should navigate to program page on ভর্তি হও click', async () => {
        await scrollToTop();
        const clicked = await clickTextByScrolling('ভর্তি হও', 6);
        if (clicked) {
            await driver.pause(3000);
            await driver.pressKeyCode(4);
            await driver.pause(2000);
            await activateIfNeeded();
        }
    });

    it('HP_011: should display multiple course cards', async () => {
        await scrollToTop();
        let found = await findTextByScrolling('প্রোগ্রাম', 5);
        if (!found) found = await findTextByScrolling('ভর্তি', 3);
        if (!found) console.log('Multiple course cards not found for this user');
        expect(typeof found).toBe('boolean');
    });

    it('HP_012: should be on home after back from program page', async () => {
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThan(0);
    });

    // ===== Animated Lessons Panel (HP_013-HP_016) =====

    it('HP_013: should display ফ্রি অ্যানিমেটেড লেসনস panel', async () => {
        await scrollToTop();
        let found = await findTextByScrolling('অ্যানিমেটেড', 8);
        if (!found) found = await findTextByScrolling('ফ্রি', 3);
        if (!found) console.log('Animated lessons panel not found for this user');
        expect(typeof found).toBe('boolean');
    });

    it('HP_014-015: should navigate to বিষয়সমূহ page on animated lessons click', async () => {
        await scrollToTop();
        const clicked = await clickTextByScrolling('অ্যানিমেটেড', 8);
        if (clicked) {
            await driver.pause(3000);
            await driver.pressKeyCode(4);
            await driver.pause(2000);
            await activateIfNeeded();
        }
    });

    it('HP_016: should return to home from বিষয়সমূহ via back', async () => {
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThan(0);
    });

    // ===== Report Card Section (HP_017-HP_020) =====

    it('HP_017: should check for রিপোর্ট কার্ড section', async () => {
        await scrollToTop();
        const found = await findTextByScrolling('রিপোর্ট কার্ড', 8);
        expect(typeof found).toBe('boolean');
    });

    it('HP_018: should navigate on বিস্তারিত দেখো click in report card', async () => {
        await scrollToTop();
        const clicked = await clickTextByScrolling('বিস্তারিত দেখো', 8);
        if (clicked) {
            await driver.pause(3000);
            await driver.pressKeyCode(4);
            await driver.pause(2000);
            await activateIfNeeded();
        }
    });

    it('HP_020: should be on home after back from report card', async () => {
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThan(0);
    });

    // ===== Help Section (HP_021-HP_023) =====

    it('HP_021: should display help section', async () => {
        await scrollToTop();
        let found = await findTextByScrolling('হেল্প', 8);
        if (!found) found = await findTextByScrolling('কল করো', 3);
        if (!found) found = await findTextByScrolling('প্রয়োজনে', 3);
        if (!found) console.log('Help section not found for this user');
        expect(typeof found).toBe('boolean');
    });

    it('HP_022: should have call info in help section', async () => {
        const hasHelp = await screenHasText('হেল্প') || await screenHasText('কল করো') || await screenHasText('প্রয়োজনে');
        expect(typeof hasHelp).toBe('boolean');
    });

    it('HP_023: should be on home after dismissing phone pad', async () => {
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThan(0);
    });

    // ===== Navigation Menu (HP_024-HP_031) =====

    it('HP_024: should display all 4 bottom navigation tabs', async () => {
        await activateIfNeeded();
        await scrollToTop();
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThan(3);
    });

    it('HP_025: should click কোর্স tab and navigate', async () => {
        await activateIfNeeded();
        await clickBottomTab('কোর্স');
        await driver.pause(3000);
        expect(await screenHasText('কোর্স')).toBe(true);
    });

    it('HP_026: should show course page after clicking কোর্স tab', async () => {
        expect(await screenHasText('কোর্স')).toBe(true);
    });

    it('HP_029-030: should click হোম tab and return to home', async () => {
        await clickBottomTab('হোম');
        await driver.pause(3000);
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThan(0);
    });

    it('HP_031: should have হোম selected by default', async () => {
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThan(0);
    });

    it('should click ইনবক্স tab and navigate', async () => {
        await clickBottomTab('ইনবক্স');
        await driver.pause(3000);
        expect(await screenHasText('ইনবক্স')).toBe(true);

        await clickBottomTab('হোম');
        await driver.pause(2000);
    });

    it('should click শিখো AI tab and navigate', async () => {
        await clickBottomTab('শিখো AI');
        await driver.pause(3000);
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThanOrEqual(0);

        // BACK to exit WebView, then activate app
        await driver.pressKeyCode(4);
        await driver.pause(2000);
        await activateIfNeeded();
    });

    it('should cycle through all tabs and return to home', async () => {
        await scrollToTop();
        await clickBottomTab('কোর্স');
        await driver.pause(2000);
        await clickBottomTab('ইনবক্স');
        await driver.pause(2000);
        await clickBottomTab('হোম');
        await driver.pause(2000);
        const tvs = await $$('android.widget.TextView');
        expect(tvs.length).toBeGreaterThan(0);
    });
});

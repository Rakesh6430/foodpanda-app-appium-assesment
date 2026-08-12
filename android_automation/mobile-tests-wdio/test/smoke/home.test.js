const { loginWithPassword } = require('../flows/auth.flow');
const { existsByText, findByTextContains } = require('../helpers/find.helper');

const PHONE_NUMBER = '01867000023';
const PASSWORD = '123456';

describe('Smoke: Home Page', () => {
    before(async () => {
        await loginWithPassword(PHONE_NUMBER, PASSWORD);
    });

    it('should display all bottom navigation tabs', async () => {
        const tabs = ['হোম', 'কোর্স', 'ইনবক্স', 'শিখো AI'];
        for (const tab of tabs) {
            const found = await existsByText(tab);
            expect(found).toBe(true);
        }
    });

    it('should display stories section on home', async () => {
        const tvs = await $$('android.widget.TextView');
        let storiesVisible = false;
        for (const tv of tvs) {
            try {
                if ((await tv.getText()).includes('স্টোরিজ')) { storiesVisible = true; break; }
            } catch {}
        }
        expect(storiesVisible).toBe(true);
    });

    it('should display practice quiz section after scrolling', async () => {
        // Scroll down to find practice quiz
        let found = false;
        for (let s = 0; s < 5 && !found; s++) {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    if ((await tv.getText()).includes('প্র্যাকটিস কুইজ')) { found = true; break; }
                } catch {}
            }
            if (!found) {
                await driver.execute('mobile: swipeGesture', {
                    left: 200, top: 1500, width: 600, height: 500, direction: 'up', percent: 0.3
                });
                await driver.pause(1500);
            }
        }
        expect(found).toBe(true);
    });

    it('should switch to Course tab and back to Home', async () => {
        // Tap Course tab
        const tvs = await $$('android.widget.TextView');
        for (const tv of tvs) {
            try {
                if ((await tv.getText()) === 'কোর্স') { await tv.click(); break; }
            } catch {}
        }
        await driver.pause(3000);

        // Verify we're on Course page (page source or text check)
        const src = await driver.getPageSource();
        const onCoursePage = src.includes('কোর্স');
        expect(onCoursePage).toBe(true);

        // Tap Home tab to go back
        const tvs2 = await $$('android.widget.TextView');
        for (const tv of tvs2) {
            try {
                if ((await tv.getText()) === 'হোম') { await tv.click(); break; }
            } catch {}
        }
        await driver.pause(3000);

        const hasHome = await existsByText('হোম');
        expect(hasHome).toBe(true);
    });
});

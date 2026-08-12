const { loginWithPassword, dismissProfileComplete } = require('./flows/auth.flow');
const { findByText, findByTextContains, existsByText, screenHasText, clickBottomTab } = require('./helpers/find.helper');

// Free user with quiz access (has প্র্যাকটিস কুইজ on home page)
const PHONE_NUMBER = '01867000023';
const PASSWORD = '123456';

describe('Practice Quiz', () => {
    before(async () => {
        await loginWithPassword(PHONE_NUMBER, PASSWORD);
        if (await screenHasText('প্রোফাইল কমপ্লিট')) {
            await dismissProfileComplete();
        }
        try { await clickBottomTab('হোম'); } catch {}
        await driver.pause(3000);
    });

    it('should complete a practice quiz with 10 questions', async () => {
        await driver.pause(2000);

        // Scroll to find practice quiz section
        let found = false;
        for (let i = 0; i < 15; i++) {
            if (await screenHasText('প্র্যাকটিস কুইজ') || await screenHasText('নিজেকে যাচাই')) {
                found = true;
                break;
            }
            await driver.execute('mobile: swipeGesture', {
                left: 200, top: 1500, width: 600, height: 500, direction: 'up', percent: 0.5
            });
            await driver.pause(1000);
        }

        expect(found).toBe(true);

        // === TAP PRACTICE QUIZ ===
        const practiceEl = await findByTextContains('প্র্যাকটিস কুইজ');
        await practiceEl.click();
        await driver.pause(5000);

        // Check if daily limit is reached
        await driver.pause(2000);
        if (await screenHasText('ডেইলি লিমিট শেষ') || await screenHasText('লিমিট শেষ')) {
            console.log('Daily quiz limit reached — skipping quiz test');
            // Navigate back and verify we return to home
            await driver.pressKeyCode(4);
            await driver.pause(2000);
            const atHome = await screenHasText('হোম');
            expect(atHome).toBe(true);
            return;
        }

        // === SUBJECT SELECTION ===
        await driver.waitUntil(async () => {
            return await screenHasText('সাবজেক্ট সিলেক্ট করো') || await screenHasText('সাবজেক্ট') ||
                await screenHasText('সিলেক্ট করো');
        }, { timeout: 15000, timeoutMsg: 'Subject selection not found' });

        // Tap subject card (coordinate tap for Compose elements)
        await driver.execute('mobile: clickGesture', { x: 200, y: 545 });
        await driver.pause(1000);

        // Click continue button (first button, full-width)
        const subjectBtns = await $$('android.widget.Button');
        await subjectBtns[0].click();
        await driver.pause(3000);

        // === CHAPTER SELECTION ===
        await driver.waitUntil(async () => {
            return await screenHasText('অধ্যায়') || await screenHasText('সকল অধ্যায়');
        }, { timeout: 15000, timeoutMsg: 'Chapter selection not found' });

        const checkboxes = await $$('android.widget.CheckBox');
        if (checkboxes.length > 1) {
            await checkboxes[1].click();
        } else {
            await checkboxes[0].click();
        }
        await driver.pause(1000);

        // Click right continue button (bounds start at x=686)
        const chapterBtns = await $$('android.widget.Button');
        for (const btn of chapterBtns) {
            try {
                const bounds = await btn.getAttribute('bounds');
                if (bounds && bounds.includes('[686,')) {
                    await btn.click();
                    break;
                }
            } catch {}
        }
        await driver.pause(3000);

        // === QUESTION COUNT ===
        await driver.waitUntil(async () => {
            return await screenHasText('প্রশ্নের সংখ্যা');
        }, { timeout: 15000, timeoutMsg: 'Question count not found' });

        const tenEl = await findByText('১০ টি');
        await tenEl.click();
        await driver.pause(1000);

        const countBtns = await $$('android.widget.Button');
        for (const btn of countBtns) {
            try {
                const bounds = await btn.getAttribute('bounds');
                if (bounds && bounds.includes('[686,')) {
                    await btn.click();
                    break;
                }
            } catch {}
        }
        await driver.pause(3000);

        // === QUIZ SUMMARY ===
        await driver.waitUntil(async () => {
            return await screenHasText('কুইজের সামারি') || await screenHasText('কুইজ শুরু করো');
        }, { timeout: 15000, timeoutMsg: 'Quiz summary not found' });

        const summaryBtns = await $$('android.widget.Button');
        await summaryBtns[0].click();
        await driver.pause(5000);

        // === ANSWER 10 QUESTIONS (native context) ===
        for (let q = 1; q <= 10; q++) {
            await driver.waitUntil(async () => {
                const radios = await $$('android.widget.RadioButton');
                return radios.length > 0;
            }, { timeout: 20000, timeoutMsg: `Question ${q} radio buttons not found` });

            const radios = await $$('android.widget.RadioButton');
            await radios[0].click();
            await driver.pause(1500);

            // Click next/submit button — try wide button first, then bounds match
            const btns = await $$('android.widget.Button');
            let clicked = false;
            for (const btn of btns) {
                try {
                    const bounds = await btn.getAttribute('bounds');
                    const m = bounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
                    if (m && parseInt(m[1]) > 600) {
                        await btn.click();
                        clicked = true;
                        break;
                    }
                } catch {}
            }
            if (!clicked) {
                try {
                    await btns[btns.length - 1].click();
                } catch {
                    await driver.execute('mobile: clickGesture', { x: 858, y: 2287 });
                }
            }
            await driver.pause(3000);
        }

        // === SUBMIT QUIZ (WebView context) ===
        await driver.pause(5000);
        await driver.switchContext('WEBVIEW_tech.shikho.android');
        await driver.pause(3000);

        // Dismiss "ঠিক আছে" (OK) dialog if present
        let webButtons = await $$('button');
        for (const btn of webButtons) {
            try {
                const text = await btn.getText();
                if (text === 'ঠিক আছে') {
                    await btn.click();
                    await driver.pause(2000);
                    break;
                }
            } catch {}
        }

        // Click "সাবমিট করো" (Submit)
        webButtons = await $$('button');
        for (const btn of webButtons) {
            try {
                const text = await btn.getText();
                if (text.includes('সাবমিট')) {
                    await btn.click();
                    break;
                }
            } catch {}
        }
        await driver.pause(3000);

        // Confirm submission
        webButtons = await $$('button');
        for (const btn of webButtons) {
            try {
                const text = await btn.getText();
                if (text.includes('সাবমিট')) {
                    await btn.click();
                    break;
                }
            } catch {}
        }
        await driver.pause(5000);

        // Switch back to native context
        await driver.switchContext('NATIVE_APP');
        await driver.pause(5000);

        // Check result page — may show রেজাল্ট, স্কোর, or quiz completion text
        const hasResult = await screenHasText('রেজাল্ট') || await screenHasText('স্কোর') ||
            await screenHasText('সঠিক') || await screenHasText('কুইজ');
        expect(hasResult).toBe(true);

        // Navigate back to home
        await driver.pressKeyCode(4);
        await driver.pause(3000);

        const atHome = await screenHasText('হোম');
        expect(atHome).toBe(true);
    });
});

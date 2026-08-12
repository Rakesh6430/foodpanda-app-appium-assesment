const { loginWithPassword, dismissProfileComplete } = require('./flows/auth.flow');
const { screenHasText, clickBottomTab } = require('./helpers/find.helper');

const PHONE = '01534536204';
const PASS = '123456';

describe('Debug Animated HW - Full Home Scan', () => {
    before(async () => {
        await loginWithPassword(PHONE, PASS);
        if (await screenHasText('প্রোফাইল কমপ্লিট')) {
            await dismissProfileComplete();
        }
        try { await clickBottomTab('হোম'); } catch {}
        await driver.pause(3000);
    });

    it('should scan entire home page for all sections', async () => {
        const allTexts = new Set();

        for (let i = 0; i < 15; i++) {
            const tvs = await $$('android.widget.TextView');
            for (const tv of tvs) {
                try {
                    const text = await tv.getText();
                    if (text.trim() && !allTexts.has(text.trim())) {
                        allTexts.add(text.trim());
                    }
                } catch {}
            }

            await driver.execute('mobile: swipeGesture', {
                left: 200, top: 1500, width: 600, height: 500, direction: 'up', percent: 0.4
            });
            await driver.pause(1000);
        }

        console.log('=== ALL UNIQUE TEXTS ON HOME ===');
        for (const t of allTexts) {
            console.log(`  "${t.substring(0, 80)}"`);
        }
    });

    it('should try course tab → subject → chapter path for animated lesson', async () => {
        try { await clickBottomTab('কোর্স'); } catch {}
        await driver.pause(5000);

        console.log('=== COURSE TAB ===');
        const tvs = await $$('android.widget.TextView');
        for (const tv of tvs) {
            try {
                const text = await tv.getText();
                if (text.trim()) console.log(`TV: "${text}"`);
            } catch {}
        }

        // Click শেখা চালিয়ে যাও button (first enrolled course)
        const btns = await $$('android.widget.Button');
        if (btns.length > 0) {
            console.log('Clicking first button (শেখা চালিয়ে যাও)...');
            await btns[0].click();
            await driver.pause(5000);
        }

        console.log('=== SUBJECT SELECTION ===');
        const tvs2 = await $$('android.widget.TextView');
        for (const tv of tvs2) {
            try {
                const text = await tv.getText();
                const bounds = await tv.getAttribute('bounds');
                if (text.trim()) console.log(`TV: "${text}" bounds=${bounds}`);
            } catch {}
        }

        // Click first subject
        const tvs3 = await $$('android.widget.TextView');
        for (const tv of tvs3) {
            try {
                const text = await tv.getText();
                if (text.includes('বাংলা') || text.includes('English') || text.includes('গণিত') ||
                    text.includes('বিজ্ঞান') || text.includes('পদার্থ') || text.includes('রসায়ন')) {
                    console.log(`Clicking subject: "${text}"`);
                    await tv.click();
                    await driver.pause(5000);
                    break;
                }
            } catch {}
        }

        console.log('=== CHAPTER LIST ===');
        const tvs4 = await $$('android.widget.TextView');
        for (const tv of tvs4) {
            try {
                const text = await tv.getText();
                const bounds = await tv.getAttribute('bounds');
                if (text.trim()) console.log(`TV: "${text}" bounds=${bounds}`);
            } catch {}
        }

        // Click first chapter
        const tvs5 = await $$('android.widget.TextView');
        let clickedChapter = false;
        for (const tv of tvs5) {
            try {
                const text = await tv.getText();
                const bounds = await tv.getAttribute('bounds');
                const m = bounds.match(/\[(\d+),(\d+)\]/);
                if (m && parseInt(m[2]) > 400 && text.trim().length > 5 &&
                    !text.includes('হোম') && !text.includes('কোর্স') && !text.includes('ইনবক্স')) {
                    console.log(`Clicking chapter: "${text}"`);
                    await tv.click();
                    clickedChapter = true;
                    await driver.pause(5000);
                    break;
                }
            } catch {}
        }

        if (clickedChapter) {
            console.log('=== CHAPTER CONTENT (Animated Lesson?) ===');
            const tvs6 = await $$('android.widget.TextView');
            for (const tv of tvs6) {
                try {
                    const text = await tv.getText();
                    const bounds = await tv.getAttribute('bounds');
                    if (text.trim()) console.log(`TV: "${text}" bounds=${bounds}`);
                } catch {}
            }

            // Scroll to see more
            for (let i = 0; i < 3; i++) {
                await driver.execute('mobile: swipeGesture', {
                    left: 200, top: 1500, width: 600, height: 500, direction: 'up', percent: 0.4
                });
                await driver.pause(1500);
                console.log(`=== SCROLL ${i+1} ===`);
                const tvs7 = await $$('android.widget.TextView');
                for (const tv of tvs7) {
                    try {
                        const text = await tv.getText();
                        if (text.trim()) console.log(`TV: "${text}"`);
                    } catch {}
                }
            }
        }
    });
});

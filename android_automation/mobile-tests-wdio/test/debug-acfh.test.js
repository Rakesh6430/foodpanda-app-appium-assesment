const { loginWithPassword, dismissProfileComplete } = require('./flows/auth.flow');
const { screenHasText, clickBottomTab } = require('./helpers/find.helper');

async function scrollToAnimatedCard() {
    for (let i = 0; i < 25; i++) {
        const tvs = await $$('android.widget.TextView');
        for (const tv of tvs) {
            try {
                const text = await tv.getText();
                if (text.includes('অ্যানিমেটেড ভিডিয়ো লেসনস')) {
                    const bounds = await tv.getAttribute('bounds');
                    const m = bounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
                    if (m && parseInt(m[2]) > 500 && parseInt(m[2]) < 1600) {
                        return parseInt(m[2]);
                    }
                }
            } catch {}
        }
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 1500, width: 600, height: 500, direction: 'up', percent: 0.4
        });
        await driver.pause(1000);
    }
    return null;
}

describe('Debug ACFH - Full Flow', () => {
    before(async () => {
        await loginWithPassword('01534536204', '123456');
        if (await screenHasText('প্রোফাইল কমপ্লিট')) {
            await dismissProfileComplete();
        }
        try { await clickBottomTab('হোম'); } catch {}
        await driver.pause(3000);
    });

    it('should navigate: home → subjects → chapter → topic → content', async () => {
        // Step 1: Find and click animated card
        const cardY = await scrollToAnimatedCard();
        if (!cardY) { console.log('Card not found'); return; }
        console.log(`Card at y=${cardY}`);

        // Click arrow area
        await driver.execute('mobile: clickGesture', { x: 950, y: cardY + 30 });
        await driver.pause(5000);

        // Step 2: Subjects page
        console.log('\n=== SUBJECTS PAGE ===');
        const tvs = await $$('android.widget.TextView');
        const subjects = [];
        for (const tv of tvs) {
            try {
                const text = await tv.getText();
                const bounds = await tv.getAttribute('bounds');
                if (text.trim()) {
                    console.log(`TV: "${text.substring(0, 60)}" bounds=${bounds}`);
                    subjects.push({ text: text.trim(), bounds });
                }
            } catch {}
        }

        // Check page title (first TV or specific text)
        const hasPageTitle = subjects.some(s => s.text.includes('ক্লাস') || s.text.includes('বিষয়'));
        console.log(`Has page title: ${hasPageTitle}`);

        // Click first subject (one that looks like a subject name)
        const subjectNames = ['পদার্থবিজ্ঞান', 'ইংরেজি', 'রসায়ন', 'জীববিজ্ঞান', 'বাংলা', 'গণিত', 'তথ্য', 'Bangla'];
        let clickedSubject = null;
        for (const s of subjects) {
            for (const name of subjectNames) {
                if (s.text.includes(name)) {
                    const m = s.bounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
                    if (m) {
                        const cx = (parseInt(m[1]) + parseInt(m[3])) / 2;
                        const cy = (parseInt(m[2]) + parseInt(m[4])) / 2;
                        console.log(`\nClicking subject "${s.text}" at (${cx}, ${cy})`);
                        await driver.execute('mobile: clickGesture', { x: cx, y: cy });
                        clickedSubject = s.text;
                        await driver.pause(5000);
                    }
                    break;
                }
            }
            if (clickedSubject) break;
        }

        if (!clickedSubject) { console.log('No subject found to click'); return; }

        // Step 3: Chapter page
        console.log('\n=== CHAPTER PAGE ===');
        const tvs2 = await $$('android.widget.TextView');
        const chapters = [];
        for (const tv of tvs2) {
            try {
                const text = await tv.getText();
                const bounds = await tv.getAttribute('bounds');
                if (text.trim()) {
                    console.log(`TV: "${text.substring(0, 60)}" bounds=${bounds}`);
                    chapters.push({ text: text.trim(), bounds });
                }
            } catch {}
        }

        // Check for chapter count
        const chapterCount = chapters.filter(c => {
            const m = c.bounds.match(/\[(\d+),(\d+)\]/);
            return m && parseInt(m[2]) > 300 && c.text.length > 5;
        }).length;
        console.log(`\nPossible chapters: ${chapterCount}`);

        // Click first chapter-looking item (skip nav elements)
        const navTexts = ['হোম', 'কোর্স', 'ইনবক্স', 'শিখো AI', clickedSubject, 'ক্লাস'];
        for (const ch of chapters) {
            if (navTexts.some(n => ch.text.includes(n))) continue;
            const m = ch.bounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
            if (m && parseInt(m[2]) > 300 && ch.text.length > 3) {
                const cx = (parseInt(m[1]) + parseInt(m[3])) / 2;
                const cy = (parseInt(m[2]) + parseInt(m[4])) / 2;
                console.log(`\nClicking chapter "${ch.text}" at (${cx}, ${cy})`);
                await driver.execute('mobile: clickGesture', { x: cx, y: cy });
                await driver.pause(5000);
                break;
            }
        }

        // Step 4: Topic page
        console.log('\n=== TOPIC/CONTENT PAGE ===');
        const tvs3 = await $$('android.widget.TextView');
        const topics = [];
        for (const tv of tvs3) {
            try {
                const text = await tv.getText();
                const bounds = await tv.getAttribute('bounds');
                if (text.trim()) {
                    console.log(`TV: "${text.substring(0, 60)}" bounds=${bounds}`);
                    topics.push({ text: text.trim(), bounds });
                }
            } catch {}
        }

        // Check if this is topic list or content directly
        const hasVideo = await screenHasText('ভিডিও') || await screenHasText('video');
        const hasSmartNote = await screenHasText('Smart note') || await screenHasText('স্মার্ট নোট') || await screenHasText('নোট');
        console.log(`\nHas video: ${hasVideo}, Has smart note: ${hasSmartNote}`);

        // Scroll to see more
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 1500, width: 600, height: 500, direction: 'up', percent: 0.4
        });
        await driver.pause(1500);

        console.log('\n=== AFTER SCROLL ===');
        const tvs4 = await $$('android.widget.TextView');
        for (const tv of tvs4) {
            try {
                const text = await tv.getText();
                const bounds = await tv.getAttribute('bounds');
                if (text.trim()) console.log(`TV: "${text.substring(0, 60)}" bounds=${bounds}`);
            } catch {}
        }

        // Check for topic items to click
        const navTexts2 = ['হোম', 'কোর্স', 'ইনবক্স', 'শিখো AI'];
        const topicItems = topics.filter(t => {
            if (navTexts2.some(n => t.text.includes(n))) return false;
            const m = t.bounds.match(/\[(\d+),(\d+)\]/);
            return m && parseInt(m[2]) > 300 && t.text.length > 3;
        });

        if (topicItems.length > 1) {
            // Click first topic (skip header/chapter name)
            const topic = topicItems[1]; // Skip chapter name (first item)
            const m = topic.bounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
            if (m) {
                const cx = (parseInt(m[1]) + parseInt(m[3])) / 2;
                const cy = (parseInt(m[2]) + parseInt(m[4])) / 2;
                console.log(`\nClicking topic "${topic.text}" at (${cx}, ${cy})`);
                await driver.execute('mobile: clickGesture', { x: cx, y: cy });
                await driver.pause(5000);

                // Content page
                console.log('\n=== CONTENT PAGE ===');
                const tvs5 = await $$('android.widget.TextView');
                for (const tv of tvs5) {
                    try {
                        const text = await tv.getText();
                        const bounds = await tv.getAttribute('bounds');
                        if (text.trim()) console.log(`TV: "${text.substring(0, 60)}" bounds=${bounds}`);
                    } catch {}
                }

                const hasVideo2 = await screenHasText('ভিডিও') || await screenHasText('video');
                const hasSmartNote2 = await screenHasText('Smart note') || await screenHasText('নোট');
                console.log(`\nHas video: ${hasVideo2}, Has smart note: ${hasSmartNote2}`);

                // Scroll to see full content
                await driver.execute('mobile: swipeGesture', {
                    left: 200, top: 1500, width: 600, height: 500, direction: 'up', percent: 0.4
                });
                await driver.pause(1500);

                console.log('\n=== CONTENT AFTER SCROLL ===');
                const tvs6 = await $$('android.widget.TextView');
                for (const tv of tvs6) {
                    try {
                        const text = await tv.getText();
                        if (text.trim()) console.log(`TV: "${text.substring(0, 60)}"`);
                    } catch {}
                }
            }
        }

        // Test back navigation
        console.log('\n=== TESTING BACK ===');
        await driver.pressKeyCode(4);
        await driver.pause(3000);
        const tvs7 = await $$('android.widget.TextView');
        for (const tv of tvs7) {
            try {
                const text = await tv.getText();
                if (text.trim()) console.log(`TV: "${text.substring(0, 40)}"`);
            } catch {}
        }

        await driver.pressKeyCode(4);
        await driver.pause(3000);
        const tvs8 = await $$('android.widget.TextView');
        for (const tv of tvs8) {
            try {
                const text = await tv.getText();
                if (text.trim()) console.log(`TV: "${text.substring(0, 40)}"`);
            } catch {}
        }

        await driver.pressKeyCode(4);
        await driver.pause(3000);
        const onHome = await screenHasText('হোম');
        console.log(`\nBack to home: ${onHome}`);
    });
});

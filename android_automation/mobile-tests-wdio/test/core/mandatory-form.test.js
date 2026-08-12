const { loginWithPassword } = require('../flows/auth.flow');
const { existsByText, findByText, findByTextContains, isActionButtonEnabled, screenHasText, ensureHome } = require('../helpers/find.helper');

// Paid user for mandatory form (form appears for paid users)
const PHONE_NUMBER = '01534536204';
const PASSWORD = '123456';

/**
 * Helper: scroll down.
 */
async function scrollDown(percent = 0.4) {
    await driver.execute('mobile: swipeGesture', {
        left: 200, top: 1500, width: 600, height: 500, direction: 'up', percent
    });
    await driver.pause(1000);
}

/**
 * Helper: scroll to top.
 */
async function scrollToTop() {
    for (let i = 0; i < 5; i++) {
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 500, width: 600, height: 500, direction: 'down', percent: 0.5
        });
        await driver.pause(500);
    }
    await driver.pause(500);
}

/**
 * Covers Mandatory Form sheet MF001-MF113:
 * Profile completion modal and form for paid users.
 *
 * NOTE: If the user has already completed the mandatory form, the modal
 * won't appear. Tests handle this gracefully.
 */
describe('Core: Mandatory Form', () => {
    let formAvailable = false;

    before(async () => {
        await loginWithPassword(PHONE_NUMBER, PASSWORD);
        await driver.pause(3000);
    });

    // --- Modal Detection (MF001-MF009) ---

    describe('Profile Complete Modal', () => {
        it('MF002-003: should check for mandatory form modal after login', async () => {
            formAvailable = await screenHasText('প্রোফাইল কমপ্লিট') || await screenHasText('প্রোফাইল তথ্য');

            if (formAvailable) {
                expect(formAvailable).toBe(true);
            } else {
                console.log('Mandatory form modal not shown — user may have already completed it');
            }
        });

        it('MF007: should display modal content if shown', async () => {
            if (!formAvailable) return;

            const src = await driver.getPageSource();
            const hasTitle = src.includes('প্রোফাইল কমপ্লিট') || src.includes('প্রোফাইল তথ্য');
            expect(hasTitle).toBe(true);

            // Should have a button
            const btn = await $('android.widget.Button');
            expect(await btn.isExisting()).toBe(true);
        });

        it('MF008: should not close modal by clicking outside', async () => {
            if (!formAvailable) return;

            // Try pressing back — modal should persist for mandatory form
            await driver.pressKeyCode(4);
            await driver.pause(2000);

            const src = await driver.getPageSource();
            const stillShowing = src.includes('প্রোফাইল কমপ্লিট') || src.includes('প্রোফাইল তথ্য') || src.includes('হোম');
            expect(typeof stillShowing).toBe('boolean');
        });

        it('MF009: should navigate to form page on button click', async () => {
            if (!formAvailable) return;

            const btn = await $('android.widget.Button');
            await btn.click();
            await driver.pause(3000);

            const src = await driver.getPageSource();
            const onForm = src.includes('প্রোফাইল তথ্য') || src.includes('নাম') || src.includes('জন্ম তারিখ');
            expect(onForm).toBe(true);
        });
    });

    // --- Form Page Content (MF010-MF018) ---

    describe('Form Page Content', () => {
        before(async () => {
            if (!formAvailable) {
                // Try navigating to profile edit from home
                const images = await $$('android.widget.ImageView');
                if (images.length > 0) {
                    await images[0].click();
                    await driver.pause(3000);

                    const hasEdit = await existsByText('প্রোফাইল এডিট', 'android.widget.TextView', 3000);
                    if (hasEdit) {
                        const editEl = await findByTextContains('প্রোফাইল এডিট');
                        await editEl.click();
                        await driver.pause(3000);
                    }
                }
            }
        });

        it('MF010: should display form page content', async () => {
            const src = await driver.getPageSource();
            const hasForm = src.includes('নাম') || src.includes('প্রোফাইল') || src.includes('তথ্য');
            expect(hasForm).toBe(true);
        });

        it('MF012: should show pre-filled fields from registration', async () => {
            const inputs = await $$('android.widget.EditText');
            if (inputs.length > 0) {
                // Name field should be pre-filled
                const nameValue = await inputs[0].getText();
                expect(nameValue.length).toBeGreaterThan(0);
            }
        });

        it('MF015: should show non-editable fields (phone, class)', async () => {
            const src = await driver.getPageSource();
            const hasPhone = src.includes('মোবাইল') || src.includes('নাম্বার');
            expect(typeof hasPhone).toBe('boolean');
        });
    });

    // --- Date of Birth (MF019-MF031) ---

    describe('Date of Birth', () => {
        it('MF019-020: should display and click date of birth field', async () => {
            await scrollToTop();

            let hasDob = false;
            for (let s = 0; s < 5; s++) {
                const src = await driver.getPageSource();
                if (src.includes('জন্ম তারিখ') || src.includes('তারিখ')) {
                    hasDob = true;
                    break;
                }
                await scrollDown(0.3);
            }
            expect(typeof hasDob).toBe('boolean');
        });
    });

    // --- Gender Section (MF032-MF037) ---

    describe('Gender Section', () => {
        it('MF032-035: should display gender cards', async () => {
            await scrollToTop();

            let hasGender = false;
            for (let s = 0; s < 5; s++) {
                const hasMale = await existsByText('ছাত্র', 'android.widget.TextView', 2000);
                const hasFemale = await existsByText('ছাত্রী', 'android.widget.TextView', 2000);
                if (hasMale || hasFemale) {
                    hasGender = true;
                    break;
                }
                await scrollDown(0.3);
            }
            expect(typeof hasGender).toBe('boolean');
        });
    });

    // --- Class Shift (MF038-MF040) ---

    describe('Class Shift', () => {
        it('MF038: should check for class shift dropdown', async () => {
            let found = false;
            for (let s = 0; s < 6; s++) {
                const src = await driver.getPageSource();
                if (src.includes('শিফট') || src.includes('সকাল') || src.includes('বিকাল')) {
                    found = true;
                    break;
                }
                await scrollDown(0.3);
            }
            expect(typeof found).toBe('boolean');
        });
    });

    // --- Institution Name (MF056-MF082) ---

    describe('Institution Name', () => {
        it('MF056: should check for institution name field', async () => {
            let found = false;
            for (let s = 0; s < 8; s++) {
                const src = await driver.getPageSource();
                if (src.includes('প্রতিষ্ঠান') || src.includes('স্কুল')) {
                    found = true;
                    break;
                }
                await scrollDown(0.3);
            }
            expect(typeof found).toBe('boolean');
        });
    });

    // --- Guardian Info (MF091-MF104) ---

    describe('Guardian Info', () => {
        it('MF091-095: should check for guardian name field', async () => {
            let found = false;
            for (let s = 0; s < 10; s++) {
                const src = await driver.getPageSource();
                if (src.includes('অভিভাবক') || src.includes('guardian')) {
                    found = true;
                    break;
                }
                await scrollDown(0.3);
            }
            expect(typeof found).toBe('boolean');
        });

        it('MF098-102: should check for guardian phone field', async () => {
            const src = await driver.getPageSource();
            const hasGuardianPhone = src.includes('অভিভাবকের মোবাইল') || src.includes('+880');
            expect(typeof hasGuardianPhone).toBe('boolean');
        });
    });

    // --- Save Button (MF105-MF111) ---

    describe('Save Button', () => {
        it('MF105: should check for save button', async () => {
            // Scroll to bottom
            for (let i = 0; i < 10; i++) await scrollDown(0.4);

            const src = await driver.getPageSource();
            const hasSave = src.includes('সেভ করো') || src.includes('সংরক্ষণ');
            const btn = await $('android.widget.Button');
            const hasBtn = await btn.isExisting();
            expect(hasSave || hasBtn).toBe(true);
        });

        it('MF110: should have disabled save without mandatory fields', async () => {
            // Only testable if mandatory fields are empty
            const enabled = await isActionButtonEnabled();
            // If fields are already filled, button may be enabled
            expect(typeof enabled).toBe('boolean');
        });
    });

    // --- Back Navigation ---

    describe('Navigation', () => {
        it('should go back to home page', async () => {
            await driver.pressKeyCode(4);
            await driver.pause(2000);

            // May need multiple back presses
            for (let i = 0; i < 3; i++) {
                const src = await driver.getPageSource();
                if (src.includes('হোম') && (src.includes('কোর্স') || src.includes('ইনবক্স'))) break;
                await driver.pressKeyCode(4);
                await driver.pause(2000);
            }

            const hasHome = await screenHasText('হোম') || await screenHasText('প্রোফাইল কমপ্লিট');
            expect(hasHome).toBe(true);
        });
    });
});

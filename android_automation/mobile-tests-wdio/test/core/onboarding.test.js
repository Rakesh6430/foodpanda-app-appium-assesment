const { launchApp, dismissNotificationPermission } = require('../flows/auth.flow');
const { existsByText, findByText, findByTextContains } = require('../helpers/find.helper');
const onboardingPage = require('../pages/onboarding.page');

/**
 * Covers regression sheet "New Registration" TC 1-14:
 * Onboarding screen display, carousel, content, navigation.
 */
describe('Core: Onboarding Screen', () => {
    before(async () => {
        await launchApp();
        await dismissNotificationPermission();
    });

    it('TC1-2: should display onboarding screen after app launch', async () => {
        const isOnboarding = await onboardingPage.isDisplayed();
        expect(isOnboarding).toBe(true);
    });

    it('TC7-10: should display first onboarding screen content', async () => {
        // Compose Bengali text may not appear in page source — check via getText iteration
        const tvs = await $$('android.widget.TextView');
        let foundAnyText = false;
        for (const tv of tvs) {
            try {
                const text = await tv.getText();
                if (text && text.length > 5) { foundAnyText = true; break; }
            } catch {}
        }
        // At minimum, onboarding has TextViews with content and a Button
        const btn = await $('android.widget.Button');
        expect(await btn.isExisting()).toBe(true);
        // If TextViews found, content is displaying
        expect(foundAnyText).toBe(true);
    });

    it('TC5-6: should be able to swipe the carousel', async () => {
        // Swipe left on carousel
        await driver.execute('mobile: swipeGesture', {
            left: 200, top: 800, width: 600, height: 400, direction: 'left', percent: 0.5
        });
        await driver.pause(1500);

        // After swiping, we should still be on onboarding (different content)
        const isStillOnboarding = await onboardingPage.isDisplayed();
        expect(isStillOnboarding).toBe(true);
    });

    it('TC11-13: should display continue/start button on onboarding', async () => {
        // Check for button element
        const btn = await $('android.widget.Button');
        await btn.waitForExist({ timeout: 10000 });
        expect(await btn.isExisting()).toBe(true);
    });

    it('TC14: should navigate to phone number page after tapping continue', async () => {
        await onboardingPage.tapContinue();
        await driver.pause(3000);

        // Phone input should now be visible (login/registration page)
        const phoneInput = await $('android.widget.EditText');
        await phoneInput.waitForExist({ timeout: 15000 });
        expect(await phoneInput.isExisting()).toBe(true);
    });
});

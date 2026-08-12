const { existsByText } = require('../helpers/find.helper');

class OnboardingPage {
    async isDisplayed() {
        try {
            const logo = await $('~Shikho Logo');
            await logo.waitForExist({ timeout: 15000 });
            // Onboarding has no phone input
            const phoneInput = await $('android.widget.EditText');
            return !(await phoneInput.isExisting());
        } catch {
            return false;
        }
    }

    async tapContinue() {
        // Use Button element directly (Bengali text matching is unreliable in Compose)
        const btn = await $('android.widget.Button');
        await btn.waitForExist({ timeout: 15000 });
        await btn.click();
    }
}

module.exports = new OnboardingPage();

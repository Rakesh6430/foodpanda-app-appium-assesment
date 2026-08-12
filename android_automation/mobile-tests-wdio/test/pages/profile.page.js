const { findByText, existsByText } = require('../helpers/find.helper');

class ProfilePage {
    // Step 1/3: Identity
    async isIdentityStepDisplayed() {
        return existsByText('শিক্ষার্থী', 'android.widget.TextView', 15000);
    }

    async selectStudent() {
        const el = await findByText('শিক্ষার্থী');
        await el.click();
    }

    async tapContinue() {
        const buttons = await $$('android.widget.Button');
        // Last button is always Continue (এগিয়ে যাও / সেভ করো)
        await buttons[buttons.length - 1].click();
    }

    // Step 2/3: Info
    async isInfoStepDisplayed() {
        return existsByText('তোমার তথ্য দাও', 'android.widget.TextView', 15000);
    }

    async enterName(name) {
        const input = await $('android.widget.EditText');
        await input.waitForExist({ timeout: 15000 });
        await input.click();
        await input.setValue(name);
        try { await driver.hideKeyboard(); } catch {}
    }

    async selectGenderMale() {
        const el = await findByText('ছাত্র');
        await el.click();
    }

    async selectClass(className) {
        const el = await findByText(className);
        await el.click();
    }

    // Step 3/3: Password
    async isPasswordStepDisplayed() {
        return existsByText('পাসওয়ার্ড সেট করো', 'android.widget.TextView', 15000);
    }

    async setPassword(password) {
        const inputs = await $$('android.widget.EditText');
        // First input: password, second: confirm password
        await inputs[0].click();
        await inputs[0].setValue(password);
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);

        await inputs[1].click();
        await inputs[1].setValue(password);
        try { await driver.hideKeyboard(); } catch {}
    }

    // Congratulations screen
    async isCongratsDisplayed() {
        return existsByText('অভিনন্দন!', 'android.widget.TextView', 15000);
    }

    async tapGoToHomepage() {
        const buttons = await $$('android.widget.Button');
        await buttons[buttons.length - 1].click();
    }
}

module.exports = new ProfilePage();

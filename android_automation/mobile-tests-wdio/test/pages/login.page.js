const { findByText, existsByText } = require('../helpers/find.helper');

class LoginPage {
    get phoneInput() {
        return $('android.widget.EditText');
    }

    get privacyCheckbox() {
        return $('android.widget.CheckBox');
    }

    // The continue button's parent View (contains a Button child)
    get continueButtonView() {
        return $('android.widget.Button');
    }

    async isDisplayed() {
        return existsByText('মোবাইল নম্বর দিয়ে এগিয়ে যান');
    }

    async ensureCleanState() {
        const checked = await this.isPrivacyCheckboxChecked();
        if (!checked) {
            await this.togglePrivacyCheckbox();
        }
        const input = await this.phoneInput;
        if (await input.isExisting()) {
            await input.click();
            await input.clearValue();
            try { await driver.hideKeyboard(); } catch {}
        }
    }

    async enterPhoneNumber(number) {
        await this.phoneInput.waitForExist({ timeout: 15000 });
        await this.phoneInput.click();
        await this.phoneInput.clearValue();
        await this.phoneInput.setValue(number);
        try { await driver.hideKeyboard(); } catch {}
    }

    async getCountryCode() {
        const el = await findByText('+88');
        return el.getText();
    }

    async isPrivacyCheckboxChecked() {
        await this.privacyCheckbox.waitForExist({ timeout: 15000 });
        return (await this.privacyCheckbox.getAttribute('checked')) === 'true';
    }

    async togglePrivacyCheckbox() {
        await this.privacyCheckbox.waitForExist({ timeout: 15000 });
        await this.privacyCheckbox.click();
    }

    async isContinueButtonEnabled() {
        // The Button's sibling View has enabled=false when disabled
        // Both share the same bounds. Check the View with same bounds as Button.
        const btn = await this.continueButtonView;
        await btn.waitForExist({ timeout: 15000 });
        // Get the parent View's enabled state
        // The parent is an android.view.View with clickable=true
        const views = await $$('android.view.View');
        for (const view of views) {
            const clickable = await view.getAttribute('clickable');
            if (clickable === 'true') {
                const enabled = await view.getAttribute('enabled');
                // This is either the dropdown or the continue button
                // The continue button View is disabled when no phone entered
                if (enabled === 'false') return false;
            }
        }
        // If no disabled clickable View found, button is enabled
        // But we need to verify the continue button specifically
        // Check the last clickable view (continue button is at the bottom)
        const clickableViews = [];
        for (const view of views) {
            const clickable = await view.getAttribute('clickable');
            if (clickable === 'true') {
                clickableViews.push(view);
            }
        }
        if (clickableViews.length > 0) {
            const lastView = clickableViews[clickableViews.length - 1];
            return (await lastView.getAttribute('enabled')) === 'true';
        }
        return false;
    }

    async tapContinue() {
        try { await driver.hideKeyboard(); } catch {}
        // Tap the Button element directly (Bengali text matching is unreliable)
        const btn = await this.continueButtonView;
        await btn.waitForExist({ timeout: 15000 });
        await btn.click();
    }
}

module.exports = new LoginPage();

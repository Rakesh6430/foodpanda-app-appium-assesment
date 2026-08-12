const { existsByText } = require('../helpers/find.helper');

class OtpPage {
    get otpInput() {
        return $('android.widget.EditText');
    }

    async isDisplayed() {
        return existsByText('মোবাইল নম্বর ভেরিফাই করুন', 'android.widget.TextView', 15000);
    }

    async enterOtp(otp) {
        await this.otpInput.waitForExist({ timeout: 15000 });
        await this.otpInput.click();
        await this.otpInput.setValue(otp);
    }

    async tapVerify() {
        try { await driver.hideKeyboard(); } catch {}
        await driver.pause(500);
        const btn = await $('android.widget.Button');
        await btn.waitForExist({ timeout: 15000 });
        await btn.click();
    }
}

module.exports = new OtpPage();

const { $, expect } = require('@wdio/globals');
const { contentText,registrationData,invalidData } = require('../data/testdata');
const BasePage = require('../data/util');
const SignUpPage = require('./signup.page');
const LoginPage = require('./loginpage.page');
const OtpPageConent = require('./otpscreencontent.page');
const PasswordSetContent = require('./passwordsetcontent.page');
const SplashScreen = require('./splashscreen.page');

class ForgetPasswordPage {

    get pageTitle() {
        return $(`android=new UiSelector().text("${contentText.forgetPassword.pageTitle}")`);
    }
    get passwordRestTitle() {
        return $(`android=new UiSelector().text("${contentText.forgetPassword.passwordResetTitle}")`);
    }
    get passwordResetSubTitle() {
        return $(`android=new UiSelector().text("${contentText.forgetPassword.passwordResetSubTitle}")`);
    }
    get passwordLabl() {
        return $(`android=new UiSelector().text("${contentText.forgetPassword.passwordLabel}")`);
    }
    get confirmPasswordLabl() {
        return $(`android=new UiSelector().text("${contentText.forgetPassword.confirmPasswordLabel}")`);
    }
    get submitBtnText() {
        return $(`android=new UiSelector().text("${contentText.forgetPassword.submitBtn}")`);               
    }
    get submitBtn() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }
    get successMessage() {
        return $(`android=new UiSelector().text("${contentText.forgetPassword.successMessage1}")`);
    }
    get subSuccessMessage() {
        return $(`android=new UiSelector().text("${contentText.forgetPassword.successMessage2}")`); 
    }
    get loginButtonText() {
        return $(`android=new UiSelector().text("${contentText.forgetPassword.loginBtn}")`);
    }
    get loginButton() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    //===================== Validations =====================

    async verifyForgetPasswordPage() {
        await this.pageTitle.waitForDisplayed({ timeout: 10000 });
        await expect(this.pageTitle).toHaveText(contentText.forgetPassword.pageTitle);
    }

    async verifyPasswordResetTitle() {
        await this.passwordRestTitle.waitForDisplayed({ timeout: 10000 });
        await expect(this.passwordRestTitle).toHaveText(contentText.forgetPassword.passwordResetTitle);
    }

    async verifyPasswordResetSubTitle() {
        await this.passwordResetSubTitle.waitForDisplayed({ timeout: 10000 });
        await expect(this.passwordResetSubTitle).toHaveText(contentText.forgetPassword.passwordResetSubTitle);
    }

    async verifyResetPasswordLabel() {
        await this.passwordLabl.waitForDisplayed({ timeout: 10000 });
        await expect(this.passwordLabl).toHaveText(contentText.forgetPassword.passwordLabel);
    }

    async verifyResetConfirmPasswordLabel() {
        await this.confirmPasswordLabl.waitForDisplayed({ timeout: 10000 });
        await expect(this.confirmPasswordLabl).toHaveText(contentText.forgetPassword.confirmPasswordLabel);
    }

    async verifyResetPasswordSubmitBtn() {   
        await this.submitBtnText.waitForDisplayed({ timeout: 10000 });
        await expect(this.submitBtnText).toHaveText(contentText.forgetPassword.submitBtn);
    }  
     async verifyForgetPasswordContent() {
        await this.verifyForgetPasswordPage();
        await expect(OtpPageConent.secondHeaderText).toBeDisplayed();
        await expect(OtpPageConent.otp).toBeDisplayed();
        await expect(OtpPageConent.notGetOtpText).toBeDisplayed();
        await expect(OtpPageConent.otpSubmitBtnText).toBeDisplayed(); 
    }

    async verifyResetPasswordContent() {
        await this.verifyPasswordResetTitle();
        await this.verifyPasswordResetSubTitle();
        await this.verifyResetPasswordLabel();
        await expect(PasswordSetContent.passwordInput).toBeDisplayed();
        await expect(PasswordSetContent.paswordHint).toBeDisplayed();
        await this.verifyResetConfirmPasswordLabel();
        await expect(PasswordSetContent.confirmPasswordInput).toBeDisplayed();
        await BasePage.hideKeyboard();
        await this.verifyResetPasswordSubmitBtn();
    }


    async passwordResetSuccessContent() {
        await this.subSuccessMessage.waitForDisplayed({ timeout: 10000 });
        // await expect(this.successMessage).toHaveText(contentText.forgetPassword.successMessage1);
        // await expect(this.subSuccessMessage).toBeDisplayed();
        await expect(this.subSuccessMessage).toHaveText(contentText.forgetPassword.successMessage2);
        await expect(this.loginButtonText).toHaveText(contentText.forgetPassword.loginBtn);
    }


    // ============== Button disabled/enabled scenarios ================

    async verifyResetPasswordSaveBtnDisabledWithoutInput() {
        await expect(this.submitBtn).not.toBeEnabled();
    }

    async verifyResetPasswordSaveBtnDisabledWithOnlyPassword() {
        await PasswordSetContent.passwordInput.setValue(registrationData.password);
        await BasePage.hideKeyboard();
        await expect(this.submitBtn).not.toBeEnabled();
    }

    async verifyResetPasswordSaveBtnDisabledWithWrongConfirm() {
        //await PasswordSetContent.passwordInput.clearValue();
        await PasswordSetContent.passwordInput.setValue('\uE003\uE003\uE003\uE003\uE003\uE003');
        await PasswordSetContent.passwordInput.setValue(registrationData.password);
        await PasswordSetContent.confirmPasswordInput.setValue(invalidData.invalidPassword);
        await BasePage.hideKeyboard();
        await expect(this.submitBtn).not.toBeEnabled();
    }

    async verifyResetPasswordSaveBtnEnabledWithCorrectPasswords() {
        await PasswordSetContent.confirmPasswordInput.setValue('\uE003\uE003\uE003\uE003\uE003\uE003');
        await PasswordSetContent.confirmPasswordInput.setValue(registrationData.confirmpassword);
        await BasePage.hideKeyboard();
        await expect(this.submitBtn).toBeEnabled();
    }

    //===================== Actions =====================

    async clickForgetPasswordText() {
        await LoginPage.forgetPassswordText.click();
    }

    async otpInput(otp) {
        await SignUpPage.otp.setValue(otp);
    }

    async clickResetPasswordSubmitBtn() {
        await this.submitBtn.click();
    } 
    async clickLoginButton() {
        await this.loginButton.click();
        await expect(SplashScreen.spButton).toBeDisplayed();
    }

}
module.exports = new ForgetPasswordPage();

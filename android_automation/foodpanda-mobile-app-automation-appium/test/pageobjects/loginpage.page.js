const { $, expect, driver } = require('@wdio/globals');
const { contentText } = require('../data/testdata');
const BasePage = require('../data/util');
const SignUpPage = require('./signup.page');

class LoginPage {

    get nextescreentext() {
        return $(`android=new UiSelector().text("${contentText.passwordPage.headerText}")`);
    }

    get subHeaderText() {
        return $(`android=new UiSelector().text("${contentText.passwordPage.subhedText}")`);
    }

    get passwordLabel() {
        return $(`android=new UiSelector().text("${contentText.passwordPage.passwordText}")`);
    }

    get inputPassword() {
        return $('android=new UiSelector().className("android.widget.EditText")');
    }

    get loginButtonText() {
        return $(`android=new UiSelector().text("${contentText.passwordPage.loginBtnText}")`);
    }

    get loginButton() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    get forgetPassswordText() {
        return $(`android=new UiSelector().text("${contentText.passwordPage.forgetPasswordText}")`);
    }

    get locationShareModal() {
        return $('android=new UiSelector().text("লোকেশন শেয়ার করো")');
    }

    get locationShareAllowBtn() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    get homeBtn() {
        return $('android=new UiSelector().className("android.widget.TextView").textContains("হোম")');
    }


    //===================== Invalid Login Locators ====================


    //===================== VALIDATIONS ====================
    
    async verifyPasswordPage() {
        await this.nextescreentext.waitForDisplayed({ timeout: 10000 });
        await expect(this.nextescreentext).toHaveText(contentText.passwordPage.headerText);
    }

    async verifySubHeaderText() {
        await this.subHeaderText.waitForDisplayed({ timeout: 10000 });
        await expect(this.subHeaderText).toHaveText(contentText.passwordPage.subhedText);
    }

    async verifyPasswordLabel() {
        await this.passwordLabel.waitForDisplayed({ timeout: 10000 });
        await expect(this.passwordLabel).toHaveText(contentText.passwordPage.passwordText);
    }

    async verifyPasswordInput() {
        await this.inputPassword.waitForDisplayed({ timeout: 10000 });
    }
    
    async verifyLoginButton() {
        await expect(this.loginButton).toBeDisplayed();
        await this.loginButtonText.waitForDisplayed({ timeout: 10000 });
        await expect(this.loginButtonText).toHaveText(contentText.passwordPage.loginBtnText);
    }

    async verifyForgetPasswordText() {
        await this.forgetPassswordText.waitForDisplayed({ timeout: 10000 });
        await expect(this.forgetPassswordText).toHaveText(contentText.passwordPage.forgetPasswordText);
    }



    //===================== ACTIONS ====================

    async enterPassword(password) {
        await this.inputPassword.setValue(password);
        await BasePage.hideKeyboard();
    }

    async passwordSubmit() {
         await this.loginButton.click();
    }

    async verifyLoginSuccess() {
        await this.homeBtn.waitForDisplayed({ timeout: 10000 });
        await expect(this.homeBtn).toHaveText("হোম");
    }

    async login(number, password) {
        await SignUpPage.enterNumber(number);
        await SignUpPage.submitNumber();
        await driver.pause(5000);
        await this.enterPassword(password);
        await BasePage.hideKeyboard();
        await this.passwordSubmit();
        await driver.pause(5000);
    }

    //===================== Invalid Login Validations ====================

    async verifyInvalidLogin() {
        await SignUpPage.passwordMismatchError.waitForDisplayed({ timeout: 10000 });
        await expect(SignUpPage.passwordMismatchError).toHaveText('পাসওয়ার্ড সঠিক নয়');
    }

    async verifyPasswordMismatchTextRemove() {
         await this.inputPassword.setValue('\uE003');
         await expect(SignUpPage.passwordMismatchError).not.toBeDisplayed();
    }

}

module.exports = new LoginPage();

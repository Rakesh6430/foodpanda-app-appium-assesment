const { $, expect } = require('@wdio/globals');
const { contentText } = require('../data/testdata');
const BasePage = require('../data/util');
const ContentofNumberPage = require('./inputnumbercontent.page');

class OtpPageConent {

    get headerText() {
        return $(`android=new UiSelector().text("${contentText.otpPage.headerText}")`);
    }

    get secondHeaderText() {
        return $(`android=new UiSelector().textContains("${contentText.otpPage.otpInstruction}")`);
    }

    get otp() {
        return $('android=new UiSelector().className("android.widget.EditText")');
    }

    get notGetOtpText() {
        return $(`android=new UiSelector().text("${contentText.otpPage.noOtpText}")`);
    }

    get resendOtp() {
        return $(`android=new UiSelector().text("${contentText.otpPage.resendOtpText}")`);
    }

    get otpSubmitBtnText() {
        return $(`android=new UiSelector().text("${contentText.otpPage.submitBtn}")`);
    }

    get submitOtpBtn() { 
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    // Password bottom sheet

    get icon() {
        return $('~Expiring Icon');
    }

    get modalHeader() {
        return $(`android=new UiSelector().text("${contentText.passwordModal.modalHeader}")`);
    }

    get modalSubHeader() {
        return $(`android=new UiSelector().text("${contentText.passwordModal.modalSubHeader}")`);
    }

    get modalBtnText() {
        return $(`android=new UiSelector().text("${contentText.passwordModal.modalBtnText}")`);
    }

    get modalButton() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }



    async otpContent() {
        await BasePage.hideKeyboard();
        await expect(this.headerText).toBeDisplayed();
        await expect(this.headerText).toHaveText(contentText.otpPage.headerText);
        await expect(this.secondHeaderText).toBeDisplayed();
        await expect(this.secondHeaderText).toHaveText(contentText.otpPage.otpInstruction);
        await expect(this.otp).toBeDisplayed();
        await expect(this.otpSubmitBtnText).toBeDisplayed();
        await expect(this.otpSubmitBtnText).toHaveText(contentText.otpPage.submitBtn);
    }

    async resendOtpText() {
        await expect(this.resendOtp).toBeDisplayed();
        await this.resendOtp.click();
    }

    async verifyOtpSubmitButtonDisabled() {
        await expect(this.submitOtpBtn).not.toBeEnabled();
    }

    async verifyOtpSubmitButtonEnabled() {
        await expect(this.submitOtpBtn).toBeEnabled();
    }

    async verifyDeviceBackButtonGoesToNumberInputPage() {
        await BasePage.hideKeyboard();
        await driver.back();
        await BasePage.hideKeyboard();
        await ContentofNumberPage.headerText.waitForDisplayed({ timeout: 10000 });
        await expect(ContentofNumberPage.headerText).toBeDisplayed();
    }

    // async handlePasswordSetupModalIfVisible(){
    //     try{
    //         await modalHeader.waitForDisplayed({ timeout: 5000 });
    //         await this.icon.toBeDisplayed();
    //         await expect(this.modalHeader).toBeDisplayed();
    //         await expect(this.modalHeader).toHaveText(contentText.passwordModal.modalHeader);
    //         await expect(this.modalSubHeader).toBeDisplayed();
    //         await expect(this.modalSubHeader).toHaveText(contentText.passwordModal.modalSubHeader);
    //         await expect(this.modalBtnText).toBeDisplayed();
    //         await expect(this.modalBtnText).toHaveText(contentText.passwordModal.modalBtnText);

    //         await this.modalButton.click();
    //         await driver.pause(1000);

    //         // সিগন্যাল: পপআপ পাওয়া গেছে (এটি পুরনো/Dropped-off ইউজার)
    //         return true;

    //     }catch (error) {
    //         console.log('No modal detected. Fresh user flow continues...');
    //         // সিগন্যাল: পপআপ পাওয়া যায়নি (এটি নতুন ইউজার)
    //         return false;
    //     }

    // }
}

module.exports = new OtpPageConent();

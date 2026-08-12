const { $, expect } = require('@wdio/globals');
const { contentText } = require('../data/testdata');

class RegistrationSuccessContent {

    // ==================== LOCATORS ====================

    get successIcon() {
        return $('android=new UiSelector().className("android.widget.ImageView")');
    }

    get header() {
        return $(`android=new UiSelector().text("${contentText.registrationSuccessPage.header}")`);
    }

    get successMsg() {
        return $(`android=new UiSelector().text("${contentText.registrationSuccessPage.successMessage}")`);
    }

    get parSuccessMsg() {
        return $(`android=new UiSelector().text("${contentText.parRegistrationSuccessPage.successMessage}")`);
    }

    get homeBtnText() {
        return $(`android=new UiSelector().text("${contentText.registrationSuccessPage.homeBtn}")`);
    }

    get parHomeBtnText() {
        return $(`android=new UiSelector().text("${contentText.parRegistrationSuccessPage.homeBtn}")`);
    }

    get homeBtn() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    // ==================== VALIDATIONS ====================

    async registrationSuccessContent() { 
        await this.header.waitForDisplayed({ timeout: 15000 });
        await expect(this.successIcon).toBeDisplayed();
        await expect(this.header).toBeDisplayed();
        await expect(this.header).toHaveText(contentText.registrationSuccessPage.header);
        // await expect(this.successMsg).toBeDisplayed();
        // await expect(this.successMsg).toHaveText(contentText.registrationSuccessPage.successMessage);
        await expect(this.homeBtnText).toBeDisplayed();
        await expect(this.homeBtnText).toHaveText(contentText.registrationSuccessPage.homeBtn);
    }


    //parent
    async parRegistrationSuccessContent() { 
        await expect(this.successIcon).toBeDisplayed();
        await expect(this.parSuccessMsg).toBeDisplayed();
        await expect(this.parSuccessMsg).toHaveText(contentText.parRegistrationSuccessPage.successMessage);
        await expect(this.parHomeBtnText).toBeDisplayed();
        await expect(this.parHomeBtnText).toHaveText(contentText.parRegistrationSuccessPage.homeBtn);
    }


    async clickHomeBtn() {
        await this.homeBtn.click();
    }
}

module.exports = new RegistrationSuccessContent();

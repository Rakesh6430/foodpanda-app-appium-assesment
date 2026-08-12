const { $, expect } = require('@wdio/globals');
const { contentText } = require('../data/testdata');
const  BasePage = require('../data/util');
const SplashScreen = require('./splashscreen.page');

class ContentofNumberPage {

    // ==================== LOCATORS ====================

    get headerText() {
         return $(`android=new UiSelector().text("${contentText.numberInputPage.headerText}")`);
    }

    get subText() {
        return $(`android=new UiSelector().text("${contentText.numberInputPage.subText}")`);
    }

    get mobileNumberText() {
        return $(`android=new UiSelector().text("${contentText.numberInputPage.mobileLabel}")`);
    }

    get bdFlag() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(2)');
    }

    get bdCode() {
        return $(`android=new UiSelector().text("${contentText.numberInputPage.countryCode}")`);
    }

    get barSign() {
        return $(`android=new UiSelector().text("${contentText.numberInputPage.barSign}")`);
    }

    get dropDownIcon() {
        return $('android=new UiSelector().description("Dropdown Icon")');
    }

    get placeholderName() {
        return $(`android=new UiSelector().text("${contentText.numberInputPage.placeholder}")`);
    }

    get continueButtonName() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    get checkBox() {
        return $('android=new UiSelector().className("android.widget.CheckBox")');
    }

     // ==================== VALIDATIONS ====================

    async contentofinputnumber() {
        await BasePage.hideKeyboard(); 
        await expect(this.headerText).toExist();
        await expect(this.headerText).toHaveText(contentText.numberInputPage.headerText);
        await expect(this.subText).toHaveText(contentText.numberInputPage.subText);
        await expect(this.bdFlag).toExist();
        await expect(this.bdCode).toHaveText(contentText.numberInputPage.countryCode);
        await expect(this.barSign).toBeDisplayed();
        await expect(this.barSign).toHaveText(contentText.numberInputPage.barSign);
        await expect(this.placeholderName).toBeDisplayed();
        await expect(this.placeholderName).toHaveText(contentText.numberInputPage.placeholder);
        await this.continueButtonName.waitForExist({ timeout: 10000 });
        await expect(this.continueButtonName).toBeDisplayed();
        await expect(this.checkBox).toBeDisplayed(); 
    }


    async verifyNumberSubmitButtonDisabled() {
        await expect(this.continueButtonName).not.toBeEnabled();
    } 

    async verifyNumberSubmitButtonEnabled() {
        await expect(this.continueButtonName).toBeEnabled();
    }

    async verifyDeviceBackButtonGoesToSplashScreen() {
        await driver.back();
        await expect(SplashScreen.spButton).toBeDisplayed();
    }

}

module.exports = new ContentofNumberPage();

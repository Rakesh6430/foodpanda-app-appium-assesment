const { $, expect, driver } = require('@wdio/globals');
const { contentText } = require('../data/testdata');
const  BasePage = require('../data/util');
const StudentFormContent = require('./studentformcontentp.page');

class PasswordSetContent{

    // ==================== LOCATORS ====================

    get step3Title() {
        return $(`android=new UiSelector().text("${contentText.passwordSetPage.pageTitle}")`);
    }

    get stepIndicator3() {
        return $(`android=new UiSelector().text("${contentText.passwordSetPage.stepCount}")`);
    }

    get header() {
        return $(`android=new UiSelector().text("${contentText.passwordSetPage.header}")`);
    }

    get parHeader() {
        return $(`android=new UiSelector().text("${contentText.parPasswordSetPage.header}")`);
    }

    get subText() {
        return $(`android=new UiSelector().text("${contentText.passwordSetPage.subText}")`);
    }

    get parSubText() {
        return $(`android=new UiSelector().text("${contentText.parPasswordSetPage.subText}")`);
    }

    get paswordLabel() {
        return $(`android=new UiSelector().text("${contentText.passwordSetPage.passwordLabel}")`);
    }

    get passwordInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    get paswordHint() {
        return $(`android=new UiSelector().text("${contentText.passwordSetPage.passwordHint}")`);
    }

    get confirmPasswordLabel() {
        return $(`android=new UiSelector().text("${contentText.passwordSetPage.confirmPasswordLabel}")`);
    }

    get parConfirmPasswordLabel() {
        return $(`android=new UiSelector().text("${contentText.parPasswordSetPage.confirmPasswordLabel}")`);
    }

    get confirmPasswordInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    get goBackButtonText() {
        return $(`android=new UiSelector().text("${contentText.passwordSetPage.backBtn}")`);
    }

    get parentGoBackButtonText() {
        return $(`android=new UiSelector().text("${contentText.parPasswordSetPage.backBtn}")`);
    }

    get StudentPasswordSubmitBtnText() {
        return $(`android=new UiSelector().text("${contentText.passwordSetPage.studentSubmitBtn}")`);
    }

    get parentPasswordSubmitBtnText() {
        return $(`android=new UiSelector().text("${contentText.parPasswordSetPage.parentSubmitBtn}")`);
    }

    get passBackBtn() {
        return $('android=new UiSelector().className("android.widget.Button").instance(0)');
    }


    // ==================== VALIDATIONS ====================

    async stuPasswordSetContent() {
        await this.step3Title.waitForDisplayed({ timeout: 15000 });
        await expect(this.step3Title).toBeDisplayed();
        await expect(this.step3Title).toHaveText(contentText.passwordSetPage.pageTitle);
        await expect(this.stepIndicator3).toHaveText(contentText.passwordSetPage.stepCount);
        await expect(this.stepIndicator3).toBeDisplayed();
        await expect(this.header).toBeDisplayed();
        await expect(this.header).toHaveText(contentText.passwordSetPage.header);
        await expect(this.subText).toBeDisplayed();
        await expect(this.subText).toHaveText(contentText.passwordSetPage.subText);
        await expect(this.paswordLabel).toBeDisplayed();
        await expect(this.paswordLabel).toHaveText(contentText.passwordSetPage.passwordLabel);
        await expect(this.passwordInput).toBeDisplayed();
        await expect(this.paswordHint).toBeDisplayed();
        await expect(this.paswordHint).toHaveText(contentText.passwordSetPage.passwordHint);
        await expect(this.confirmPasswordLabel).toBeDisplayed();
        await expect(this.confirmPasswordLabel).toHaveText(contentText.passwordSetPage.confirmPasswordLabel);
        await expect(this.confirmPasswordInput).toBeDisplayed();
        await BasePage.scrollToElement(contentText.passwordSetPage.studentSubmitBtn,5);
        await expect(this.goBackButtonText).toBeDisplayed();
        await expect(this.goBackButtonText).toHaveText(contentText.passwordSetPage.backBtn);
        await expect(this.StudentPasswordSubmitBtnText).toBeDisplayed();
        await expect(this.StudentPasswordSubmitBtnText).toHaveText(contentText.passwordSetPage.studentSubmitBtn);
    }

    async parPasswordSetContent() {
        await this.step3Title.waitForDisplayed({ timeout: 15000 });
        await expect(this.step3Title).toBeDisplayed();
        await expect(this.step3Title).toHaveText(contentText.passwordSetPage.pageTitle);
        await expect(this.stepIndicator3).toHaveText(contentText.passwordSetPage.stepCount);
        await expect(this.stepIndicator3).toBeDisplayed();
        await expect(this.parHeader).toBeDisplayed();
        await expect(this.parHeader).toHaveText(contentText.parPasswordSetPage.header);
        await expect(this.parSubText).toBeDisplayed();
        await expect(this.parSubText).toHaveText(contentText.parPasswordSetPage.subText);
        await expect(this.paswordLabel).toBeDisplayed();
        await expect(this.paswordLabel).toHaveText(contentText.passwordSetPage.passwordLabel);
        await expect(this.passwordInput).toBeDisplayed();
        await expect(this.paswordHint).toBeDisplayed();
        await expect(this.paswordHint).toHaveText(contentText.passwordSetPage.passwordHint);
        await expect(this.parConfirmPasswordLabel).toBeDisplayed();
        await expect(this.parConfirmPasswordLabel).toHaveText(contentText.parPasswordSetPage.confirmPasswordLabel);
        await expect(this.confirmPasswordInput).toBeDisplayed();
        await BasePage.scrollToElement(contentText.passwordSetPage.studentSubmitBtn,5);
        await expect(this.parentGoBackButtonText).toBeDisplayed();
        await expect(this.parentGoBackButtonText).toHaveText(contentText.parPasswordSetPage.backBtn);
        await expect(this.parentPasswordSubmitBtnText).toBeDisplayed();
        await expect(this.parentPasswordSubmitBtnText).toHaveText(contentText.parPasswordSetPage.parentSubmitBtn);
    }



    //===================== ACTIONS ====================

    async clickPasswordGoBack(){
        await this.passBackBtn.click();            
    }

     async verifyeBackButtonGoesToFormPage() {
            await this.clickPasswordGoBack();
            await expect(StudentFormContent.step2Title).toBeDisplayed();
        }
    
        async verifyeDeviceBackButtonGoesToFormPage() {
            await driver.back();
            await expect(StudentFormContent.step2Title).toBeDisplayed();
        }

}

module.exports = new PasswordSetContent();

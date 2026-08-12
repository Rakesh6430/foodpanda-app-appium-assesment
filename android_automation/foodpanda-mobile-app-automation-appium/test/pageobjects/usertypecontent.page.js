const { $, expect } = require('@wdio/globals');
const { contentText } = require('../data/testdata');
const OtpPageConent = require('./otpscreencontent.page');

class UserTypeContentPage {

    get setpTitle() {
        return $(`android=new UiSelector().text("${contentText.userTypePage.pageTitle}")`);
    }
 
    get stepIndicator1() {
        return $(`android=new UiSelector().text("${contentText.userTypePage.stepCount}")`);
    }

    get pageHeader() {
        return $(`android=new UiSelector().text("${contentText.userTypePage.header}")`);
    }

    get subheader() {
        return $(`android=new UiSelector().text("${contentText.userTypePage.subheader}")`);
    }

    get guardianOption() {
        return $(`android=new UiSelector().text("${contentText.userTypePage.parentCard}")`);
    }

    get studentOption() {
        return $(`android=new UiSelector().text("${contentText.userTypePage.studentCard}")`);
    }

    get radiobutton1() {
        return $('//androidx.compose.ui.platform.ComposeView[@resource-id="tech.shikho.android:id/compose_view"]/android.view.View/android.view.View[1]/android.view.View[1]');
    }

    get radiobtn2() {
        return $('//androidx.compose.ui.platform.ComposeView[@resource-id="tech.shikho.android:id/compose_view"]/android.view.View/android.view.View[2]/android.view.View[1]');
    }

    get parSubmitBtnText() {
        return $(`android=new UiSelector().text("${contentText.userTypePage.parentSubmitBtn}")`);
    }

    get stuSubmitBtnText() {
        return $(`android=new UiSelector().text("${contentText.userTypePage.studentSubmitBtn}")`);
    }

    get submitBtn() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    async assertUserTypeCard(types) {
        for (const type of types) {
            const userCard = $(`//android.widget.TextView[@text="${type}"]`);
            await expect(userCard).toBeDisplayed();
            await expect(userCard).toHaveText(type);
        }
    }

    async studentTypeContent() {
        const typecard = ['শিক্ষার্থী', 'অভিভাবক'];
        await this.pageHeader.waitForDisplayed({ timeout: 15000 });
        // await expect(this.setpTitle).toHaveText(contentText.userTypePage.pageTitle);
        // await expect(this.stepIndicator1).toHaveText(contentText.userTypePage.stepCount);
        await expect(this.pageHeader).toHaveText(contentText.userTypePage.header);
        await expect(this.subheader).toHaveText(contentText.userTypePage.subheader);
        // await expect(this.radiobutton1).toBeDisplayed();
        // await expect(this.radiobtn2).toBeDisplayed();
        await this.assertUserTypeCard(typecard);
        await expect(this.submitBtn).toBeDisplayed();
        //await expect(this.stuSubmitBtnText).toHaveText(contentText.userTypePage.studentSubmitBtn);
    }

    async parentTypeContent(){
        const typecard = ['শিক্ষার্থী', 'অভিভাবক'];
        await this.pageHeader.waitForDisplayed({ timeout: 15000 });
        // await expect(this.setpTitle).toHaveText(contentText.userTypePage.pageTitle);
        // await expect(this.stepIndicator1).toHaveText(contentText.userTypePage.stepCount);
        await expect(this.pageHeader).toHaveText(contentText.userTypePage.header);
        await expect(this.subheader).toHaveText(contentText.userTypePage.subheader);
        // await expect(this.radiobutton1).toBeDisplayed();
        // await expect(this.radiobtn2).toBeDisplayed();
        await this.assertUserTypeCard(typecard);
        await expect(this.submitBtn).toBeDisplayed();
        //await expect(this.parSubmitBtnText).toHaveText(contentText.userTypePage.parentSubmitBtn);
    }

    async verifyDeviceBackButtonGoesToOTPPage() {
        await driver.back();
        await expect(OtpPageConent.headerText).toBeDisplayed();
    }

}

module.exports = new UserTypeContentPage();

const { $, expect } = require('@wdio/globals');
const { contentText } = require('../data/testdata');

class SplashScreen{

    get logo() {
        return $('~Shikho Logo');
    }
    get phoneInput() {
        return $('android.widget.EditText');
    }
    
    get spButton(){
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    get nextscreenmessage(){
       return $(`android=new UiSelector().text("${contentText.numberInputPage.headerText}")`);
    }

    async splashbutton(){
        await this.spButton.click();
    }

    async nextpage(){
        await expect(this.nextscreenmessage).toHaveText(contentText.numberInputPage.headerText);
    }

    async isDisplayed() {
        try {
            await this.logo.waitForExist({ timeout: 15000 });
            // Onboarding has no phone input
            return !(await this.phoneInput.isExisting());
        } catch {
            return false;
        }
    }

    //skip onboarding if it appears, to avoid test flakiness.
    async skipOnboarding() {
    if (await this.isDisplayed()) {
        await this.splashbutton();
        await this.nextpage();
        await driver.pause(3000);
    }
}

}

module.exports = new SplashScreen();



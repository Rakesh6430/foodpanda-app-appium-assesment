const { $, expect } = require('@wdio/globals');
const { contentText } = require('../data/testdata');
const BasePage = require('../data/util');
const SignUpPage = require('./signup.page');

class ProfilePage {

    get profileIcon() {
        return $('android=new UiSelector().description("avatar")');
    }
    get settingsOption() {
        return $('android=new UiSelector().className("android.view.View").instance(11)');
    }
    get logoutbtn() {
        return $('android=new UiSelector().text("লগ আউট")');
    }

    async clickProfileIcon() {
        await this.profileIcon.waitForDisplayed({ timeout: 10000 });
        await this.profileIcon.click();
    }

    async clickSettingsOption() {
        await this.settingsOption.waitForDisplayed({ timeout: 10000 });
        await this.settingsOption.click();
    }


}

module.exports = new ProfilePage();

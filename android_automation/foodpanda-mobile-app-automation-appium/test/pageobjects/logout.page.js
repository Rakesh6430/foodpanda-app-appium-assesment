const { $, expect } = require('@wdio/globals');
const ProfilePage = require('./profile.page');
const SplashScreen = require('./splashscreen.page');
const BasePage = require('../data/util');

class Logout {

    async verifyLogoutBtn() {
        await BasePage.scrollToElement("লগ আউট",5);
        await ProfilePage.logoutbtn.waitForDisplayed({ timeout: 10000 });
        await expect(ProfilePage.logoutbtn).toHaveText("লগ আউট");
    }

    async clickLogoutBtn() {
        await ProfilePage.logoutbtn.click();
    }

    async verifyLogoutSuccess() {
        await SplashScreen.isDisplayed();
        await SplashScreen.spButton.waitForDisplayed({ timeout: 10000 });
    }

}

module.exports = new Logout();

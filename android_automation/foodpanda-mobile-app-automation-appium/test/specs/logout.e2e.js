const { expect } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const LoginPage = require('../pageobjects/loginpage.page');
const { loginData, contentText } = require('../data/testdata');
const BasePage = require('../data/util');
const SchoolFormPage = require('../pageobjects/schoolForm.page');
const LogoutPage = require('../pageobjects/logout.page');   
const ProfilePage = require('../pageobjects/profile.page');

const APP_PACKAGE = 'tech.shikho.android';

// async function restartApp() {
//     await driver.terminateApp(APP_PACKAGE);
//     await driver.activateApp(APP_PACKAGE);
//     await driver.pause(3000);
// }

// ==================== LOGOUT TESTS ====================

describe('Shikho App - Logout', () => {

    before(async () => {
        await BasePage.dismissNotificationPopup();
        await SplashScreen.skipOnboarding();
        await driver.pause(2000);
        await LoginPage.login(loginData.validNumber, loginData.validPassword);
        await BasePage.handleLocationSharing();
        await SchoolFormPage.fillSchoolFormIfVisible();
        await driver.pause(2000);
    });
    
    
    it('verify logout button is displayed', async () => {
        await ProfilePage.clickProfileIcon();
        await ProfilePage.clickSettingsOption();
        await LogoutPage.verifyLogoutBtn();
    });

    it('Should logout the user and display splash screen', async () => {
        await LogoutPage.clickLogoutBtn();
        await LogoutPage.verifyLogoutSuccess();
    });

        
           

});


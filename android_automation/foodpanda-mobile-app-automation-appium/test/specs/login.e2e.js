const { expect } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const LoginPage = require('../pageobjects/loginpage.page');
const SignUpPage = require('../pageobjects/signup.page');
const { loginData, contentText, invalidData } = require('../data/testdata');
const BasePage = require('../data/util');
const SchoolFormPage = require('../pageobjects/schoolForm.page');

const APP_PACKAGE = 'tech.shikho.android';

async function restartApp() {
    await driver.terminateApp(APP_PACKAGE);
    await driver.activateApp(APP_PACKAGE);
    await driver.pause(3000);
}

// ==================== LOGIN TESTS ====================

describe('Shikho App - Login', () => {

    before(async () => {
        await BasePage.dismissNotificationPopup();
        await SplashScreen.skipOnboarding();
        await driver.pause(2000);
    });

        it('should display phone number input field', async () => {
            await expect(SignUpPage.inputUsernumber).toBeDisplayed();
        });

        it('should display submit button', async () => {
            await expect(SignUpPage.numberSubmitBtn).toBeDisplayed();
        });

        it('should accept valid phone number and navigate to password page', async () => {
            await SignUpPage.enterNumber(loginData.validNumber);
            await SignUpPage.submitNumber();
            await driver.pause(5000);
            await LoginPage.verifyPasswordPage();
        });

        it('Verify password Content Page', async () => {
            await LoginPage.verifySubHeaderText();
            //await LoginPage.verifyPasswordLabel();
            await LoginPage.verifyPasswordInput();
            await LoginPage.verifyLoginButton();
            await LoginPage.verifyForgetPasswordText();
        });

        it('should show error for invalid password', async () => {
            await LoginPage.enterPassword(invalidData.invalidPassword);
            await LoginPage.passwordSubmit();
            await LoginPage.verifyInvalidLogin();
        });

        it('should remove error text when user starts editing password after invalid attempt', async () => {
            await LoginPage.verifyPasswordMismatchTextRemove();
        });

        it('should login successfully with valid password', async () => {
            await LoginPage.enterPassword(loginData.validPassword);
            await LoginPage.passwordSubmit();
            await BasePage.handleLocationSharing();
            await driver.pause(5000);
        });

        it('After Login School form shows and submit and navigate to homepage', async () => {
            await SchoolFormPage.fillSchoolFormIfVisible();
            await driver.pause(5000);
            await LoginPage.verifyLoginSuccess();
        });
           

});


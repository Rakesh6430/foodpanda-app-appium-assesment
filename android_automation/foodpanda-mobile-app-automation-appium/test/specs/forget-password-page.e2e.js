const { expect, driver } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const LoginPage = require('../pageobjects/loginpage.page');
const SignUpPage = require('../pageobjects/signup.page');
const ForgetPasswordPage = require('../pageobjects/forget-password.page');
const { loginData, contentText,registrationData } = require('../data/testdata');
const BasePage = require('../data/util');
const OtpPageContent = require('../pageobjects/otpscreencontent.page');

const APP_PACKAGE = 'tech.shikho.android';

async function restartApp() {
    await driver.terminateApp(APP_PACKAGE);
    await driver.activateApp(APP_PACKAGE);
    await driver.pause(3000);
}

// ==================== FORGET PASSWORD RESET TESTS ====================

describe('Shikho App - Foget Password', () => {

    before(async () => {
        await BasePage.dismissNotificationPopup();
        await SplashScreen.skipOnboarding();
        await driver.pause(2000);
    });
    
    
    it('should navigate to forget password page', async () => {
        await SignUpPage.enterNumber(loginData.validNumber);
        await SignUpPage.submitNumber();
        await driver.pause(2000);
        await BasePage.hideKeyboard();
        await ForgetPasswordPage.clickForgetPasswordText();
        await driver.pause(2000);
    });

    it('Verify forget password page Content', async () => {
        await ForgetPasswordPage.verifyForgetPasswordContent();
    });

    it('should show Number Input screen after clicking device back button', async () => {
        await OtpPageContent.verifyDeviceBackButtonGoesToNumberInputPage();
    });

    it('should have verify button disabled without OTP', async () => {
        await SignUpPage.inputUsernumber.clearValue();
        await SignUpPage.enterNumber(loginData.validNumber);
        await SignUpPage.submitNumber(); // navigate back to OTP page for next tests
        await SignUpPage.verifyOtpBtnDisabledWithoutFullOtp();
    });

    it('should have verify button disabled with partial OTP (less than 4 digits)', async () => {
            await SignUpPage.verifyOtpBtnDisabledWithPartialOtp('123');
        });
    
    it('should have verify button enabled with full 4 digit OTP', async () => {
        await SignUpPage.verifyOtpBtnEnabledWithFullOtp();
    });
    
    // it('should show warning for incorrect OTP', async () => {
    //     await SignUpPage.submitInvalidOtp();
    //     await SignUpPage.verifyInvalidOtpWarning();
    // });
    
    // it('should remove OTP warning after clearing input', async () => {
    //     await SignUpPage.verifyOtpWarningRemovedAfterClear();
    // });

    it('should submit OTP and navigate to reset password page', async () => {
        await ForgetPasswordPage.otpInput(registrationData.otp);
        await SignUpPage.submitOtp();
        await driver.pause(2000);
    });

    it('Verify reset password page Content', async () => {
       await ForgetPasswordPage.verifyResetPasswordContent();
    });

    it('should have save button disabled without any password input', async () => {
        await ForgetPasswordPage.verifyResetPasswordSaveBtnDisabledWithoutInput();
    });

    it('should have save button disabled with only password and no confirm password', async () => {
        await ForgetPasswordPage.verifyResetPasswordSaveBtnDisabledWithOnlyPassword();
    });

    it('should have save button disabled with wrong confirm password', async () => {
        await ForgetPasswordPage.verifyResetPasswordSaveBtnDisabledWithWrongConfirm();
    });
    
    it('should show error message for mismatched confirm password', async () => {
        await SignUpPage.verifyPasswordMismatchError(); 
    });
    
    it('should have save button enabled with correct matching passwords', async () => {
        await ForgetPasswordPage.verifyResetPasswordSaveBtnEnabledWithCorrectPasswords();
    });
    
    it('should show success message for correct confirm password', async () => {
        await SignUpPage.verifyPasswordCorrectMessage();
    });

    it('should Reset Password', async () => {
       await ForgetPasswordPage.clickResetPasswordSubmitBtn();
    });  

    it('should show success message after resetting password', async () => {
       await ForgetPasswordPage.passwordResetSuccessContent();
    }); 

    it('should navigate to Splash Screen', async () => {
       await ForgetPasswordPage.clickLoginButton();
    }); 


});


const { expect } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const SignUpPage = require('../pageobjects/signup.page');
const ContentofNumberPage = require('../pageobjects/inputnumbercontent.page');
const OtpPageContent = require('../pageobjects/otpscreencontent.page');
const UserTypeContentPage = require('../pageobjects/usertypecontent.page');
const StudentFormContent = require('../pageobjects/studentformcontentp.page');
const PasswordSetContent = require('../pageobjects/passwordsetcontent.page');
const RegistrationSuccessContent = require('../pageobjects/registrationsuccesscontent.page');
const { registrationData, contentText } = require('../data/testdata');
const { generatePhoneNumber, saveRegisteredNumber } = require('../data/generatePhoneNumber');
const  BasePage = require('../data/util');
const SchoolFormPage = require('../pageobjects/schoolForm.page');

// ==================== REGISTRATION TESTS ====================

describe('Shikho App - Registration', () => {

    const newNumber = generatePhoneNumber();

    // ==================== Splash Screen ====================

    before(async () => {
        //await launchApp();
        await BasePage.dismissNotificationPopup();
        await SplashScreen.skipOnboarding();
        await driver.pause(2000);
    });



    // ==================== Number Input Page ====================

    it('Verify Content of Number Input Page', async () => {
        await ContentofNumberPage.contentofinputnumber();
    });

    it('should show splash screen after clicking device back button', async () => {
        await ContentofNumberPage.verifyDeviceBackButtonGoesToSplashScreen();
         await SplashScreen.splashbutton();
    });

    it('should have submit button disabled when input field is empty', async () => {
        await SignUpPage.verifyBtnDisabledWhenEmpty();
    });

    it('should have submit button disabled when number is less than 11 digits', async () => {
        await SignUpPage.verifyBtnDisabledWithLessThan11Digits('01690');
    });

    it('should have submit button disabled without checkbox checked', async () => {
        await SignUpPage.verifyBtnDisabledWithoutCheckbox(newNumber);
    });

    it('should have submit button enabled with 11 digit number and checkbox checked', async () => {
        await SignUpPage.verifyBtnEnabledWith11DigitsAndCheckbox(newNumber);
    });

    // it('should show warning message for invalid number', async () => {
    //     await SignUpPage.submitInvalidNumber();
    //     await SignUpPage.verifyInvalidNumberWarning();
    // });

    // it('should remove warning message when changing number', async () => {
    //     await SignUpPage.verifyWarningRemovedAfterChange(newNumber);
    // });

    it('should submit number and navigate to OTP page', async () => {
        await SignUpPage.enterNumber(newNumber);
        await SignUpPage.submitNumber();
    });

    // ==================== OTP Page ====================
    
    it('should display OTP page content correctly', async () => {
        await OtpPageContent.otpContent();
    });

    it('should show Number Input screen after clicking device back button', async () => {
        await OtpPageContent.verifyDeviceBackButtonGoesToNumberInputPage();
    });

    it('should have verify button disabled without OTP', async () => {
        await SignUpPage.inputUsernumber.clearValue();
        await SignUpPage.enterNumber(newNumber);
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

    it('should enter OTP and submit & go to User type page', async () => { 
        await SignUpPage.enterOtp(registrationData.otp);
        await SignUpPage.submitOtp();
    });

    // ==================== User Type Selection ====================
    
    it('should display Student type page Content correctly', async () => {
        await UserTypeContentPage.studentTypeContent();
    });

    it('should show OTP Input screen after clicking device back button', async () => {
        await UserTypeContentPage.verifyDeviceBackButtonGoesToOTPPage();
    });

    it('should have submit button disabled without selecting a card', async () => {
        await SignUpPage.otp.setValue('\uE003\uE003\uE003\uE003');
        await SignUpPage.enterOtp(registrationData.otp);
        await SignUpPage.submitOtp();
        await SignUpPage.verifyUserTypeBtnDisabledWithoutSelection();
    });

    it('should have submit button enabled after selecting student card', async () => {
        await SignUpPage.verifyUserTypeBtnEnabledAfterSelection();
    });

    it('should select student type and submit', async () => {
        await SignUpPage.selectStudentType();
        await SignUpPage.submitStudentType();
    }); 

    // ==================== Student Form ====================

    it('should display Student form Content correctly', async () => {
        await StudentFormContent.studentForm();
    });

    it('should show User Type screen after clicking back button', async () => {
        await StudentFormContent.verifyeBackButtonGoesToUserTypePage();
    });

    // it('should show User Type screen after clicking device back button', async () => {
    //     await StudentFormContent.verifyeDeviceBackButtonGoesToUserTypePage();
    // });

    it('should have submit button disabled without any input', async () => {
        await SignUpPage.submitStudentType();
        await SignUpPage.verifyFormBtnDisabledWithoutAnyInput();
    });

    it('should have submit button disabled without class selection even with valid name', async () => {
        await SignUpPage.verifyFormBtnDisabledWithoutClassSelection();
    });

    it('should have submit button disabled without batch selection', async () => {
        await SignUpPage.verifyFormBtnDisabledWithoutBatch();
    });

    it('should have submit button disabled without group selection', async () => {
        await SignUpPage.verifyFormBtnDisabledWithoutGroup();
    });

    it('should have submit button Enabled with all fields filled', async () => {
        await SignUpPage.verifyFormBtnEnabledWithAllFieldsFilled();
    });

    it('should have submit button disabled with less than 3 letter name', async () => {
        await SignUpPage.verifyFormBtnDisabledWithLessThan3LetterName('f');
    });

    it('should have submit button enabled with 3 letter name and other all fill up', async () => {
        await SignUpPage.verifyFormBtnEnabledWith3LetterName('far');
    });

    it('should have submit button disabled when changing class', async () => {
        await SignUpPage.verifyFormBtnDisabledWhenChangingClass();
    });

    it('should fill student form and submit', async () => {
        await SignUpPage.fillStudentForm(registrationData.studentName);
        await SignUpPage.selectFemaleGender();
        await SignUpPage.selectClass(contentText.studentFormPage.classList[5]);
        await SignUpPage.selectBatch(contentText.studentFormPage.classBatchMap[contentText.studentFormPage.classList[5]].batches[0]);
        await SignUpPage.selectGroup(contentText.studentFormPage.groupList[0]);
        await SignUpPage.stuSubmitStudentForm();
    });

    // ==================== Password Set Page ====================

    it('should display password set page content correctly', async () => {
        await PasswordSetContent.stuPasswordSetContent();
    });

    it('should show Student Form screen after clicking back button', async () => {
        await PasswordSetContent.verifyeBackButtonGoesToFormPage();
    });

    it('should have save button disabled without any password input', async () => {
        await SignUpPage.stuSubmitStudentForm();
        await SignUpPage.verifyPasswordSaveBtnDisabledWithoutInput();
    });

    it('should have save button disabled with only password and no confirm password', async () => {
        await SignUpPage.verifyPasswordSaveBtnDisabledWithOnlyPassword();
    });

    it('should have save button disabled with wrong confirm password', async () => {
        await SignUpPage.verifyPasswordSaveBtnDisabledWithWrongConfirm();
    });

    it('should show error message for mismatched confirm password', async () => {
        await SignUpPage.verifyPasswordMismatchError();
    });

    it('should have save button enabled with correct matching passwords', async () => {
        await SignUpPage.verifyPasswordSaveBtnEnabledWithCorrectPasswords();
    });

    it('should show success message for correct confirm password', async () => {
        await SignUpPage.verifyPasswordCorrectMessage();
    });

    // // ==================== Complete Registration ====================

    it('should complete registration successfully', async () => {
        await SignUpPage.submitPassword();
        await RegistrationSuccessContent.registrationSuccessContent();
        saveRegisteredNumber(newNumber);
    });

    it('Complete Registration', async () => {
        await SignUpPage.registerAsStudent(newNumber);
        saveRegisteredNumber(newNumber);
    });

    it('should navigate to home after clicking homepage button', async () => {
        await driver.pause(5000);
        await RegistrationSuccessContent.clickHomeBtn();
        await driver.pause(5000);
        await BasePage.handleLocationSharing();
        await expect(SchoolFormPage.schoolFormHeader).toBeDisplayed();
    });

    

});

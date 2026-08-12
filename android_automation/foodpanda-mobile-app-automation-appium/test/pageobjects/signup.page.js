const { $, expect } = require('@wdio/globals');
const  BasePage = require('../data/util');
const { registrationData, contentText, invalidData } = require('../data/testdata');
const UserTypeContentPage = require('./usertypecontent.page');
const StudentFormContent = require('./studentformcontentp.page');
const PasswordSetContent = require('./passwordsetcontent.page');

class SignUpPage{

    // ==================== LOCATORS ====================

    // Number input page locators
    get inputUsernumber() { 
       return $('android=new UiSelector().className("android.widget.EditText")');
    }

    get numberSubmitBtn() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    // OTP page locators
    get otp() {
        return $('android=new UiSelector().className("android.widget.EditText")');
    }

    get submitOtpBtn() { 
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    get studentSubmitBtn() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    get parentSubmitBtn() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    // Student form locators
    get inputUserName() {
        return $('android=new UiSelector().className("android.widget.EditText")');
    }

    get submitStudentForm(){
        return $('android=new UiSelector().className("android.widget.Button").instance(1)');
    }

    //Parent form locators
    get parInputUserName(){
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    get parStuInputUserName(){
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    get SubmitParentForm(){
        return $('android=new UiSelector().className("android.widget.Button").instance(1)');
    }

    //password set page locators
    get studentPasswordSubmitBtn() {
        return $('android=new UiSelector().className("android.widget.Button").instance(1)');
    }

    // Registration success page locators
    get homePageBtn() {
        return $('android=new UiSelector().className("android.widget.Button")');
    }

    // ==================== INVALID SCENARIO LOCATORS ====================//
    
    // =============== NUMBER INPUT PAGE - ERROR LOCATORS ==========
    get invalidNumberWarning() {
        return $('android=new UiSelector().text("দয়া করে সঠিক মোবাইল নম্বর ব্যবহার করো")');
    }
    // ==================== OTP PAGE - ERROR LOCATORS ====================

    get invalidOtpWarning() {
        return $('android=new UiSelector().text("OTP সঠিক হয়নি")');
    }


    // ==================== PASSWORD PAGE - ERROR LOCATORS ====================

    get passwordMismatchError() {
        return $('android=new UiSelector().text("পাসওয়ার্ড সঠিক নয়")');
    }

    get passwordCorrectText() {
        return $('android=new UiSelector().text("সঠিক")');
    }



    // ==================== Action Methods ====================//

    async clear(){
        await this.inputUserName.clearValue();
    }

    async enterNumber(number) {
        await this.inputUsernumber.setValue(number);
    }

    async submitNumber() {
        await this.numberSubmitBtn.click();
    }

    async enterOtp(otp) {
        const otpPageHeader = $(`android=new UiSelector().text("${contentText.otpPage.headerText}")`);
        await otpPageHeader.waitForDisplayed({ timeout: 10000 });
        await this.otp.setValue(otp);
    }

    async submitOtp() {
        await this.submitOtpBtn.click();
    }

    async selectStudentType() {
        await UserTypeContentPage.studentOption.waitForDisplayed({ timeout: 10000 });
        await UserTypeContentPage.studentOption.click();
    }

    async submitStudentType() {
        await this.studentSubmitBtn.waitForDisplayed({ timeout: 10000 });
        await this.studentSubmitBtn.click();
    }

    async selectParentType() {
        await UserTypeContentPage.guardianOption.waitForDisplayed({ timeout: 10000 });
        await UserTypeContentPage.guardianOption.click();
    }

    async submitParentType() {
        await this.parentSubmitBtn.click();
    }

    async fillStudentForm(name) {
        await BasePage.scrollUpToElement(contentText.studentFormPage.nameLabel);
        await this.inputUserName.waitForDisplayed({ timeout: 10000 });
        await this.inputUserName.clearValue();
        await this.inputUserName.setValue(name);
    }

    async fillParentForm(parName,parStuName) {
        await BasePage.scrollUpToElement(contentText.parentFormPage.parentNameLabel);
        await this.parInputUserName.waitForDisplayed({ timeout: 10000 });
        await this.parInputUserName.clearValue();
        await this.parInputUserName.setValue(parName);

        await this.parStuInputUserName.waitForDisplayed({ timeout: 10000 });
        await this.parStuInputUserName.clearValue();
        await this.parStuInputUserName.setValue(parStuName);
    }

    async selectMaleGender() {
        await StudentFormContent.maleOption.click();
    }

    async selectFemaleGender() {
        await StudentFormContent.femaleOption.click();
    }

    async selectClass(className) {
        const classEl = $(`//android.widget.TextView[@text="${className}"]`);
        await classEl.click();
        //await this.scrollToElement(className);
        //await BasePage.swipeUp();
    }

    async selectBatch(batchName) {
        // 1. Scroll until the text is found and visible
        await BasePage.scrollToElement(batchName,5);
    // 2. Click the element (it is now guaranteed to be on screen)
        const batchEl = $(`android=new UiSelector().text("${batchName}")`);
       // await batchEl.waitForExist({ timeout: 5000 });
        //await BasePage.swipeUp();
        await batchEl.click();
    }

    async selectGroup(groupName) {
        await BasePage.scrollToElement(groupName,5);
        const groupEl = $(`android=new UiSelector().text("${groupName}")`);
        await groupEl.click();
    }

    async stuSubmitStudentForm() {
        await this.submitStudentForm.click();
    }

    async parSubmitStudentForm(){
        await this.SubmitParentForm.click(); 
    }

    async backButton() {
        await StudentFormContent.backBtnText.click(); 
    }

    async setPassword() {
        await PasswordSetContent.passwordInput.setValue(registrationData.password);
        await PasswordSetContent.confirmPasswordInput.setValue(registrationData.confirmpassword); 
    }

    async submitPassword() {
        await this.studentPasswordSubmitBtn.click();
    }

    async goToHomePage() {
        await this.homePageBtn.click();
    } 

    // Full registration flow
    async registerAsStudent(number) {
        await this.enterNumber(number);
        await this.submitNumber();
        await this.enterOtp(registrationData.otp);
        await this.submitOtp();
        await this.selectStudentType();
        await this.submitStudentType();
        await this.fillStudentForm(registrationData.studentName);
        await this.selectFemaleGender();
        await this.selectClass(contentText.studentFormPage.classList[5]);
        await this.selectBatch(contentText.studentFormPage.classBatchMap[contentText.studentFormPage.classList[5]].batches[0]);
        await this.selectGroup(contentText.studentFormPage.groupList[0]);
        await this.stuSubmitStudentForm();
        await this.setPassword();
        await this.submitPassword();
    }



    //==================== Invalid scenarios related to number input page ====================//

    // ==================== NUMBER INPUT - VALIDATION METHODS ====================

    // Button disabled/enabled scenarios
    async verifyBtnDisabledWhenEmpty() {
        await this.inputUsernumber.clearValue();
        await BasePage.hideKeyboard();
        await expect(this.numberSubmitBtn).not.toBeEnabled();
    }

    async verifyBtnDisabledWithLessThan11Digits(shortNumber) {
        await this.inputUsernumber.clearValue();
        await this.inputUsernumber.setValue(shortNumber);
        await BasePage.hideKeyboard();
        await expect(this.numberSubmitBtn).not.toBeEnabled();
    }

    async verifyBtnDisabledWithoutCheckbox(number) {
        await this.inputUsernumber.clearValue();
        await this.inputUsernumber.setValue(number);
        await BasePage.hideKeyboard();
        const checkbox = $('android=new UiSelector().className("android.widget.CheckBox")');
        const isChecked = await checkbox.getAttribute('checked');
        if (isChecked === 'true') {
            await checkbox.click();
        }
        await expect(this.numberSubmitBtn).not.toBeEnabled();
    }

    async verifyBtnEnabledWith11DigitsAndCheckbox(number) {
        await this.inputUsernumber.clearValue();
        await this.inputUsernumber.setValue(number);
        await BasePage.hideKeyboard();
        const checkbox = $('android=new UiSelector().className("android.widget.CheckBox")');
        const isChecked = await checkbox.getAttribute('checked');
        if (isChecked !== 'true') {
            await checkbox.click();
        }
        await expect(this.numberSubmitBtn).toBeEnabled();
    }


    //Invalid number warning scenarios
    async submitInvalidNumber() {
        await this.inputUsernumber.clearValue();
        await this.inputUsernumber.setValue(invalidData.invalidNumber);
        await BasePage.hideKeyboard();
        await this.numberSubmitBtn.click();
    }

    async verifyInvalidNumberWarning() {
        await this.invalidNumberWarning.waitForDisplayed({ timeout: 5000 });
        await expect(this.invalidNumberWarning).toBeDisplayed();
    }

    async verifyWarningRemovedAfterChange(validNumber) {
        await this.inputUsernumber.clearValue();
        await this.inputUsernumber.setValue(validNumber);
        await BasePage.hideKeyboard();
        await expect(this.invalidNumberWarning).not.toBeDisplayed();
    }

    // ==================== OTP - VALIDATION METHODS ====================

    // Button disabled/enabled scenarios
    async verifyOtpBtnDisabledWithoutFullOtp() {
        await expect(this.submitOtpBtn).not.toBeEnabled();
    }

    async verifyOtpBtnDisabledWithPartialOtp(partialOtp) {
        await this.otp.setValue(partialOtp);
        await BasePage.hideKeyboard();
        await expect(this.submitOtpBtn).not.toBeEnabled();
    }

    async verifyOtpBtnEnabledWithFullOtp() {
        await this.otp.setValue('\uE003\uE003\uE003\uE003');
        await this.otp.setValue(registrationData.otp);
        await BasePage.hideKeyboard();
        await expect(this.submitOtpBtn).toBeEnabled();
    }

    // Invalid OTP warning scenarios
    async submitInvalidOtp() {
        await this.otp.setValue('\uE003\uE003\uE003\uE003');
        await this.otp.setValue(invalidData.invalidOtp);
        await BasePage.hideKeyboard();
        await this.submitOtpBtn.click();
    }

    async verifyInvalidOtpWarning() {
        await this.invalidOtpWarning.waitForDisplayed({ timeout: 5000 });
        await expect(this.invalidOtpWarning).toBeDisplayed();
    }

    async verifyOtpWarningRemovedAfterClear() {
        await this.otp.setValue('\uE003\uE003\uE003\uE003');
        await expect(this.invalidOtpWarning).not.toBeDisplayed();
    }

    // ==================== USER TYPE - VALIDATION METHODS ====================
    
    // Button disabled/enabled scenarios
    async verifyUserTypeBtnDisabledWithoutSelection() {
        await expect(this.studentSubmitBtn).not.toBeEnabled();
    }
    
    async verifyUserTypeBtnEnabledAfterSelection() {
        await this.selectStudentType();
        await expect(this.studentSubmitBtn).toBeEnabled();
    }

    //parent
    async verifyUserTypeParentBtnEnabledAfterSelection() {
        await this.selectParentType();
        await expect(this.studentSubmitBtn).toBeEnabled();
    }

    // ==================== STUDENT FORM - VALIDATION METHODS ====================

    // Button disabled/enabled scenarios
    async verifyFormBtnDisabledWithoutAnyInput() {
        await expect(this.submitStudentForm).not.toBeEnabled();
    }

    async verifyFormBtnDisabledWithLessThan3LetterName(shortName) {
        await BasePage.scrollUpToElement(contentText.studentFormPage.nameLabel);
        await this.inputUserName.clearValue();
        await this.inputUserName.setValue(shortName);
        await BasePage.hideKeyboard();
        await expect(this.submitStudentForm).not.toBeEnabled();
    }

    async verifyFormBtnEnabledWith3LetterName(name) {
        await this.inputUserName.clearValue();
        await this.inputUserName.setValue(name);
        await BasePage.hideKeyboard();
        await expect(this.submitStudentForm).toBeEnabled();
    }

    async verifyFormBtnDisabledWithoutClassSelection() {
        await this.inputUserName.clearValue();
        await this.inputUserName.setValue(registrationData.studentName);
        await BasePage.hideKeyboard();
        await expect(this.submitStudentForm).not.toBeEnabled();
    }

    async verifyFormBtnDisabledWithoutBatch(className) {
        await this.inputUserName.clearValue();
        await this.inputUserName.setValue(registrationData.studentName);
        await this.selectClass(contentText.studentFormPage.classList[5]);
        await expect(this.submitStudentForm).not.toBeEnabled();
    }

    async verifyFormBtnDisabledWithoutGroup(batchName) {
        await this.selectBatch(contentText.studentFormPage.classBatchMap[contentText.studentFormPage.classList[5]].batches[0]);
        await expect(this.submitStudentForm).not.toBeEnabled();
    }

    async verifyFormBtnDisabledWhenChangingClass() {
        // await BasePage.scrollToElement(contentText.studentFormPage.classLabel);
        // await this.inputUserName.clearValue();
        // await this.inputUserName.setValue(registrationData.studentName);
        await this.selectClass(contentText.studentFormPage.classList[4]);
        await expect(this.submitStudentForm).not.toBeEnabled();
    }

    async verifyFormBtnEnabledWithAllFieldsFilled() {
        // await this.inputUserName.clearValue();
        // await this.inputUserName.setValue(registrationData.studentName);
        await this.selectGroup(contentText.studentFormPage.groupList[0]);
        await expect(this.submitStudentForm).toBeEnabled();
    }
    


    // ==================== PASSWORD - VALIDATION METHODS ====================

    // Button disabled/enabled scenarios
    async verifyPasswordSaveBtnDisabledWithoutInput() {
        await expect(this.studentPasswordSubmitBtn).not.toBeEnabled();
    }

    async verifyPasswordSaveBtnDisabledWithOnlyPassword() {
        await PasswordSetContent.passwordInput.setValue(registrationData.password);
        await expect(this.studentPasswordSubmitBtn).not.toBeEnabled();
    }

    async verifyPasswordSaveBtnDisabledWithWrongConfirm() {
        //await PasswordSetContent.passwordInput.clearValue();
        await PasswordSetContent.passwordInput.setValue('\uE003\uE003\uE003\uE003\uE003\uE003');
        await PasswordSetContent.passwordInput.setValue(registrationData.password);
        await PasswordSetContent.confirmPasswordInput.setValue(invalidData.invalidPassword);
        await expect(this.studentPasswordSubmitBtn).not.toBeEnabled();
    }

    async verifyPasswordSaveBtnEnabledWithCorrectPasswords() {
        //await PasswordSetContent.passwordInput.clearValue();
        //await PasswordSetContent.confirmPasswordInput.clearValue();
        //await PasswordSetContent.passwordInput.setValue(registrationData.password);
        await PasswordSetContent.confirmPasswordInput.setValue('\uE003\uE003\uE003\uE003\uE003\uE003');
        await PasswordSetContent.confirmPasswordInput.setValue(registrationData.confirmpassword);
        await expect(this.studentPasswordSubmitBtn).toBeEnabled();
    }

    // Password error/success message scenarios
    async verifyPasswordMismatchError() {
        await this.passwordMismatchError.waitForDisplayed({ timeout: 5000 });
        await expect(this.passwordMismatchError).toBeDisplayed();
    }

    async verifyPasswordCorrectMessage() {
        await this.passwordCorrectText.waitForDisplayed({ timeout: 5000 });
        await expect(this.passwordCorrectText).toBeDisplayed();
    }


    //===================== Parent Form - Validation Methods =========================

    async verifyParentNameButChildNameEmptyBtnDisabled(){
        await this.fillParentForm(registrationData.parentName, "");
        await BasePage.hideKeyboard();
        await expect(this.SubmitParentForm).toBeDisabled();
    }

    async verifyChildNameButParentNameEmptyBtnDisabled(){
        await this.fillParentForm("",registrationData.studentName); 
        await BasePage.hideKeyboard();
        await expect(this.SubmitParentForm).toBeDisabled();
    }

    async verifyParentFormBtnDisabledWithLessThan3LetterNameNoChildName(shortName){
        await this.fillParentForm(shortName, "");
        await BasePage.hideKeyboard();
        await expect(this.SubmitParentForm).toBeDisabled();
    }

    async verifyParentFormBtnDisabledWithLessThan3LetterNameWithChildName(shortName,childName){
        await this.fillParentForm(shortName,childName);
        await BasePage.hideKeyboard();
        await expect(this.SubmitParentForm).toBeDisabled();
    }
    
    async verifyParentFormBtnDisabledWithLessThan3LetterChildName(parentName,shortName){
        await this.fillParentForm(parentName, shortName);
        await BasePage.hideKeyboard();
        await expect(this.SubmitParentForm).toBeDisabled();
    }

    async verifyParentFormBtnDisabledWithLessThan3LetterChildNameWithParentName(shortName){
        await this.fillParentForm("", shortName);
        await BasePage.hideKeyboard();
        await expect(this.SubmitParentForm).toBeDisabled();
    }

    async verifyParentFormBtnEnabledWithValidParentndChildName(parentName,childName){
        await this.fillParentForm(parentName, childName);
        await BasePage.hideKeyboard();
        await expect(this.SubmitParentForm).toBeEnabled();
    }

    async verifyParentFormBtnDisabledWithoutClassSelection() {
        await this.fillParentForm(registrationData.parentName, registrationData.studentName);
        await BasePage.hideKeyboard();
        await expect(this.SubmitParentForm).not.toBeEnabled();
    }

    async verifyParentFormBtnDisabledWithoutBatch(className) {
        // await this.fillParentForm(registrationData.parentName, registrationData.studentName);
        // await BasePage.hideKeyboard();
        await BasePage.scrollToEndByForward(1);
        await this.selectClass(contentText.studentFormPage.classList[5]);
        await expect(this.SubmitParentForm).not.toBeEnabled();
    }

    async verifyParentFormBtnDisabledWithoutGroup(batchName) {
        await this.selectBatch(contentText.studentFormPage.classBatchMap[contentText.studentFormPage.classList[5]].batches[0]);
        await expect(this.SubmitParentForm).not.toBeEnabled();
    }

    async verifyParentFormBtnEnabledWithAllFieldsFilled() {
        // await this.parInputUserName.clearValue();
        // await this.fillParentForm(registrationData.parentName, registrationData.studentName);
        await this.selectGroup(contentText.studentFormPage.groupList[0]);
        await expect(this.SubmitParentForm).toBeEnabled();
    }

    async verifyParentFormBtnDisabledWhenChangingClass() {
        // await BasePage.scrollToElement(contentText.studentFormPage.classLabel);
        // await this.inputUserName.clearValue();
        // await this.inputUserName.setValue(registrationData.studentName);
        await BasePage.scrollToEndByForward(1);
        await this.selectClass(contentText.studentFormPage.classList[4]);
        await expect(this.SubmitParentForm).not.toBeEnabled();
    }
}

module.exports = new SignUpPage();

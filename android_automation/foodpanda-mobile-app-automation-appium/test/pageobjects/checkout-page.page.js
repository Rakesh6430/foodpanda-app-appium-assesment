const { $, expect, driver } = require('@wdio/globals');
const { checkoutData, paymentMethodData, registrationData,loginData,courseData,mandatoryProfileData, invalidData} = require('../data/testdata');
const BasePage = require('../data/util');
const CourseDetails = require('../pageobjects/course.page');
const FreeUserHomepage = require('./free-user-homepage.page');

class CheckoutPage {

    //======================== CHECKOUT PAGE LOCATOR =========================

    get checkOutPageTitle() {
        return $(`android=new UiSelector().text("${checkoutData.pageTitle}")`)
    }
    get backNavIcon() {
        return $('~Nav Icon');
    }
    get admissionDurationTitle() {
        return $(`android=new UiSelector().text("${checkoutData.admissionDurationTitle}")`)
    }
    get phaseInfo() {
        return $('android=new UiSelector().className("android.view.View").instance(8)');
    }
    get promoSectionTitle() {
        return $(`android=new UiSelector().text("${checkoutData.promoSectionTitle}")`)
    }
    get promofieldPlaceholder() {
        return $(`android=new UiSelector().text("${checkoutData.promoPlaceholeder}")`)
    }
    get promoInputField() {
        return $('android=new UiSelector().className("android.widget.EditText")');
    }
    get promoSubmitBtnText() {
        return $(`android=new UiSelector().text("${checkoutData.promoSubmitBtn}")`)
    }
    get promoSubmitButton() {
        return $('android=new UiSelector().className("android.widget.Button").instance(0)');
    }
    get wrongPromoWarningText() {
        return $(`android=new UiSelector().text("${checkoutData.wrongPromoText}")`);
    }
    get correctPromoSuccessText() {
        return $(`android=new UiSelector().text("${checkoutData.correctPromoSuccessText}")`);
    }
    get correctPromoText() {
        return $(`android=new UiSelector().text("${checkoutData.correctPromoText}")`);
    }
    get promoIcon() {
        return $('~Promo Code Icon');
    }
    get promoEditButton() {
        return $('~Edit Icon');
    }
    get admissionDetailsTitle() {
        return $(`android=new UiSelector().text("${checkoutData.admissionDetailsSectionTitle}")`);
    }
    get courseStartText() {
        return $(`android=new UiSelector().text("${checkoutData.courseStartDateText}")`);
    }
    get admissionFeeText() {
        return $(`android=new UiSelector().text("${checkoutData.admissionFeeText}")`);
    }
    get discountText() {
        return $(`android=new UiSelector().text("${checkoutData.discountText}")`);
    }
    get termandCondition() {
        return $(`android=new UiSelector().text("${checkoutData.termsText}")`);
    }
    get checkboxBtn1() {
        return $('android=new UiSelector().className("android.widget.CheckBox").instance(0)');
    }
    get refundPolicy() {
        return $(`android=new UiSelector().text("${checkoutData.refundPolicyText}")`);
    }
    get checkboxBtn2() {
        return $('android=new UiSelector().className("android.widget.CheckBox").instance(1)');
    }
    get totalFeeText() {
        return $(`android=new UiSelector().text("${checkoutData.totalText}")`);
    }
    get checkoutButtonText() {
        return $(`android=new UiSelector().text("${checkoutData.admitProgramBtnText}")`);
    }
    get checkoutButton() {
        return $(`//android.widget.TextView[@text="প্রোগ্রামে ভর্তি হও"]/following-sibling::android.widget.Button`);//return $('android=new UiSelector().className("android.widget.Button").instance(1)');
    }

    //========================= PAYMENT METHOD LOCATOR ==========================

    get courseCard() {
        return $("~Course image");
    }
    get paymentMethodText() {
        return $(`android=new UiSelector().text("${paymentMethodData.pageTitle}")`);
    }
    get bkashCard() {
        return $(`android=new UiSelector().text("${paymentMethodData.bkashText}")`);
    }
    get bkashNextBtn() {
        return $('android=new UiSelector().className("android.view.View").instance(8)');
    }
    get bkashBtn() {
        return $('android=new UiSelector().className("android.view.View").instance(7)');
    }
    get sslCard() {
        return $(`android=new UiSelector().text("${paymentMethodData.sslText}")`);
    }
    get sslNextBtn() {
        return $('android=new UiSelector().className("android.view.View").instance(11)');
    }
    get securePaymentIcon() {
        return $('~Secure Payment');
    }
    get securityText() {
        return $(`android=new UiSelector().text("${paymentMethodData.securityText}")`);
    }



    //======================== BKASH PAGE LOCATOR =======================

    get bkashLogoIcon() {
        return $(`android=new UiSelector().text("${paymentMethodData.bkashLogo}")`);
    }
    get bkashInputLabel() {
        return $(`android=new UiSelector().text("${paymentMethodData.bkashInputLabel}")`);
    }
    get bkashInputField() {
        return $('android=new UiSelector().resourceId("WALLET")');
    }
    get bkashSubText() {
        return $(`android=new UiSelector().text("${paymentMethodData.bkashSubText}")`);
    }
    get bkashCancelBtn() {
        return $(`android=new UiSelector().text("${paymentMethodData.bkashCancel}")`);
    }
    get bkashConfirmBtnText() {
        return $(`android=new UiSelector().text("${paymentMethodData.bkashConfirm}")`);
    }
    get bkashConfirmBtn() {
        return $(`android=new UiSelector().className("android.widget.Button").text("${paymentMethodData.bkashConfirm}")`);
    }
    get bkashOtpInputField() {
        return $('android=new UiSelector().resourceId("OTP")'); 
    }
    get bkashPINInputField() {
        return $('android=new UiSelector().resourceId("PIN")'); 
    }


    //============================ Payment Success =================================

    get paymentSuccessText1() {
        return $(`android=new UiSelector().text("${paymentMethodData.paymentSuccessMsg1}")`); 
    }
    get paymentSuccessText2() {
        return $(`android=new UiSelector().text("${paymentMethodData.paymentSuccessMsg2}")`); 
    }
    get userNameLabel() {
        return $(`android=new UiSelector().text("${paymentMethodData.name}")`); 
    }
    get userName() {
        return $(`android=new UiSelector().text("${registrationData.studentName}")`); 
    }
    get phoneNumberLabel() {
        return $(`android=new UiSelector().text("${paymentMethodData.phoneNumbr}")`); 
    }
    get phoneNumber() {
        return $(`android=new UiSelector().text("${loginData.validNumber}")`); 
    }
    get courseNameLabel() {
        return $(`android=new UiSelector().text("${paymentMethodData.courseName}")`); 
    }
    get courseName() {
        return $(`android=new UiSelector().text("${courseData.otherCourse.courseName}")`); 
    }
    get paymentIDLabel() {
        return $(`android=new UiSelector().text("${paymentMethodData.paymentID}")`); 
    }
    get paymentAmountLabel() {
        return $(`android=new UiSelector().text("${paymentMethodData.paymentAmount}")`); 
    }
    get paymentMethodLabel() {
        return $(`android=new UiSelector().text("${paymentMethodData.paymentMethod}")`); 
    }
    get startLearningBtnText() {
        return $(`android=new UiSelector().text("${paymentMethodData.startLearningBtn}")`); 
    }
    get startLearningBtn() {
        return $('android=new UiSelector().className("android.widget.Button")'); 
    }

    get profileModalTitle() {
        return $(`android=new UiSelector().text("${mandatoryProfileData.modalTitle}")`); 
    }


    //======================== CHECKOUT VALIDATION =======================

    async verifyCheckOutPageTitle() {
        await expect(this.checkOutPageTitle).toBeDisplayed();
        await expect(this.checkOutPageTitle).toHaveText(checkoutData.pageTitle);
    }

    async verifyBackNavIcon() {
        await expect(this.backNavIcon).toBeDisplayed();
    }

    async verifyAdmissionDurationTitle() {
        await expect(this.admissionDurationTitle).toBeDisplayed();
        await expect(this.admissionDurationTitle).toHaveText(checkoutData.admissionDurationTitle);
    }

    async verifyPhaseInfo() {
        await expect(this.phaseInfo).toBeDisplayed();
    }

    //promo Section
    async verifyPromoSectionTitle() {
        await expect(this.promoSectionTitle).toBeDisplayed();
        await expect(this.promoSectionTitle).toHaveText(checkoutData.promoSectionTitle);
    }

    async verifyPromoFieldPlaceholderText() {
        await expect(this.promofieldPlaceholder).toBeDisplayed();
        await expect(this.promofieldPlaceholder).toHaveText(checkoutData.promoPlaceholeder);
    }

    async verifyPromoSubmitButton() {
        await expect(this.promoSubmitButton).toBeDisplayed();
        await expect(this.promoSubmitBtnText).toBeDisplayed();
        await expect(this.promoSubmitBtnText).toHaveText(checkoutData.promoSubmitBtn);
    }

    async verifyWrongPromoWarning() {
        await expect(this.wrongPromoWarningText).toBeDisplayed();
        await expect(this.wrongPromoWarningText).toHaveText(checkoutData.wrongPromoText);
    }

    async verifyCorrectPromo() {
        await expect(this.promoIcon).toBeDisplayed();
        await expect(this.correctPromoSuccessText).toBeDisplayed();
        await expect(this.correctPromoSuccessText).toHaveText(checkoutData.correctPromoSuccessText);
        await expect(this.correctPromoText).toBeDisplayed();
        await expect(this.correctPromoText).toHaveText(checkoutData.correctPromoText);
        await expect(this.promoEditButton).toBeDisplayed();
    }


    async verifyPromoBtnDisabledWithoutPromoInput() {
        await expect(this.promoSubmitButton).not.toBeEnabled();
    }

    async verifyPromoBtnDisabledWithInvalidPromoCode() {
        await this.promoInputField.setValue(invalidData.invalidPromo);
        await this.submitPromoCode();
        await this.verifyWrongPromoWarning();
        //await expect(this.promoSubmitButton).toBeDisabled();
    }

    async verifyPromoBtnEnableddWithPromoInput() {
        await this.setPromoInput();
        await expect(this.promoSubmitButton).toBeEnabled();
    }

    async verifySuccessMessageToValidPromoCode() {
        await this.promoInputField.setValue(checkoutData.promoCode);
        await this.submitPromoCode();
        await this.verifyCorrectPromo();
    }


    //admission details section

    async verifyAdmissionDetailsTitle() {
        await expect(this.admissionDetailsTitle).toBeDisplayed();
        await expect(this.admissionDetailsTitle).toHaveText(checkoutData.admissionDetailsSectionTitle)
    }

    async verifyCourseStartDateText() {
        await expect(this.courseStartText).toBeDisplayed();
        await expect(this.courseStartText).toHaveText(checkoutData.courseStartDateText);
    }
    async verifyAdmissionFee() {
        await expect(this.admissionFeeText).toBeDisplayed();
        await expect(this.admissionFeeText).toHaveText(checkoutData.admissionFeeText);
    }
    async verifyDiscountText() {
        await expect(this.discountText).toBeDisplayed();
        await expect(this.discountText).toHaveText(checkoutData.discountText);
    }

    async verifyTermandConditionText() {
        await expect(this.termandCondition).toBeDisplayed();
        await expect(this.termandCondition).toHaveText(checkoutData.termsText);
    }

    async verifyRefundPolicyText() {
        await expect(this.refundPolicy).toBeDisplayed();
        await expect(this.refundPolicy).toHaveText(checkoutData.refundPolicyText);
    }

    async verifyCheckBox() {
        await expect(this.checkboxBtn1).toBeDisplayed();
        await expect(this.checkboxBtn2).toBeDisplayed();
    }

    async verifyTotalFeeText() {
        await expect(this.totalFeeText).toBeDisplayed();
        await expect(this.totalFeeText).toHaveText(checkoutData.totalText);
    }

    async verifyCheckoutButton() {
        await expect(this.checkoutButton).toBeDisplayed();
        await expect(this.checkoutButton).toBeEnabled();
        await expect(this.checkoutButtonText).toBeDisplayed();
        await expect(this.checkoutButtonText).toHaveText(checkoutData.admitProgramBtnText);
    }

    async verifyAdmitBtnDisabledWithoutTermCheckbox() {
         await BasePage.scrollToElement(checkoutData.refundPolicyText,5);

        const isChecked1 = await this.checkboxBtn1.getAttribute('checked');
        const isChecked2 = await this.checkboxBtn2.getAttribute('checked');
        // Terms আনচেক করতে হবে
        if (isChecked1 === 'true') { await this.checkboxBtn1.click(); }
        // Refund চেক রাখতে হবে
        if (isChecked2 !== 'true') { await this.checkboxBtn2.click(); }
        await driver.pause(500);
        await expect(this.checkoutButton).not.toBeEnabled();
    }

    async verifyAdmitBtnDisabledWithoutRefundPolicyCheckbox() {
        const isChecked1 = await this.checkboxBtn1.getAttribute('checked');
        const isChecked2 = await this.checkboxBtn2.getAttribute('checked');
        // Terms চেক রাখতে হবে
        if (isChecked1 !== 'true') { await this.checkboxBtn1.click(); }
        // Refund আনচেক করতে হবে
        if (isChecked2 === 'true') { await this.checkboxBtn2.click(); }

        await driver.pause(500);
        await expect(this.checkoutButton).not.toBeEnabled();
    }

    async verifyAdmitBtnDisabledWithoutBothCheckbox() {
        const isChecked1 = await this.checkboxBtn1.getAttribute('checked');
        const isChecked2 = await this.checkboxBtn2.getAttribute('checked');
        // দুটোকেই আনচেক করতে হবে
        if (isChecked1 === 'true') { await this.checkboxBtn1.click(); }
        if (isChecked2 === 'true') { await this.checkboxBtn2.click(); }

        await driver.pause(500);
        await expect(this.checkoutButton).not.toBeEnabled();
    }

    async verifyAdmitBtnEnabledWithTermandRefundPolicyCheckbox() {
        const isChecked1 = await this.checkboxBtn1.getAttribute('checked');
        const isChecked2 = await this.checkboxBtn2.getAttribute('checked');
        // দুটোকেই চেক করতে হবে
        if (isChecked1 !== 'true') { await this.checkboxBtn1.click(); }
        if (isChecked2 !== 'true') { await this.checkboxBtn2.click(); }
        await driver.pause(500);
        await expect(this.checkoutButton).toBeEnabled();
    }

    async verifyBackBtnGoesToCourseDetails() {
        await this.clickNavBackButton();
        await CourseDetails.verifyQuarterPhaseText();
    }


    async CheckoutPageContent() {
        await this.verifyCheckOutPageTitle();
        await this.verifyBackNavIcon();
        await this.verifyAdmissionDurationTitle();
        await this.verifyPhaseInfo();
        await this.verifyPromoSectionTitle();
        await this.verifyPromoFieldPlaceholderText();
        await this.verifyPromoSubmitButton();
        await BasePage.scrollToElement(checkoutData.admissionDetailsSectionTitle,5);
        await this.verifyAdmissionDetailsTitle();
        await this.verifyCourseStartDateText();
        await this.verifyAdmissionFee();
        await this.verifyDiscountText();
        await this.verifyTermandConditionText();
        await BasePage.scrollToElement(checkoutData.refundPolicyText,5);
        await this.verifyRefundPolicyText();
        await this.verifyCheckBox();
        await this.verifyTotalFeeText();
        await this.verifyCheckoutButton();
    }

    //========================== CHECKOUT Action ==========================

    async clickNavBackButton() {
        await this.backNavIcon.click();
    }

    async clickPromoInput() {
        await this.promoInputField.click();
    }

    async setPromoInput() {
        await this.promoInputField.setValue(checkoutData.promoCode);
    }

    async submitPromoCode() {
        await this.promoSubmitButton.click();
    }

    async editPromoButton() {
        await this.promoEditButton.click();
    }

    async submitCheckoutButton() {
        //await this.checkoutButton.waitForDisplayed({timeout: 10000,timeoutMsg: 'Checkout button not visible'});
        await this.checkoutButton.click();
        console.log('Checkout button clicked');
        await driver.pause(100000); 
    }


    //========================== PAYMENT METHOD VALIDATION ==========================

    async verifyCourseCard() {
        await expect(this.courseCard).toBeDisplayed();
        await expect(FreeUserHomepage.courseName).toBeDisplayed();
    }

    async verifyPaymentSectionTitle() {
       // await this.paymentMethodText.waitForDisplayed({timeout: 80000,timeoutMsg: 'Next screen did not load after checkout click'});
        await expect(this.paymentMethodText).toBeDisplayed();
        await expect(this.paymentMethodText).toHaveText(paymentMethodData.pageTitle);
    }

    async verifyBkashCard() {
        await expect(this.bkashCard).toBeDisplayed();
        await expect(this.bkashCard).toHaveText(paymentMethodData.bkashText);
    }

    async verifyBkashNextArrowButton() {
        await expect(this.bkashNextBtn).toBeDisplayed();
    }

    async verifySSLCard() {
        await expect(this.sslCard).toBeDisplayed();
        await expect(this.sslCard).toHaveText(paymentMethodData.sslText);
    }

    async verifySSLNextArrowButton() {
        await expect(this.sslNextBtn).toBeDisplayed();
    }

    async verifySecureText() {
        await expect(this.securePaymentIcon).toBeDisplayed();
        await expect(this.securityText).toBeDisplayed();
        await expect(this.securityText).toHaveText(paymentMethodData.securityText);
    }

    async paymentMethodContent() {
        await this.verifyCourseCard();
        await this.verifyPaymentSectionTitle();
        await this.verifyBkashCard();
        await this.verifyBkashNextArrowButton();
        await this.verifySSLCard();
        await this.verifySSLNextArrowButton();
        await this.verifySecureText();
    }


    //========================== PAYMENT METHOD ACTION ==========================

    async clickBkashCard() {
        await this.bkashBtn.click();
    }

    //========================== BKASH FLOW Validation ==========================

    async verifyBkashLogo() {
        await expect(this.bkashLogoIcon).toBeDisplayed();
    }

    async verifyBkashInputLabelText() {
        await expect(this.bkashInputLabel).toBeDisplayed();
        await expect(this.bkashInputLabel).toHaveText(paymentMethodData.bkashInputLabel);
    }

    async verifyBkashSubText() {
        await expect(this.bkashSubText).toBeDisplayed();
        await expect(this.bkashSubText).toHaveText(paymentMethodData.bkashSubText);
    }

    async verifyBkashInputField() {
        await expect(this.bkashInputField).toBeDisplayed();
    }

    async verifyBkashCancelButton() {
        await expect(this.bkashCancelBtn).toBeDisplayed();
        await expect(this.bkashCancelBtn).toHaveText(paymentMethodData.bkashCancel);
        await expect(this.bkashCancelBtn).toBeEnabled();
    }
    async verifyBkashConfirmButton() {
        await expect(this.bkashConfirmBtnText).toBeDisplayed();
        await expect(this.bkashConfirmBtnText).toHaveText(paymentMethodData.bkashConfirm);
        await expect(this.bkashConfirmBtn).toBeDisabled();
    }

    async verifyBkashNumberInputPageContent() {
        await this.verifyBkashLogo();
        await this.verifyBkashInputLabelText();
        await this.verifyBkashInputField();
        //await this.verifyBkashSubText();
        await this.verifyBkashCancelButton();
        await this.verifyBkashConfirmButton();
    }

    async verifyConfirmButtonEnabledWithValidInputNumber() {
        await this.enterBkashNumber();
        await expect(this.bkashConfirmBtn).toBeEnabled();
    }


    //========================== BKASH FLOW ACTION ==========================

    async enterBkashNumber() {
        await this.bkashInputField.click();
        await this.bkashInputField.setValue(paymentMethodData.bkashNumber);
        await BasePage.hideKeyboard();
    }

    async clickBkashCancelBtn() {
        await this.bkashCancelBtn.click();
    }

    async clickBkashConfirmBtn() {
        await this.bkashConfirmBtn.click();
    }

    async clickOTPInputField(){
        await this.bkashOtpInputField.click();
        await this.bkashOtpInputField.setValue(paymentMethodData.bkashVCode);
    }

    async clickPINInputField(){
        await this.bkashPINInputField.click();
        await this.bkashPINInputField.setValue(paymentMethodData.bkashPIN);
    }

    //=========================== Payment Success Screen =============================

    async verifySuccessPaymentMsg1(){
        await expect(this.paymentSuccessText1).toBeDisplayed();
        await expect(this.paymentSuccessText1).toHaveText(paymentMethodData.paymentSuccessMsg1);
    }
    
    async verifySuccessPaymentMsg2(){
        await expect(this.paymentSuccessText2).toBeDisplayed();
        await expect(this.paymentSuccessText2).toHaveText(paymentMethodData.paymentSuccessMsg2);
    }

    async verifyUserName(){
        await expect(this.userNameLabel).toBeDisplayed();
        await expect(this.userNameLabel).toHaveText(paymentMethodData.name);
        // await expect(this.userName).toBeDisplayed();
        // await expect(this.userName).toHaveText(registrationData.studentName);
    }

    async verifyPhoneNumber(){
        await expect(this.phoneNumberLabel).toBeDisplayed();
        await expect(this.phoneNumberLabel).toHaveText(paymentMethodData.phoneNumbr);
        // await expect(this.phoneNumber).toBeDisplayed();
        // await expect(this.phoneNumber).toHaveText(loginData.validNumber);
    }

    async verifyCourseName(){
        await expect(this.courseNameLabel).toBeDisplayed();
        await expect(this.courseNameLabel).toHaveText(paymentMethodData.courseName);
        // await expect(this.courseName).toBeDisplayed();
        // await expect(this.courseName).toHaveText(courseData.courseName);
    }

    async verifyPaymentIDLabel(){
        await expect(this.paymentIDLabel).toBeDisplayed();
        await expect(this.paymentIDLabel).toHaveText(paymentMethodData.paymentID);
    }

    async verifyPaymentAmountLabel(){
        await expect(this.paymentAmountLabel).toBeDisplayed();
        await expect(this.paymentAmountLabel).toHaveText(paymentMethodData.paymentAmount);
    }

    async verifyPaymentMethod(){
        await expect(this.paymentMethodLabel).toBeDisplayed();
        await expect(this.paymentMethodLabel).toHaveText(paymentMethodData.paymentMethod);
        // await expect(this.bkashCard).toBeDisplayed();
        // await expect(this.bkashCard).toHaveText(paymentMethodData.bkashText);
    }

    async verifyStartLearningButtonText(){
        await expect(this.startLearningBtnText).toBeDisplayed();
        await expect(this.startLearningBtnText).toHaveText(paymentMethodData.startLearningBtn);
    }

    async clickStartLearnButton(){
        await this.startLearningBtn.click();
    }


    async verifyProfileModalTitle(){
        await expect(this.profileModalTitle).toBeDisplayed();
        await expect(this.profileModalTitle).toHaveText(mandatoryProfileData.modalTitle);
    }




    //Bkash Purchase FLow
    async bkashPurchaseFlow(){
        await BasePage.scrollToEndByForward(5);
        await FreeUserHomepage.findotherCourse();
        await FreeUserHomepage.clickCourseButton();
        await BasePage.scrollToEndByForward(2);
        await CourseDetails.clickPorgramAdmitButton();
        await CourseDetails.clickSubmitModalButton();
        await CourseDetails.selectPhaseCard();
        await CourseDetails.clickPhaseSubmitButton();
        await this.setPromoInput();
        await this.submitPromoCode();
        await this.submitCheckoutButton();
        await this.clickBkashCard();
        await driver.pause(5000);
        await this.enterBkashNumber();
        await this.clickBkashConfirmBtn();
        await driver.pause(5000);
        await this.clickOTPInputField();
        await driver.pause(5000);
        await this.clickPINInputField();
        await driver.pause(5000);
        await this.clickStartLearnButton();

    }
    
}

module.exports = new CheckoutPage();

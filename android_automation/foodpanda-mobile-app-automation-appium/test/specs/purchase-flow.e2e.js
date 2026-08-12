const { expect, driver } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const LoginPage = require('../pageobjects/loginpage.page');
const { loginData, contentText } = require('../data/testdata');
const BasePage = require('../data/util');
const SchoolFormPage = require('../pageobjects/schoolForm.page');
const FreeUserHomepage = require('../pageobjects/free-user-homepage.page')
const CourseDetails = require('../pageobjects/course.page');
const CheckoutPage = require('../pageobjects/checkout-page.page')

const APP_PACKAGE = 'tech.shikho.android';

// async function restartApp() {
//     await driver.terminateApp(APP_PACKAGE);
//     await driver.activateApp(APP_PACKAGE);
//     await driver.pause(3000);
// }

// ==================== HOMEPAGE TESTS ====================

describe('Shikho App - Bkash Purchase FLow', () => {

    before(async () => {
        await BasePage.dismissNotificationPopup();
        await SplashScreen.skipOnboarding();
        await driver.pause(2000);
        await LoginPage.login(loginData.validNumber, loginData.validPassword);
        await BasePage.handleLocationSharing();
        await SchoolFormPage.fillSchoolFormIfVisible();
        await driver.pause(5000);
    });
    
    
    it('should take to course details page', async () => {
        await BasePage.scrollToEndByForward(5);
        await FreeUserHomepage.findotherCourse();
        await FreeUserHomepage.clickCourseButton();
        await BasePage.scrollToEndByForward(3);
        await CourseDetails.verifyQuarterPhaseText();
    });

    it('should click program admit button', async () => {
        await CourseDetails.clickPorgramAdmitButton();
        await CourseDetails.clickSubmitModalButton();
        await CourseDetails.selectPhaseCard();
        await CourseDetails.clickPhaseSubmitButton();
    });

    it('Checkout page Content', async () => {
        await CheckoutPage.CheckoutPageContent();
    });

    it('Should show Course details page after clicking Nav back button', async () => {
        await CheckoutPage.verifyBackBtnGoesToCourseDetails();
    });

    it('Should have Promo Button disabled without input', async () => {
        await CourseDetails.submitProgramButton();
        await CheckoutPage.verifyPromoBtnDisabledWithoutPromoInput();
    });

    it('Should have Promo Button enabled with input', async () => {
        await CheckoutPage.verifyPromoBtnEnableddWithPromoInput();
    });

    it('Should show warning message for Invalid Promo Code', async () => {
        await CheckoutPage.verifyPromoBtnDisabledWithInvalidPromoCode();
    });

    it('Should show Complete message for Valid Promo Code', async () => {
        await CheckoutPage.verifySuccessMessageToValidPromoCode();
    });

   
    it('Should show blank Field of Promo Code after clicking edit button', async () => {
        await CheckoutPage.editPromoButton();
        await driver.pause(2000);
        await CheckoutPage.verifyPromoFieldPlaceholderText();
    });

     it('Should apply Valid Promo Code', async () => {
        await CheckoutPage.setPromoInput();
        await CheckoutPage.submitPromoCode();
        await driver.pause(5000);
    });

    it('Should Disabled Checkout button without Terms Checkbox Checked', async () => {
        await CheckoutPage.verifyAdmitBtnDisabledWithoutTermCheckbox();
    });

    it('Should Disabled Checkout button without Refund policy Checkbox Checked', async () => {
       await CheckoutPage.verifyAdmitBtnDisabledWithoutRefundPolicyCheckbox();
    });

    it('Should Disabled Checkout button without Terms & Refund Policy Checkbox Checked', async () => {
       await CheckoutPage.verifyAdmitBtnDisabledWithoutBothCheckbox();
    });

    it('Should Enabled Checkout button with Terms & Refund Policy Checkbox Checked', async () => {
       await CheckoutPage.verifyAdmitBtnEnabledWithTermandRefundPolicyCheckbox();
    });


    it('Should submit button from Checkout page and redirect to Payment method page', async () => {
        
        await CheckoutPage.submitCheckoutButton();
        await driver.pause(10000);
        await CheckoutPage.verifyPaymentSectionTitle();

        console.log('------It works');
    });


    it('Payment Method Content', async () => {
        await CheckoutPage.paymentMethodContent();
    });

    it('Should Click Bkash Card and navigate to Bkash payment page', async () => {
        await CheckoutPage.clickBkashCard();
        await driver.pause(5000);
        await CheckoutPage.verifyBkashLogo();
    });

    it('Verify Bkash Input Number Content', async () => {
        await CheckoutPage.verifyBkashNumberInputPageContent();
    });

    it('Should enabled confirm button with valid bkash number', async () => {
        await CheckoutPage.verifyConfirmButtonEnabledWithValidInputNumber();
    });

    it('Should Submit Bkash Number', async () => {
        await CheckoutPage.clickBkashConfirmBtn();
    });

    it('Should submit Bkash Verification code', async () => {
        await CheckoutPage.clickOTPInputField();
        await CheckoutPage.clickBkashConfirmBtn();
    });

    it('Should submit Bkash PIN ', async () => {
        await CheckoutPage.clickPINInputField();
        await CheckoutPage.clickBkashConfirmBtn();
        await driver.pause(5000);
    });

    it('Should complete the payment and success Screen', async () => {
        await CheckoutPage.verifySuccessPaymentMsg1();
        await CheckoutPage.verifySuccessPaymentMsg2();
        await CheckoutPage.verifyUserName();
        await CheckoutPage.verifyPhoneNumber();
        await CheckoutPage.verifyCourseName();
        await CheckoutPage.verifyPaymentIDLabel();
        await CheckoutPage.verifyPaymentAmountLabel();
        await CheckoutPage.verifyPaymentMethod();
        await CheckoutPage.verifyStartLearningButtonText();
    });

    it('Should click learning button and navigate to Homepage', async () => {
        await CheckoutPage.clickStartLearnButton();
        await CheckoutPage.verifyProfileModalTitle();
    });


});


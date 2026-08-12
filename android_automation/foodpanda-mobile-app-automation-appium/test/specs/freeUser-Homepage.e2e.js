const { expect, $, driver } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const LoginPage = require('../pageobjects/loginpage.page');
const { loginData, contentText } = require('../data/testdata');
const BasePage = require('../data/util');
const SchoolFormPage = require('../pageobjects/schoolForm.page');
const FreeUserHomepage = require('../pageobjects/free-user-homepage.page');



async function loginAs(phoneNumber) {
    await BasePage.dismissNotificationPopup();
    await SplashScreen.skipOnboarding();
    await driver.pause(2000);
    await LoginPage.login(phoneNumber, loginData.validPassword);
    await driver.pause(5000);
    await BasePage.handleLocationSharing();
    await SchoolFormPage.fillSchoolFormIfVisible();
}

// ==================== Free User HOMEPAGE TESTS ====================

describe('Shikho App - Free User Homepage Free Trial', () => {

    before(async () => {
        await loginAs(loginData.trialEnrollNumber);
        await driver.pause(5000);
    });

    it('should Show Free Trial Section', async () => {
        await FreeUserHomepage.verifyfreetrialSectionTitle();
    });

    it('should Show Free Trial Feature Section', async () => {
        await FreeUserHomepage.verifyTrialFeature();
    });

    it('should Show Free Trial Course', async () => {
        await FreeUserHomepage.verifyTrialCourseName();
    });

    it('should Show Free Trial Button', async () => {
        await FreeUserHomepage.verifyTrialBtn();
    });

    it('should Show Free Trial Enroll Button', async () => {
        await FreeUserHomepage.verifyTrialEnrollBtn();
    });

    it('should Clicked Free Trial Button - navigate Trail Enrolled Success BottomSheet', async () => {
        await FreeUserHomepage.clickTrialBtn();
    }); 

    it('Trail Enrolled Success BottomSheet Content', async () => {
        await FreeUserHomepage.verifyTrialSuccessBottomSheet();
    }); 

    it('Should be Clicked Ok button', async () => {
        await FreeUserHomepage.clickTrialCompleteBtn();
    }); 

});


//==================== FREE COURSE ENROLL BUTTON CLICK FLOW ====================

describe('Free User Homepage Free Course Enroll Button - navigate to Enrolled Homepage', () => {

    before(async () => {
        await BasePage.launchApp();
        await loginAs(loginData.freeCourseEnrollNumber);
        await driver.pause(5000);
    });

    it('should show Free Course Section', async () => {
        await FreeUserHomepage.verifyFreeCourseSectionTitle();
    });

    it('should show Free ALL Course Button', async () => {
        await FreeUserHomepage.verifyFreeAllCourseBtn();
    });

    it('should show Specific Free Course Card', async () => {
        await FreeUserHomepage.verifyFreeCourseName();
    });

    it('should show Specific Free Course Card Button', async () => {
        await FreeUserHomepage.verifyFreeCourseBtn();
    });

    it('should clicked Free Course Details button - navigate to details page', async () => {
        await FreeUserHomepage.clickFreeCourseDetailsBtn();
        await driver.back();
    });

    it('should clicked Free Course Enroll button - navigate to Success Screen', async () => {
        await FreeUserHomepage.clickFreeCourseBtn();
    });

    it('Free Course Enroll Success Screen Contnet', async () => {
        await FreeUserHomepage.verifyFreeCourseEnrolledSuccessScreen();
    });

    it('Clicked Free Course Start button ', async () => {
        await FreeUserHomepage.clickFreeCourseStartButton();
    });

});


// ==================== OTHER COURSE BUTTON CLICK FLOW ====================
// TODO: add `otherCourseEnrollNumber` to loginData in testdata.js, then this suite is ready to run.

describe('Other Course Button - navigate to details', () => {

    before(async () => {
        await BasePage.launchApp();
        await loginAs(loginData.validNumber);
        await driver.pause(5000);
    });

    it('should go to other course section', async () => {
        await FreeUserHomepage.verifyOtherSectionTitle();
    });

    it('should find specific other course', async () => {
        await FreeUserHomepage.findotherCourse();
    });

    it('should show other course button', async () => {
        await FreeUserHomepage.verifyCourseButton();
    });

    it('should Clicked other course button and navigate to Course details page', async () => {
        await FreeUserHomepage.clickCourseButton();
    });


});

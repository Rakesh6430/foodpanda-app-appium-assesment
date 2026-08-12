const { driver } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const LoginPage = require('../pageobjects/loginpage.page');
const SubjectListPage = require('../pageobjects/subjectlist.page');
const BasePage = require('../data/util');
const { loginData, subjectListData } = require('../data/testdata');

describe('Shikho App - Subject List Page', () => {

    before(async () => {
        await BasePage.dismissNotificationPopup();
        await SplashScreen.skipOnboarding();
        await driver.pause(2000);
        await LoginPage.login(loginData.purchasedNumber, loginData.validPassword);
        await BasePage.handleLocationSharing();
        await driver.pause(5000);

        // TODO: wire up navigation from the paid-user homepage into the
        // "অটোমেশন এপি কোর্স" course detail → subject list screen.
        // Once a PaidUserHomePage.clickPurchasedCourse(courseName) action
        // exists, call it here so the assertions below run on a fresh session:
        //   await PaidUserHomePage.clickPurchasedCourse(subjectListData.courseTitle);
        //   await driver.pause(3000);
    });

    //====================== Header Tests ========================

    it('should display the course title in the header', async () => {
        await SubjectListPage.verifyHeader();
    });

    //====================== Quarter Card Tests ==================

    it('should display the quarter card with title, status, date range and routine button', async () => {
        await SubjectListPage.verifyQuarterCard();
    });

    it('should navigate when the routine card is tapped and return back', async () => {
        await SubjectListPage.clickRoutineCard();
        await driver.pause(2000);
        await driver.back();
        await driver.pause(2000);
        await SubjectListPage.verifyHeader();
    });

    //====================== Subject Grid Tests ==================

    it('should render a subject card for every expected subject', async () => {
        await SubjectListPage.verifySubjectHolderCount();
        await SubjectListPage.verifySubjectIconCount();
    });

    it('should display every expected subject name', async () => {
        await SubjectListPage.verifyAllSubjects();
    });

    it('should open a subject when its card is tapped', async () => {
        const firstSubject = subjectListData.subjects[0];
        await SubjectListPage.clickSubject(firstSubject);
        await driver.pause(3000);
        await driver.back();
        await driver.pause(2000);
        await SubjectListPage.verifyHeader();
    });

    //====================== Navigation Tests ====================

    it('should navigate back when the nav back icon is tapped', async () => {
        await SubjectListPage.clickBack();
        await driver.pause(2000);
    });
});

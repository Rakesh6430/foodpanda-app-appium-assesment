const { expect, driver } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const LoginPage = require('../pageobjects/loginpage.page');
const PaidUserHomePage = require('../pageobjects/paid-user-homepage.page');
const RoutinePage = require('../pageobjects/routine.page');
const { loginData } = require('../data/testdata');
const { routineData } = require('../data/routineData');
const BasePage = require('../data/util');

describe('Shikho App - Class Routine Page', () => {

    let isEmpty;
    let hasBanner;
    let hasHomeworkSection;

    before(async () => {
        await BasePage.dismissNotificationPopup();
        await SplashScreen.skipOnboarding();
        await driver.pause(2000);
        await LoginPage.login(loginData.purchasedNumber, loginData.validPassword);
        await BasePage.handleLocationSharing();
        await driver.pause(5000);

        // Navigate to the routine page via the paid-user homepage's "রুটিন দেখো" button.
        await PaidUserHomePage.clickRoutineBtn();
        await driver.pause(3000);

        // Snapshot page state once — every later it() gates on these flags.
        isEmpty = await RoutinePage.isRoutineEmptyStateDisplayed(); //routine empty or not
        hasBanner = !isEmpty && (await RoutinePage.hasContentBanner()); //homework banner
        hasHomeworkSection = !isEmpty
            && (await RoutinePage.homeworkSectionHeader.isExisting());
    });

    //========================== Header tests ==========================

    it('should display the page title "ক্লাস রুটিন"', async () => {
        await RoutinePage.verifyHeader();
    });


    //==================== Empty State ===================

    it('should display the empty-state when no routine items exist', async () => {
        if (!isEmpty) return;
        await RoutinePage.verifyRoutineEmptyState();
    });

    it('should hide the empty-state when routine items exist', async () => {
        if (isEmpty) return;
        await RoutinePage.verifyRoutineEmptyStateNotShown();
    });

    
});

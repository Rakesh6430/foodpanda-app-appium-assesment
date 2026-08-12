const { driver } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const LoginPage = require('../pageobjects/loginpage.page');
const PaidUserHomePage = require('../pageobjects/paid-user-homepage.page');
const { loginData } = require('../data/testdata');
const BasePage = require('../data/util');

describe('Shikho App - Paid User Homepage', () => {

    let isEmptyState;
    let hasHomework;

    before(async () => {
        await BasePage.dismissNotificationPopup();
        await SplashScreen.skipOnboarding();
        await driver.pause(2000);
        await LoginPage.login(loginData.purchasedNumber, loginData.validPassword);
        await BasePage.handleLocationSharing();
        await driver.pause(5000);
        
        isEmptyState = await PaidUserHomePage.isEmptyStateDisplayed();
        hasHomework = await PaidUserHomePage.isHomeworkSectionDisplayed();
    });

    //====================== Today's Routine Section Tests ========================

    it('should display Today Routine section title', async () => {
        await PaidUserHomePage.verifyTodaysRoutineSectionTitle();
    });

    it('should display Today Routine section subtitle', async () => {
        await PaidUserHomePage.verifyTodaysRoutineSectionSubTitle();
    });

    it('should display Routine button', async () => {
        await PaidUserHomePage.verifyRoutineButton();
    });

    //====================== Empty State Conditional Tests ========================

    it('should display empty state when no content available', async () => {
        if (!isEmptyState) return;
        await PaidUserHomePage.verifyEmptyState();
    });

    it('should hide empty state when content is available', async () => {
        if (isEmptyState) return;
        await PaidUserHomePage.verifyEmptyStateNotShown();
    });

    //====================== Navigation Tests =====================================

    it('should navigate to Routine page on clicking Routine button', async () => {
        await PaidUserHomePage.clickRoutineBtn();
        await driver.back();
        await driver.pause(2000);
        await PaidUserHomePage.verifyTodaysRoutineSectionTitle();
    });

    it('should navigate to Routine Calendar on clicking calendar button', async () => {
        if (!isEmptyState) return;
        await PaidUserHomePage.clickRoutineCalendarBtn();
        await driver.back();
        await driver.pause(2000);
        await PaidUserHomePage.verifyTodaysRoutineSectionTitle();
    });

    //====================== Homework Section Conditional Tests ===================

    it('should display homework section when content exists', async () => {
        if (!hasHomework) return;
        await PaidUserHomePage.verifyHomeworkSection();
    });

    it('should hide homework section when no content available', async () => {
        if (hasHomework) return;
        await PaidUserHomePage.verifyHomeworkSectionNotShown();
    });

});

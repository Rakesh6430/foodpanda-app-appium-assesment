const { $, expect, driver } = require('@wdio/globals');
const BasePage = require('../data/util');
const { purchasedUserData } = require('../data/testdata');

class PaidUserHomePage {

    //====================== Today's Routine Section Locators ======================

    get todaysSectionTitle() {
        return $(`android=new UiSelector().textContains("${purchasedUserData.todaysSectionTitle}")`);
    }

    get todaysSectionSubTitle() {
        return $(`android=new UiSelector().textContains("${purchasedUserData.todaysSectionSubTitle}")`);
    }

    get routineBtn() {
        return $(`android=new UiSelector().textContains("${purchasedUserData.routineBtnText}")`);
    }

    //====================== Empty State Locators =============================

    get todayEmptyStateTitle() {
        return $(`android=new UiSelector().textContains("${purchasedUserData.todayEmptyStateTitle}")`);
    }

    get todayEmptyStateSubTitle() {
        return $(`android=new UiSelector().textContains("${purchasedUserData.todayEmptyStateSubTitle}")`);
    }

    get routineCalendarBtn() {
        return $(`android=new UiSelector().className("android.widget.Button").fromParent(new UiSelector().textContains("${purchasedUserData.todayEmptyBtn}"))`);
    }

    get routineCalendarBtnText() {
        return $(`android=new UiSelector().textContains("${purchasedUserData.todayEmptyBtn}")`);
    }

    //====================== Homework Section Locators =============================

    get homeworkSectionTitle() {
        return $(`android=new UiSelector().textContains("${purchasedUserData.homeworkSectionTitle}")`);
    }

    get homeworkTypeLabel() {
        return $(`android=new UiSelector().textContains("${purchasedUserData.homeworkTypeLabel}")`);
    }

    //====================== Validation Methods =============================

    async verifyTodaysRoutineSectionTitle() {
        await expect(this.todaysSectionTitle).toBeDisplayed();
        await expect(this.todaysSectionTitle).toHaveText(purchasedUserData.todaysSectionTitle);
    }

    async verifyTodaysRoutineSectionSubTitle() {
        await expect(this.todaysSectionSubTitle).toBeDisplayed();
        await expect(this.todaysSectionSubTitle).toHaveText(purchasedUserData.todaysSectionSubTitle);
    }

    async verifyRoutineButton() {
        await expect(this.routineBtn).toBeDisplayed();
        await expect(this.routineBtn).toHaveText(purchasedUserData.routineBtnText);
    }

    async verifyEmptyState() {
        await expect(this.todayEmptyStateTitle).toBeDisplayed();
        await expect(this.todayEmptyStateTitle).toHaveText(purchasedUserData.todayEmptyStateTitle);
        await expect(this.todayEmptyStateSubTitle).toBeDisplayed();
        await expect(this.todayEmptyStateSubTitle).toHaveText(purchasedUserData.todaysSectionSubTitle);
        await expect(this.routineCalendarBtnText).toBeDisplayed();
        await expect(this.routineCalendarBtnText).toHaveText(purchasedUserData.todayEmptyBtn);
    }

    async verifyEmptyStateNotShown() {
        await expect(this.todayEmptyStateTitle).not.toBeDisplayed();
        await expect(this.todayEmptyStateSubTitle).not.toBeDisplayed();
        await expect(this.routineCalendarBtnText).not.toBeDisplayed();
    }

    async isEmptyStateDisplayed() {
        return await this.todayEmptyStateTitle.isExisting();
    }


    //====================== Homework Validation Methods ===========================

    async verifyHomeworkSection() {
        await expect(this.homeworkSectionTitle).toBeDisplayed();
        await expect(this.homeworkSectionTitle).toHaveText(purchasedUserData.homeworkSectionTitle);
        await expect(this.homeworkTypeLabel).toBeDisplayed();
        await expect(this.homeworkTypeLabel).toHaveText(purchasedUserData.homeworkTypeLabel);
    }

    async verifyHomeworkSectionNotShown() {
        await expect(this.homeworkSectionTitle).not.toBeDisplayed();
    }

    async isHomeworkSectionDisplayed() {
        try {
            await BasePage.scrollToElement(purchasedUserData.homeworkSectionTitle, 5);
        } catch (e) {
            return false;
        }
        return await this.homeworkSectionTitle.isExisting();
    }

    //====================== Action Methods ==============================

    async clickRoutineBtn() {
        await this.routineBtn.click();
        await driver.pause(5000);
    }

    async clickRoutineCalendarBtn() {
        await this.routineCalendarBtn.click();
        await driver.pause(5000);
    }


}

module.exports = new PaidUserHomePage();

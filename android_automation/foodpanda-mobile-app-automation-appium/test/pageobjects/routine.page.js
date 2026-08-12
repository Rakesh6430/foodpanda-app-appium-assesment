const { $, $$, expect, driver } = require('@wdio/globals');
const BasePage = require('../data/util');
const { routineData } = require('../data/routineData');

class RoutinePage {

    //=========================== Header ============================

    get navBackIcon() {
        return $(`~${routineData.navIconDesc}`);
    }

    get routinePageTitle() {
        return $(`android=new UiSelector().text("${routineData.pageTitle}")`);
    }
 
    get calendarIcon() {
        return $(`~${routineData.calendarIconDesc}`);
    }

     //========================= Empty State ==========================

    get emptyStateIcon() {
        return $(`~${routineData.emptyState.iconDesc}`);
    }

    get emptyStateMessage1() {
        return $(`android=new UiSelector().text("${routineData.emptyState.message1}")`);
    }

    get emptyStateMessage2() {
        return $(`android=new UiSelector().text("${routineData.emptyState.message2}")`);
    }


    //========================= Validations ==========================

    async verifyHeader() {
        await this.routinePageTitle.waitForDisplayed({ timeout: 10000 });
        await expect(this.navBackIcon).toBeDisplayed();
        await expect(this.routinePageTitle).toBeDisplayed();
        await expect(this.routinePageTitle).toHaveText(routineData.pageTitle);
        await expect(this.calendarIcon).toBeDisplayed();
    }

    async isRoutineEmptyStateDisplayed() {
        try {
            await this.emptyStateMessage1.waitForDisplayed({ timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async verifyRoutineEmptyState() {
        await expect(this.emptyStateIcon).toBeDisplayed();
        await expect(this.emptyStateMessage1).toBeDisplayed();
        await expect(this.emptyStateMessage1).toHaveText(routineData.emptyState.message1);
        await expect(this.emptyStateMessage2).toBeDisplayed();
        await expect(this.emptyStateMessage2).toHaveText(routineData.emptyState.message2);
    }

    async verifyRoutineEmptyStateNotShown() {
        await expect(this.emptyStateMessage1).not.toBeDisplayed();
        await expect(this.emptyStateMessage2).not.toBeDisplayed();
    }

    //=========================== Actions ============================

    async clickBack() {
        await this.navBackIcon.waitForDisplayed({ timeout: 5000 });
        await this.navBackIcon.click();
    }

    async clickCalendarIcon() {
        await this.calendarIcon.waitForDisplayed({ timeout: 5000 });
        await this.calendarIcon.click();
    }

   
}

module.exports = new RoutinePage();

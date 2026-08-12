const { $, $$, expect, driver } = require('@wdio/globals');
const BasePage = require('../data/util');
const { subjectListData } = require('../data/testdata');

class SubjectListPage {

    //========================== Header ==========================
    get navBackIcon() {
        return $(`~${subjectListData.navIconDesc}`);
    }
    get courseTitle() {
        return $(`android=new UiSelector().text("${subjectListData.courseTitle}")`);
    }

    //======================= Quarter Card =======================
    get quarterTitle() {
        return $(`android=new UiSelector().text("${subjectListData.quarter.title}")`);
    }
    get quarterStatusBadge() {
        return $(`android=new UiSelector().text("${subjectListData.quarter.statusBadge}")`);
    }
    get quarterDateRange() {
        return $(`android=new UiSelector().text("${subjectListData.quarter.dateRange}")`);
    }
    get routineButtonText() {
        return $(`android=new UiSelector().text("${subjectListData.quarter.routineBtnText}")`);
    }
    // First "Cart button icon" on screen belongs to the routine card.
    get routineCartIcon() {
        return $(`~${subjectListData.quarter.cartIconDesc}`);
    }

    //======================= Subject Grid =======================
    get subjectHolders() {
        return $$(`~${subjectListData.subjectHolderDesc}`);
    }
    get subjectIcons() {
        return $$(`~${subjectListData.subjectIconDesc}`);
    }

    subjectByName(name) {
        return $(`android=new UiSelector().textContains("${name}")`);
    }

    //========================== Validation ==========================
    async verifyHeader() {
        await expect(this.navBackIcon).toBeDisplayed();
        await expect(this.courseTitle).toBeDisplayed();
        await expect(this.courseTitle).toHaveText(subjectListData.courseTitle);
    }

    async verifyQuarterCard() {
        await expect(this.quarterTitle).toBeDisplayed();
        await expect(this.quarterTitle).toHaveText(subjectListData.quarter.title);
        await expect(this.quarterStatusBadge).toBeDisplayed();
        await expect(this.quarterStatusBadge).toHaveText(subjectListData.quarter.statusBadge);
        await expect(this.quarterDateRange).toBeDisplayed();
        await expect(this.quarterDateRange).toHaveText(subjectListData.quarter.dateRange);
        await expect(this.routineButtonText).toBeDisplayed();
        await expect(this.routineButtonText).toHaveText(subjectListData.quarter.routineBtnText);
        await expect(this.routineCartIcon).toBeDisplayed();
    }

    async verifySubjectHolderCount() {
        const holders = await this.subjectHolders;
        expect(holders.length).toBeGreaterThanOrEqual(subjectListData.subjects.length);
    }

    async verifySubjectIconCount() {
        const icons = await this.subjectIcons;
        expect(icons.length).toBeGreaterThanOrEqual(subjectListData.subjects.length);
    }

    async verifySubjectDisplayed(name) {
        await BasePage.scrollToElement(name);
        const el = this.subjectByName(name);
        await el.waitForDisplayed({ timeout: 5000 });
        await expect(el).toBeDisplayed();
    }

    async verifyAllSubjects() {
        for (const name of subjectListData.subjects) {
            await this.verifySubjectDisplayed(name);
        }
    }

    //========================== Actions ==========================
    async clickBack() {
        await this.navBackIcon.waitForDisplayed({ timeout: 5000 });
        await this.navBackIcon.click();
    }

    async clickRoutineCard() {
        await this.routineButtonText.waitForDisplayed({ timeout: 5000 });
        await this.routineButtonText.click();
    }

    async clickSubject(name) {
        await BasePage.scrollToElement(name);
        const el = this.subjectByName(name);
        await el.waitForDisplayed({ timeout: 5000 });
        await el.click();
    }
}

module.exports = new SubjectListPage();

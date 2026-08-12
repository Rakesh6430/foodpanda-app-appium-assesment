const { $, expect, driver } = require('@wdio/globals');
const { courseData } = require('../data/testdata');
const BasePage = require('../data/util');
const CheckoutPage = require('./checkout-page.page')

class FreeUserHomepage {
    
    //====================== Free Trial course locator ========================

    get trialSectionTitle(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.sectionTitle}")`)
    }
    get trialSectionSubTitle(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.sectionSubTitle}")`)
    }
    get featureLiveClass(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.fetaures.liveClass}")`)
    }
    get featureUnlimitedLesson(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.fetaures.animated}")`)
    }
    get featureTest(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.fetaures.test}")`)
    }
    get featureSmartNote(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.fetaures.smartNote}")`)
    }
    get premiumFeatureDescription(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.fetaures.description}")`)
    }
    get trialCoureName(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.trialCourseName}")`)
    }
    get trialBtnText(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.trialBtnText}")`)
    }
    get trialCourseEnrollBtnText(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.trialCourseEnrollBtnText}")`)
    }
    get freeTrialBtn() {
        return $(`android=new UiSelector().className("android.widget.Button").fromParent(new UiSelector().textContains("${courseData.freeTrialData.trialBtnText}"))`);
    }
    get trialCourseEnrollBtn() {
        return $(`android=new UiSelector().className("android.widget.Button").fromParent(new UiSelector().textContains("${courseData.freeTrialData.trialCourseEnrollBtnText}"))`);
    }
    get trialSuccessIcon(){
        return $(`~Expiring Icon`);
    }
    get trialBottomSheetCloseBtn(){
        return $(`~Close Icon`);
    }
    get trialSuccessMsg(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.trialSuccessMsg1}")`)
    }
    get trialSuccessSubMsg(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.trialSuccssSubText}")`)
    }
    get trialCompleteBtnText(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.trialOkBtnText}")`)
    }
    get trialCompleteBtn(){
        return $(`android=new UiSelector().className("android.widget.Button")`);
    }
    get trialGuideModalIcon(){
        return $(`~Empty bag`);
    }
    get trialGuideModalText(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.trialGuideTourModalText}")`)
    }
    get trialGuideStartBtnText(){
        return $(`android=new UiSelector().textContains("${courseData.freeTrialData.trialGuideStartText}")`)
    }
    get trialGuideStartBtn(){
        return $(`android=new UiSelector().className("android.widget.Button")`)
    }

    //====================== FREE COURSE LOCATOR =========================

    get freeCourseSectionTitle(){
        return $(`android=new UiSelector().textContains("${courseData.freeCourseData.sectionTitle}")`)
    }
    get freeCourseAllBtnText(){
        return $(`android=new UiSelector().textContains("${courseData.freeCourseData.allCourseBtn}")`)
    }
    get freeCourseAllBtn(){
        return $(`android=new UiSelector().className("android.widget.Button").fromParent(new UiSelector().textContains("${courseData.freeCourseData.allCourseBtn}"))`)
    }
    get freeCourseAllArrownIcon() {
        return $(`android=new UiSelector().className("android.view.View").instance(23)`);
    }
    get freeCourseName(){
        return $(`android=new UiSelector().text("${courseData.freeCourseData.freeCourseName}")`)
    }
    get freeCourseTagText(){
        return $(`android=new UiSelector().text("${courseData.freeCourseData.freeTag}")`)
    }
    get freeCourseDetailsBtnText(){
        return $(`//android.widget.TextView[contains(@text, "${courseData.freeCourseData.freeCourseName}")]/ancestor::android.view.View[1]//android.widget.TextView[contains(@text, "${courseData.freeCourseData.freeCourseDetailsBtn}")]`);
    }
    get freeCourseEnrollBtnText(){
        return $(`//android.widget.TextView[contains(@text, "${courseData.freeCourseData.freeCourseName}")]/ancestor::android.view.View[1]//android.widget.TextView[contains(@text, "${courseData.freeCourseData.freeCourseEnrollBtn}")]`);
    }
    get freeCourseDetailsBtn(){
        return $(`//android.widget.TextView[@text="${courseData.freeCourseData.freeCourseName}"]/ancestor::android.view.View[1]//android.widget.TextView[@text="${courseData.freeCourseData.freeCourseDetailsBtn}"]/following-sibling::android.widget.Button[1]`);
    }
    get freeCourseEnrollBtn(){
        return $(`//android.widget.TextView[@text="${courseData.freeCourseData.freeCourseName}"]/ancestor::android.view.View[1]//android.widget.TextView[@text="${courseData.freeCourseData.freeCourseEnrollBtn}"]/following-sibling::android.widget.Button[1]`);
    }
    get freeCourseSuccessIcon(){
        return $(`~Expiring Icon`);
    }
    get freeCourseSuccessMsg(){
        return $(`android=new UiSelector().text("${courseData.freeCourseData.freeCourseSuccessMsg}")`);
    }
    get freeCourseStartBtnText(){
        return $(`android=new UiSelector().text("${courseData.freeCourseData.freeCourseStartBtnText}")`);
    }
    get freeCourseStartBtn(){
        return $(`android=new UiSelector().className("android.widget.Button")`);
    }



    //====================== other course locator =========================
    get sectionTitle(){
        return $(`android=new UiSelector().textContains("${courseData.otherCourse.sectionTitle}")`)
    }
    get courseName(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.courseName}")`)
    }
    get courseBtnText(){
        return $(`//android.widget.TextView[@text="${courseData.otherCourse.courseName}"]/ancestor::android.view.View[1]//android.widget.TextView[@text="${courseData.otherCourse.courseBtn}"]`);
    }
    get courseBtn(){
        return $(`//android.widget.TextView[@text="${courseData.otherCourse.courseName}"]/ancestor::android.view.View[1]//android.widget.Button`);
    }
   

    //====================== FREE TRIAL COURSE VALIDATION ========================
    
    async verifyfreetrialSectionTitle(){
        console.log('Validating Free Trial Section');
        await BasePage.scrollToElement(courseData.freeTrialData.sectionTitle,5);
        await this.trialSectionTitle.waitForDisplayed({ timeout: 5000 });

        await expect(this.trialSectionTitle).toBeDisplayed();
        await expect(this.trialSectionTitle).toHaveText(courseData.freeTrialData.sectionTitle, { containing: true });
        await expect(this.trialSectionSubTitle).toBeDisplayed();
        await expect(this.trialSectionSubTitle).toHaveText(courseData.freeTrialData.sectionSubTitle, { containing: true });
        console.log('Showing Free trial  Section correctly');
    }
    
    async verifyTrialFeature(){
        console.log('Validating Free Trial Feature');
        await expect(this.featureLiveClass).toBeDisplayed();
        await expect(this.featureLiveClass).toHaveText(courseData.freeTrialData.fetaures.liveClass);
        await expect(this.featureUnlimitedLesson).toBeDisplayed();
        await expect(this.featureUnlimitedLesson).toHaveText(courseData.freeTrialData.fetaures.animated);
        await expect(this.featureTest).toBeDisplayed();
        await expect(this.featureTest).toHaveText(courseData.freeTrialData.fetaures.test);
        await expect(this.featureSmartNote).toBeDisplayed();
        await expect(this.featureSmartNote).toHaveText(courseData.freeTrialData.fetaures.smartNote);
        await expect(this.premiumFeatureDescription).toBeDisplayed();
        await expect(this.premiumFeatureDescription).toHaveText(courseData.freeTrialData.fetaures.description, { containing: true });
        console.log('Showing Free trial feature Section correctly');
    }

    async verifyTrialCourseName(){
        console.log('Validating Free Trial Course Name');
        await BasePage.scrollHoritonallyToElement(courseData.freeTrialData.trialCourseName,20);
        await expect(this.trialCoureName).toBeDisplayed();
        await expect(this.trialCoureName).toHaveText(courseData.freeTrialData.trialCourseName);
        console.log('Showing Free trial Course Name  correctly');
    }

    async verifyTrialBtn(){
        console.log('Validating Free Trial Btn');
        await expect(this.trialBtnText).toBeDisplayed();
        await expect(this.trialBtnText).toHaveText(courseData.freeTrialData.trialBtnText, { containing: true });
        await expect(this.freeTrialBtn).toBeDisplayed();
        console.log('Showing Free trial Button  correctly');
    }

    async verifyTrialEnrollBtn(){
        console.log('Validating Free Trial Enroll Btn');
        await expect(this.trialCourseEnrollBtn).toBeDisplayed();
        await expect(this.trialCourseEnrollBtn).toHaveText(courseData.freeTrialData.trialCourseEnrollBtnText, { containing: true });
        await expect(this.trialCourseEnrollBtn).toBeDisplayed();
        console.log('Showing Free trial Enroll Button correctly');
    }

    async verifyTrialSuccessBottomSheet(){
        console.log('Validating Free Trial Enroll Success');
        await expect(this.trialSuccessIcon).toBeDisplayed();
        await expect(this.trialSuccessMsg).toBeDisplayed();
        await expect(this.trialSuccessMsg).toHaveText(courseData.freeTrialData.trialSuccessMsg1);
        await expect(this.trialBottomSheetCloseBtn).toBeDisplayed();
        await expect(this.trialSuccessSubMsg).toBeDisplayed();
        await expect(this.trialSuccessSubMsg).toHaveText(courseData.freeTrialData.trialSuccssSubText, { containing: true });
        await expect(this.trialCompleteBtnText).toBeDisplayed();
        await expect(this.trialCompleteBtnText).toHaveText(courseData.freeTrialData.trialOkBtnText);
        console.log('Showing Free trial Enroll success screen correctly');
    }

    async verifyTrialGuideModal(){
        await expect(this.trialGuideModalIcon).toBeDisplayed();
        await expect(this.trialGuideModalText).toBeDisplayed();
        await expect(this.trialGuideModalText).toHaveText(courseData.freeTrialData.trialGuideTourModalText);
        await expect(this.trialGuideStartBtnText).toBeDisplayed();
        await expect(this.trialGuideStartBtnText).toHaveText(courseData.freeTrialData.trialGuideStartText);
    }

    // ============================ ACTION ================================

    async clickTrialBtn(){
        await this.freeTrialBtn.click();
        console.log('Clicked Free trial Button');
    }

    async clickTrialEnrollBtn(){
        await this.trialCourseEnrollBtn.click();
        console.log('Clicked Free trial Enroll Button');
    }

    async clickTrialCompleteBtn(){
        await this.trialCompleteBtn.click();
        await driver.pause(5000);
        await expect(this.trialGuideModalText).toBeDisplayed();
        console.log('Clicked Free trial Complete Button');
    }



    //====================== FREE COURSE VALIDATION ========================

    async verifyFreeCourseSectionTitle(){
        await BasePage.scrollToElement(courseData.freeCourseData.sectionTitle,5);
        await expect(this.freeCourseSectionTitle).toBeDisplayed();
    }

    async verifyFreeAllCourseBtn(){
        await expect(this.freeCourseAllBtnText).toBeDisplayed();
        await expect(this.freeCourseAllBtnText).toHaveText(courseData.freeCourseData.allCourseBtn);
        await expect(this.freeCourseAllArrownIcon).toBeDisplayed();
        await expect(this.freeCourseAllBtn).toBeDisplayed();
    }

    async verifyFreeCourseName(){
        await BasePage.scrollHoritonallyToElement(courseData.freeCourseData.freeCourseName,10);
        await expect(this.freeCourseName).toBeDisplayed();
        await expect(this.freeCourseName).toHaveText(courseData.freeCourseData.freeCourseName);
        await expect(this.freeCourseTagText).toBeDisplayed();
        await expect(this.freeCourseTagText).toHaveText(courseData.freeCourseData.freeTag);
    }

    async verifyFreeCourseBtn(){
        await expect(this.freeCourseDetailsBtnText).toBeDisplayed();
        await expect(this.freeCourseDetailsBtn).toBeDisplayed();
        await expect(this.freeCourseDetailsBtnText).toHaveText(courseData.freeCourseData.freeCourseDetailsBtn);
        await expect(this.freeCourseEnrollBtnText).toBeDisplayed();
        await expect(this.freeCourseEnrollBtn).toBeDisplayed();
        await expect(this.freeCourseEnrollBtnText).toHaveText(courseData.freeCourseData.freeCourseEnrollBtn);
    }

    async verifyFreeCourseEnrolledSuccessScreen(){
        await expect(this.freeCourseSuccessIcon).toBeDisplayed();
        await expect(this.freeCourseSuccessMsg).toBeDisplayed();
        await expect(this.freeCourseSuccessMsg).toHaveText(courseData.freeCourseData.freeCourseSuccessMsg);
        await expect(this.freeCourseStartBtnText).toBeDisplayed();
        await expect(this.freeCourseStartBtnText).toHaveText(courseData.freeCourseData.freeCourseStartBtnText);
        await expect(this.freeCourseStartBtn).toBeDisplayed();
    }

    // ========================== ACTION ==================================

    async clickFreeCourseBtn(){
        await BasePage.scrollToElement(courseData.freeCourseData.sectionTitle,5);
        await this.freeCourseEnrollBtn.click();
    }
    async clickFreeCourseDetailsBtn(){
        await this.freeCourseDetailsBtn.click();
        await expect(this.freeCourseName).toBeDisplayed();
    }

    async clickFreeCourseStartButton(){
        await this.freeCourseStartBtn.click();
        await driver.pause(5000);
        await expect(CheckoutPage.profileModalTitle).toBeDisplayed();
    }


    //====================== OTHER COURSE ========================
    
    // ====================VALIDATION =================

    async verifyOtherSectionTitle(){
        await BasePage.scrollToEndByForward(5);
        await expect(this.sectionTitle).toBeDisplayed();
        await expect(this.sectionTitle).toHaveText(courseData.otherCourse.sectionTitle);
    }

    async findotherCourse(){
        await BasePage.scrollHoritonallyToElement(courseData.otherCourse.courseName,10);
        await expect(this.courseName).toBeDisplayed()
        await expect(this.courseName).toHaveText(courseData.otherCourse.courseName);
    }

    async verifyCourseButton(){
        await expect(this.courseBtnText).toBeDisplayed()
        await expect(this.courseBtnText).toHaveText(courseData.otherCourse.courseBtn)
    }

    //====================== ACTION ======================

    async clickCourseButton(){
        await this.courseBtn.click();
        await expect(this.courseName).toBeDisplayed();
    }
    
}

module.exports = new FreeUserHomepage();

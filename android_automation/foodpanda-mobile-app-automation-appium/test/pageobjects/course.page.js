const { $, expect } = require('@wdio/globals');
const ProfilePage = require('./profile.page');
const SplashScreen = require('./splashscreen.page');
const BasePage = require('../data/util');
const { courseData, checkoutData } = require('../data/testdata');

class CourseDetails {
    get phaseSectionTite(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.phaseSectionTitle}")`)
    }
    get phaseSectionSubTitle(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.phaseSectionSubTitle}")`)
    }
    get quarterPhaseText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.quarterPhase}")`)
    }
    get quarterPhaseTab(){
        return $('android=new UiSelector().className("android.widget.Button").instance(2)');
    }
    get fullPhaseText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.fullPhase}")`);
    }
    get fullPhaseTextTab(){
        return $('android=new UiSelector().className("android.widget.Button").instance(3)');
    }
    get phasebuttonText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.phaseBtnText}")`)
    }
    get backlogPhaseText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.backlogPhaseText}")`)
    }
    get runningPhaseText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.runningPhaseText}")`)
    }
    get upcomingPhaseText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.upcomingPhaseText}")`)
    }
    get phaseButton(){
        return $('android=new UiSelector().className("android.widget.Button").instance(3)');//(`//android.widget.TextView[@text="${courseData.otherCourse.runningPhaseText}"]/ancestor::android.view.View[1]//android.widget.Button`);
    }
    get programAdmitBtnText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.programBhortiHouBtn}")`)
    }
    // get programAdmitBtn(){
    //     return $('android=new UiSelector().className("android.widget.Button").instance(6)');
    // }
    get programAdmitBtn() {
    return $('//androidx.compose.ui.platform.ComposeView[@resource-id="tech.shikho.android:id/compose_view"]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.view.View/android.widget.Button');
}
    get confirmModalText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.confirmModalText}")`)
    }
    get batchText1(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.batchText1}")`)
    }
    get batchText2(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.batchText2}")`)
    }
    get submitBtnText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.submitBtn}")`)
    }
    get submitBtn(){
        return $('android=new UiSelector().className("android.widget.Button")');
    }
    get closeBtn(){
        return $('~Close Icon');
    }
    get programDurationSectionText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.programDurationSectionText}")`)
    }
    get programDurationSectionSubText(){
        return $(`android=new UiSelector().text("${courseData.otherCourse.programDurationSectionSubText}")`)
    }
    get phaseSelection(){
        return $('android=new UiSelector().className("android.view.View").instance(10)');
    }
    get checkOutPageTitle(){
        return $(`android=new UiSelector().text("${checkoutData.pageTitle}")`)
    }


    //======================== Validation ==========================
    async verifyphaseSectionTitle(){
        await BasePage.scrollToEndByForward(2);
        await expect(this.phaseSectionTite).toBeDisplayed();
        await expect(this.phaseSectionTite).toHaveText(courseData.otherCourse.phaseSectionTitle);
    }

    async verifyphaseSectionSubTitle(){
        await expect(this.phaseSectionSubTitle).toBeDisplayed();
        await expect(this.phaseSectionSubTitle).toHaveText(courseData.otherCourse.phaseSectionSubTitle);
    }

    async verifyQuarterPhaseText(){
        await expect(this.quarterPhaseText).toBeDisplayed();
        await expect(this.quarterPhaseText).toHaveText(courseData.otherCourse.quarterPhase);
    }

    async verifyFullPhaseText(){
        await expect(this.fullPhaseText).toBeDisplayed();
        await expect(this.fullPhaseText).toHaveText(courseData.otherCourse.fullPhase);
    }

    async verifyProgramAdmitButton(){
       await expect(this.programAdmitBtnText),toBeDisplayed();
       await expect(this.programAdmitBtnText).toHaveText(courseData.otherCourse.programBhortiHouBtn);
    }

    async verifyBatchCheckModal(){
        await expect(this.confirmModalText).toBeDisplayed();
        await expect(this.confirmModalText).toHaveText(courseData.otherCourse.confirmModalText);
        await expect(this.batchText1).toBeDisplayed();
        await expect(this.batchText1).toHaveText(courseData.otherCourse.batchText1);
        await expect(this.batchText2).toBeDisplayed();
        await expect(this.batchText2).toHaveText(courseData.otherCourse.batchText2);
        await expect(this.submitBtnText).toBeDisplayed();
        await expect(this.submitBtnText).toHaveText(courseData.otherCourse.submitBtn);
        await expect(this.closeBtn).toBeDisplayed();
    }

    async verifyPhaseSelectionModal(){
        await expect(this.programDurationSectionText).toBeDisplayed();
        await expect(this.programDurationSectionText).toHaveText(courseData.otherCourse.programDurationSectionText);
        await expect(this.programDurationSectionSubText).toBeDisplayed();
        await expect(this.programDurationSectionSubText).toHaveText(courseData.otherCourse.programDurationSectionSubText);
        await expect(this.submitBtnText).toBeDisplayed();
        await expect(this.submitBtn).toHaveText(courseData.otherCourse.submitBtn);
        await expect(this.closeBtn).toBeDisplayed();
    }


    //========================== Action ==========================
    
    //runningPhase
    async clickPhaseButton(){
        await BasePage.scrollVerticalByPartial();
        await BasePage.scrollHoritonallyToElement(courseData.otherCourse.runningPhaseText,5);
        await this.phaseButton.waitForDisplayed({ timeout: 5000 });
        await this.phaseButton.click();
    }

    async clickPorgramAdmitButton(){
        await this.programAdmitBtn.click();
    }

    async clickCloseButton(){
        await this.closeBtn.click();
        await expect(this.programAdmitBtnText).toBeDisplayed();
    }

    async clickSubmitModalButton(){
        await this.submitBtn.click();
        await expect(this.programDurationSectionText).toBeDisplayed();
    }

    async selectPhaseCard(){
        await this.phaseSelection.click();
    }

    async clickPhaseSubmitButton(){
        await this.submitBtn.click();
        await expect(this.checkOutPageTitle).toBeDisplayed();
    }

    async submitProgramButton(){
        await this.clickPorgramAdmitButton();
        await this.clickSubmitModalButton();
        await this.selectPhaseCard();
        await this.clickPhaseSubmitButton();
    }

    
}

module.exports = new CourseDetails();

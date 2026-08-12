const { $, expect, driver } = require('@wdio/globals');
const { contentText } = require('../data/testdata');
const BasePage = require('../data/util');
const UserTypeContentPage = require('./usertypecontent.page');
const SignUpPage = require('./signup.page');

class StudentFormContent{

    get step2Title() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.pageTitle}")`);
    }

    get stepIndicator2() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.stepCount}")`);
    }

    get header() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.header}")`);
    }

    get nameLabl() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.nameLabel}")`);
    }

    get namePlaceholdr() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.namePlaceholder}")`);
    }

    get genderLabl() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.genderLabel}")`);
    }

    get maleOption() {
        return $('android=new UiSelector().text("ছাত্র")');
    }

    get femaleOption() {
        return $('android=new UiSelector().text("ছাত্রী")');
    }

    get classLabl() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.classLabel}")`);
    }

    get sscBatchLabl() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.sscBatchLabel}")`);
    }

    get hscBatchLabl() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.hscBatchLabel}")`);
    }

    get groupLabl() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.groupLabel}")`);
    }

    get backBtnText() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.backBtn}")`);
    }

    get studentFormSubmitBtnText() {
        return $(`android=new UiSelector().text("${contentText.studentFormPage.studentSubmitBtn}")`);
    }

    get backButton() {
        return $('android=new UiSelector().className("android.widget.Button").instance(0)');
    }


    //===================== Parent Form Elements =====================

    get parHeader(){
        return $(`android=new UiSelector().text("${contentText.parentFormPage.header}")`);
    }

    get parentNameLabel(){
        return $(`android=new UiSelector().text("${contentText.parentFormPage.parentNameLabel}")`);
    }

    get parentNamePlaceholder() {
        return $(`android=new UiSelector().text("${contentText.parentFormPage.parentNamePlaceholder}")`);
    }

    get parentStuNameLabel() {
        return $(`android=new UiSelector().text("${contentText.parentFormPage.studentNameLabel}")`);
    }

    get parentStuNamePlaceholder() {
        return $(`android=new UiSelector().text("${contentText.parentFormPage.studentNamePlaceholder}")`);
    }

    get parGenderLabel() {
        return $(`android=new UiSelector().text("${contentText.parentFormPage.genderLabel}")`);
    }

    get parClassLabel(){
        return $(`android=new UiSelector().text("${contentText.parentFormPage.parClassLabel}")`);
    }

    get parSSCBatchLabel(){
        return $(`android=new UiSelector().text("${contentText.parentFormPage.parSSCBatchLabel}")`);
    }

    get parHSCBatchLabel(){
        return $(`android=new UiSelector().text("${contentText.parentFormPage.parHSCBatchLabel}")`);
    }

    get parGroupLabel(){
        return $(`android=new UiSelector().text("${contentText.parentFormPage.parGroupLabel}")`);
    }

    get parBackBtn(){
        return $(`android=new UiSelector().text("${contentText.parentFormPage.parBackBtn}")`);
    }

    get parentFormSubmitBtnText() {
        return $(`android=new UiSelector().text("${contentText.parentFormPage.parSubmitBtnText}")`);
    }


    //===================== Student Form Methods =====================

    async assertGenderCard(genders) {
        for (const gender of genders) {
            const gendr = $(`android=new UiSelector().text("${gender}")`);
            await expect(gendr).toBeDisplayed();
        }
    }


    async assertListofClass(classes) {
        for (const clas of classes) {
            const cls = $(`android=new UiSelector().text("${clas}")`);
            await expect(cls).toBeDisplayed();
        }
    }

     async selectClass(className) {
        const classEl = $(`//android.widget.TextView[@text="${className}"]`);
        await classEl.click();
        //await this.scrollToElement(className);
        //await BasePage.swipeUp();
    }

    // Batch and Group validation methods
    async validateClassBatchGroup(className) {
        //await SignUpPage.selectClass(className);
        await this.selectClass(className);

        if (className === 'ক্লাস ৫' || className === 'ক্লাস ৬' || className === 'ক্লাস ৭' || className === 'ক্লাস ৮') {
            // Class 5-8: no batch, no group
            await expect(this.sscBatchLabl).not.toBeDisplayed();
            await expect(this.groupLabl).not.toBeDisplayed();

        } else if (className === 'ক্লাস ৯' || className === 'ক্লাস ১০') {
            // SSC classes
            await BasePage.scrollToElement(contentText.studentFormPage.sscBatchLabel,5);
            await expect(this.sscBatchLabl).toBeDisplayed();

            const batches = contentText.studentFormPage.classBatchMap[className].batches;
            for (const batch of batches) {
                const batchEl = $(`android=new UiSelector().text("${batch}")`);
                await expect(batchEl).toBeDisplayed();
            }

            await BasePage.scrollToElement(contentText.studentFormPage.groupLabel,5);
            await expect(this.groupLabl).toBeDisplayed();
            for (const group of contentText.studentFormPage.groupList) {
                const groupEl = $(`android=new UiSelector().textContains("${group}")`);
                await expect(groupEl).toBeDisplayed();
            }

        } else if (className === 'এইচএসসি') {
            // HSC
            await BasePage.scrollToElement(contentText.studentFormPage.hscBatchLabel,5);
            await expect(this.hscBatchLabl).toBeDisplayed();

            const batches = contentText.studentFormPage.classBatchMap[className].batches;
            for (const batch of batches) {
                const batchEl = $(`android=new UiSelector().text("${batch}")`);
                await expect(batchEl).toBeDisplayed();
            }

            await BasePage.scrollToElement(contentText.studentFormPage.groupLabel,5);
            await expect(this.groupLabl).toBeDisplayed();
            for (const group of contentText.studentFormPage.groupList) {
                const groupEl = $(`android=new UiSelector().textContains("${group}")`);
                await expect(groupEl).toBeDisplayed();
            }

        } else if (className === 'এডমিশন') {
            // Admission
            await BasePage.scrollToElement(contentText.studentFormPage.hscBatchLabel,5);
            await expect(this.hscBatchLabl).toBeDisplayed();

            const batches = contentText.studentFormPage.classBatchMap[className].batches;
            for (const batch of batches) {
                const batchEl = $(`android=new UiSelector().text("${batch}")`);
                await expect(batchEl).toBeDisplayed();
            }

            await BasePage.scrollToElement(contentText.studentFormPage.groupLabel,5);
            await expect(this.groupLabl).toBeDisplayed();
            for (const group of contentText.studentFormPage.groupList) {
                const groupEl = $(`android=new UiSelector().textContains("${group}")`);
                await expect(groupEl).toBeDisplayed();
            }
        }
    }


    async studentForm() {
        await expect(this.step2Title).toBeDisplayed();
        await expect(this.stepIndicator2).toHaveText(contentText.studentFormPage.stepCount);
        await expect(this.header).toHaveText(contentText.studentFormPage.header);
        await expect(this.nameLabl).toHaveText(contentText.studentFormPage.nameLabel);
        await expect(this.namePlaceholdr).toHaveText(contentText.studentFormPage.namePlaceholder);

        await expect(this.genderLabl).toHaveText(contentText.studentFormPage.genderLabel);
        await this.assertGenderCard(contentText.studentFormPage.genderOptions);

        await BasePage.scrollToElement(contentText.studentFormPage.classLabel,5);
        await expect(this.classLabl).toHaveText(contentText.studentFormPage.classLabel);
        await this.assertListofClass(contentText.studentFormPage.classList);

        for (const className of contentText.studentFormPage.classList) {
            await this.validateClassBatchGroup(className);
        }

        await expect(this.backBtnText).toBeDisplayed();
        await expect(this.backBtnText).toHaveText(contentText.studentFormPage.backBtn);
        await expect(this.studentFormSubmitBtnText).toBeDisplayed();
        await expect(this.studentFormSubmitBtnText).toHaveText(contentText.studentFormPage.studentSubmitBtn);
    }



    //click back button
    async clickBackButton() {
        await this.backButton.click(); 
    }

    async verifyeBackButtonGoesToUserTypePage() {
        await this.clickBackButton();
        await expect(UserTypeContentPage.studentOption).toBeDisplayed();
    }

    async verifyeDeviceBackButtonGoesToUserTypePage() {
        await driver.back();
        await expect(UserTypeContentPage.studentOption).toBeDisplayed();
    }


    //=====================  Parent Form Realted Methods ========================

    // Batch and Group validation methods
    async validateParClassBatchGroup(className) {
        //await SignUpPage.selectClass(className);

        await this.selectClass(className);

        if (className === 'ক্লাস ৫' || className === 'ক্লাস ৬' || className === 'ক্লাস ৭' || className === 'ক্লাস ৮') {
            // Class 5-8: no batch, no group
            await expect(this.parSSCBatchLabel).not.toBeDisplayed();
            await expect(this.parGroupLabel).not.toBeDisplayed();

        } else if (className === 'ক্লাস ৯' || className === 'ক্লাস ১০') {
            // SSC classes
            await BasePage.scrollToElement(contentText.parentFormPage.parSSCBatchLabel,5);
            await expect(this.parSSCBatchLabel).toBeDisplayed();

            const batches = contentText.studentFormPage.classBatchMap[className].batches;
            for (const batch of batches) {
                const batchEl = $(`android=new UiSelector().text("${batch}")`);
                await expect(batchEl).toBeDisplayed();
            }

            await BasePage.scrollToElement(contentText.parentFormPage.parGroupLabel,5);
            await expect(this.parGroupLabel).toBeDisplayed();
            for (const group of contentText.studentFormPage.groupList) {
                const groupEl = $(`android=new UiSelector().textContains("${group}")`);
                await groupEl.waitForDisplayed({ timeout: 5000 });
                await expect(groupEl).toBeDisplayed();
            }

        } else if (className === 'এইচএসসি') {
            // HSC
            await BasePage.scrollToElement(contentText.parentFormPage.parHSCBatchLabel,5);
            await expect(this.parHSCBatchLabel).toBeDisplayed();

            const batches = contentText.studentFormPage.classBatchMap[className].batches;
            for (const batch of batches) {
                const batchEl = $(`android=new UiSelector().text("${batch}")`);
                await expect(batchEl).toBeDisplayed();
            }

            await BasePage.scrollToElement(contentText.parentFormPage.parGroupLabel,5);
            await expect(this.parGroupLabel).toBeDisplayed();
            for (const group of contentText.studentFormPage.groupList) {
                const groupEl = $(`android=new UiSelector().textContains("${group}")`);
                await expect(groupEl).toBeDisplayed();
            }

        } else if (className === 'এডমিশন') {
            // Admission
            await BasePage.scrollToElement(contentText.parentFormPage.parHSCBatchLabel,5);
            await expect(this.parHSCBatchLabel).toBeDisplayed();

            const batches = contentText.studentFormPage.classBatchMap[className].batches;
            for (const batch of batches) {
                const batchEl = $(`android=new UiSelector().text("${batch}")`);
                await expect(batchEl).toBeDisplayed();
            }

            await BasePage.scrollToElement(contentText.parentFormPage.parGroupLabel,5);
            await expect(this.parGroupLabel).toBeDisplayed();
            for (const group of contentText.studentFormPage.groupList) {
                const groupEl = $(`android=new UiSelector().textContains("${group}")`);
                await expect(groupEl).toBeDisplayed();
            }
        }
    }
    
    
    
    async parentForm(){

        await expect(this.step2Title).toBeDisplayed();
        await expect(this.stepIndicator2).toHaveText(contentText.studentFormPage.stepCount);
        await expect(this.parHeader).toHaveText(contentText.parentFormPage.header);
        await expect(this.parentNameLabel).toHaveText(contentText.parentFormPage.parentNameLabel);
        await expect(this.parentNamePlaceholder).toHaveText(contentText.parentFormPage.parentNamePlaceholder);

        await expect(this.parentStuNameLabel).toBeDisplayed();
        await expect(this.parentStuNameLabel.toHaveText(contentText.parentFormPage.studentNameLabel));
        await expect(this.parentStuNamePlaceholder).toHaveText(contentText.parentFormPage.studentNamePlaceholder);

        await expect(this.parGenderLabel).toHaveText(contentText.parentFormPage.genderLabel);
        await this.assertGenderCard(contentText.studentFormPage.genderOptions);

        await BasePage.scrollToElement(contentText.parentFormPage.parClassLabel,5);
        await expect(this.parClassLabel).toHaveText(contentText.parentFormPage.parClassLabel);
        await BasePage.scrollToEndByForward(1);
        await this.assertListofClass(contentText.studentFormPage.classList); 

        for (const className of contentText.studentFormPage.classList) {
            await this.validateParClassBatchGroup(className);
        }

        await expect(this.parBackBtn).toBeDisplayed();
        await expect(this.parBackBtn).toHaveText(contentText.parentFormPage.parBackBtn);
        await expect(this.parentFormSubmitBtnText).toBeDisplayed();
        await expect(this.parentFormSubmitBtnText).toHaveText(contentText.parentFormPage.parSubmitBtnText);
    }
}

module.exports = new StudentFormContent();

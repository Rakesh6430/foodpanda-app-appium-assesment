const { $, expect, driver } = require('@wdio/globals');
const { schoolFormData } = require('../data/testdata');
const BasePage = require('../data/util');

class SchoolFormPage {

    get schoolFormHeader() {
        return $(`android=new UiSelector().text("${schoolFormData.pageTitle}")`);
    }
    get schoolFormSubHeader() {
        return $(`android=new UiSelector().text("${schoolFormData.subTitle}")`);
    }
    get schoolDivisionHeader() {
        return $(`android=new UiSelector().text("${schoolFormData.schoolDivisionHeader}")`);
    }
    get schoolDivisionPlaceholderText() {
        return $(`android=new UiSelector().text("${schoolFormData.schoolDivisionPlaceholder}")`);
    }
    get schoolDivisionDropdownIcon() {
        return $('android=new UiSelector().className("android.view.View").instance(12)');
    }
    get schoolDivisionDropdown() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }
    get schoolDistrictHeader() {
        return $(`android=new UiSelector().text("${schoolFormData.schoolDistrictHeader}")`);
    }
    get schoolDistrictPlaceholderText() {
        return $(`android=new UiSelector().text("${schoolFormData.schoolDistrictPlaceholder}")`);
    }
    get schoolDistrictDropdownIcon() {
        return $('android=new UiSelector().className("android.view.View").instance(16)');
    }
    get schoolDistrictDropdown() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }
    get schoolNameHeader() {
        return $(`android=new UiSelector().text("${schoolFormData.schoolNameHeader}")`);
    }
    get schoolNamePlaceholder() {
        return $(`android=new UiSelector().text("${schoolFormData.schoolNameInputPlaceholder}")`);
    }
    get schoolNameSearchIcon() {
        return $('android=new UiSelector().className("android.view.View").instance(20)');
    }
    get schoolNameInput() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(2)');
    }
    get schoolFormSubmitBtnText() {
        return $(`android=new UiSelector().text("${schoolFormData.schoolSubmitBtn}")`);
    }
    get schoolFormSubmitBtn() {
        return $(`android=new UiSelector().className("android.widget.Button")`);
    }
  

    // ==================== VALIDATIONS ====================

    async verifySchoolFormHeader() {
        await expect(this.schoolFormHeader).toBeDisplayed();
        await expect(this.schoolFormHeader).toHaveText(schoolFormData.pageTitle);
    }
    
    async verifySchoolFormSubHeader() {
        await expect(this.schoolFormSubHeader).toBeDisplayed();
        await expect(this.schoolFormSubHeader).toHaveText(schoolFormData.subTitle);
    }

    async verifySchoolDivision() {
        await expect(this.schoolDivisionHeader).toBeDisplayed();
        await expect(this.schoolDivisionHeader).toHaveText(schoolFormData.schoolDivisionHeader);
        await expect(this.schoolDivisionPlaceholderText).toBeDisplayed();
        await expect(this.schoolDivisionPlaceholderText).toHaveText(schoolFormData.schoolDivisionPlaceholder);
        await expect(this.schoolDivisionDropdownIcon).toBeDisplayed();
        //await expect(this.schoolDivisionDropdownIcon).toBeClickable();
    }
    
    async verifySchoolDistrict() {
        await expect(this.schoolDistrictHeader).toBeDisplayed();
        await expect(this.schoolDistrictHeader).toHaveText(schoolFormData.schoolDistrictHeader);
        await expect(this.schoolDistrictPlaceholderText).toBeDisplayed();
        await expect(this.schoolDistrictPlaceholderText).toHaveText(schoolFormData.schoolDistrictPlaceholder);
        await expect(this.schoolDistrictDropdownIcon).toBeDisplayed();
        //await expect(this.schoolDistrictDropdownIcon).toBeClickable();
    }

    async verifySchoolName() {
        await expect(this.schoolNameHeader).toBeDisplayed();
        await expect(this.schoolNameHeader).toHaveText(schoolFormData.schoolNameHeader);
        await expect(this.schoolNamePlaceholder).toBeDisplayed();
        await expect(this.schoolNamePlaceholder).toHaveText(schoolFormData.schoolNameInputPlaceholder);
        await expect(this.schoolNameSearchIcon).toBeDisplayed();
        //await expect(this.schoolNameSearchIcon).toBeClickable();
    }

    async verifySchoolFormSubmitBtnText() {
        await expect(this.schoolFormSubmitBtnText).toBeDisplayed();
        await expect(this.schoolFormSubmitBtnText).toHaveText(schoolFormData.schoolSubmitBtn);
    }

    async verifySchoolFormSubmitBtnDisabledWithNoSelection() {
        await expect(this.schoolFormSubmitBtn).toBeDisplayed();
        await expect(this.schoolFormSubmitBtn).toBeDisabled();
    }

    async verifySchoolFormSubmitBtnEnabled() {
        await expect(this.schoolFormSubmitBtn).toBeEnabled(); 
    }   
    
    async verifySchoolDistrictFieldDisabledUntilDivisionSelected() {
        await expect(this.schoolDistrictDropdown).toBeDisabled();
    }

    async verifySchoolNameFieldDisabledUntilDistrictSelected() {
        await this.selectSchoolDivisionDropdown();
        await expect(this.schoolNameInput).toBeDisabled();
    }

     async schoolFormContent(){
        await this.verifySchoolFormHeader();
        await this.verifySchoolFormSubHeader();
        await this.verifySchoolDivision();
        await this.verifySchoolDistrict();
        await this.verifySchoolName();
        await this.verifySchoolFormSubmitBtnText();
    }

    //===================== ACTIONS ====================

    async selectSchoolDivisionDropdown() {
        await this.schoolDivisionDropdown.click();
        const divisionSelect = $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${schoolFormData.schoolDivisionDropdownOptions}")`);
        await divisionSelect.waitForExist({ timeout: 5000 });
        await divisionSelect.click();
    }

    async selectSchoolDistrictDropdown() {
        await this.schoolDistrictDropdown.click();
        const districtSelect = $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${schoolFormData.schoolDistrictDropdownOptions}")`);
        await districtSelect.waitForExist({ timeout: 5000 });
        await districtSelect.click();
    }

    async selectSchoolNameInput() {
        await this.schoolNameInput.click();
        await this.schoolNameInput.setValue(schoolFormData.schoolName);
        await BasePage.hideKeyboard();
        await driver.pressKeyCode(66); // Press Enter key to trigger search
        await driver.pause(3000);

        // await driver.performActions([{
        //     type: 'pointer',
        //     id: 'finger1',
        //     parameters: { pointerType: 'touch' },
        //     actions: [
        //         { type: 'pointerMove', duration: 0, x: 450, y: 2227 },
        //         { type: 'pointerDown', button: 0 },
        //         { type: 'pause', duration: 100 },
        //         { type: 'pointerUp', button: 0 }
        //     ]
        // }]);
        // await driver.releaseActions();
        const { width, height } = await driver.getWindowSize();

        // 2. Calculate percentages (Math.round is required because pixels must be whole numbers)
        const tapX = Math.round(width * 0.5);  // 50% = Dead center horizontally
        const tapY = Math.round(height * 0.9); // 90% = Near the bottom of the screen

        // 3. Perform the Tap
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: tapX, y: tapY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        await driver.releaseActions();

        
    }

    async clickSchoolFormSubmitBtn() {
        await this.schoolFormSubmitBtn.click();
    }


    async fillSchoolForm() {
        await this.selectSchoolDivisionDropdown();
        await this.selectSchoolDistrictDropdown();
        await this.selectSchoolNameInput();   
        await this.clickSchoolFormSubmitBtn(); 
    }


    async fillSchoolFormIfVisible() {
        if (await this.schoolFormHeader.isDisplayed()) {
            await this.schoolFormContent();
            await this.fillSchoolForm();
        } else {
            console.log('School form not displayed. Skipping to the next step.');
        }   
    } 

}

module.exports = new SchoolFormPage();
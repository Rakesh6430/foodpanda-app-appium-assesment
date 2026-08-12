const { $, $$, expect } = require('@wdio/globals');
const { contentText, completeProfileModalData, shareLocationModalData, completeProfilePageData } = require('../data/testdata');
const BasePage = require('../data/util');
const SignUpPage = require('./signup.page');

class CompleteProfilePage {

    // ============== Complete Profile Modal Getters ==============
    
    // Modal Element Getters
    get modalProfilePicture() {
        return $('~' + completeProfileModalData.profilePicture.contentDesc);
    }

    get modalTitle() {
        return $('android=new UiSelector().text("' + completeProfileModalData.modalTitle.text + '").className("android.widget.TextView").instance(0)');
    }

    get modalDescription() {
        return $('android=new UiSelector().textContains("' + completeProfileModalData.modalDescription.text.substring(0, 20) + '")');
    }

    get modalCompleteProfileButton() {
        return $('android=new UiSelector().text("' + completeProfileModalData.completeProfileButton.text + '").clickable(true)');
    }
    
    // ============== Share Location Modal Getters ==============
    
    get shareLocationModalTitle() {
        return $('android=new UiSelector().text("' + shareLocationModalData.modalTitle.text + '").className("android.widget.TextView")');
    }

    get shareLocationModalDescription() {
        return $('android=new UiSelector().textContains("' + shareLocationModalData.modalDescription.text.substring(0, 20) + '")');
    }

    get shareLocationButton() {
        return $('android=new UiSelector().text("' + shareLocationModalData.shareLocationButton.text + '").clickable(true)');
    }

    // Complete Your Profile Modal Sections
    async isModalDisplayed() {
        try {
            const src = await driver.getPageSource();
            return src.includes('প্রোফাইল কমপ্লিট') || src.includes('কনটেন্ট দেখতে');
        } catch {
            return false;
        }
    }

    async getModalTitle() {
        const textViews = await $$('android.widget.TextView');
        for (const el of textViews) {
            try {
                const text = await el.getText();
                if (text === completeProfileModalData.modalTitle.text) return text;
            } catch {}
        }
        return '';
    }

    async getModalDescription() {
        const prefix = completeProfileModalData.modalDescription.text.substring(0, 10);
        const textViews = await $$('android.widget.TextView');
        for (const el of textViews) {
            try {
                const text = await el.getText();
                if (text.includes(prefix)) return text;
            } catch {}
        }
        return '';
    }

    async clickModalProfilePicture() {
        await this.modalProfilePicture.waitForDisplayed({ timeout: 5000 });
        await this.modalProfilePicture.click();
    }

    async clickModalCompleteProfileButton() {
        // Compose button — coordinate tap from bounds [230,1785][1210,1963]
        await driver.execute('mobile: clickGesture', { x: 720, y: 1874 });
        await driver.pause(2000);
    }

    async verifyModalTitleText() {
        const titleText = await this.getModalTitle();
        return titleText === completeProfileModalData.modalTitle.text;
    }

    async verifyModalDescriptionText() {
        const descText = await this.getModalDescription();
        return descText.includes(completeProfileModalData.modalDescription.text.substring(0, 10));
    }

    // ============== Share Location Modal Methods ==============

    async isShareLocationModalDisplayed() {
        try {
            const src = await driver.getPageSource();
            return src.includes('লোকেশন শেয়ার') || src.includes('এগিয়ে যাও');
        } catch {
            return false;
        }
    }

    async getShareLocationModalTitle() {
        const textViews = await $$('android.widget.TextView');
        for (const el of textViews) {
            try {
                const text = await el.getText();
                if (text === shareLocationModalData.modalTitle.text) return text;
            } catch {}
        }
        return '';
    }

    async getShareLocationModalDescription() {
        const prefix = shareLocationModalData.modalDescription.text.substring(0, 10);
        const textViews = await $$('android.widget.TextView');
        for (const el of textViews) {
            try {
                const text = await el.getText();
                if (text.includes(prefix)) return text;
            } catch {}
        }
        return '';
    }

    async clickShareLocationButton() {
        // Compose button — coordinate tap from bounds [140,1855][1300,2044]
        await driver.execute('mobile: clickGesture', { x: 720, y: 1950 });
        await driver.pause(2000);
        // Handle system location permission dialog if it appears
        try {
            const allowBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")');
            await allowBtn.waitForExist({ timeout: 5000 });
            await allowBtn.click();
            await driver.pause(2000);
        } catch {}
    }

    async verifyShareLocationTitle() {
        const titleText = await this.getShareLocationModalTitle();
        return titleText === shareLocationModalData.modalTitle.text;
    }

    async verifyShareLocationDescription() {
        const descText = await this.getShareLocationModalDescription();
        return descText.includes(shareLocationModalData.modalDescription.text.substring(0, 10));
    }

    async getShareLocationButtonText() {
        const textViews = await $$('android.widget.TextView');
        for (const el of textViews) {
            try {
                const text = await el.getText();
                if (text === shareLocationModalData.shareLocationButton.text) return text;
            } catch {}
        }
        return '';
    }


    // Complete Profile Information

    get backButton() {
        return $('~Navigate up');
    }

    get pageTitle() {
        return $('android=new UiSelector().text("প্রোফাইল তথ্য যোগ করো")');
    }

    // Profile Picture Section
    get profilePicture() {
        return $('~তোমার প্রোফাইল পিকচার দাও');
    }

    get profilePictureLabel() {
        return $('android=new UiSelector().text("তোমার প্রোফাইল পিকচার দাও")');
    }

    // Personal Information Section
    get personalInfoHeader() {
        return $('android=new UiSelector().text("ব্যক্তিগত তথ্য")');
    }

    get nameLabel() {
        return $('android=new UiSelector().text("নাম *")');
    }

    get nameField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    }

    get mobileNumberLabel() {
        return $('android=new UiSelector().text("মোবাইল নম্বর")');
    }

    get mobileNumberField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
    }

    get dateOfBirthLabel() {
        return $('android=new UiSelector().text("জন্ম তারিখ *")');
    }

    get dateOfBirthField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(2)');
    }

    get dateOfBirthInfo() {
        return $('~৬০ দিনের মধ্যে নাম চেঞ্জ করতে পারবে না।');
    }

    get dateOfBirthInfoText() {
        return $('android=new UiSelector().text("৬০ দিনের মধ্যে নাম চেঞ্জ করতে পারবে না।")');
    }

    get calendarButton() {
        return $('~ক্যালেন্ডার');
    }

    get okButton() {
        return $('android=new UiSelector().className("android.view.View").instance(7)');
    }


    // Gender Section
    get genderLabel() {
        return $('android=new UiSelector().text("তুমি একজন *")');
    }

    get genderBoyOption() {
        return $('android=new UiSelector().text("ছাত্র")');
    }

    get genderGirlOption() {
        return $('android=new UiSelector().text("ছাত্রী")');
    }

    get genderBoyRadioButton() {
        return $('android=new UiSelector().className("android.widget.RadioButton").instance(0)');
    }

    get genderGirlRadioButton() {
        return $('android=new UiSelector().className("android.widget.RadioButton").instance(1)');
    }

    // Save Button
    get saveButton() {
        return $('android=new UiSelector().text("সেভ করো")');
    }

    get saveButtonContainer() {
        return $('android=new UiSelector().className("android.widget.Button").instance(1)');
    }

    // Complete Profile Button (on home page or previous screen)
    get completeProfileButton() {
        return $('android=new UiSelector().text("প্রোফাইল কমপ্লিট করো").clickable(true)');
    }

    // Action Methods
    async clickCompleteProfileButton() {
        await this.completeProfileButton.waitForDisplayed({ timeout: 10000 });
        await this.completeProfileButton.click();
    }

    async clickProfilePicture() {
        await this.profilePicture.waitForDisplayed({ timeout: 5000 });
        await this.profilePicture.click();
    }

    async enterName(name) {
        await this.nameField.waitForDisplayed({ timeout: 5000 });
        await this.nameField.clearValue();
        await this.nameField.setValue(name);
    }

    async getNameValue() {
        await this.nameField.waitForDisplayed({ timeout: 5000 });
        return await this.nameField.getText();
    }

    async getMobileNumberValue() {
        await this.mobileNumberField.waitForDisplayed({ timeout: 5000 });
        return await this.mobileNumberField.getText();
    }

    async clickDateOfBirthField() {
        await this.dateOfBirthField.waitForDisplayed({ timeout: 5000 });
        await this.dateOfBirthField.click();
    }

    async clickCalendarButton() {
        await this.calendarButton.waitForDisplayed({ timeout: 5000 });
        await this.calendarButton.click();
    }

    async dismissDatePicker() {
        await driver.pause(1000);
        const btn = await this.okButton;
        await btn.waitForExist({ timeout: 5000 });
        const loc = await btn.getLocation();
        const size = await btn.getSize();
        const x = Math.round(loc.x + size.width / 2);
        const y = Math.round(loc.y + size.height / 2);
        await driver.execute('mobile: clickGesture', { x, y });
        await driver.pause(1000);
    }

    async selectGenderBoy() {
        await this.genderBoyRadioButton.waitForDisplayed({ timeout: 5000 });
        await this.genderBoyRadioButton.click();
    }

    async selectGenderGirl() {
        await this.genderGirlRadioButton.waitForDisplayed({ timeout: 5000 });
        await this.genderGirlRadioButton.click();
    }

    async clickSaveButton() {
        await this.saveButton.waitForDisplayed({ timeout: 5000 });
        await this.saveButton.click();
    }

    // Validation Methods
    async isPageTitleDisplayed() {
        await this.pageTitle.waitForDisplayed({ timeout: 5000 });
        return true;
    }

    async isProfilePictureVisible() {
        return await this.profilePicture.isDisplayed();
    }

    async isNameFieldDisplayed() {
        return await this.nameField.isDisplayed();
    }

    async isMobileNumberFieldDisplayed() {
        return await this.mobileNumberField.isDisplayed();
    }

    async isDateOfBirthFieldDisplayed() {
        return await this.dateOfBirthField.isDisplayed();
    }

    async isGenderOptionsDisplayed() {
        const boyVisible = await this.genderBoyOption.isDisplayed();
        const girlVisible = await this.genderGirlOption.isDisplayed();
        return boyVisible && girlVisible;
    }

    async isSaveButtonDisplayed() {
        return await this.saveButton.isDisplayed();
    }

    async getGenderBoyText() {
        return await this.genderBoyOption.getText();
    }

    async getGenderGirlText() {
        return await this.genderGirlOption.getText();
    }

    async getNameLabelText() {
        return await this.nameLabel.getText();
    }

    async getMobileNumberLabelText() {
        return await this.mobileNumberLabel.getText();
    }

    async getDateOfBirthLabelText() {
        return await this.dateOfBirthLabel.getText();
    }

    async getGenderLabelText() {
        return await this.genderLabel.getText();
    }

    async getSaveButtonText() {
        return await this.saveButton.getText();
    }

    // ============== Class Shift Section ==============

    get classShiftLabel() {
        return $(`android=new UiSelector().text("${completeProfilePageData.classShiftLabel}")`);
    }

    get classShiftField() {
        // Label "ক্লাসের শিফট *" is a child TextView inside the dropdown EditText (same
        // pattern as DOB field). childSelector is instance-position-independent, which
        // matters because Compose lazy rendering removes off-screen fields from the tree
        // — so instance(3) breaks as soon as earlier fields scroll out of the viewport.
        return $(`android=new UiSelector().className("android.widget.EditText").childSelector(new UiSelector().text("${completeProfilePageData.classShiftLabel}"))`);
    }

    async getClassShiftLabelText() {
        return await this.classShiftLabel.getText();
    }

    async isClassShiftLabelDisplayed() {
        return await this.classShiftLabel.isDisplayed();
    }

    async isClassShiftFieldDisplayed() {
        try {
            return await this.classShiftField.isDisplayed();
        } catch {
            return false;
        }
    }

    async clickClassShiftField() {
        // EditText has enabled=false (Compose dropdown) — .click() is silently ignored.
        // scrollIntoView first, then coordinate-tap the center of the field.
        const el = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${completeProfilePageData.classShiftLabel}"))`);
        await driver.pause(300);
        const loc = await el.getLocation();
        const size = await el.getSize();
        await driver.execute('mobile: clickGesture', {
            x: Math.round(loc.x + size.width / 2),
            y: Math.round(loc.y + size.height / 2)
        });
        await driver.pause(500);
    }

    async selectClassShiftOption(optionText) {
        // Dropdown items are clickable android.view.View wrapping a non-clickable TextView.
        // Locate via text, compute center, coordinate-tap the parent View bounds.
        const textEl = await $(`android=new UiSelector().text("${optionText}")`);
        await textEl.waitForExist({ timeout: 5000 });
        const loc = await textEl.getLocation();
        const size = await textEl.getSize();
        const x = Math.round(loc.x + size.width / 2);
        const y = Math.round(loc.y + size.height / 2);
        await driver.execute('mobile: clickGesture', { x, y });
        await driver.pause(500);
    }

    // ============== Others Education Medium Section ==============

    get othersEducationMediumLabel() {
        return $(`android=new UiSelector().text("${completeProfilePageData.othersEducationMediumLabel}")`);
    }

    get othersEducationMediumField() {
        // EditText is enabled=false so element.click() won't fire.
        // Return the label TextView (visible/enabled) so isDisplayed() checks work.
        return $(`android=new UiSelector().text("${completeProfilePageData.othersEducationMediumLabel}")`);
    }

    async getOthersEducationMediumLabelText() {
        return await this.othersEducationMediumLabel.getText();
    }

    async isOthersEducationMediumLabelDisplayed() {
        return await this.othersEducationMediumLabel.isDisplayed();
    }

    async isOthersEducationMediumFieldDisplayed() {
        return await this.othersEducationMediumField.isDisplayed();
    }

    async clickOthersEducationMediumField() {
        // scrollIntoView both ensures the element is on-screen AND returns its reference
        const el = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${completeProfilePageData.othersEducationMediumLabel}"))`);
        await driver.pause(300);
        const loc = await el.getLocation();
        const size = await el.getSize();
        // Coordinate-tap bypasses enabled=false on the Compose EditText wrapper
        await driver.execute('mobile: clickGesture', {
            x: Math.round(loc.x + size.width / 2),
            y: Math.round(loc.y + size.height / 2)
        });
        await driver.pause(500);
    }

    async _getCheckboxForOption(optionText) {
        const textEl = await $(`android=new UiSelector().text("${optionText}")`);
        await textEl.waitForExist({ timeout: 5000 });
        const textLoc = await textEl.getLocation();
        const textSize = await textEl.getSize();
        const textCenterY = textLoc.y + textSize.height / 2;
        const checkboxes = await $$('android.widget.CheckBox');
        let closest = null;
        let closestDist = Infinity;
        for (const cb of checkboxes) {
            try {
                const loc = await cb.getLocation();
                const size = await cb.getSize();
                const dist = Math.abs((loc.y + size.height / 2) - textCenterY);
                if (dist < closestDist) { closestDist = dist; closest = cb; }
            } catch {}
        }
        return closest;
    }

    async selectOthersEducationMediumOption(optionText) {
        // element.click() doesn't fire for Compose rows; coordinate-tap the checkbox directly
        const checkbox = await this._getCheckboxForOption(optionText);
        if (!checkbox) throw new Error(`Checkbox for "${optionText}" not found`);
        const loc = await checkbox.getLocation();
        const size = await checkbox.getSize();
        await driver.execute('mobile: clickGesture', {
            x: Math.round(loc.x + size.width / 2),
            y: Math.round(loc.y + size.height / 2)
        });
        await driver.pause(500);
    }

    async isOthersEducationMediumOptionChecked(optionText) {
        const checkbox = await this._getCheckboxForOption(optionText);
        if (!checkbox) return false;
        // isSelected() maps to 'selected'; for Compose checkboxes use getAttribute('checked')
        const checked = await checkbox.getAttribute('checked');
        return checked === 'true';
    }

    async dismissOthersEducationMediumDropdown() {
        await driver.pressKeyCode(4);
        await driver.pause(500);
    }

    // ============== Guardian Name Section ==============

    get guardianNameLabel() {
        return $(`android=new UiSelector().text("${completeProfilePageData.guardianNameLabel}")`);
    }

    get guardianNameField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(6)');
    }

    async getGuardianNameLabelText() {
        return await this.guardianNameLabel.getText();
    }

    async isGuardianNameLabelDisplayed() {
        return await this.guardianNameLabel.isDisplayed();
    }

    async isGuardianNameFieldDisplayed() {
        return await this.guardianNameField.isDisplayed();
    }

    async enterGuardianName(name) {
        await this.guardianNameField.waitForDisplayed({ timeout: 5000 });
        await this.guardianNameField.clearValue();
        await this.guardianNameField.setValue(name);
    }

    async getGuardianNameValue() {
        await this.guardianNameField.waitForDisplayed({ timeout: 5000 });
        return await this.guardianNameField.getText();
    }

    // ============== Guardian Mobile Number Section ==============

    get guardianMobileNumberLabel() {
        return $(`android=new UiSelector().text("${completeProfilePageData.guardianMobileNumberLabel}")`);
    }

    get guardianMobileNumberField() {
        return $('android=new UiSelector().className("android.widget.EditText").instance(7)');
    }

    async getGuardianMobileNumberLabelText() {
        return await this.guardianMobileNumberLabel.getText();
    }

    async isGuardianMobileNumberLabelDisplayed() {
        return await this.guardianMobileNumberLabel.isDisplayed();
    }

    async isGuardianMobileNumberFieldDisplayed() {
        return await this.guardianMobileNumberField.isDisplayed();
    }

    async enterGuardianMobileNumber(number) {
        await this.guardianMobileNumberField.waitForDisplayed({ timeout: 5000 });
        await this.guardianMobileNumberField.clearValue();
        await this.guardianMobileNumberField.setValue(number);
    }

    async getGuardianMobileNumberValue() {
        await this.guardianMobileNumberField.waitForDisplayed({ timeout: 5000 });
        return await this.guardianMobileNumberField.getText();
    }

    // Save Button at Bottom of Form (fixed sticky footer outside the scroll container)

    async bottomSaveButton() {
        return await this.saveButtonContainer.isDisplayed();
    }

    async clickBottomSaveButton() {
        await this.saveButtonContainer.waitForDisplayed({ timeout: 5000 });
        await this.saveButtonContainer.click();
        await driver.pause(1000);
    }

    // ============== Complete Profile Flow ==============

    // Fills the entire complete-profile form from start to finish.
    // Navigates through the modal if present, fills all required fields, and saves.
    // Other specs can call this to get past the profile-completion gate.
    // Pass a data object to override any of the testData defaults.
    async completeProfile(data = completeProfilePageData.testData) {
        // Dismiss the modal prompt if it is on screen
        const isModal = await this.isModalDisplayed();
        if (isModal) {
            await this.clickModalCompleteProfileButton();
            await driver.pause(2000);
        }

        // Wait for the form page to be ready
        await this.pageTitle.waitForDisplayed({ timeout: 10000 });

        // Date of birth — open the picker and confirm (preserves existing value)
        await this.clickDateOfBirthField();
        await driver.pause(1000);
        await this.dismissDatePicker();

        // Gender
        if (data.selectedGender === 'boy') {
            await this.selectGenderBoy();
        } else {
            await this.selectGenderGirl();
        }
        await driver.pause(300);

        // Class shift — clickClassShiftField scrolls into view internally
        await this.clickClassShiftField();
        await driver.pause(1000);
        await this.selectClassShiftOption(completeProfilePageData.classShiftOptions.afternoon);

        // Education medium — clickOthersEducationMediumField scrolls into view internally
        await this.clickOthersEducationMediumField();
        await driver.pause(1000);
        await this.selectOthersEducationMediumOption(completeProfilePageData.othersEducationMediumOptions[0]);
        await this.dismissOthersEducationMediumDropdown();

        // Guardian name
        await BasePage.scrollToElement(completeProfilePageData.guardianNameLabel);
        await driver.pause(500);
        await this.enterGuardianName(data.guardianName);
        await driver.pause(300);

        // Guardian mobile number
        await BasePage.scrollToElement(completeProfilePageData.guardianMobileNumberLabel);
        await driver.pause(500);
        await this.enterGuardianMobileNumber(data.guardianMobileNumber);
        await driver.pause(300);

        // Submit
        await this.clickBottomSaveButton();
        await driver.pause(2000);
    }
}

module.exports = new CompleteProfilePage();

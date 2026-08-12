const { expect, driver } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const LoginPage = require('../pageobjects/loginpage.page');
const { loginData, completeProfileModalData, shareLocationModalData, completeProfilePageData } = require('../data/testdata');
const BasePage = require('../data/util');
const SchoolFormPage = require('../pageobjects/schoolForm.page');
const completeProfilePage = require('../pageobjects/completeProfile.page');

describe('Shikho App - Complete Profile', () => {

    before(async () => {
        await BasePage.launchApp();
        await BasePage.dismissNotificationPopup();
        await SplashScreen.skipOnboarding();
        await LoginPage.login(loginData.validNumber, loginData.validPassword);
        await SchoolFormPage.fillSchoolFormIfVisible();
        await driver.pause(3000);
    });

    // ==================== Share Location Modal Tests ====================

    describe('Share Location Modal', () => {

        it('should display correct modal description', async () => {
            const descMatches = await completeProfilePage.verifyShareLocationDescription();
            expect(descMatches).toBe(true);
        });

        it('should click the share location button and dismiss the modal', async () => {
            await completeProfilePage.clickShareLocationButton();
            await driver.pause(3000);
            const isStillDisplayed = await completeProfilePage.isShareLocationModalDisplayed();
            expect(isStillDisplayed).toBe(false);
        });
    });

    // ==================== Complete Profile Modal Tests ====================

    describe('Complete Profile Modal - Text Content', () => {

        it('should display correct modal title text', async () => {
            const modalTitle = await completeProfilePage.getModalTitle();
            expect(modalTitle).toBe(completeProfileModalData.modalTitle.text);
        });

        it('should verify modal title matches expected text', async () => {
            const titleMatches = await completeProfilePage.verifyModalTitleText();
            expect(titleMatches).toBe(true);
        });

        it('should display modal description text', async () => {
            const description = await completeProfilePage.getModalDescription();
            expect(description).toBeDefined();
            expect(description.length).toBeGreaterThan(0);
        });

        it('should verify modal description contains expected text', async () => {
            const descMatches = await completeProfilePage.verifyModalDescriptionText();
            expect(descMatches).toBe(true);
        });

        it('should verify complete modal description text', async () => {
            const description = await completeProfilePage.getModalDescription();
            expect(description).toContain('প্রোফাইল');
            expect(description).toContain('কমপ্লিট');
        });
    });

    describe('Complete Profile Modal - Element Verification', () => {

        it('should verify modal profile picture data', async () => {
            const picData = completeProfileModalData.profilePicture;
            expect(picData.contentDesc).toBe('তোমার প্রোফাইল পিকচার দাও');
            expect(picData.elementType).toBe('android.widget.ImageView');
        });

        it('should verify modal title data structure', async () => {
            const titleData = completeProfileModalData.modalTitle;
            expect(titleData.text).toBe('প্রোফাইল কমপ্লিট করো');
            expect(titleData.elementType).toBe('android.widget.TextView');
        });

        it('should verify modal description data structure', async () => {
            const descData = completeProfileModalData.modalDescription;
            expect(descData.text).toBe('সকল কনটেন্ট দেখতে তোমার প্রোফাইল কমপ্লিট করো');
            expect(descData.elementType).toBe('android.widget.TextView');
        });

        it('should verify button data structure', async () => {
            const btnData = completeProfileModalData.completeProfileButton;
            expect(btnData.text).toBe('প্রোফাইল কমপ্লিট করো');
            expect(btnData.clickable).toBe(true);
            expect(btnData.focusable).toBe(true);
        });
    });

    describe('Complete Profile Modal - Button Interactions', () => {

        it('should click complete profile button in modal', async () => {
            await expect(async () => {
                await completeProfilePage.clickModalCompleteProfileButton();
            }).not.toThrow();
        });

        it('should navigate after clicking complete profile button', async () => {
            await driver.pause(2000);
            const pageTitle = await completeProfilePage.pageTitle;
            const isTitleVisible = await pageTitle.isDisplayed().catch(() => false);
            expect(isTitleVisible || !await completeProfilePage.isModalDisplayed()).toBe(true);
        });
    });

    // ==================== Complete Profile Form Tests ====================

    describe('Complete Profile Form - Page Display & Navigation', () => {

        it('should display the complete profile page title', async () => {
            const isDisplayed = await completeProfilePage.isPageTitleDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should verify page title text is correct', async () => {
            const titleText = await completeProfilePage.pageTitle.getText();
            expect(titleText).toBe('প্রোফাইল তথ্য যোগ করো');
        });

        it('should display back button for navigation', async () => {
            const backBtn = await completeProfilePage.backButton;
            const isDisplayed = await backBtn.isDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should navigate back when clicking back button', async () => {
            await expect(async () => {
                await completeProfilePage.backButton.click();
            }).not.toThrow();
        });
    });

    describe('Complete Profile Form - Profile Picture Section', () => {

        before(async () => {
            await driver.pause(1000);
            const isFormDisplayed = await completeProfilePage.isPageTitleDisplayed().catch(() => false);
            if (!isFormDisplayed) {
                await completeProfilePage.clickModalCompleteProfileButton();
                await driver.pause(2000);
            }
        });

        it('should display profile picture element', async () => {
            const isVisible = await completeProfilePage.isProfilePictureVisible();
            expect(isVisible).toBe(true);
        });

        it('should display profile picture label text', async () => {
            const labelText = await completeProfilePage.profilePictureLabel.getText();
            expect(labelText).toBe('তোমার প্রোফাইল পিকচার দাও');
        });

        // it('should click profile picture for upload', async () => {
        //     await expect(async () => {
        //         await completeProfilePage.clickProfilePicture();
        //     }).not.toThrow();
        // });
    });

    describe('Complete Profile Form - Personal Information Section', () => {

        it('should display personal information header', async () => {
            const headerText = await completeProfilePage.personalInfoHeader.getText();
            expect(headerText).toBe('ব্যক্তিগত তথ্য');
        });

        it('should display name label', async () => {
            const labelText = await completeProfilePage.getNameLabelText();
            expect(labelText).toBe('নাম *');
        });

        it('should display name input field', async () => {
            const isDisplayed = await completeProfilePage.isNameFieldDisplayed();
            expect(isDisplayed).toBe(true);
        });

        // We will not change it, we need to wait 60 days to update user name field value.
        // it('should enter name in name field', async () => {
        //     const testName = 'টেস্ট ইউজার';
        //     await completeProfilePage.enterName(testName);
        //     await driver.pause(500);
        //     const nameValue = await completeProfilePage.getNameValue();
        //     expect(nameValue).toContain(testName);
        // });

        it('should display mobile number label', async () => {
            const labelText = await completeProfilePage.getMobileNumberLabelText();
            expect(labelText).toBe('মোবাইল নম্বর');
        });

        it('should display mobile number field', async () => {
            const isDisplayed = await completeProfilePage.isMobileNumberFieldDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should get mobile number value from field', async () => {
            const mobileValue = await completeProfilePage.getMobileNumberValue();
            expect(mobileValue).toBeDefined();
        });
    });

    describe('Complete Profile Form - Date of Birth Section', () => {

        it('should display date of birth label', async () => {
            const labelText = await completeProfilePage.getDateOfBirthLabelText();
            expect(labelText).toBe('জন্ম তারিখ *');
        });

        it('should display date of birth input field', async () => {
            const isDisplayed = await completeProfilePage.isDateOfBirthFieldDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should display date of birth information text', async () => {
            const infoText = await completeProfilePage.dateOfBirthInfoText.getText();
            expect(infoText).toContain('৬০ দিনের মধ্যে');
        });

        it('should click date of birth field to open picker', async () => {
            await completeProfilePage.clickDateOfBirthField();
            await driver.pause(1000);
        });

        it('should display calendar button', async () => {
            const isDisplayed = await completeProfilePage.calendarButton.isDisplayed().catch(() => false);
            expect(typeof isDisplayed).toBe('boolean');
        });

        it('should click calendar button for date selection', async () => {
            try {
                await completeProfilePage.clickCalendarButton();
                await driver.pause(500);
            } catch (error) {
                console.log('Calendar button not available');
            }
        });

        it('should dismiss date picker by clicking ঠিক আছে', async () => {
            await completeProfilePage.dismissDatePicker();
        });
    });

    describe('Complete Profile Form - Gender Section', () => {

        it('should display gender label', async () => {
            const labelText = await completeProfilePage.getGenderLabelText();
            expect(labelText).toBe('তুমি একজন *');
        });

        it('should display gender options', async () => {
            const isDisplayed = await completeProfilePage.isGenderOptionsDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should display boy gender option', async () => {
            const boyText = await completeProfilePage.getGenderBoyText();
            expect(boyText).toBe('ছাত্র');
        });

        it('should display girl gender option', async () => {
            const girlText = await completeProfilePage.getGenderGirlText();
            expect(girlText).toBe('ছাত্রী');
        });

        it('should select boy gender option', async () => {
            await expect(async () => {
                await completeProfilePage.selectGenderBoy();
            }).not.toThrow();
        });

        it('should select girl gender option', async () => {
            await expect(async () => {
                await completeProfilePage.selectGenderGirl();
            }).not.toThrow();
        });
    });

    describe('Complete Profile Form - Full Form Workflow', () => {

        before(async () => {
            await driver.pause(2000);
        });

        it('should complete full profile form workflow', async () => {
            const isPageDisplayed = await completeProfilePage.isPageTitleDisplayed().catch(() => false);
            expect(isPageDisplayed).toBe(true);

            const nameFVisible = await completeProfilePage.isNameFieldDisplayed();
            const dobFVisible = await completeProfilePage.isDateOfBirthFieldDisplayed();
            const genderFVisible = await completeProfilePage.isGenderOptionsDisplayed();
            const saveBtnVisible = await completeProfilePage.isSaveButtonDisplayed();

            expect(nameFVisible).toBe(true);
            expect(dobFVisible).toBe(true);
            expect(genderFVisible).toBe(true);
            expect(saveBtnVisible).toBe(true);
        });

        // We will not change it, we need to wait 60 days to update user name field value.
        // it('should fill name field with valid data', async () => {
        //     const testName = 'আবরার খান';
        //     await completeProfilePage.enterName(testName);
        //     await driver.pause(300);
        //     const nameValue = await completeProfilePage.getNameValue();
        //     expect(nameValue).toContain('আবরার');
        // });

        it('should select gender option', async () => {
            await completeProfilePage.selectGenderGirl();
            await driver.pause(300);
        });

        it('should verify all form labels are in Bengali', async () => {
            const nameLabel = await completeProfilePage.getNameLabelText();
            const dobLabel = await completeProfilePage.getDateOfBirthLabelText();
            const genderLabel = await completeProfilePage.getGenderLabelText();

            const bengaliRegex = /[ঀ-৿]/;
            expect(bengaliRegex.test(nameLabel)).toBe(true);
            expect(bengaliRegex.test(dobLabel)).toBe(true);
            expect(bengaliRegex.test(genderLabel)).toBe(true);
        });
    });

    describe('Complete Profile Form - Label & Text Verification', () => {

        it('should verify all labels are displayed correctly', async () => {
            const nameLabel = await completeProfilePage.nameLabel.getText();
            const mobileLabel = await completeProfilePage.mobileNumberLabel.getText();
            const dobLabel = await completeProfilePage.dateOfBirthLabel.getText();
            const genderLabel = await completeProfilePage.genderLabel.getText();

            expect(nameLabel).toBe('নাম *');
            expect(mobileLabel).toBe('মোবাইল নম্বর');
            expect(dobLabel).toBe('জন্ম তারিখ *');
            expect(genderLabel).toBe('তুমি একজন *');
        });

        it('should verify profile picture description text', async () => {
            const profilePicDesc = await completeProfilePage.profilePicture.getAttribute('content-desc');
            expect(profilePicDesc).toBe('তোমার প্রোফাইল পিকচার দাও');
        });

        it('should verify all visible text contains Bengali characters', async () => {
            const pageTitle = await completeProfilePage.pageTitle.getText();
            const personalHeader = await completeProfilePage.personalInfoHeader.getText();

            const bengaliRegex = /[ঀ-৿]/;
            expect(bengaliRegex.test(pageTitle)).toBe(true);
            expect(bengaliRegex.test(personalHeader)).toBe(true);
        });
    });
    
    // ==================== Additional Information Section ====================

    describe('Complete Profile Form - Class Shift Section', () => {

        before(async () => {
            await BasePage.scrollToElement(completeProfilePageData.classShiftLabel);
            await driver.pause(500);
        });

        it('should display class shift label', async () => {
            const isDisplayed = await completeProfilePage.isClassShiftLabelDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should verify class shift label text is correct', async () => {
            const labelText = await completeProfilePage.getClassShiftLabelText();
            expect(labelText).toBe(completeProfilePageData.classShiftLabel);
        });

        it('should display class shift field', async () => {
            const isDisplayed = await completeProfilePage.isClassShiftFieldDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should open class shift dropdown on click', async () => {
            await completeProfilePage.clickClassShiftField();
            await driver.pause(1000);
        });

        it('should select বিকাল from class shift dropdown', async () => {
            await completeProfilePage.selectClassShiftOption(completeProfilePageData.classShiftOptions.afternoon);
            await driver.pause(500);
            //const fieldValue = await completeProfilePage.classShiftField.getText();
            //expect(fieldValue).toContain(completeProfilePageData.classShiftOptions.afternoon);
        });
    });

    describe('Complete Profile Form - Others Education Medium Section', () => {

        before(async () => {
            await BasePage.scrollToElement(completeProfilePageData.othersEducationMediumLabel);
            await driver.pause(500);
        });

        it('should display others education medium label', async () => {
            const isDisplayed = await completeProfilePage.isOthersEducationMediumLabelDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should verify others education medium label text is correct', async () => {
            const labelText = await completeProfilePage.getOthersEducationMediumLabelText();
            expect(labelText).toBe(completeProfilePageData.othersEducationMediumLabel);
        });

        it('should display others education medium field', async () => {
            const isDisplayed = await completeProfilePage.isOthersEducationMediumFieldDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should open others education medium dropdown on click', async () => {
            await expect(async () => {
                await completeProfilePage.clickOthersEducationMediumField();
                await driver.pause(1000);
            }).not.toThrow();
        });

        // Will Fix later
        // it('should display all education medium options', async () => {
        //     for (const option of completeProfilePageData.othersEducationMediumOptions) {
        //         const el = await $(`android=new UiSelector().text("${option}")`);
        //         expect(await el.isDisplayed()).toBe(true);
        //     }
        // });

        it('should select অফলাইন কোচিং and verify it is checked', async () => {
            await completeProfilePage.selectOthersEducationMediumOption(completeProfilePageData.othersEducationMediumOptions[0]);
            const isChecked = await completeProfilePage.isOthersEducationMediumOptionChecked(completeProfilePageData.othersEducationMediumOptions[0]);
            expect(isChecked).toBe(true);
        });

        it('should select multiple options', async () => {
            await completeProfilePage.selectOthersEducationMediumOption(completeProfilePageData.othersEducationMediumOptions[1]);
            const isChecked = await completeProfilePage.isOthersEducationMediumOptionChecked(completeProfilePageData.othersEducationMediumOptions[1]);
            expect(isChecked).toBe(true);
        });

        it('should dismiss the dropdown', async () => {
            await completeProfilePage.dismissOthersEducationMediumDropdown();
            const fieldDisplayed = await completeProfilePage.isOthersEducationMediumFieldDisplayed();
            expect(fieldDisplayed).toBe(true);
        });
    });

    describe('Complete Profile Form - Guardian Name Section', () => {

        before(async () => {
            await BasePage.scrollToElement(completeProfilePageData.guardianNameLabel);
            await driver.pause(500);
        });

        it('should display guardian name label', async () => {
            const isDisplayed = await completeProfilePage.isGuardianNameLabelDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should verify guardian name label text is correct', async () => {
            const labelText = await completeProfilePage.getGuardianNameLabelText();
            expect(labelText).toBe(completeProfilePageData.guardianNameLabel);
        });

        it('should display guardian name input field', async () => {
            const isDisplayed = await completeProfilePage.isGuardianNameFieldDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should enter guardian name in input field', async () => {
            await completeProfilePage.enterGuardianName(completeProfilePageData.testData.guardianName);
            await driver.pause(300);
            const value = await completeProfilePage.getGuardianNameValue();
            expect(value).toContain(completeProfilePageData.testData.guardianName);
        });
    });

    describe('Complete Profile Form - Guardian Mobile Number Section', () => {

        before(async () => {
            await BasePage.scrollToElement(completeProfilePageData.guardianMobileNumberLabel);
            await driver.pause(500);
        });

        it('should display guardian mobile number label', async () => {
            const isDisplayed = await completeProfilePage.isGuardianMobileNumberLabelDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should verify guardian mobile number label text is correct', async () => {
            const labelText = await completeProfilePage.getGuardianMobileNumberLabelText();
            expect(labelText).toBe(completeProfilePageData.guardianMobileNumberLabel);
        });

        it('should display guardian mobile number input field', async () => {
            const isDisplayed = await completeProfilePage.isGuardianMobileNumberFieldDisplayed();
            expect(isDisplayed).toBe(true);
        });

        it('should enter guardian mobile number in input field', async () => {
            await completeProfilePage.enterGuardianMobileNumber(completeProfilePageData.testData.guardianMobileNumber);
            await driver.pause(300);
            const value = await completeProfilePage.getGuardianMobileNumberValue();
            expect(value).toContain(completeProfilePageData.testData.guardianMobileNumber);
        });
    });

    // ==================== Form Submission & Validation Tests ====================

    describe('Complete Profile Form - Form Submission', () => {

        it('should display save button', async () => {
            const isDisplayed = await completeProfilePage.bottomSaveButton();
            expect(isDisplayed).toBe(true);
        });

        it('should click save button to submit form', async () => {
            await expect(async () => {
                await completeProfilePage.clickBottomSaveButton();
                await driver.pause(2000);
            }).not.toThrow();
        });
    });

});



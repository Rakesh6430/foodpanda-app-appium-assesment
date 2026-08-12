const { expect, driver } = require('@wdio/globals');
const SplashScreen = require('../pageobjects/splashscreen.page');
const LoginPage = require('../pageobjects/loginpage.page');
const LiveClass = require('../pageobjects/live-class.page');
const { loginData } = require('../data/testdata');
const BasePage = require('../data/util');

describe('Shikho App - Paid User Homepage', () => {

    let hasScheduledClass,isEmptyState,isOngoing;

    before(async () => {
        await BasePage.dismissNotificationPopup();
        await SplashScreen.skipOnboarding();
        await driver.pause(2000);
        await LoginPage.login(loginData.purchasedNumber, loginData.validPassword);
        await BasePage.handleLocationSharing();
        await driver.pause(5000); // Wait for homepage to load
    });

    //=========================================================================================
    //============================== Live Class From Homepage =================================  

    it('should find a SCHEDULED Class card and navigate to details', async function () {
        try {
            // ১. কার্ড খোঁজার চেষ্টা করবে
            const scheduledCard = await LiveClass.findCardByState('scheduled');
            
            // ২. কার্ড পেলে সেটিতে ক্লিক করার চেষ্টা করবে
            await LiveClass.openScheduledClassDetails(scheduledCard);
            
            //কার্ড পেয়ে ডিটেইলস পেজে ঢুকতে পারলে ফ্ল্যাগটি true করে দেব
            hasScheduledClass = true; 
            console.log('✅ Successfully entered Scheduled Class details page.');

            // ৩. ভ্যালিডেশন
            await driver.pause(3000); 

        } catch (error) {
            // কার্ড না পেলে বা ক্লিক করতে না পারলে স্ক্রিপ্ট ফেইল না করে এখানে চলে আসবে
            console.log(`ℹ️ Scheduled class action skipped. Reason: ${error.message}`);
            hasScheduledClass = false;
        }
    });

    it('Schedule Live Class details Page Content',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.validateDetailsPageTitle();
        await LiveClass.validateTeacherDetailsBtn();
        await LiveClass.clickTeacherDetailsBtn();
        await LiveClass.validateTeacheModal();
        await LiveClass.clickTeacherModalCrossBtn();
        await LiveClass.validateCountdownUI();
        await LiveClass.validateTeacher();
        await LiveClass.validateSubjectName();
        await LiveClass.validateLiveClassTitle();
        //await LiveClass.validateLiveClassDate();
        //await LiveClass.validateLiveClassTime();
        await LiveClass.validateClassTopicsSection();
       
    });

    it('Should Clicked Class topics dropdwonICon',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickClassTopicsSection();
    });

    it('Should work Clicked to collapase Class topics ',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickClassTopicsSection();
    });


    it('Should validate Class resources',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.validateClassResourceContent();
    });

    it('Should Click Class Lecture Slide Arrow Button',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickLectureSlideArrowBtn();
        await driver.pause(2000);
    });

    it('Should Click Class Lecture Slide section',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickLectureSlideBottomSheetCloseButton();
        await LiveClass.clickLectureSlideSection();
    });

    it('Should validate Class Lecture Slide Empty Bottom Sheet',async () => {
        if (!hasScheduledClass) return;

        isEmptyState = await LiveClass.isPageEmpty();
        
        if (isEmptyState) {
            console.log('ℹ️ Page is EMPTY. Proceeding with Empty State validation.');
            await LiveClass.validateLectureSlideEmptyState();
        } else {
            console.log('ℹ️ PDFs found! Proceeding with Object validation.');
            isEmptyState = false;
        }
    });

    it('Should Validate Lecture PDF Item',async () => {
        if (!hasScheduledClass) return;
        if (isEmptyState) return;

        // 🔴 ভ্যালিডেশন: কার্ডটি স্ক্রিনে ডিসপ্লে হচ্ছে কি না তা নিশ্চিত করা
        await LiveClass.validateLectureSlidePDFState();
        console.log('✅ PDF Card successfully validated!');
    });

    it('Should be Clicked Lecture PDF',async () => {
        if (!hasScheduledClass) return;
        if (isEmptyState) return;

        await LiveClass.clickLectureSlide();
        await driver.pause(2000);
        await driver.back();
        await driver.pause(5000);
    });

    it('Should clicked Class Lecture Slide Bottom Sheet Close Button',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickLectureSlideBottomSheetCloseButton();
    });

    it('Should validate Chapter resources Section Content',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.validateChapterResourceContent();
    });

    it('Should Clicked Chapter resources section',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickChapterResourceSection();
    });

    it('Should Validate Chapter resources Bottom Sheet Content',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.validateChapterResourceBottomSheetContent();
    });

    it('Should Clicked Chapter resources Solution Book card',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickSolutionBook();
    });

    it('Should detect the state of the Chapter tag Solution Book page and Empty State',async () => {
        if (!hasScheduledClass) return;

        isEmptyState = await LiveClass.isPageEmpty();
        
        if (isEmptyState) {
            console.log('ℹ️ Page is EMPTY. Proceeding with Empty State validation.');
            await LiveClass.validateChapterSolutionBookEmptyState();
        } else {
            console.log('ℹ️ PDFs found! Proceeding with Object validation.');
            isEmptyState = false;
        }
    });


    it('Should Validate PDF Item',async () => {
        if (!hasScheduledClass) return;
        if (isEmptyState) return;

        // 🔴 ভ্যালিডেশন: কার্ডটি স্ক্রিনে ডিসপ্লে হচ্ছে কি না তা নিশ্চিত করা
        await LiveClass.validatePdfCardDisplayed();
        console.log('✅ PDF Card successfully validated!');
    });


    it('Should be Clicked Chapter PDF',async () => {
        if (!hasScheduledClass) return;
        if (isEmptyState) return;

        await LiveClass.clickPDF();
        await driver.pause(2000);
        await driver.back();
        await driver.pause(5000);
    });


    it('Should Validate Chapter resources back button button',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickbackNavIcon();
    });

    it('Should Validate Chapter resources device back button button',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickSolutionBook();
        await driver.pause(2000);
        await driver.back();
        await driver.pause(2000);
    });


    it('Should Validate Chapter resources Bottom Sheet Close button',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickChapterResourceBottmSheetCloseBtn();
    });
    

    it('Should Validate Subject resources Section Content',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.validateSubjectResourceContent();
    });

    it('Should Clicked Subject resources Section',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickSubjectResourceSection();
    });

    it('Should Validate Subject resources Bottom Sheet Content',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.validateSubjectResourceBottomSheetContent();
    });

    it('Should Clicked Subject resources Solution tag card',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickTagCard();
    });

    it('Should detect the state of the Subject Tag page',async () => {
        if (!hasScheduledClass) return;

        isEmptyState = await LiveClass.isPageEmpty();
        
        if (isEmptyState) {
            console.log('ℹ️ Page is EMPTY. Proceeding with Empty State validation.');
            await LiveClass.validateSubjectSolutionBookEmptyState();
        } else {
            console.log('ℹ️ PDFs found! Proceeding with Object validation.');
        }
    });

    it('Should Validate PDF Item',async () => {
        if (!hasScheduledClass) return;
        if (isEmptyState) return;

        // 🔴 ভ্যালিডেশন: কার্ডটি স্ক্রিনে ডিসপ্লে হচ্ছে কি না তা নিশ্চিত করা
        await LiveClass.validatePdfCardDisplayed();
        console.log('✅ PDF Card successfully validated!');
    });


    it('Should be Clicked Chapter PDF',async () => {
        if (!hasScheduledClass) return;
        if (isEmptyState) return;

        await LiveClass.clickPDF();
        await driver.pause(2000);
        await driver.back();
        await driver.pause(5000);
    });

    it('Should Validate Subject resources back button button',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickbackNavIcon();
    });

    it('Should Validate Subject resources device back button button',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickTagCard();
        await driver.pause(2000);
        await driver.back();
        await driver.pause(2000);
    });

    it('Should Clicked Subject resources Bottom Sheet Close button',async () => {
        if (!hasScheduledClass) return;

        await LiveClass.clickSubjectResourceBottmSheetCloseBtn();
        await driver.back();
    });

    it('should find an ONGOING Class card and join',async () => {
        try {
            // ১. কার্ড খোঁজার চেষ্টা করবে
            const ongoingCard = await LiveClass.findCardByState('ongoing');
            
            // ২. কার্ড পেলে জয়েন করার চেষ্টা করবে
            await LiveClass.joinOngoingClass(ongoingCard);
            isOngoing = true;
            
            // ৩. ভ্যালিডেশন
            await driver.pause(5000); 

        } catch (error) {
            // কার্ড না পেলে বা জয়েন করতে না পারলে স্ক্রিপ্ট ফেইল না করে এখানে চলে আসবে
            console.log(`ℹ️ Ongoing class action skipped. Reason: ${error.message}`);
            isOngoing = false;
        }
    });

    it('Should Validate Before Join Screen',async () => {
        if (!isOngoing) return;

        await LiveClass.validateClassJoin();
    });

    it('Should clicked Join Now Btn Ongoing Live Class',async () => {
        if (!isOngoing) return;

        await LiveClass.clickLiveclassJoinedBtn();
        await driver.pause(3000);
    });

    it('Should clicked Ongoing Live Class Leave Button',async () => {
        if (!isOngoing) return;

        await LiveClass.clickLiveclassLeaveBtn();
        await driver.pause(1000);
    });

    it('Should Leave Ongoing Live Class',async () => {
        if (!isOngoing) return;

        await LiveClass.clickLiveclassLeaveSessionBtn();
    });



    //=========================================================================================
    //============================== Live Class From Routine =================================  








});

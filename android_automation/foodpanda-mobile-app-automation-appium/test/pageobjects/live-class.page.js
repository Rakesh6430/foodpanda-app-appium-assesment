const { $, expect, driver } = require('@wdio/globals');
const { liveClassData, purchasedUserData } = require('../data/testdata');
const BasePage = require('../data/util');

/**
     * @param {string} targetState - 'ongoing' অথবা 'scheduled'
     * @returns {Object} - কাঙ্ক্ষিত কার্ড এলিমেন্টটি রিটার্ন করবে
     */

class LiveClass {

    //=============== Homepage Live Class Card Locators ==================
    get liveClassSectionTitle() {
        return $(`android=new UiSelector().text("${purchasedUserData.todaysSectionTitle}")`);
    }

    get allLiveClassCards() {
        return $$(`//android.view.View[@clickable="true" and .//android.widget.TextView[contains(@text, "ক্লাস")]]`);
    }

    get ongoingClassArrowBtn(){
        return $('~Ongoing Home');
    }


    //=========================== live class details page Locators ===========================

    get infoIcon(){
        return $('~Info');
    }

    get teacherDetailsBtnText(){
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.teacher.teacherDetailsBtnText}")`);
    }

    get teacherDetailsBtn(){ 
        return $(`android=new UiSelector().className("android.view.View").instance(12)`);
    }

    get detailsTeacherModalCrossIcon(){
        return $(`android=new UiSelector().className("android.widget.ImageView").instance(0)`);
    }

    get teacherDetailsModalTitle(){
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.teacher.modalTitle}")`);
    }

    get liveClassDetailsSectionTitle() {
        return $(`android=new UiSelector().textContains("${liveClassData.scheduleData.detailsTitle}")`);
    } 

    get daysLabel() {
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.days}")`);
    }

    get hoursLabel() {
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.hours}")`);
    }

    get minsLabel() {
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.mins}")`);
    }

    get secsLabel() {
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.sec}")`);
    }

    get teacherImg(){
        return $('~videoThumb');
    }
    
    get teacherName(){
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.teacher.teacherName}")`);
    }

    get subjectName(){
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.subjectName}")`);
    }

    get liveClassTitle(){
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.scheduleLiveClassTitle}")`);
    }

    get liveClassDate(){ 
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.classStartDate}")`);
    }

    get liveClassTime(){ 
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.classStartTime}")`);
    }

    get classTopicsText(){ 
        return $(`android=new UiSelector().text("${liveClassData.scheduleData.classTopicsText}")`);
    }

    get classTopicsDropDownIcon(){ 
        return $(`android=new UiSelector().className("android.widget.ImageView").instance(3)`);
    }

    //lecture resources
    get classResourceTitle(){
        return $(`android=new UiSelector().text("${liveClassData.classResourceData.resourceTitle}")`);
    }

    get classLectureSectionTitle(){
        return $(`android=new UiSelector().text("${liveClassData.classResourceData.lectureSlideText}")`);
    }

    get lectureSlideIcon(){ 
        return $(`android=new UiSelector().className("android.view.View").instance(28)`);
    }

    get lectureSlideArrowBtn(){ 
        return $(`android=new UiSelector().className("android.view.View").instance(29)`);
    }

    get lectureSlideSection(){ 
        return $(`android=new UiSelector().className("android.view.View").instance(27)`);
    }

    get lectureSlideBottomSheetTitle(){
        return $(`android=new UiSelector().text("${liveClassData.classResourceData.lectureSlideText}")`);
    }

    get lectureSlideBottomSheetEmptyStateText(){
        return $(`android=new UiSelector().text("${liveClassData.classResourceData.emptyStateText}")`);
    }

    get lectureSlideBottomSheetCloseBtn(){ 
        return $(`android=new UiSelector().className("android.widget.ImageView").instance(0)`);
    }

    get firstLectureSlide(){ 
        return $(`android=new UiSelector().className("android.view.View").instance(9)`);
    }
    get slideDownloadIcon(){
        return $('~Download icon');
    }

    //chpater resources
    get chapterResourceTitle(){
        return $(`android=new UiSelector().text("${liveClassData.chapterResourceData.resourceTitle}")`);
    }
    get chapterResourceTitle(){
        return $(`android=new UiSelector().text("${liveClassData.chapterResourceData.resourceTitle}")`);
    }
    get chapterResourceIcon(){ 
        return $(`android=new UiSelector().className("android.view.View").instance(33)`);
    }
    get chapterResourceSection(){ 
        return $(`android=new UiSelector().className("android.view.View").instance(32)`);
    }
    get chapterResourceBottomSheetTitle(){
        return $(`android=new UiSelector().text("${liveClassData.chapterResourceData.resourceTitle}")`);
    }
    get chapterResourceBottomSheetCloseBtn(){ 
        return $(`android=new UiSelector().className("android.widget.ImageView")`);
    }
    get solutionBookCard() {
        return $(`android=new UiSelector().text("${liveClassData.chapterResourceData.tagsTitle}")`);
    }
    get solutionBookTilte(){
        return $(`android=new UiSelector().text("${liveClassData.chapterResourceData.tagsTitle}")`);
    }
    get tagEmptyState(){
        return $(`android=new UiSelector().text("${liveClassData.chapterResourceData.tagsEmptystateText}")`);
    }
    get backNavIconBtn(){
        return $('~Nav Icon');
    }
    get firstPdfCard() {
        return $(`android=new UiSelector().className("android.view.View").instance(7)`);
    }
    get downloadPDFText(){
        return $(`android=new UiSelector().text("${liveClassData.chapterResourceData.downloadPDFText}")`);
    } 


    //subject resources
    get subjectResourceTitle(){
        return $(`android=new UiSelector().text("${liveClassData.subjectResourceData.resourceTitle}")`);
    }
    get subjectResourceIcon(){
        return $('android=new UiSelector().className("android.view.View").instance(37)');
    }
    get subjectResourceSection(){
        return $('android=new UiSelector().className("android.view.View").instance(36)');
    }
    get subjectResourceBottomSheetTitle(){
        return $(`android=new UiSelector().text("${liveClassData.subjectResourceData.resourceTitle}")`);
    }
    get subjectResourceBottomSheetCloseBtn(){
        return $('android=new UiSelector().className("android.widget.ImageView")');
    }
    get tagCard() {
        return $(`android=new UiSelector().text("${liveClassData.subjectResourceData.tagsTitle}")`);
    }
    get tagTilte(){
        return $(`android=new UiSelector().text("${liveClassData.subjectResourceData.tagsTitle}")`);
    }


    //=================== Ongoing Details page Locators ===============================

    get descriptionText() {
        return $(`id=tech.shikho.android:id/name_tv`);
    }
    get descriptionSubText() {
        return $(`id=tech.shikho.android:id/description_tv`);
    }
    get joinedUserName(){
        return $(`id=tech.shikho.android:id/edit_text_name`);
    }
    get liveCLassJoinBtn(){
        return $(`id=tech.shikho.android:id/button_join_meeting`);
    }
    get leaveLiveCLassBtn(){
        return $(`~End Call`);
    }
    get leaveLiveCLassTitle(){
        return $(`id=tech.shikho.android:id/end_session_title`);
    }
    get leaveLiveCLassSessionBtn(){
        return $(`id=tech.shikho.android:id/end_session_button`);
    }




    //========================= Homepage Live Class Routine Actions =========================

    //STATE CHECKING LOGIC
    async getOngoingArrowBtn(cardElement) {
        return cardElement.$('~Ongoing Home');
    }

    async isCardOngoing(cardElement) {
        try {
            const arrowBtn = await this.getOngoingArrowBtn(cardElement);
            return await arrowBtn.isDisplayed().catch(() => false);
        } catch (e) {
            return false;
        }
    }

    //FINDING LOGIC (শুধুমাত্র কার্ড খুঁজবে এবং রিটার্ন করবে, ক্লিক করবে না)
    // FINDING LOGIC (Go to Section -> Targeted Horizontal Scroll)
    async findCardByState(targetState, maxScrolls = 5) {
        
        console.log(`🔽 Scrolling vertically to find "আজকের রুটিন" section...`);
        await BasePage.scrollToElement(purchasedUserData.todaysSectionTitle,2);
        
        console.log(`🔍 Searching horizontally for a ${targetState.toUpperCase()} Class card...`);

        const horizontalScroll = 'new UiScrollable(new UiSelector().className("android.view.View").instance(16)).setAsHorizontalList().scrollForward()';
        
        // 🔴 ১. একটি ভেরিয়েবল নিলাম পেজ সোর্স ট্র্যাক করার জন্য
        let previousSource = ''; 

        for (let i = 0; i < maxScrolls; i++) {
            try {
                const classCards = await this.allLiveClassCards;
                console.log(`📍 Attempt ${i + 1}: Found ${classCards.length} Class cards in view.`);

                for (const card of classCards) {
                    const isOngoing = await this.isCardOngoing(card);

                    if (targetState === 'ongoing' && isOngoing) {
                        console.log(`✅ Found an ONGOING class card!`);
                        return card; 
                    }

                    if (targetState === 'scheduled' && !isOngoing) {
                        console.log(`✅ Found a SCHEDULED class card!`);
                        return card; 
                    }
                }

                // 🔴 ২. স্ক্রল করার ঠিক আগে চেক করব যে পেজটি একই জায়গায় আটকে আছে কি না
                const currentSource = await driver.getPageSource();
                if (currentSource === previousSource) {
                    console.log('🛑 No more cards to scroll. Reached the end of the list.');
                    break; // স্ক্রিন না সরলে সাথে সাথে লুপ ভেঙে বের হয়ে যাবে
                }
                previousSource = currentSource;

                // If not found, scroll forward
                console.log(`⏩ Target card not found yet. Scrolling forward...`);
                await $(`android=${horizontalScroll}`);
                await driver.pause(2000); // UI স্ট্যাবল হওয়ার জন্য একটু ওয়েট

            } catch (error) {
                console.log('⚠️ Horizontal scroll failed or reached the end of the list.');
                break;
            }
        }
        
        // কার্ড না পেলে null রিটার্ন করবে
        console.log(`❌ No ${targetState.toUpperCase()} card found after scrolls.`);
        return null; 
    }

    /**
     * [ONGOING] - কার্ডের Arrow বাটনে ক্লিক করে ক্লাসে জয়েন করবে
     */
    async joinOngoingClass(ongoingCardElement) {
        if (!ongoingCardElement) throw new Error("Ongoing card element is null!");
        
        console.log(`▶️ Clicking the Arrow button to JOIN the ONGOING class...`);
        const arrowBtn = await this.getOngoingArrowBtn(ongoingCardElement);
        await arrowBtn.click();
        console.log(`✓ Successfully clicked Ongoing Arrow button.`);
    }


    /**
     * [SCHEDULED] - কার্ডে ক্লিক করে ডিটেইলস পেজে যাবে
     */
    async openScheduledClassDetails(scheduledCardElement) {
        if (!scheduledCardElement) throw new Error("Scheduled card element is null!");
        
        console.log(`📅 Clicking the SCHEDULED card to open details...`);
        await driver.pause(5000);
        await scheduledCardElement.waitForDisplayed({ timeout: 5000 });
        await scheduledCardElement.click();
        console.log(`✓ Successfully clicked Scheduled card.`);
    }


    // =========================== Scheduled Live Class Details Page Validation =====================

    async validateTeacherDetailsBtn(){
        await expect(this.infoIcon).toBeDisplayed();
        await expect(this.teacherDetailsBtnText).toBeDisplayed(); 
        await expect(this.teacherDetailsBtnText).toHaveText(liveClassData.scheduleData.teacher.teacherDetailsBtnText);
        await expect(this.teacherDetailsBtn).toBeDisplayed();
    }

    async validateTeacheModal(){
        await this.teacherDetailsModalTitle.waitForDisplayed({timeout:5000});
        await expect(this.detailsTeacherModalCrossIcon).toBeDisplayed();  
    }
    
    async validateDetailsPageTitle(){
        await this.liveClassDetailsSectionTitle.waitForDisplayed({ timeout: 10000 });
        await expect(this.liveClassDetailsSectionTitle).toBeDisplayed();
        await expect(this.liveClassDetailsSectionTitle).toHaveText(liveClassData.scheduleData.detailsTitle);
        console.log('✓ Details page title is displayed');
    }

    async validateCountdownUI() {
        console.log('Validating Countdown UI Structure...');
        await expect(this.daysLabel).toBeDisplayed();
        await expect(this.hoursLabel).toBeDisplayed();
        await expect(this.minsLabel).toBeDisplayed();
        await expect(this.secsLabel).toBeDisplayed();

        console.log('✓ Countdown UI structure is displayed correctly!');
    }

    async validateTeacher(){
        console.log('Validating Teacher'); 
        await expect(this.teacherImg).toBeDisplayed();
        // await expect(this.teacherName).toBeDisplayed();
        // await expect(this.teacherName).toHaveText(liveClassData.scheduleData.teacher.teacherName);
        console.log('Showing Teacher correctly'); 
    }

    async validateSubjectName(){
        console.log('Validating subject name');
        await expect(this.subjectName).toBeDisplayed();
        await expect(this.subjectName).toHaveText(liveClassData.scheduleData.subjectName);
        console.log('Showing Subject name correctly');
    }

    async validateLiveClassTitle(){
        console.log('Validating Live Class title');
        await expect(this.liveClassTitle).toBeDisplayed();
        await expect(this.liveClassTitle).toHaveText(liveClassData.scheduleData.scheduleLiveClassTitle);
        console.log('Showing Live Class title correctly');
    }

    async validateLiveClassDate(){
        console.log('Validating Live Class Start Date');
        await expect(this.liveClassDate).toBeDisplayed(); 
        await expect(this.liveClassDate).toHaveText(liveClassData.scheduleData.classStartDate);
        console.log('Showing Live Class Start Date correctly');
    }

    async validateLiveClassTime(){
        console.log('Validating Live Class Start time');
        await expect(this.liveClassTime).toBeDisplayed(); 
        await expect(this.liveClassTime).toHaveText(liveClassData.scheduleData.classStartTime);
        console.log('Showing Live Class Start time correctly');
    }
    
    async validateClassTopicsSection(){
        console.log('Validating Live Class topics Section');
        await expect(this.classTopicsText).toBeDisplayed();
        await expect(this.classTopicsText).toHaveText(liveClassData.scheduleData.classTopicsText);
        await expect(this.classTopicsDropDownIcon).toBeDisplayed();
        console.log('Showing Live Class topics Section correctly');
    }

    //lecture slide
    async validateClassResourceContent(){
        console.log('Validating Lecture SLide Section');
        await expect(this.classResourceTitle).toBeDisplayed();
        await expect(this.classResourceTitle).toHaveText(liveClassData.classResourceData.resourceTitle);
        await expect(this.classLectureSectionTitle).toBeDisplayed();
        await expect(this.classLectureSectionTitle).toHaveText(liveClassData.classResourceData.lectureSlideText);
        await expect(this.lectureSlideSection).toBeDisplayed();
        await expect(this.lectureSlideIcon).toBeDisplayed();
        await expect(this.lectureSlideArrowBtn).toBeDisplayed();
        console.log('Showing Lecture SLide Section Correctly');  
    }

    async validateLectureSlideEmptyState(){
        console.log('Validating Lecture SLide Empty Section');
        await expect(this.lectureSlideBottomSheetTitle).toBeDisplayed();
        await expect(this.lectureSlideBottomSheetTitle).toHaveText(liveClassData.classResourceData.lectureSlideText);
        await expect(this.lectureSlideBottomSheetEmptyStateText).toBeDisplayed();
        await expect(this.lectureSlideBottomSheetEmptyStateText).toHaveText(liveClassData.classResourceData.emptyStateText);
        await expect(this.lectureSlideBottomSheetCloseBtn).toBeDisplayed();
        console.log('Showing Lecture SLide Empty Section Correctly');  
    }

    async validateLectureSlidePDFState(){
        console.log('Validating Lecture Slide PDF Section');
        await expect(this.lectureSlideBottomSheetTitle).toBeDisplayed();
        await expect(this.lectureSlideBottomSheetTitle).toHaveText(liveClassData.classResourceData.lectureSlideText);
        await expect(this.firstLectureSlide).toBeDisplayed();
        await expect(this.slideDownloadIcon).toBeDisplayed();
        await expect(this.lectureSlideBottomSheetCloseBtn).toBeDisplayed();
        console.log('Showing Lecture SLide PDF Section Correctly');  
    }

    //chapter
    async validateChapterResourceContent(){
        console.log('Validating Chapter Resources...');
        await expect(this.chapterResourceTitle).toBeDisplayed();
        await expect(this.chapterResourceTitle).toHaveText(liveClassData.chapterResourceData.resourceTitle);
        await expect(this.chapterResourceSection).toBeDisplayed();
        await expect(this.chapterResourceIcon).toBeDisplayed();
        console.log('Showing Chapter Resource Section Correctly');   
    }

    async validateChapterResourceBottomSheetContent(){
        console.log('Validating Chapter Resources botton sheet...');
        await expect(this.chapterResourceBottomSheetTitle).toBeDisplayed();
        await expect(this.chapterResourceBottomSheetTitle).toHaveText(liveClassData.chapterResourceData.resourceTitle);
        await expect(this.chapterResourceBottomSheetCloseBtn).toBeDisplayed();
        await this.assertListofChapterResources(liveClassData.chapterResourceData.expectedResources);
        console.log('Showing Chapter Resource botton sheet Correctly');   
    }

    async validateChapterSolutionBookEmptyState(){
        console.log('Validating Chapter Resources Solution Book Empty State...');
        await expect(this.solutionBookTilte).toBeDisplayed();
        await expect(this.solutionBookTilte).toHaveText(liveClassData.chapterResourceData.tagsTitle);
        await expect(this.tagEmptyState).toBeDisplayed();
        await expect(this.tagEmptyState).toHaveText(liveClassData.chapterResourceData.tagsEmptystateText);
        console.log('Showing Chapter Resource Solution Book Empty State Correctly');   
    }

    async isPageEmpty() {
        console.log('📚 Validating PDF Items...');
        try {
            // কারণ পিডিএফ থাকলে এটি সাথে সাথে false রিটার্ন করবে, খামোখা বসে থাকবে না।
            await this.tagEmptyState.waitForDisplayed({ timeout: 3000 });
            return true; // Empty state পাওয়া গেছে
        } catch (error) {
            return false; // Empty state পাওয়া যায়নি, তার মানে PDF লোড হয়েছে
        }
       
    }

    async validatePdfCardDisplayed(){
        await this.firstPdfCard.waitForDisplayed({ timeout: 5000 });
    }

    //subject 
    async validateSubjectResourceContent(){
        console.log('Validating Subjecte Resources...');
        await expect(this.subjectResourceTitle).toBeDisplayed(); 
        await expect(this.subjectResourceTitle).toHaveText(liveClassData.subjectResourceData.resourceTitle);
        await expect(this.subjectResourceSection).toBeDisplayed();
        await expect(this.subjectResourceIcon).toBeDisplayed();
        console.log('Showing Subject Resource Section Correctly');   
    } 

    async validateSubjectResourceBottomSheetContent(){
        console.log('Validating Subject Resources botton sheet...');
        await expect(this.subjectResourceBottomSheetTitle).toBeDisplayed();
        await expect(this.subjectResourceBottomSheetTitle).toHaveText(liveClassData.subjectResourceData.resourceTitle);
        await expect(this.subjectResourceBottomSheetCloseBtn).toBeDisplayed(); 
        await this.assertListofSubjectResources(liveClassData.chapterResourceData.expectedResources);
        console.log('Showing Chapter Resource botton sheet Correctly');   
    }

    async validateSubjectSolutionBookEmptyState(){
        console.log('Validating Chapter Resources Solution Book Empty State...');
        await expect(this.tagTilte).toBeDisplayed();
        await expect(this.tagTilte).toHaveText(liveClassData.subjectResourceData.tagsTitle);
        await expect(this.tagEmptyState).toBeDisplayed();
        await expect(this.tagEmptyState).toHaveText(liveClassData.chapterResourceData.tagsEmptystateText);
        console.log('Showing Chapter Resource Solution Book Empty State Correctly');   
    }


    // ========================= SCHEDULED LIVE CLASS Details PAGE ACTIONS ===================================

    async clickTeacherDetailsBtn(){
        await this.teacherDetailsBtn.click();
        console.log('Clicked teacher details btn');
    }

    async clickTeacherModalCrossBtn(){
        await this.detailsTeacherModalCrossIcon.click();
        console.log('Clicked Teacher Modal cross btn');
    }

    async clickClassTopicsSection(){
        await this.classTopicsDropDownIcon.click();
         console.log('Clicked Class topics Section');
    }

    //Class lecture slide
    async clickLectureSlideArrowBtn(){
        await this.lectureSlideArrowBtn.click();
         console.log('Clicked Lecture Slide arrow btn');
    }

    async clickLectureSlideSection(){
        await this.lectureSlideSection.click();
        console.log('Clicked Lecture Slide Section');

    }

    async clickLectureSlideBottomSheetCloseButton(){
        await this.lectureSlideBottomSheetCloseBtn.click();
        console.log('Clicked Lecture Slide bottom sheet close btn');
        await expect(this.classLectureSectionTitle).toBeDisplayed();
    }

    async clickLectureSlide(){
        await this.firstLectureSlide.click();
        console.log('Lecture Slide Downloaded');
    }

    //Chpater resources
    async clickChapterResourceSection(){
        await this.chapterResourceSection.click();
        console.log('Clicked Chapter Section');
    }

    async assertListofChapterResources(resourceCards) {
        for (const resourceName of resourceCards) {
            const expectedcard = $(`android=new UiSelector().text("${resourceName}")`); 
            await expect(expectedcard).toBeDisplayed();
            console.log(`✓ Verified resource card containing: "${resourceName}"`);
        }
    }

    async clickChapterResourceBottmSheetCloseBtn(){
        await this.chapterResourceBottomSheetCloseBtn.click();
         console.log('Clicked Chapter Resource bottom sheet close btn');  
    }

    async clickSolutionBook() {
        await this.solutionBookCard.click();
        await expect(this.solutionBookCard).toBeDisplayed();
    }

    async clickbackNavIcon(){
        await this.backNavIconBtn.click();
        //await expect(this.classResourceTitle).toBeDisplayed();
    }

    async clickPDF(){
        await this.firstPdfCard.click();
        //await expect(this.downloadPDFText).toBeDisplayed();
        console.log('PDF Downloaded');
    }

    //subject resources
    async clickSubjectResourceSection(){
        await this.subjectResourceTitle.click();
        console.log('Clicked Subject Section');
    }

     async assertListofSubjectResources(resourceCards) {
        for (const resourceName of resourceCards) {
            const expectedcard = $(`android=new UiSelector().text("${resourceName}")`); 
            await expect(expectedcard).toBeDisplayed();
            console.log(`✓ Verified resource card containing: "${resourceName}"`);
        }
    }

    async clickSubjectResourceBottmSheetCloseBtn(){
        await this.subjectResourceBottomSheetCloseBtn.click();
        console.log('Clicked Subject Resource bottom sheet close btn');  
    }

    async clickTagCard(){
        await this.tagCard.click();
        await expect(this.tagTilte).toBeDisplayed();
    }
    

    //============================= ONGOING DETAILS ACTION ===============================

    async validateClassJoin(){
        await expect(this.descriptionText).toBeDisplayed();
        await expect(this.descriptionSubText).toBeDisplayed();
        await expect(this.joinedUserName).toBeDisplayed();
        await expect(this.liveCLassJoinBtn).toBeDisplayed();

        console.log('Validate live class join Screen'); 
    }

    async clickLiveclassJoinedBtn(){
        await this.liveCLassJoinBtn.click();

        console.log('Clicked Live class Join Now Button'); 
    }

    async clickLiveclassLeaveBtn(){
        await this.leaveLiveCLassBtn.click();

        console.log('Clicked Live class Leave Button'); 
    }

    async clickLiveclassLeaveSessionBtn(){
        await expect(this.leaveLiveCLassTitle).toBeDisplayed();
        await this.leaveLiveCLassSessionBtn.click();
        await driver.pause(5000);
        await expect(this.liveClassSectionTitle).toBeDisplayed();

        console.log('Clicked Live class Leave Button'); 
    }


}

module.exports = new LiveClass();

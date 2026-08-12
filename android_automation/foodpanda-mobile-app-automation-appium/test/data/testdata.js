//================= Onboarding Test Data =================//

const loginData = {
    validNumber: '01478957171',
    //validNumber: '01719234263',
    validPassword: '111111',
    otp: '1234',

    trialEnrollNumber: '01628221966',       // TODO: account for ৩ দিন ফ্রিতে শিখো click flow
    freeCourseEnrollNumber: '01355585522',      // TODO: account for প্রোগ্রামে ভর্তি হও click flow
    purchasedNumber: '01355585522',
};

const registrationData = {
    otp: '1234',
    studentName: 'Test User',
    parentName: 'Test Parent',
    password: "111111",
    confirmpassword: "111111",
};

const invalidData = {
    invalidNumber: '44444444444', // 10 digits instead of 11
    invalidPassword: '555555',
    invalidOtp: '2345',
    invalidPromo: 'bigQA',
    invalidBkashNumber: '01848926098'
};

const contentText = {
    splashScreen: {
        headerText: 'বদলে যাক নতুন কিছু শেখার অভিজ্ঞতা',
        nextPageHeader: 'মোবাইল নম্বর দিয়ে এগিয়ে যান',
    },
    numberInputPage: {
        headerText: 'মোবাইল নম্বর দিয়ে এগিয়ে যান',
        subText: 'আপনার যে নম্বরে One Time Password (OTP) পাঠানো হবে অথবা যে নম্বর দিয়ে আপনি ইতোমধ্যে রেজিস্ট্রেশন করেছেন',
        mobileLabel: 'মোবাইল নম্বর',
        countryCode: '+88',
        barSign: '|',
        placeholder: 'মোবাইল নম্বর দিন',
        submitBtn: 'এগিয়ে যান',
        checkboxText: 'আমি প্রাইভেসি পলিসি ও রিফান্ড পলিসি এর সাথে একমত',
    },
    otpPage: {
        headerText: 'মোবাইল নম্বর ভেরিফাই করুন',
        otpInstruction: 'আপনার নম্বরে পাঠানো ৪ সংখ্যার OTP-টি লিখুন',
        noOtpText: 'কোনো OTP পাননি?',
        submitBtn: 'ভেরিফাই করুন',
        resendOtpText: 'কোড পাঠান',
    },
    userTypePage: {
        pageTitle: 'পরিচয়',
        stepCount: 'ধাপ ১/৩',
        header: 'আপনার পরিচয় দিন',
        subheader: 'আপনি একজন-',
        studentCard: 'শিক্ষার্থী',
        parentCard: 'অভিভাবক',
        parentSubmitBtn: 'এগিয়ে যান',
        studentSubmitBtn: 'এগিয়ে যাও',
    },
    studentFormPage: {
        pageTitle: 'তথ্য',
        stepCount: 'ধাপ ২/৩',
        header: 'তোমার তথ্য দাও',
        nameLabel: 'তোমার নাম*',
        namePlaceholder: 'তোমার নাম লেখো',
        genderLabel: 'তুমি একজন',
        genderOptions: ['ছাত্র', 'ছাত্রী'],
        classLabel: 'তুমি কোন ক্লাসে লেখাপড়া করছো?*',
        classList: ['ক্লাস ৫', 'ক্লাস ৬', 'ক্লাস ৭', 'ক্লাস ৮', 'ক্লাস ৯', 'ক্লাস ১০', 'এইচএসসি', 'এডমিশন'],
        sscBatchLabel: "তোমার এসএসসি পরীক্ষার ব্যাচ সিলেক্ট করো*",
        hscBatchLabel: "তোমার এইচএসসি পরীক্ষার ব্যাচ সিলেক্ট করো*",
        classBatchMap: {
            'ক্লাস ৯': { batchType: 'ssc', batches: ['২০২৭', '২০২৮'] },
            'ক্লাস ১০': { batchType: 'ssc', batches: ['২০২৬', '২০২৭'] },
            'এইচএসসি': { batchType: 'hsc', batches: ['২০২৬', '২০২৭'] },
            'এডমিশন': { batchType: 'admission', batches: ['২০২৫', '২০২৬'] },
        },
        groupLabel: "গ্রুপ সিলেক্ট করো*",
        groupList: ['বিজ্ঞান', 'মানবিক ', 'ব্যবসায় শিক্ষা'],
        backBtn: 'ফিরে যাও',
        studentSubmitBtn: 'এগিয়ে যাও',
        parentSubmitBtn: 'এগিয়ে যান',
    },

    parentFormPage:{
        header: 'আপনার তথ্য দিন',
        parentNameLabel: 'আপনার নাম*',
        parentNamePlaceholder: 'আপনার নাম লিখুন',
        studentNameLabel: "আপনার সন্তানের নাম*",
        studentNamePlaceholder: 'আপনার সন্তানের নাম লিখুন',
        genderLabel: 'আপনার সন্তান একজন',
        parClassLabel: 'আপনার সন্তান এখন কোন ক্লাসে লেখাপড়া করছে?*',
        parSSCBatchLabel: 'আপনার সন্তানের এসএসসি পরীক্ষার ব্যাচ সিলেক্ট করুন*',
        parHSCBatchLabel: 'আপনার সন্তানের এইচএসসি পরীক্ষার ব্যাচ সিলেক্ট করুন*',
        parGroupLabel: 'আপনার সন্তানের গ্রুপ সিলেক্ট করুন*',
        parBackBtn: 'ফিরে যান',
        parSubmitBtnText: 'এগিয়ে যান',
    },


    passwordSetPage: {
        pageTitle: 'পাসওয়ার্ড',
        stepCount: 'ধাপ ৩/৩',
        header: 'পাসওয়ার্ড সেট করো',
        subText: 'পরবর্তীতে সহজেই লগ ইন করতে পাসওয়ার্ড সেট করে নাও',
        passwordLabel: 'পাসওয়ার্ড',
        passwordHint: '*৬ সংখ্যার পাসওয়ার্ড',
        confirmPasswordLabel: 'পাসওয়ার্ড কনফার্ম করো',
        backBtn: 'ফিরে যাও',
        studentSubmitBtn: 'সেভ করো',
        parentSubmitBtn: 'সেভ করো',
    },

    parPasswordSetPage:{
        header: 'পাসওয়ার্ড সেট করুন',
        subText: 'পরবর্তীতে সহজেই লগ ইন করতে পাসওয়ার্ড সেট করে নিন',
        confirmPasswordLabel: 'পাসওয়ার্ড কনফার্ম করুন',
        backBtn: 'ফিরে যান',
        parentSubmitBtn: 'সেভ করুন',
    },

    registrationSuccessPage: {
        header: 'অভিনন্দন!',
        successMessage: 'তোমার রেজিস্ট্রেশন সম্পন্ন হয়েছে',
        homeBtn: 'হোমপেজে যাও',
    },

    parRegistrationSuccessPage:{
        successMessage: 'অভিনন্দন! আপনার রেজিস্ট্রেশন সম্পন্ন হয়েছে',
        homeBtn: 'হোমপেজে যান',
    },

    passwordPage: {
        headerText: 'পাসওয়ার্ড দিন',
        subhedText: 'পূর্বে সেটকৃত ৬ সংখ্যার পাসওয়ার্ডটি দিয়ে লগ ইন করুন',
        passwordText: 'পাসওয়ার্ড',
        loginBtnText: 'লগ ইন',
        forgetPasswordText: 'পাসওয়ার্ড ভুলে গিয়েছেন?',
    },
    loginSuccess: {
        modalText: 'লোকেশন শেয়ার করো',
    },

    forgetPassword:{
        pageTitle: 'পাসওয়ার্ড রিসেট করতে নম্বর ভেরিফাই করুন',
        passwordResetTitle: 'পাসওয়ার্ড রিসেট করুন',
        passwordResetSubTitle: 'পরবর্তীতে সহজেই লগ ইন করতে পাসওয়ার্ড সেট করে নিন',
        passwordLabel: 'নতুন পাসওয়ার্ড দিন',
        confirmPasswordLabel: 'নতুন পাসওয়ার্ড কনফার্ম করুন',
        submitBtn: 'সেট করো',
        successMessage1: 'অভিনন্দন!',
        successMessage2: 'আপনার পাসওয়ার্ড রিসেট করা হয়েছে',
        loginBtn: 'লগ ইন করুন',
    },

    passwordModal:{
        modalHeader: 'Shikho-তে পাসওয়ার্ড সিস্টেম আনা হয়েছে',
        modalSubHeader: 'পরবর্তীতে পাসওয়ার্ড ব্যবহার করে সহজেই লগ ইন করতে পাসওয়ার্ড সেট করে নাও',
        modalBtnText: 'পাসওয়ার্ড সেট করো',
    }
};


const schoolFormData = {
    pageTitle: 'তোমার স্কুল / কলেজের নাম যুক্ত করো',
    subTitle: 'তোমার প্রোফাইল সম্পূর্ণ করতে এই তথ্য প্রয়োজন',
    schoolDivisionHeader: 'স্কুল / কলেজের বিভাগ',
    schoolDivisionPlaceholder: 'বিভাগ সিলেক্ট করো',
    schoolDistrictHeader: 'স্কুল / কলেজের জেলা',
    schoolDistrictPlaceholder: 'জেলা সিলেক্ট করো',
    schoolNameHeader: 'স্কুল / কলেজের নাম (ইংরেজিতে লিখো)',
    schoolNameInputPlaceholder: 'ইংরেজিতে লিখো',
    schoolSubmitBtn: 'সেভ করো',
    schoolDivisionDropdownOptions: 'Dhaka',
    schoolDistrictDropdownOptions: 'Dhaka',
    schoolName: 'ideal',
};


const courseData ={
    freeTrialData:{
        sectionTitle: '৩ দিন সবকিছু ফ্রি!',
        sectionSubTitle: 'ফ্রিতে যা যা পাবে-',
        fetaures: {
            liveClass: 'লাইভ ক্লাস',
            animated: 'অ্যানিমেটেড লেসন ও রেকর্ডেড ক্লাস',
            test: 'লাইভ ও প্র্যাকটিস MCQ টেস্ট',
            smartNote: 'স্মার্ট নোট, ক্লাস নোট ও প্র্যাকটিস বুক',
            description: 'এছাড়াও রিপোর্ট কার্ডসহ'
        },
        trialCourseName: 'Automation Free Trial Course',
        trialBtnText: '৩ দিন ফ্রিতে শিখো',
        trialCourseEnrollBtnText: 'প্রোগ্রামে ভর্তি হও',
        trialSuccessMsg1: 'অভিনন্দন!\n তোমার ৩ দিন সবকিছু ফ্রিতে শেখার \n অপশনটি চালু হয়েছে',
        trialSuccssSubText: 'এখন একদম ফ্রিতে কোর্সের সবকিছু ঘুরে দেখো আর কোর্সটিতে',
        trialOkBtnText: 'ঠিক আছে',
        trialGuideTourModalText: `গাইডেড ট্যুরের মাধ্যমে Shikho'র সকল ফিচার দেখে নাও`,
        trialGuideStartText: 'ট্যুর শুরু করো',
    },
    freeCourseData:{
        sectionTitle: 'ফ্রি কোর্স',
        allCourseBtn: 'সকল কোর্স',
        freeTag: 'সম্পূর্ণ ফ্রি!',
        freeCourseName: 'বিনামূল্যে কোর্স-শ্রেণী দশম',
        freeCourseEnrollBtn: `সম্পূর্ণ ফ্রি'তে শুরু করো`,
        freeCourseDetailsBtn: 'বিস্তারিত দেখো',

        freeCourseSuccessMsg: 'অভিনন্দন!\nভর্তি সফলভাবে সম্পন্ন হয়েছে',
        freeCourseStartBtnText: 'শেখা শুরু করো',
    },
    otherCourse: {
        sectionTitle: 'অন্যান্য কোর্স',
        courseName: 'অটোমেশন এপি কোর্স',
        courseBtn: 'বিস্তারিত দেখো',
        phaseSectionTitle: 'Shikho একাডেমিক প্রোগ্রাম',
        phaseSectionSubTitle: 'পছন্দ অনুযায়ী প্রোগ্রামের মেয়াদ সিলেক্ট করে ভর্তি হয়ে যাও',
        quarterPhase: 'কোয়ার্টার প্রোগ্রাম',
        fullPhase: 'পুরো প্রোগ্রাম',
        phaseBtnText: 'ভর্তি হও',
        programBhortiHouBtn: 'প্রোগ্রামে ভর্তি হও',
        backlogPhaseText: 'পড়ানো শেষ',
        runningPhaseText: 'পড়ানো হচ্ছে',
        upcomingPhaseText: 'পড়ানো হবে',

        confirmModalText: 'তুমি যে কোর্সটি কিনতে চাচ্ছো তা',
        batchText1: 'এসএসসি - 2026,2027',
        batchText2: 'ব্যাচের শিক্ষার্থীদের জন্য',
        submitBtn: 'এগিয়ে যাও',

        programDurationSectionText: 'প্রোগ্রামের মেয়াদ সিলেক্ট করো',
        programDurationSectionSubText: 'পছন্দ অনুযায়ী প্রোগ্রামের মেয়াদ সিলেক্ট করে ভর্তি হয়ে যাও',
    }
}

const subjectListData = {
    navIconDesc: 'Nav Icon',
    courseTitle: 'অটোমেশন এপি কোর্স',
    quarter: {
        title: 'Quarter 4',
        statusBadge: 'পড়ানো হচ্ছে',
        dateRange: "এপ্রিল'২৬ - সেপ্টেম্বর'২৬",
        routineBtnText: 'রুটিন দেখে নাও',
        cartIconDesc: 'Cart button icon',
    },
    subjectHolderDesc: 'Subject holder',
    subjectIconDesc: 'Subject Icon',
    // Source XML had stray leading/trailing spaces on a couple of names; match
    // with textContains on the trimmed value to be robust.
    subjects: [
        'তথ্য ও যোগাযোগ প্রযুক্তি',
        'বাংলা ১ম পত্র',
        'ইংরেজী ১ম পত্র',
        'পদার্থবিজ্ঞান',
        'উচ্চতর গণিত',
        'ইংরেজি ২য় পত্র',
        'রসায়ন',
        'সাধারণ গণিত',
        'ইসলাম ও নৈতিক শিক্ষা',
        'Bangla 1st paper',
    ],
}

const checkoutData ={
    pageTitle: 'একাডেমিক প্রোগ্রাম ভর্তি',
    admissionDurationTitle: 'ভর্তির মেয়াদ',
    
    promoSectionTitle: 'প্রোমো কোড অ্যাপ্লাই করো',
    promoPlaceholeder: 'তোমার প্রোমো কোডটি লেখো',
    promoSubmitBtn: 'যোগ করো',
    promoCode: 'AutoQACoupon',
    wrongPromoText: 'দুঃখিত! তোমার দেওয়া প্রোমো কোডটি সঠিক নয়।',
    correctPromoSuccessText: 'অভিনন্দন! ৳ ৬৩০ ছাড় পেয়েছো',
    correctPromoText: 'প্রোমো কোড: AutoQACoupon',

    admissionDetailsSectionTitle: 'ভর্তির বিস্তারিত',
    courseStartDateText: 'কোর্স শুরুর তারিখ',
    admissionFeeText: 'ভর্তি ফি',
    discountText: 'ডিসকাউন্ট',

    termsText: 'আমি টার্মস এবং কন্ডিশনস এর সাথে একমত',
    refundPolicyText: 'আমি রিফান্ড পলিসি এর সাথে একমত',

    totalText: 'সর্বমোট',
    admitProgramBtnText: 'প্রোগ্রামে ভর্তি হও',
}

const paymentMethodData = {
    pageTitle: 'পেমেন্ট মেথড সিলেক্ট করো',
    bkashText: 'বিকাশ',
    sslText: 'নগদ ও ডেবিট / ক্রেডিট কার্ড',
    securityText: 'পেমেন্ট সম্পূর্ণ নিরাপদ',

    bkashLogo: 'Bkash Logo',
    bkashInputLabel: 'Your bKash Account Number',
    bkashSubText: 'Confirm and proceed,',
    bkashCancel: 'Cancel',
    bkashConfirm: 'Confirm',
    bkashNumber: '01929918378',
    bkashVCode: '123456',
    bkashPIN: '12121',
    bkashWarningMsg: 'The input wallet is not eligible',

    paymentSuccessMsg1:'অভিনন্দন!',
    paymentSuccessMsg2: 'পেমেন্ট সফলভাবে সম্পন্ন হয়েছে',
    name: 'নাম:',
    phoneNumbr: 'ফোন নম্বর:',
    courseName: 'কোর্সের নাম:',
    paymentID: 'পেমেন্ট আইডি:',
    paymentAmount: 'টাকার পরিমাণ:',
    paymentMethod: 'পেমেন্টের মাধ্যম:',
    startLearningBtn: 'শিখতে শুরু করো',
}

const mandatoryProfileData ={
    modalTitle: 'প্রোফাইল কমপ্লিট করো',
    modalTest: 'সকল কনটেন্ট দেখতে তোমার প্রোফাইল কমপ্লিট করো',
    completeProfileBtn: 'প্রোফাইল কমপ্লিট করো'
}

const completeProfilePageData = {
    pageTitle: 'প্রোফাইল তথ্য যোগ করো',
    profilePictureText: 'তোমার প্রোফাইল পিকচার দাও',
    personalInfoHeader: 'ব্যক্তিগত তথ্য',
    nameLabel: 'নাম *',
    namePlaceholder: 'নাম দাও',
    mobileNumberLabel: 'মোবাইল নম্বর',
    dateOfBirthLabel: 'জন্ম তারিখ *',
    dateOfBirthInfo: '৬০ দিনের মধ্যে নাম চেঞ্জ করতে পারবে না।',
    calendarButtonText: 'ক্যালেন্ডার',
    genderLabel: 'তুমি একজন *',
    genderOptions: {
        boy: 'ছাত্র',
        girl: 'ছাত্রী'
    },
    genderAccessibilityText: 'লিঙ্গ',
    classShiftLabel: 'ক্লাসের শিফট *',
    classShiftOptions: {
        morning: 'সকাল',
        afternoon: 'বিকাল',
        notApplicable: 'প্রযোজ্য নয়'
    },
    othersEducationMediumLabel: 'অন্যান্য শিক্ষা মাধ্যম *',
    othersEducationMediumOptions: ['অফলাইন কোচিং', 'গৃহশিক্ষক', 'অন্যান্য অনলাইন প্লাটফর্ম', 'কোনটাই নয়'],
    guardianNameLabel: 'অভিভাবকের নাম *',
    guardianMobileNumberLabel: 'অভিভাবকের মোবাইল নাম্বার *',
    saveButtonText: 'সেভ করো',
    backButtonText: 'Navigate up',
    testData: {
        name: 'Test User',
        dateOfBirth: '15/01/2008',
        selectedGender: 'girl', // 'boy' or 'girl'
        guardianName: 'Test Guardian',
        guardianMobileNumber: '01700000000'
    }
}

const completeProfileModalData = {
    profilePicture: {
        contentDesc: 'তোমার প্রোফাইল পিকচার দাও',
        bounds: '[573,999][867,1293]',
        elementType: 'android.widget.ImageView'
    },
    modalTitle: {
        text: 'প্রোফাইল কমপ্লিট করো',
        bounds: '[443,1363][997,1469]',
        elementType: 'android.widget.TextView',
        index: 0
    },
    modalDescription: {
        text: 'সকল কনটেন্ট দেখতে তোমার প্রোফাইল কমপ্লিট করো',
        bounds: '[230,1525][1210,1701]',
        elementType: 'android.widget.TextView'
    },
    completeProfileButton: {
        text: 'প্রোফাইল কমপ্লিট করো',
        bounds: '[230,1785][1210,1963]',
        elementType: 'android.view.View',
        clickable: true,
        focusable: true
    }
}

const shareLocationModalData = {
    modalTitle: {
        text: 'লোকেশন শেয়ার করো',
        bounds: '[445,1479][996,1585]',
        elementType: 'android.widget.TextView'
    },
    modalDescription: {
        text: 'ভিডিয়ো কোয়ালিটি অপটিমাইজেশনের জন্য তোমার লোকেশন শেয়ার করো',
        bounds: '[175,1627][1265,1767]',
        elementType: 'android.widget.TextView'
    },
    shareLocationButton: {
        text: 'এগিয়ে যাও',
        bounds: '[140,1855][1300,2044]',
        elementType: 'android.view.View',
        clickable: true,
        focusable: true
    },
    containerBounds: '[70,849][1370,2114]'
}

const purchasedUserData = {
    todaysSectionTitle: 'আজকের রুটিন',
    todaysSectionSubTitle: 'তোমার প্রতিদিনের রুটিন দেখে নাও',
    routineBtnText: 'রুটিন দেখো',
    todayEmptyStateTitle: 'কোন অ্যাক্টিভিটি নেই!',
    todayEmptyStateSubTitle: 'পরবর্তি দিনের রুটিন নিচে দেখে নাও।',
    todayEmptyBtn: 'রুটিন ক্যালেন্ডার দেখো',
    homeworkSectionTitle: 'তোমার হোমওয়ার্ক',
    homeworkTypeLabel: 'অ্যানিমেটেড লেসনস',
}

const freetrialUserData = {
    trialBannerText: 'তোমার ফ্রিতে শেখার মেয়াদ আছে',

}



const liveClassData ={
    scheduleData:{
        scheduleLiveClassType: 'লেকচার ক্লাস',
        scheduleLiveClassTitle: 'Live Class ইসলাম ও নৈতিক শিক্ষা আকাঈদ ও নৈতিক জীবন 15',
        subjectName: 'ইসলাম ও নৈতিক শিক্ষা',
        classStartDate:'৬ মে ২০২৬',
        classStartTime: '২২ : ৫৯ pm',
        scheduleLiveClassTime: '08.00 PM - 10.59 PM | 2 ঘন্টা 59 মিনিট',
        detailsTitle: 'লাইভ ক্লাস শুরু হবে :',
        teacher:{
            modalTitle: 'মেন্টরের বিস্তারিত',
            teacherName: 'farhana BD ',
            teacherDetailsBtnText: 'বিস্তারিত',
        },
        days: 'দিন',
        hours: 'ঘণ্টা',
        mins: 'মিনিট',
        sec: 'সেকেন্ড',
        classTopicsText: 'ক্লাসের বিষয়বস্তু',
    },

    classResourceData:{
    resourceTitle: 'ক্লাস রিসোর্সেস',
    lectureSlideText:'লেকচার স্লাইড',
    emptyStateText: 'দুঃখিত!\nএখনো কোনো আইটেম যুক্ত হয়নি',
    },

    chapterResourceData:{
        resourceTitle: 'চ্যাপ্টার রিসোর্সেস',
        expectedResources: [ 
            "সলিউশন বুক", 
            "মাস্টার বুক", 
            "একাডেমিক বুক",
            "প্র্যাকটিস বুক"
        ],
        tagsTitle: 'সলিউশন বুক',
        tagsEmptystateText: 'দুঃখিত!\nএখনো কোনো আইটেম যুক্ত হয়নি',
        downloadPDFText: 'পিডিএফ ডাউনলোড হচ্ছে',
    },

    subjectResourceData:{
        resourceTitle: 'সাবজেক্ট রিসোর্সেস',
        expectedSubjectResources: [
            "অনুশীলনী সমাধান", 
            "পাস্ট পেপারস",
            "সলিউশন বুক",
            "চেকমেট",
            "মেডিহ্যাকস",
            "প্রশ্ন ব্যাংক",
            "মাস্টার বুক",
            "এডমিশন বুক",
            "একাডেমিক বুক",
            "প্র্যাকটিস বুক"
        ],

        tagsTitle:'অনুশীলনী সমাধান',    
    },


    ongoingData:{
        scheduleLiveClassType: 'লেকচার ক্লাস',
        scheduleLiveClassTitle: 'Live Class ইসলাম ও নৈতিক শিক্ষা আকাঈদ ও নৈতিক জীবন 01',
        scheduleLiveClassTime: '10.00 AM - 10.59 PM | 12 ঘন্টা 59 মিনিট',
    }

}




module.exports = {
    loginData,
    registrationData,
    contentText,
    invalidData,
    schoolFormData,
    courseData,
    subjectListData,
    checkoutData,
    paymentMethodData,
    purchasedUserData,
    mandatoryProfileData,
    liveClassData,
    freetrialUserData,
    mandatoryProfileData,
    completeProfilePageData,
    completeProfileModalData,
    shareLocationModalData
};

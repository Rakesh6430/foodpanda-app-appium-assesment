// Test data for the Class Routine page (`ক্লাস রুটিন`).
// Capture is a snapshot — the date numerals shift every day, so assertions
// use the day-of-week vocabulary and card-count, not the exact dates.

const routineData = {
    pageTitle: 'ক্লাস রুটিন',
    navIconDesc: 'Nav Icon',
    calendarIconDesc: 'Calender Icon', // preserve the app's existing spelling

    contentTypes: [
        'লেকচার ক্লাস', 
        'লাইভ এক্সাম',
        'মডেল টেস্ট',
        'ভর্তি পরীক্ষা',
        'অ্যানিমেটেড লেসনস',
    ],

    emptyState: {
        iconDesc: 'Empty bag',
        message1: 'শীঘ্রই তোমার রুটিন যুক্ত হবে।',
        message2: 'চোখ রেখো এখানেই !',
    },
};

module.exports = { routineData };

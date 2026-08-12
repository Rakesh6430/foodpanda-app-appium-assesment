const fs = require('fs');
const path = require('path');

const SAVED_NUMBER_PATH = path.join(__dirname, 'lastRegisteredNumber.json');

function generatePhoneNumber() {
    const prefixes = ['013', '014', '015', '016', '017', '018', '019'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const remaining = Math.floor(10000000 + Math.random() * 90000000).toString().substring(0, 8);
    return prefix + remaining;
}

function saveRegisteredNumber(phoneNumber) {
    fs.writeFileSync(SAVED_NUMBER_PATH, JSON.stringify({
        phoneNumber,
        registeredAt: new Date().toISOString()
    }, null, 2));
}

function getLastRegisteredNumber() {
    if (fs.existsSync(SAVED_NUMBER_PATH)) {
        const data = JSON.parse(fs.readFileSync(SAVED_NUMBER_PATH, 'utf-8'));
        return data.phoneNumber;
    }
    return null;
}

module.exports = { generatePhoneNumber, saveRegisteredNumber, getLastRegisteredNumber };

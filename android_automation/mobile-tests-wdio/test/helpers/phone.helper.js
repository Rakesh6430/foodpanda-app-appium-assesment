const fs = require('fs');
const path = require('path');

const COUNTER_FILE = path.join(__dirname, '../../.phone-counter');

/**
 * Get the next available signup phone number.
 * Auto-increments from 01867000001 range.
 * Persists counter to .phone-counter file.
 */
function getNextPhoneNumber() {
    let counter = 30; // default start
    try {
        counter = parseInt(fs.readFileSync(COUNTER_FILE, 'utf8').trim(), 10);
    } catch {}
    const phone = `018670000${counter.toString().padStart(2, '0')}`;
    fs.writeFileSync(COUNTER_FILE, String(counter + 1));
    return phone;
}

module.exports = { getNextPhoneNumber };

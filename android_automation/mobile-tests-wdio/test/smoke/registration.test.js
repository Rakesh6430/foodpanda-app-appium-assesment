const { signupNewUser } = require('../flows/auth.flow');
const { existsByText } = require('../helpers/find.helper');
const { getNextPhoneNumber } = require('../helpers/phone.helper');

const PHONE_NUMBER = getNextPhoneNumber();

describe('Smoke: Registration', () => {
    it('should complete full signup journey and reach home', async () => {
        await signupNewUser(PHONE_NUMBER);

        // Verify home screen is visible
        const hasHome = await existsByText('হোম');
        expect(hasHome).toBe(true);
    });
});

const User = require('../models/User');

describe('User model', () => {
    const author = 'testAuthor';

    beforeAll(async () => {
        // Create a test user
        await User.findOrCreate(author);
    });

    afterAll(async () => {
        // Remove the test user
        await User.deleteById(author);
    });

    test('findOrCreate returns a user', async () => {
        const user = await User.findOrCreate(author);

        // Check that the returned data is an object
        expect(typeof user).toBe('object');

        // Check that the user has the correct username
        expect(user.username).toBe(author);
    });

});
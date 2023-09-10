const { db, closeDatabase } = require('../config/dbconfig');
const User = require('../models/User');

describe('User model', () => {

    afterAll(async () => {
    // Close the database connection after tests
    await closeDatabase();
  });

  test('findOrCreate returns a user', async () => {
    const username = 'testUser';
    const user = await User.findOrCreate(username);

    // Check that the returned data is an object
    expect(typeof user).toBe('object');

    // Check that the user has the correct username
    expect(user.username).toBe(username);
  });

});
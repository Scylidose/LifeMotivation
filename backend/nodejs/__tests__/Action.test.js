const { db, closeDatabase } = require('../config/dbconfig');
const Action = require('../models/Action');

describe('Action model', () => {

    afterAll(async () => {
    // Close the database connection after tests
    await closeDatabase();
  });

  test('findAllByAuthor returns actions for a given author', async () => {
    const author = 'testAuthor';
    const actions = await Action.findAllByAuthor(author);

    // Check that the returned data is an array
    expect(Array.isArray(actions)).toBe(true);

    // Check that each action has the correct author
    actions.forEach(action => {
      expect(action.author).toBe(author);
    });
  });

  test('findById returns the correct action', async () => {
    const id = 1; // Replace with a valid ID
    const action = await Action.findById(id);

    // Check that the returned data is an object
    expect(typeof action).toBe('object');

    // Check that the action has the correct ID
    expect(action.id).toBe(id);
  });

});
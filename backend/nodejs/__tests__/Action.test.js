const Action = require('../models/Action');
const User = require('../models/User');

describe('Action model', () => {
    const author = 'testAuthor';
    const id = 1;

    beforeAll(async () => {
        // Create a test user and action
        await User.findOrCreate(author);
        await Action.create('', '', author, 1, 1, '', 1, 1, 1, 1, 1);
    });

    afterAll(async () => {
        // Remove the test user and action
        await User.deleteById(author);
        await Action.deleteById(id);
    });

    test('findAllByAuthor returns actions for a given author', async () => {
        const actions = await Action.findAllByAuthor(author);

        // Check that the returned data is an array
        expect(Array.isArray(actions)).toBe(true);

        // Check that each action has the correct author
        actions.forEach(action => {
            expect(action.author).toBe(author);
        });
    });

    test('findById returns the correct action', async () => {
        const action = await Action.findById(id);

        // Check that the returned data is an object
        expect(typeof action).toBe('object');
        // Check that the action has the correct ID
        expect(action.id).toBe(id);
    });

});
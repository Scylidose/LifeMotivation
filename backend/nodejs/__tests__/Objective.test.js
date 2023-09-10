const Objective = require('../models/Objective');
const User = require('../models/User');

describe('Objective model', () => {

    beforeAll(async () => {
        // Create a test user
        await User.findOrCreate('testAuthor');
    });

    afterAll(async () => {
        // Remove the test user
        await User.deleteById('testAuthor');
    });

    test('findAllByAuthor returns objectives for a given author', async () => {
        const author = 'testAuthor';
        const objectives = await Objective.findAllByAuthor(author);
        console.log("--->", objectives);
        // Check that the returned data is an array
        expect(Array.isArray(objectives)).toBe(true);

        // Check that each objective has the correct author
        objectives.forEach(objective => {
            expect(objective.author).toBe(author);
        });
    });

    test('findById returns the correct objective', async () => {
        const id = 1; // Replace with a valid ID
        const objective = await Objective.findById(id);

        // Check that the returned data is an object
        expect(typeof objective).toBe('object');

        // Check that the objective has the correct ID
        expect(objective.id).toBe(id);
    });

    // Add more tests as needed for other methods in your Objective model
});
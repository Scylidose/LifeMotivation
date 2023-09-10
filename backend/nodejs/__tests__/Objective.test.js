const Objective = require('../models/Objective');
const User = require('../models/User');

describe('Objective model', () => {
    const author = 'testAuthor';
    const objective_id = 1

    beforeAll(async () => {
        // Create a test user and objective
        await User.findOrCreate(author);
        await Objective.create('', '', author, 1, 1, 1);
    });

    afterAll(async () => {
        // Remove the test user and objective
        await User.deleteById(author);
        await Objective.deleteById(objective_id);
    });

    test('findAllByAuthor returns objectives for a given author', async () => {
        const objectives = await Objective.findAllByAuthor(author);

        // Check that the returned data is an array
        expect(Array.isArray(objectives)).toBe(true);

        // Check that each objective has the correct author
        objectives.forEach(objective => {
            expect(objective.author).toBe(author);
        });
    });

    test('findById returns the correct objective', async () => {
        const objective = await Objective.findById(objective_id);

        // Check that the returned data is an object
        expect(typeof objective).toBe('object');

        // Check that the objective has the correct ID
        expect(objective.id).toBe(objective_id);
    });

    // Add more tests as needed for other methods in your Objective model
});
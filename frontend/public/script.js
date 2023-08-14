/*
const { getActionsForUser, createNewAction } = require('./../src/services/api');

async function fetchAndDisplayActions(username) {
    try {
        const actions = await getActionsForUser(username);
        console.log(actions);
    } catch (error) {
        console.error('Error fetching actions:', error);
    }
}

async function addNewAction(actionData) {
    try {
        const newAction = await createNewAction(actionData);
        console.log(newAction);

    } catch (error) {
        console.error('Error creating action:', error);
    }
}
*/
document.addEventListener('DOMContentLoaded', () => {
    const username = 'root';
    console.log("test");
    // Fetch and display actions for the user
    // fetchAndDisplayActions(username);

    const createActionButton = document.getElementById('create-action-button');
    const actionForm = document.getElementById('action-form');

    // Show the form when the button is clicked
    createActionButton.addEventListener('click', () => {
        actionForm.style.display = 'block';
    });

    // Handle form submission
    actionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form input values
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const author = '1';
        const isGood = true;
        const importance = parseInt(document.getElementById('importance').value);
        const frequency = parseInt(document.getElementById('frequency').value);
        const difficulty = parseInt(document.getElementById('difficulty').value);
        const consistencyStreak = 0;
        const intendedDuration = parseInt(document.getElementById('intended-duration').value);

        // Create a new action object using the input values
        const newAction = {
            title,
            description,
            author,
            isGood,
            importance,
            frequency,
            difficulty,
            consistencyStreak,
            intendedDuration
        };

        /*
        createNewAction(newAction)
            .then(response => {
                // Handle the response or update the UI
                console.log('Action created:', response);
            })
            .catch(error => {
                console.error('Error creating action:', error);
            });
        */
       console.log(newAction);
        // Reset the form and hide it
        actionForm.reset();
        actionForm.style.display = 'none';
    });
});

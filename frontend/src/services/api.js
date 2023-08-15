const apiUrl = 'http://localhost:3000';

// Function to fetch all actions for a user
async function getActionsForUser(username) {
    try {
        const response = await fetch(`${apiUrl}/api/users/${username}/actions`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching actions:', error);
        throw error;
    }
}

// Function to create a new action
async function createNewAction(actionData) {
    try {
        const response = await fetch(`${apiUrl}/api/actions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(actionData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating action:', error);
        throw error;
    }
}

export { getActionsForUser, createNewAction };

const apiUrl = 'http://localhost:5000';

// Function to fetch all actions for a user
async function getActionsForUser(username) {
    try {
        const response = await fetch(`${apiUrl}/api/actions/${username}`);
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

// Function to delete an action
async function deleteAction(actionId) {
    try {
        const response = await fetch(`${apiUrl}/api/actions/${actionId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting action:', error);
        throw error;
    }
}

// Function to save the comment in an action
async function addCommentToAction(id, comment) {
    try {
        const response = await fetch(`${apiUrl}/api/actions/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

export { getActionsForUser, createNewAction, deleteAction, addCommentToAction };

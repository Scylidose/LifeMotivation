const apiUrl = 'http://localhost:5000';

/**
 * Actions API Functions
 */

/**
 * Fetches all actions for a user.
 * @param {string} username - The username of the user.
 * @returns {Promise} A Promise that resolves to the retrieved data.
 */
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

/**
 * Fetches actions related to an objective.
 * @param {string} objectiveId - The ID of the objective.
 * @returns {Promise} A Promise that resolves to the retrieved actions data.
 */
async function getObjectiveActions(objectiveId) {
    try {
        const response = await fetch(`${apiUrl}/api/actions/objective/${objectiveId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching objective actions:', error);
        throw error;
    }
}

/**
 * Creates a new action.
 * @param {Object} actionData - The data for the new action.
 * @returns {Promise} A Promise that resolves to the created action data.
 */
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

/**
 * Deletes an action.
 * @param {string} actionId - The ID of the action to delete.
 * @returns {Promise} A Promise that resolves to the deleted action data.
 */
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

/**
 * Finishes an action.
 * @param {string} actionId - The ID of the action to finish.
 * @param {number} realDuration - The real duration of the action.
 * @returns {Promise} A Promise that resolves to the finished action data.
 */
async function finishAction(actionId, realDuration) {

    try {
        const response = await fetch(`${apiUrl}/api/actions/${actionId}/finish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ realDuration }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error finish action:', error);
        throw error;
    }
}

/**
 * Resets an action.
 * @param {string} actionId - The ID of the action to reset.
 * @returns {Promise} A Promise that resolves to the reset action data.
 */
async function resetAction(actionId) {

    try {
        const response = await fetch(`${apiUrl}/api/actions/${actionId}/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error finish action:', error);
        throw error;
    }
}

/**
 * Adds a comment to an action.
 * @param {string} id - The ID of the action to which the comment is added.
 * @param {string} comment - The comment text.
 * @returns {Promise} A Promise that resolves to the updated action data.
 */
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

export {
    getActionsForUser,
    getObjectiveActions,
    createNewAction,
    deleteAction,
    finishAction,
    resetAction,
    addCommentToAction
};

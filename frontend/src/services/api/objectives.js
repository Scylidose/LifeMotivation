const apiUrl = 'http://localhost:5000';

/**
 * Objectives API Functions
 */

/**
 * Creates a new objective.
 * @param {Object} objectiveData - The data for the new objective.
 * @returns {Promise} A Promise that resolves to the created objective data.
 */
async function createNewObjective(objectiveData) {
    try {
        const response = await fetch(`${apiUrl}/api/objectives`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectiveData),
        });
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error creating objective:', error);
        throw error;
    }
}

/**
 * Fetches objectives for a user.
 * @param {string} username - The username of the user.
 * @returns {Promise} A Promise that resolves to the retrieved objectives data.
 */
async function getObjectivesForUser(username) {
    try {
        const response = await fetch(`${apiUrl}/api/objectives/${username}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching objectives:', error);
        throw error;
    }
}

/**
 * Fetches an objective by its ID.
 * @param {string} id - The ID of the objective to fetch.
 * @returns {Promise} A Promise that resolves to the retrieved objective data.
 */
async function getObjectiveById(id) {
    try {
        const response = await fetch(`${apiUrl}/api/objectives/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching objectives:', error);
        throw error;
    }
}

/**
 * Deletes an objective.
 * @param {string} objectiveId - The ID of the objective to delete.
 * @returns {Promise} A Promise that resolves to the deleted objective data.
 */
async function deleteObjective(objectiveId) {
    try {
        const response = await fetch(`${apiUrl}/api/objectives/${objectiveId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting objective:', error);
        throw error;
    }
}

/**
 * Marks an objective as finished.
 * @param {string} objectiveId - The ID of the objective to finish.
 * @param {number} realDuration - The real duration of the objective.
 * @returns {Promise} A Promise that resolves to the finished objective data.
 */
async function finishObjective(objectiveId, realDuration) {

    try {
        const response = await fetch(`${apiUrl}/api/objectives/${objectiveId}/finish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ realDuration }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error finish objective:', error);
        throw error;
    }
}

/**
 * Resets an objective.
 * @param {string} objectiveId - The ID of the objective to reset.
 * @returns {Promise} A Promise that resolves to the reset objective data.
 */
async function resetObjective(objectiveId) {

    try {
        const response = await fetch(`${apiUrl}/api/objectives/${objectiveId}/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error finish objective:', error);
        throw error;
    }
}

export {
    createNewObjective,
    getObjectivesForUser,
    getObjectiveById,
    deleteObjective,
    finishObjective,
    resetObjective
};
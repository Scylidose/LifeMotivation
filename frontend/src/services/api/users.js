const apiUrl = 'http://localhost:5000';

/**
 * Users API Functions
 */

/**
 * Fetches user
 * @param {string} username - The username of the user.
 * @returns {Promise} A Promise that resolves to the retrieved user data.
 */
async function getUser(username, token) {
    try {
        const response = await fetch(`${apiUrl}/api/users/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

/**
 * Update experience points for user.
 * @param {string} username - The username of the user.
 * @param {integer} xp - The experience points to add.
 * @returns {Promise} A Promise that resolves to the reset objective data.
 */
async function updateUserXP(username, xp, token) {

    try {
        const response = await fetch(`${apiUrl}/api/users/${username}/${xp}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error update User experience:', error);
        throw error;
    }
}

/**
 * Register a nw user.
 * @param {Object} userFormData - Form data sent by the user
 * @returns {Promise} A Promise that resolves to the reset objective data.
 */
async function createNewUser(userFormData) {

    try {
        const response = await fetch(`${apiUrl}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userFormData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error update User experience:', error);
        throw error;
    }
}

/**
 * Log in a new user.
 * @param {Object} userFormData - The username and password of the user.
 * @returns {Promise} A Promise that resolves to log the user.
 */
async function logUser(userFormData) {

    try {
        const response = await fetch(`${apiUrl}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userFormData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}
export {
    getUser,
    updateUserXP,
    createNewUser,
    logUser
};
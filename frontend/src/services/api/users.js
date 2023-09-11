const apiUrl = 'http://localhost:5000';

/**
 * Users API Functions
 */

/**
 * Fetches user
 * @param {string} username - The username of the user.
 * @returns {Promise} A Promise that resolves to the retrieved user data.
 */
async function getUser(username) {
    try {
        const response = await fetch(`${apiUrl}/api/users/${username}`);
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
async function updateUserXP(username, xp) {

    try {
        const response = await fetch(`${apiUrl}/api/users/${username}/${xp}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error update User experience:', error);
        throw error;
    }
}

export {
    getUser,
    updateUserXP
};
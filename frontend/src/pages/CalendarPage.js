import React, { useState, useEffect } from 'react';
import CalendarDisplay from '../components/CalendarDisplay';
import { actionsApi } from '../services/api/index';

import jwt from 'jwt-decode';

const CalendarPage = ({ token }) => {
    // State variables for actions, loading state, and error handling
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                if (!token) {
                    // Token is not available, handle accordingly (e.g., redirect to login)
                    return;
                }
                const decodedToken = jwt(token);

                // Fetch actions data
                const actions = await actionsApi.getActionsForUser(decodedToken.username, token);

                setActions(actions);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    return (

        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    <CalendarDisplay token={token} actions={actions} />
                </div>
            )}
        </div>
    );
};

export default CalendarPage;


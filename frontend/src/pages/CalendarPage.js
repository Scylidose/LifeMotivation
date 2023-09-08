import React, { useState, useEffect } from 'react';
import CalendarDisplay from '../components/CalendarDisplay';
import { actionsApi } from '../services/api/index';

const CalendarPage = () => {
    // State variables for actions, loading state, and error handling
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch actions data
            const actions = await actionsApi.getActionsForUser('root');

            setActions(actions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setLoading(false);
        }
    };


    return (

        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    <CalendarDisplay actions={actions} />
                </div>
            )}
        </div>
    );
};

export default CalendarPage;


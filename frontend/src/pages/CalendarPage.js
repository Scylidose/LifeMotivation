import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import loadingGif from '../assets/images/loading.gif';

import CalendarDisplay from '../components/CalendarDisplay';
import { actionsApi } from '../services/api/index';

import jwt from 'jwt-decode';

const CalendarPage = ({ token }) => {
    // State variables for actions, loading state, and error handling
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                <>
                    {token ? (
                        <img src={loadingGif} className="loadingImg" alt="Loading..." />
                    ) : (
                        <button onClick={() => navigate('/login')} className="login-button">
                            You need to login
                        </button>
                    )}
                </>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    <CalendarDisplay token={token} actions={actions} />
                </div>
            )}
        </div >
    );
};

export default CalendarPage;


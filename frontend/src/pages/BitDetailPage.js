import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import loadingGif from '../assets/images/loading.gif';

import jwt from 'jwt-decode';

import ActionCard from '../components/ActionCard';
import { actionsApi, usersApi } from '../services/api/index';

const BitDetailPage = ({ token }) => {
    // State variables for actions, loading state, and error handling
    const [action, setAction] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            if (!token) {
                // Token is not available, handle accordingly (e.g., redirect to login)
                return;
            }

            const decodedToken = jwt(token);

            await usersApi.getUser(decodedToken.username, token).then(async (result) => {
                try {
                    // Fetch actions and objectives data in parallel
                    const [actionsData] = await Promise.all([
                        actionsApi.getActionById(id, token),
                    ]);
                    setAction(actionsData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError(error);
                    setLoading(false);
                }
            });
        };

        fetchData();
    }, [token, id]);

    return (
        <>
            {loading ? (
                <>
                    {token ? (
                        <img src={loadingGif} className="loadingImg" alt="Loading..." />
                    ) : (
                        <Navigate to="/login" />
                    )}
                </>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    <h1 style={{ 'textAlign': 'center', 'margin': '15px' }}>Your Bit</h1>
                    {loading ? (
                        <img src={loadingGif} className="loadingImg" alt="Loading..." />
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : (
                        <div className="objective-list">
                            {Array.isArray(action) && action.length === 0 ? (
                                <div>
                                    Action not found.
                                </div>
                            ) : (
                                <ActionCard
                                    key={action.id}
                                    action={action}
                                    token={token}
                                />
                            )}

                        </div>
                    )}
                </div>
            )}
        </>

    );
};

export default BitDetailPage;

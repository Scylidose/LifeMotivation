import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import loadingGif from '../assets/images/loading.gif';

import jwt from 'jwt-decode';

import ObjectiveCard from '../components/ObjectiveCard';
import ActionCard from '../components/ActionCard';

import { objectivesApi, actionsApi, usersApi } from '../services/api/index';

const ObjectiveDetailPage = ({ token }) => {
    // State variables for loading state, and error handling
    const [objective, setObjective] = useState([]);
    const [actions, setActions] = useState([]);

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
                    // Fetch objectives data in parallel
                    const [objectivesData, actionsData] = await Promise.all([
                        objectivesApi.getObjectiveById(id, token),
                        actionsApi.getObjectiveActions(id, token)
                    ]);

                    setObjective(objectivesData);
                    setActions(actionsData);
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
                    <h1 style={{ 'textAlign': 'center', 'margin': '15px' }}>Your Objective</h1>
                    {loading ? (
                        <img src={loadingGif} className="loadingImg" alt="Loading..." />
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : (
                        <div className="objective-list">
                            {Array.isArray(objective) && objective.length === 0 ? (
                                <div>
                                    Objective not found.
                                </div>
                            ) : (
                                <div>
                                    <ObjectiveCard
                                        key={objective.id}
                                        objective={objective}
                                        token={token}
                                    />

                                    <div className="action-list">
                                        {actions.length > 0 && (
                                            <>
                                                <h3>Linked Bits with this objective:</h3>
                                                <div className="action-card-container">
                                                    {actions.map(action => (
                                                        <ActionCard
                                                            key={action.id}
                                                            action={action}
                                                            token={token}
                                                        />
                                                    )
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>

    );
};

export default ObjectiveDetailPage;

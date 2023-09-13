import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import jwt from 'jwt-decode';

import ObjectiveForm from '../components/ObjectiveForm';
import ObjectiveCard from '../components/ObjectiveCard';
import { objectivesApi, usersApi } from '../services/api/index';

const ObjectiveDetailPage = ({ token }) => {
    // State variables for decoded token, loading state, and error handling
    const [decodedToken, setDecodedToken] = useState(null);
    const [objective, setObjective] = useState([]);

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
            setDecodedToken(decodedToken);

            await usersApi.getUser(decodedToken.username, token).then(async (result) => {
                try {
                    // Fetch objectives data in parallel
                    const [objectivesData] = await Promise.all([
                        objectivesApi.getObjectiveById(id, token),
                    ]);

                    setObjective(objectivesData);
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
        <div>
            <div>
                {decodedToken ? (
                    <h1>{decodedToken.username}'s Profile</h1>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div>
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : (
                        <div>
                            <h1>Your Objective</h1>
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>Error: {error.message}</p>
                            ) : (
                                <div className="objective-list">
                                    {Array.isArray(objective) && objective.length === 0 ? (
                                        <div>
                                            Objective not found.
                                        </div>
                                    ) : (
                                        <ObjectiveCard
                                            key={objective.id}
                                            objective={objective}
                                            token={token}
                                        />
                                    )}

                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ObjectiveDetailPage;

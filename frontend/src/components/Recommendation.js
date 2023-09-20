import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ActionForm from './ActionForm';
import ActionModal from './ActionModal';
import loadingGif from '../assets/images/loading.gif';

import { actionsApi } from '../services/api/index';

const Recommendation = ({ actions, currentDate, token }) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [showRecommendedActions, setShowRecommendedActions] = useState(false);
    const [showActionFormModal, setShowActionFormModal] = useState(false);
    const [actionToCreate, setActionToCreate] = useState(null);
    const [recommendation, setRecommendation] = useState([]);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleRecommendedActions = () => {
        setShowRecommendedActions(!showRecommendedActions);
    };

    const toggleActionFormModal = (actionToCreate) => {
        setActionToCreate(actionToCreate);
        setShowActionFormModal(!showActionFormModal);
    };

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                if (!token) {
                    // Token is not available, handle accordingly (e.g., redirect to login)
                    return;
                }

                // Fetch recommended actions data
                const recommended_actions = await actionsApi.getRecommendedActions(token);
                setRecommendation(recommended_actions);
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
        <div className="recommendation-container">
            <p>Recommended actions :</p>
            <button className="show-actions-button" onClick={toggleRecommendedActions}>
                {showRecommendedActions ? 'Hide Actions' : 'Show Actions'}
            </button>
            {showActionFormModal && (
                <ActionModal onClose={toggleActionFormModal}>
                    <ActionForm
                        token={token}
                        title={actionToCreate.title}
                        description={actionToCreate.description}
                        isGood={actionToCreate.isGood}
                        daysOfWeek={JSON.parse(actionToCreate.daysOfWeek)}
                        importance={actionToCreate.importance}
                        frequency={actionToCreate.frequency}
                        difficulty={actionToCreate.difficulty}
                        intendedDuration={actionToCreate.intendedDuration}
                        selectedObjective={actionToCreate.objectiveId}
                        publishedDateTime={currentDate.getTime()}
                        isFormVisible={true}
                    />
                </ActionModal>
            )}
            {showRecommendedActions && (
                <ul className="action-list">
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
                            {actions.map((action) => {
                                const currentDayName = daysOfWeek[currentDate.getDay()];

                                if (JSON.parse(action.daysOfWeek)[currentDayName.toLowerCase()]) {
                                    return (
                                        <li key={action.id}>
                                            <div className='create-new-action-container'>
                                                <div className="create-new-action">
                                                    <span>{action.title}</span>
                                                    <button onClick={() => toggleActionFormModal(action)} className="add-action-button">
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                            {recommendation.length > 0 && (
                                <p>You may also consider :</p>
                            )}
                            {recommendation.map((action) => {
                                if (action.length !== 0) {
                                    return (
                                        <li key={action.id}>
                                            <div className='create-new-action-container'>
                                                <div className="create-new-action">
                                                    <span>{action.title}</span>
                                                    <button onClick={() => toggleActionFormModal(action)} className="add-action-button">
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    )}

                </ul>
            )}
        </div>
    );
};

export default Recommendation;

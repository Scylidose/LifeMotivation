import React, { useState } from 'react';
import ActionForm from './ActionForm';
import ActionModal from './ActionModal';

const Recommendation = ({ actions, currentDate, token }) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [showRecommendedActions, setShowRecommendedActions] = useState(false);
    const [showActionFormModal, setShowActionFormModal] = useState(false);
    const [actionToCreate, setActionToCreate] = useState(null);

    const toggleRecommendedActions = () => {
        setShowRecommendedActions(!showRecommendedActions);
    };

    const toggleActionFormModal = (actionToCreate) => {
        setActionToCreate(actionToCreate);
        setShowActionFormModal(!showActionFormModal);
    };

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
                    {actions.map((action) => {
                        const currentDayName = daysOfWeek[currentDate.getDay()];

                        if (JSON.parse(action.daysOfWeek)[currentDayName.toLowerCase()] || action.frequency === 1 || action.frequency === 2) {
                            return (
                                <li key={action.id}>
                                    <span>{action.title}</span>
                                    <button onClick={() => toggleActionFormModal(action)} className="add-action-button">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            )}
        </div>
    );
};

export default Recommendation;

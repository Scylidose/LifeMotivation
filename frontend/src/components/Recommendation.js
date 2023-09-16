import React, { useState } from 'react';
import ActionForm from './ActionForm';

const Recommendation = ({ actions, currentDate, token }) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [showRecommendedActions, setShowRecommendedActions] = useState(false);

    const toggleRecommendedActions = () => {
        setShowRecommendedActions(!showRecommendedActions);
    };

    return (
        <div className="recommendation-container">
            <p>Recommended actions :</p>
            <button className="show-actions-button" onClick={toggleRecommendedActions}>
                {showRecommendedActions ? 'Hide Actions' : 'Show Actions'}
            </button>
            {showRecommendedActions && (
                <ul className="action-list">
                    {actions.map((action) => {
                        const currentDayName = daysOfWeek[currentDate.getDay()];

                        if (JSON.parse(action.daysOfWeek)[currentDayName.toLowerCase()] || action.frequency === 1 || action.frequency === 2) {
                            return (
                                <li key={action.id}>
                                    {action.title}
                                    <ActionForm
                                        token={token}
                                        title={action.title}
                                        description={action.description}
                                        isGood={action.isGood}
                                        daysOfWeek={JSON.parse(action.daysOfWeek)}
                                        frequency={action.frequency}
                                        difficulty={action.difficulty}
                                        intendedDuration={action.intendedDuration}
                                        selectedObjective={action.objectiveId}
                                        publishedDateTime={currentDate.getTime()} />
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

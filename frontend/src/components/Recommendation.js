import React from 'react';
import ActionForm from './ActionForm';

const Recommendation = ({ actions, currentDate }) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div>
            <p>Recommended actions :</p>
            <ul>
                {actions.map((action) => {
                    const currentDayName = daysOfWeek[currentDate.getDay()];

                    if (JSON.parse(action.daysOfWeek)[currentDayName.toLowerCase()] || action.frequency === 1 || action.frequency === 2) {
                        return (
                            <li key={action.id}>
                                {action.title}
                                <ActionForm 
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
        </div>
    );
};

export default Recommendation;

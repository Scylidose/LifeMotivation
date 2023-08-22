import React, { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';

import { objectivesApi } from '../services/api/index';

const ObjectiveCard = ({ objective, objectiveActions, onDelete, onFinish, resetObjective }) => {
    const [linkedActions, setLinkedActions] = useState(null);

    useEffect(() => {
        const fetchObjectiveActions = async (objectiveId) => {
            try {
                const result = await objectivesApi.getObjectiveActions(objectiveId);
                setLinkedActions(result);
            } catch (error) {
                console.error('Error fetching linked actions:', error);
            }
        };

        fetchObjectiveActions(objective.id);
    }, []);

    const handleFinishObjective = () => {
        onFinish(objective.id);
    };

    const handleResetObjective = () => {
        resetObjective(objective.id);
    };

    const convertDate = (timestamp) => {
        var date = new Date(timestamp);
        return date.toLocaleDateString('en-GB')
    };

    return (
        <div className={`objective-card ${objective.realFinishDateTime ? 'completed' : ''}`}>
            <div className="card-header">
                <h2 className="card-title">{objective.title}</h2>
            </div>
            <p className="card-description">{objective.description}</p>
            <div className="card-details">
                <p className="card-info"><strong>Priority:</strong> {objective.priority}</p>
                <p className="card-info"><strong>Complexity:</strong> {objective.complexity}</p>
                {linkedActions && (
                    <div>
                        <Collapsible trigger="Related Bits" className="collapsible-actions">
                            <ul className="linked-actions">
                                {linkedActions.map(action => (
                                    <li key={action.id}>
                                        {action.title} - Created {convertDate(action.publishedDateTime)} 
                                        {action.finishedDateTime ? (
                                            ` - Finished the ${convertDate(action.finishedDateTime)}`
                                        ) : (
                                            ''
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </Collapsible>
                    </div>
                )}
            </div>
            <div className="card-footer">
                <p className="card-duration"><strong>Intended finish date:</strong> {convertDate(objective.intendedFinishDateTime)}</p>
            </div>
            <div className="objective-buttons">
                {objective.realFinishDateTime && (
                    <button className="card-header-button reset-button" onClick={handleResetObjective}>
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                )}
                {!objective.realFinishDateTime && (
                    <button className="card-header-button finish-button" onClick={handleFinishObjective}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </button>
                )}
                <button className="card-header-button delete-button" onClick={() => onDelete(objective.id)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
};

export default ObjectiveCard;

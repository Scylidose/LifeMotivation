import React, { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';

import { convertDate } from '../utils/Utils';
import { actionsApi, objectivesApi } from '../services/api/index';

const ObjectiveCard = ({ objective }) => {
    const [linkedActions, setLinkedActions] = useState(null);

    // Effect to fetch linked actions when the objective ID changes
    useEffect(() => {
        const fetchObjectiveActions = async () => {
            try {
                const result = await actionsApi.getObjectiveActions(objective.id);
                setLinkedActions(result);
            } catch (error) {
                console.error('Error fetching linked actions:', error);
            }
        };
        // Call the fetchObjectiveActions function when the objective ID changes
        fetchObjectiveActions();
    }, [objective.id]);

    // Function to handle deleting the objective
    const handleDeleteObjective = async (objectiveId) => {
        try {
            await objectivesApi.deleteObjective(objectiveId).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error deleting objective:', error);
        }
    };

    // Function to handle resetting the objective
    const handleResetObjective = async () => {
        const objectiveId = objective.id;

        try {
            await objectivesApi.resetObjective(objectiveId).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error resetting objective:', error);
        }
    };

    // Function to handle finishing the objective
    const handleFinishObjective = async () => {
        const objectiveId = objective.id;
        const realDuration = objective.realFinishDateTime;

        try {
            await objectivesApi.finishObjective(objectiveId, realDuration).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error finishing objective:', error);
        }
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
                <button className="card-header-button delete-button" onClick={() => handleDeleteObjective(objective.id)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
};

export default ObjectiveCard;

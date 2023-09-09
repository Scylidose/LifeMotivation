import React, { useState, useEffect } from 'react';
import CommentPopup from './CommentPopup';
import { objectivesApi } from '../services/api/index';
import { convertDate } from '../utils/Utils';

const ActionCard = ({ action, onDelete, onFinish, resetAction, onSaveComment }) => {
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [showFinishDuration, setShowFinishDuration] = useState(false);
    const [realDuration, setRealDuration] = useState(0);
    const [linkedObjective, setLinkedObjective] = useState(null);

    // Handler for the real duration input change
    const handleRealDuration = (event) => {
        setRealDuration(event.target.value);
    };

    // Handler to reset an action
    const handleResetAction = () => {
        resetAction(action.id);
    };

    // Handler to reset an action
    const handleSaveRealDuration = () => {
        onFinish(action.id, realDuration);
        setRealDuration(realDuration);
        setShowFinishDuration(false);
    };

    // Toggles the visibility of the comment popup
    const toggleCommentPopup = () => {
        setShowCommentPopup(!showCommentPopup);
    };

    // Toggles the visibility of the real duration input
    const toggleFinishDuration = () => {
        setShowFinishDuration(!showFinishDuration);
    };

    // Saves a comment for an action
    const saveComment = (id, comment) => {
        onSaveComment(id, comment);
        setShowCommentPopup(false);
    };

    // Formats the days of the week from an object to a string
    const formatDaysOfWeek = (daysOfWeekObject) => {
        const selectedDays = [];
        for (const day in daysOfWeekObject) {
            if (daysOfWeekObject[day]) {
                selectedDays.push(day.charAt(0).toUpperCase() + day.slice(1));
            }
        }
        return selectedDays.join(', ');
    };

    // Formats the days of the week for display
    const selectedDays = formatDaysOfWeek(JSON.parse(action.daysOfWeek));

    // Effect to fetch linked objective information when the component mounts
    useEffect(() => {
        if (action.objectiveId) {
            const fetchObjectiveActions = async () => {
                try {
                    const result = await objectivesApi.getObjectiveById(action.objectiveId);
                    setLinkedObjective(result);
                } catch (error) {
                    console.error('Error fetching linked objective:', error);
                }
            };
            // Fetch the linked objective information
            fetchObjectiveActions();
        }
    }, [action.objectiveId]);

    return (
        <div className={`action-card ${action.finishedDateTime ? 'completed' : ''}`}>
            <div className="card-header">
                <h2 className="card-title">{action.title}</h2>
                <div>
                    <p className="card-duration"><strong>Created:</strong> {convertDate(action.publishedDateTime)}</p>
                </div>
            </div>
            <p className="card-description">{action.description}</p>
            <div className="card-details">
                {action.isGood ? (
                    <div>
                        <p className="card-info"><strong>Importance:</strong> {action.importance}</p>
                        <p className="card-info"><strong>Difficulty:</strong> {action.difficulty}</p>
                        <p className="card-info"><strong>Frequency:</strong> {action.frequency}</p>
                    </div>
                ) : (
                    <div>
                        <p className="card-info"><strong>Detrimental Impact:</strong> {action.importance}</p>
                        <p className="card-info"><strong>Difficulty to Break:</strong> {action.difficulty}</p>
                        <p className="card-info"><strong>Frequency:</strong> {action.frequency}</p>
                    </div>
                )}
                {selectedDays && (
                    <div className="selected-days">
                        <strong>Days of the Week:</strong> {selectedDays}
                    </div>
                )}
                {linkedObjective && (
                    <div className="linked-objective">
                        <strong>Linked with objective:</strong> {linkedObjective.title}
                    </div>
                )}
            </div>
            <div className="card-footer">
                {action.isGood ? (
                    <div>
                        <p className="card-duration"><strong>Intended Duration:</strong> {action.intendedDuration} min</p>
                    </div>
                ) : (
                    <div>
                        <p className="card-duration"><strong>Average time spend:</strong> {action.intendedDuration} min</p>
                    </div>
                )}
                {action.finishedDateTime && (
                    <p className="card-duration"><strong>Real Duration:</strong> {action.realDuration} min</p>
                )}
            </div>
            <div className="action-buttons">
                {action.finishedDateTime && (
                    <button className="card-header-button reset-button" onClick={handleResetAction}>
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                )}
                {!action.finishedDateTime && (
                    <button className="card-header-button finish-button" onClick={toggleFinishDuration}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </button>
                )}
                {showFinishDuration && (
                    <div className="real-duration-card">
                        <span>Real duration</span>
                        <div className="real-duration-buttons">
                            <input
                                type="number"
                                id="finished-duration"
                                name="finishedDuration"
                                min="1"
                                max="1440"
                                onChange={handleRealDuration}
                            />
                            <button className="icon-button cancel-button" onClick={toggleFinishDuration}>
                                <i className="fa fa-times"></i>
                            </button>
                            <button className="icon-button save-button" onClick={handleSaveRealDuration}>
                                <i className="fa fa-check"></i>
                            </button>
                        </div>
                    </div>
                )}

                <button className={`card-header-button add-comment-button ${action.comment !== '' ? 'with-content' : ''}`} onClick={toggleCommentPopup}>
                    <i className="fa fa-comment" aria-hidden="true"></i>
                </button>
                <button className="card-header-button delete-button" onClick={() => onDelete(action.id)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
            {showCommentPopup && (
                <CommentPopup
                    action={action}
                    onSaveComment={saveComment}
                    onCancel={toggleCommentPopup}
                />
            )}
        </div>
    );
};

export default ActionCard;

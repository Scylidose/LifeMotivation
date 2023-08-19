import React, { useState } from 'react';
import CommentPopup from './CommentPopup';

const ActionCard = ({ action, onDelete, onFinish, resetAction, onSaveComment }) => {
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [showFinishDuration, setShowFinishDuration] = useState(false);
    const [realDuration, setRealDuration] = useState(0);

    const handleRealDuration = (event) => {
        setRealDuration(event.target.value);
    };

    const handleResetAction = () => {
        resetAction(action.id);
    };

    const handleSaveRealDuration = () => {
        onFinish(action.id, realDuration);
        setRealDuration(realDuration);
        setShowFinishDuration(false);
    };

    const toggleCommentPopup = () => {
        setShowCommentPopup(!showCommentPopup);
    };

    const toggleFinishDuration = () => {
        setShowFinishDuration(!showFinishDuration);
    };

    const saveComment = (id, comment) => {
        onSaveComment(id, comment);
        setShowCommentPopup(false);
    };

    return (
        <div className={`action-card ${action.finishedDateTime ? 'completed' : ''}`}>
            <div className="card-header">
                <h2 className="card-title">{action.title}</h2>
            </div>
            <p className="card-description">{action.description}</p>
            <div className="card-details">
                <p className="card-info">Importance: {action.importance}</p>
                <p className="card-info">Difficulty: {action.difficulty}</p>
                <p className="card-info">Frequency: {action.frequency}</p>
            </div>
            <div className="card-footer">
                <p className="card-duration">Intended Duration: {action.intendedDuration} min</p>
                {action.finishedDateTime && (
                    <p className="card-duration">Real Duration: {action.realDuration} min</p>
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

import React, { useState } from 'react';
import CommentPopup from './CommentPopup';

const ActionCard = ({ action, onDelete, onSaveComment }) => {
    const [showCommentPopup, setShowCommentPopup] = useState(false);

    const toggleCommentPopup = () => {
        setShowCommentPopup(!showCommentPopup);
    };

    const saveComment = (id, comment) => {
        onSaveComment(id, comment);
        setShowCommentPopup(false);
    };

    return (
        <div className="action-card">
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
            </div>
            <div className="action-buttons">
                <button className={`card-header-button add-comment-button ${action.comment != '' ? 'with-content' : ''}`} onClick={toggleCommentPopup}>
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

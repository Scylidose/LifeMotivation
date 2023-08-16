// components/ActionCard.js
import React from 'react';

const ActionCard = ({ action, onDelete }) => {
    return (
        <div className="action-card">
            <div className="card-header">
                <h2 className="card-title">{action.title}</h2>
                <button className="delete-button" onClick={() => onDelete(action.id)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
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
        </div>
    );
};

export default ActionCard;

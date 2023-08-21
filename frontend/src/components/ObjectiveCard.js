import React from 'react';

const ObjectiveCard = ({ objective, onDelete, onFinish, resetObjective }) => {

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
        <div className={`objective-card ${objective.finishedDateTime ? 'completed' : ''}`}>
            <div className="card-header">
                <h2 className="card-title">{objective.title}</h2>
            </div>
            <p className="card-description">{objective.description}</p>
            <div className="card-details">
                <p className="card-info"><strong>Priority:</strong> {objective.priority}</p>
                <p className="card-info"><strong>Complexity:</strong> {objective.complexity}</p>
            </div>
            <div className="card-footer">
                <p className="card-duration"><strong>Intended finish date:</strong> {convertDate(objective.intendedFinishDateTime)}</p>
            </div>
            <div className="objective-buttons">
                {objective.finishedDateTime && (
                    <button className="card-header-button reset-button" onClick={handleResetObjective}>
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                )}
                {!objective.finishedDateTime && (
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

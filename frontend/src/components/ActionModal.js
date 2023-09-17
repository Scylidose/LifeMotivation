import React from 'react';

const ActionModal = ({ onClose, children }) => {

    return (
        <div className="modal-overlay">
            <div className="modal-popup">
                <button className="modal-close-button" onClick={onClose}>
                    ❌
                </button>
                {children}
            </div>
        </div>
    );
};

export default ActionModal;

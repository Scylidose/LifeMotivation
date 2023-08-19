import React, { useState } from 'react';

const CommentPopup = ({ action, onSaveComment, onCancel }) => {
  const [comment, setComment] = useState(action.comment || '');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveComment = () => {
    onSaveComment(action.id, comment);
    setComment(comment);
  };

  return (
    <div className="comment-textarea">
      <textarea
        className="comment-input"
        placeholder="Enter your comment..."
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="comment-popup-buttons">
        <button className="icon-button cancel-button" onClick={onCancel}>
          <i className="fa fa-times"></i>
        </button>
        <button className="icon-button save-button" onClick={handleSaveComment}>
          <i className="fa fa-check"></i>
        </button>
      </div>
    </div>
  );
};

export default CommentPopup;

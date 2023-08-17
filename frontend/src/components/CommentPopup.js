import React, { useState } from 'react';

const CommentPopup = ({ onSaveComment, onCancel }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveComment = () => {
    onSaveComment(comment); // Call the onSaveComment prop function
    setComment(''); // Clear the comment input
  };

  return (
    <div className="comment-popup">
      <h3>Add Comment</h3>
      <textarea
        className="comment-input"
        placeholder="Enter your comment..."
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="popup-buttons">
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button className="save-button" onClick={handleSaveComment}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CommentPopup;

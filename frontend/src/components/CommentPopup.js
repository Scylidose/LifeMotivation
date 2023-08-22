import React, { useState } from 'react';

/**
 * CommentPopup component displays a popup for entering and saving comments.
 * @param {object} props - The component's properties.
 * @param {object} props.action - The action object to which the comment is related.
 * @param {string} props.action.comment - The initial comment text.
 * @param {function} props.onSaveComment - A function to save the comment.
 * @param {function} props.onCancel - A function to cancel the comment entry.
 * @returns {JSX.Element} The CommentPopup component.
 */
const CommentPopup = ({ action, onSaveComment, onCancel }) => {
  // State variable to track the comment text.
  const [comment, setComment] = useState(action.comment || '');

  // Handles changes in the comment input field.
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Handles saving the comment.
  const handleSaveComment = () => {
    onSaveComment(action.id, comment);
    // Reset the comment input field after saving.
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

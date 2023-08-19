import React, { useState, useEffect } from 'react';
import ActionForm from '../components/ActionForm';
import ActionCard from '../components/ActionCard';
import { getActionsForUser, deleteAction, finishAction, addCommentToAction } from '../services/api';

const HomePage = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    try {
      const fetchedActions = await getActionsForUser('root') // To change
      setActions(fetchedActions);
    } catch (error) {
      console.error('Error fetching actions:', error);
    }
  };

  const handleDeleteAction = async (actionId) => {
    try {
      await deleteAction(actionId);
      setActions(actions.filter((action) => action.id !== actionId));
    } catch (error) {
      console.error('Error deleting action:', error);
    }
  };

  const handleSaveActionComment = async (id, comment) => {
    try {
      await addCommentToAction(id, comment);
      fetchActions();
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleFinishAction = async (actionId, realDuration) => {
    try {
      await finishAction(actionId, realDuration);
      fetchActions();
    } catch (error) {
      console.error('Error finishing action:', error);
    }
  };

  return (
    <div>
      <ActionForm />
      <h1>Your Habits</h1>
      <div className="action-list">
        {actions.map(action => (
          <ActionCard key={action.id} action={action} onDelete={handleDeleteAction} onFinish={handleFinishAction} onSaveComment={handleSaveActionComment} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

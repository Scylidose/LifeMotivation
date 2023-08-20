import React, { useState, useEffect } from 'react';

import ObjectiveForm from '../components/ObjectiveForm';
import ObjectiveCard from '../components/ObjectiveCard';

import ActionForm from '../components/ActionForm';
import ActionCard from '../components/ActionCard';

import { getActionsForUser, deleteAction, finishAction, resetAction, addCommentToAction } from '../services/api';

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

  const handleResetAction = async (actionId) => {
    try {
      await resetAction(actionId);
      fetchActions();
    } catch (error) {
      console.error('Error resetting action:', error);
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
      <h1>Your Bits</h1>
      <div className="action-list">
        {actions.map(action => (
          <ActionCard key={action.id} action={action} onDelete={handleDeleteAction} onFinish={handleFinishAction} resetAction={handleResetAction} onSaveComment={handleSaveActionComment} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

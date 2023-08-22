import React, { useState, useEffect } from 'react';

import ObjectiveForm from '../components/ObjectiveForm';
import ObjectiveCard from '../components/ObjectiveCard';

import ActionForm from '../components/ActionForm';
import ActionCard from '../components/ActionCard';

import { actionsApi, objectivesApi } from '../services/api/index';

const HomePage = () => {
  const [actions, setActions] = useState([]);
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    fetchActions();
    fetchObjectives();
  }, []);

  const fetchActions = async () => {
    try {
      const fetchedActions = await actionsApi.getActionsForUser('root') // To change
      setActions(fetchedActions);
    } catch (error) {
      console.error('Error fetching actions:', error);
    }
  };

  const fetchObjectives = async () => {
    try {
      const fetchedObjectives = await objectivesApi.getObjectivesForUser('root') // To change
      setObjectives(fetchedObjectives);
    } catch (error) {
      console.error('Error fetching objectives:', error);
    }
  };

  const handleDeleteObjective = async (objectiveId) => {
    try {
      await objectivesApi.deleteObjective(objectiveId);
      setObjectives(objectives.filter((objective) => objective.id !== objectiveId));
    } catch (error) {
      console.error('Error deleting objective:', error);
    }
  };

  const handleResetObjective = async (objectiveId) => {
    try {
      await objectivesApi.resetObjective(objectiveId);
      fetchObjectives();
    } catch (error) {
      console.error('Error resetting objective:', error);
    }
  };

  const handleFinishObjective = async (objectiveId, realDuration) => {
    try {
      await objectivesApi.finishObjective(objectiveId, realDuration);
      fetchObjectives();
    } catch (error) {
      console.error('Error finishing objective:', error);
    }
  };

  const handleDeleteAction = async (actionId) => {
    try {
      await actionsApi.deleteAction(actionId);
      setActions(actions.filter((action) => action.id !== actionId));
    } catch (error) {
      console.error('Error deleting action:', error);
    }
  };

  const handleResetAction = async (actionId) => {
    try {
      await actionsApi.resetAction(actionId);
      fetchActions();
    } catch (error) {
      console.error('Error resetting action:', error);
    }
  };

  const handleFinishAction = async (actionId, realDuration) => {
    try {
      await actionsApi.finishAction(actionId, realDuration);
      fetchActions();
    } catch (error) {
      console.error('Error finishing action:', error);
    }
  };

  const handleSaveActionComment = async (id, comment) => {
    try {
      await actionsApi.addCommentToAction(id, comment);
      fetchActions();
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  return (
    <div>
      <div>
        <ActionForm />
        <h1>Your Bits</h1>
        <div className="action-list">
          {actions.map(action => (
            <ActionCard key={action.id} action={action} onDelete={handleDeleteAction} onFinish={handleFinishAction} resetAction={handleResetAction} onSaveComment={handleSaveActionComment} />
          ))}
        </div>
      </div>
      <div>
        <ObjectiveForm />
        <h1>Your Objectives</h1>
        <div className="objective-list">
          {objectives
            .sort((a, b) => {
              // Sort by priority first
              if (a.priority !== b.priority) {
                return a.priority - b.priority;
              }

              // If priorities are equal, compare intended finish dates
              const todayTimestamp = Date.now();
              const aTimeDifference = Math.abs(a.intendedFinishDateTime - todayTimestamp);
              const bTimeDifference = Math.abs(b.intendedFinishDateTime - todayTimestamp);

              return aTimeDifference - bTimeDifference;
            })
            .map(objective => (
              <ObjectiveCard
                key={objective.id}
                objective={objective}
                onDelete={handleDeleteObjective}
                onFinish={handleFinishObjective}
                resetObjective={handleResetObjective}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

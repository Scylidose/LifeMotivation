import React, { useState, useEffect } from 'react';

import ObjectiveForm from '../components/ObjectiveForm';
import ObjectiveCard from '../components/ObjectiveCard';
import ActionForm from '../components/ActionForm';
import ActionCard from '../components/ActionCard';

import { actionsApi, objectivesApi } from '../services/api/index';

const ProfilePage = () => {
  // State variables for actions, objectives, loading state, and error handling
  const [actions, setActions] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch actions and objectives data in parallel
      const [actionsData, objectivesData] = await Promise.all([
        actionsApi.getActionsForUser('root'),
        objectivesApi.getObjectivesForUser('root')
      ]);
      const sortedActionsData = [...actionsData].sort((a, b) => a.publishedDateTime - b.publishedDateTime);

      setActions(sortedActionsData);
      setObjectives(objectivesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  /* Functions for handling objective operations */

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
      fetchData();
    } catch (error) {
      console.error('Error resetting objective:', error);
    }
  };

  const handleFinishObjective = async (objectiveId, realDuration) => {
    try {
      await objectivesApi.finishObjective(objectiveId, realDuration);
      fetchData();
    } catch (error) {
      console.error('Error finishing objective:', error);
    }
  };

  /* Functions for handling action operations */

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
      fetchData();
    } catch (error) {
      console.error('Error resetting action:', error);
    }
  };

  const handleFinishAction = async (actionId, realDuration) => {
    try {
      await actionsApi.finishAction(actionId, realDuration);
      fetchData();
    } catch (error) {
      console.error('Error finishing action:', error);
    }
  };

  const handleSaveActionComment = async (id, comment) => {
    try {
      await actionsApi.addCommentToAction(id, comment);
      fetchData();
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  return (
    <div>
      <div>
        <ActionForm />
        <h1>Your Bits</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="action-list">
            {actions.map(action => (
              <ActionCard
                key={action.id}
                action={action}
                onDelete={handleDeleteAction}
                onFinish={handleFinishAction}
                resetAction={handleResetAction}
                onSaveComment={handleSaveActionComment}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <ObjectiveForm />
        <h1>Your Objectives</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

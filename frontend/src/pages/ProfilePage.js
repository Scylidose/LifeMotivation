import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';

import ObjectiveForm from '../components/ObjectiveForm';
import ObjectiveCard from '../components/ObjectiveCard';
import ActionForm from '../components/ActionForm';
import ActionCard from '../components/ActionCard';

import { actionsApi, objectivesApi, usersApi } from '../services/api/index';

const ProfilePage = ({ token }) => {
  // State variables for decoded token, actions, objectives, loading state, and error handling
  const [decodedToken, setDecodedToken] = useState(null);
  const [actions, setActions] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      if (!token) {
        // Token is not available, handle accordingly (e.g., redirect to login)
        return;
      }

      const decodedToken = jwt(token);
      setDecodedToken(decodedToken);

      await usersApi.getUser(decodedToken.username, token).then(async (result) => {
        try {
          // Fetch actions and objectives data in parallel
          const [actionsData, objectivesData] = await Promise.all([
            actionsApi.getActionsForUser(result.username, token),
            objectivesApi.getObjectivesForUser(result.username, token)
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
      });
    };

    fetchData();
  }, [token]);

  const displayedActions = actions.slice(0, 5);

  return (
    <>
      <div>
        {decodedToken ? (
          <h1 style={{ 'textAlign': 'center', 'margin': '15px' }}>{decodedToken.username}'s Profile</h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <div>
          <ActionForm token={token} />
          <h1 style={{ 'textAlign': 'center', 'margin': '15px' }}>Your Bits</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <div className="action-list">
              <div className="action-card-container">

                {displayedActions.map(action => (
                  <ActionCard
                    key={action.id}
                    action={action}
                    token={token}
                  />
                ))}
              </div>

              {actions.length > 6 && (
                <div className='create-new-action-container'>
                  <div className="create-new-action">
                    <span> See more actions </span>
                    <button onClick={() => navigate('/bits')} className="add-action-button">
                      here
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <hr/>
        <div>
          <ObjectiveForm token={token} />
          <h1 style={{ 'textAlign': 'center', 'margin': '15px' }}>Your Objectives</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <div className="objective-list">

              <div className="objective-card-container">
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
                  }).slice(0, 3)
                  .map(objective => (
                    <ObjectiveCard
                      key={objective.id}
                      objective={objective}
                      token={token}
                    />
                  ))}
              </div>
              {objectives.length > 3 && (
                <div className='create-new-action-container'>
                  <div className="create-new-action">
                    <span> See more objectives </span>
                    <button onClick={() => navigate('/objectives')} className="add-action-button">
                      here
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

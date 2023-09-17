import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';

import ObjectiveForm from '../components/ObjectiveForm';
import ObjectiveCard from '../components/ObjectiveCard';
import ActionModal from '../components/ActionModal';

import { objectivesApi, usersApi } from '../services/api/index';

const ObjectivesPage = ({ token }) => {
  // State variables for decoded token, loading state, and error handling
  const [decodedToken, setDecodedToken] = useState(null);
  const [objectives, setObjectives] = useState([]);
  const [showActionFormModal, setShowActionFormModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleActionFormModal = () => {
    setShowActionFormModal(!showActionFormModal);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      if (!token) {
        // Token is not available, handle accordingly (e.g., redirect to login)
        return;
      }

      const decodedToken = jwt(token);

      await usersApi.getUser(decodedToken.username, token).then(async (result) => {
        try {
          // Fetch objectives data in parallel
          const [objectivesData] = await Promise.all([
            objectivesApi.getObjectivesForUser(result.username, token),
          ]);
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

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <div className='create-new-action-container'>
              <div className="create-new-action">
                <span> Create new objective </span>
                <button onClick={() => toggleActionFormModal()} className="add-action-button">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            {showActionFormModal && (
              <div style={{ 'textAlign': 'center' }}>
                <ActionModal onClose={toggleActionFormModal}>
                  <ObjectiveForm
                    token={token}
                    isFormVisible={true}
                  />
                </ActionModal>
              </div>
            )}
            <div className="objective-list">
              <h1 style={{ 'textAlign': 'center', 'margin': '15px' }}>Your Objectives</h1>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : (
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
                    })
                    .map(objective => (
                      <ObjectiveCard
                        key={objective.id}
                        objective={objective}
                        token={token}
                      />
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>

  );
};

export default ObjectivesPage;

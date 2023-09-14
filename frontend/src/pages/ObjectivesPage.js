import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';

import ObjectiveForm from '../components/ObjectiveForm';
import ObjectiveCard from '../components/ObjectiveCard';
import { objectivesApi, usersApi } from '../services/api/index';

const ObjectivesPage = ({ token }) => {
  // State variables for decoded token, loading state, and error handling
  const [decodedToken, setDecodedToken] = useState(null);
  const [objectives, setObjectives] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      <div>
        {decodedToken ? (
          <h1>{decodedToken.username}'s Profile</h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
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
                        token={token}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default ObjectivesPage;

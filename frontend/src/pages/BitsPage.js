import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';

import ActionCard from '../components/ActionCard';
import ActionForm from '../components/ActionForm';

import { actionsApi, usersApi } from '../services/api/index';

const BitsPage = ({ token }) => {
  // State variables for decoded token, actions, loading state, and error handling
  const [decodedToken, setDecodedToken] = useState(null);
  const [actions, setActions] = useState([]);

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
          // Fetch actions and objectives data in parallel
          const [actionsData] = await Promise.all([
            actionsApi.getActionsForUser(result.username, token),
          ]);
          const sortedActionsData = [...actionsData].sort((a, b) => a.publishedDateTime - b.publishedDateTime);

          setActions(sortedActionsData);
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
              <ActionForm token={token} />
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

export default BitsPage;

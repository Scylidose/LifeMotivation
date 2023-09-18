import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import loadingGif from '../assets/images/loading.gif';
import jwt from 'jwt-decode';

import ActionCard from '../components/ActionCard';
import ActionForm from '../components/ActionForm';
import ActionModal from '../components/ActionModal';

import { actionsApi, usersApi } from '../services/api/index';

const BitsPage = ({ token }) => {
  // State variables for decoded token, actions, loading state, and error handling
  const [actions, setActions] = useState([]);
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
    <>
      <>
        {loading ? (
          <>
            {token ? (
              <img src={loadingGif} className="loadingImg" alt="Loading..." />
            ) : (
              <Navigate to="/login" />
            )}
          </>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            <div className='create-new-action-container'>
              <div className="create-new-action">
                <span> Create new action </span>
                <button onClick={() => toggleActionFormModal()} className="add-action-button">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            {showActionFormModal && (
              <div style={{ 'textAlign': 'center' }}>
                <ActionModal onClose={toggleActionFormModal}>
                  <ActionForm
                    token={token}
                    isFormVisible={true}
                  />
                </ActionModal>
              </div>
            )}
            <h1 style={{ 'textAlign': 'center', 'margin': '15px' }}>Your Bits</h1>
            {loading ? (
              <img src={loadingGif} className="loadingImg" alt="Loading..." />
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (

              <div className="action-list">
                {actions.length === 0 ? (
                  <h3 style={{ 'textAlign': 'center', 'margin': '15px' }}>No actions defined.</h3>
                ) : (
                  <div className="action-card-container">
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
        )}
      </>
    </>

  );
};

export default BitsPage;

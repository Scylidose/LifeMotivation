import React, { useState, useEffect } from 'react';
import ActionForm from '../components/ActionForm';
import { getActionsForUser } from '../services/api';

const HomePage = () => {
    const [actions, setActions] = useState([]);

    useEffect(() => {
        const fetchActions = async () => {
          try {
            const username = 'root'; // To change
            const actionsData = await getActionsForUser(username);
            setActions(actionsData);
            console.log(actionsData);
          } catch (error) {
            console.error('Error fetching actions:', error);
          }
        };
    
        fetchActions();
      }, []);

    return (
        <div>
            <ActionForm />
            <h1>Actions</h1>
            <ul>
                {actions.map(action => (
                    <li key={action.id}>
                        <h2>{action.title}</h2>
                        <p>{action.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;

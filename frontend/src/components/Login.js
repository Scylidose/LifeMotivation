import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../context/UserContext';

import { usersApi } from '../services/api/index';

function Login() {
    const { user } = useUser();
    const history = useHistory();

    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                // Redirect to the home page if user already logged in
                history.push('/');
            } else {
                const response = await usersApi.logUser(formData);
                if (response.status === 200) {
                    // Login successful, redirect to the home page
                    history.push('/');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // If the user is already logged in, redirect to the home page
        if (user) {
            history.push('/');
        }
    }, [user, history]);

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="usernameOrEmail"
                    placeholder="Username or Email"
                    value={formData.usernameOrEmail}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account?{' '}
                <button onClick={() => history.push('/register')}>
                    Register here
                </button>
            </p>
        </div>
    );
}

export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

import jwt from 'jwt-decode';

import { usersApi } from '../services/api/index';

function Login({ onLogin }) {
    const { user, login } = useUser();
    const navigate = useNavigate();

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
                navigate('/');
            } else {
                const userData = await usersApi.logUser(formData);
                const decodedToken = jwt(userData.token);
                onLogin(userData.token);

                if (userData.status === 200) {
                    login(decodedToken);
                    // Login successful, redirect to the home page
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        // If the user is already logged in, redirect to the home page
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="usernameOrEmail"
                    placeholder="Username or Email"
                    value={formData.usernameOrEmail}
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
            <p>
                Don't have an account?{' '}
                <button onClick={() => navigate('/register')} className="register-button">
                    Register here
                </button>
            </p>
        </div>
    );
}

export default Login;

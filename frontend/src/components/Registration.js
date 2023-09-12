import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { usersApi } from '../services/api/index';

function Registration() {
    const { user } = useUser();
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
                // Redirect to the home page
                history.push('/');
            } else {
                const response = await usersApi.createNewUser(formData);
                if (response.status === 200) {
                    // Registration successful, redirect to the home page
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
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account?{' '}
                <button onClick={() => history.push('/login')}>
                    Login here
                </button>
            </p>
        </div>
    );
}

export default Registration;

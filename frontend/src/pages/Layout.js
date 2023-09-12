import React, { useState, useEffect } from 'react';

import { Outlet, Link } from "react-router-dom";
import { usersApi } from '../services/api/index';

import { calculateXPLevel, calculateLevelXP, calculateNextLevelXP } from '../utils/Utils';

const Layout = () => {
    const [userXp, setUserXp] = useState(null);

    useEffect(() => {
        async function fetchUserXP() {
            try {
                const user = await usersApi.getUser("root");
                const xp = user.xp;
                setUserXp(xp);
            } catch (error) {
                console.error("Failed to fetch user XP:", error);
            }
        }

        fetchUserXP();
    }, []);

    const currentLevel = calculateXPLevel(userXp);
    const xpNeededForCurrentLevel = calculateLevelXP(userXp);
    const xpNeededForNextLevel = calculateNextLevelXP(userXp);
    const xpProgress = Math.abs(userXp);
    const progressPercentage = (xpProgress / xpNeededForCurrentLevel) * 100;

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </nav>
            <h1>Your Level Progress</h1>
            <p>Current Level: {currentLevel}</p>
            <p>XP Needed for Next Level: {xpNeededForNextLevel}</p>
            <p>Your XP: {userXp}</p>
            <div className="level-progress-bar">
                <div
                    className="progress"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
                <div className="progress-label">{`${progressPercentage.toFixed(2)}%`}</div>
            </div>
            <Outlet />
        </>
    )
};

export default Layout;
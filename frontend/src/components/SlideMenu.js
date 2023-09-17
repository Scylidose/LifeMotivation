import React, { useState, useEffect } from 'react';

import jwt from 'jwt-decode';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

import { usersApi } from '../services/api/index';

import { calculateXPLevel, calculateLevelXP } from '../utils/Utils';
import { SlideMenuData } from '../context/SlideMenuData';

function SlideMenu({ token }) {
  const [sidebar, setSidebar] = useState(false);
  const [userXp, setUserXp] = useState(null);

  useEffect(() => {
    async function fetchUserXP() {
      try {
        const decodedToken = jwt(token);
        const user = await usersApi.getUser(decodedToken.username, token);
        const xp = user.xp;
        setUserXp(xp);
      } catch (error) {
        console.error("Failed to fetch user XP:", error);
      }
    }

    if (token) {
      fetchUserXP();
    }
  }, [token]);

  const currentLevel = calculateXPLevel(userXp);
  const xpNeededForCurrentLevel = calculateLevelXP(userXp);
  const xpProgress = Math.abs(userXp);
  const progressPercentage = (xpProgress / xpNeededForCurrentLevel) * 100;

  const showSidebar = () => setSidebar(!sidebar);
  const lines = [];

  for (let i = 10; i <= 100; i += 10) {
    lines.push(
      <div
        key={`line-${i}`}
        className="progress-line"
        style={{
          left: `${i}%`,
        }}
      ></div>
    );
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          {token ? (
            <div className="progress-content">
              <p>Lvl. {currentLevel}</p>
              <div className="progress">
                <div className="level-progress-bar">
                  {lines}

                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${progressPercentage}%`,
                      background: 'linear-gradient(to right, #007BFF, #00A5FF)',
                      height: '100%'
                    }}
                    aria-valuenow={progressPercentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <p>
                {userXp} / {xpNeededForCurrentLevel} (
                {progressPercentage.toFixed(2)}%)
              </p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SlideMenuData.map((item, index) => {
              if (token && item.login) {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              } else if ((!token && !item.login) || (item.login === 'home')) {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SlideMenu;
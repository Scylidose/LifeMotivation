import React, { useState, useEffect } from 'react';

const Recommendation = ({ actions }) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div>
            <p>Recommended actions :</p>
            <ul>
                {actions.map((action) => {
                    const currentDayName = daysOfWeek[new Date().getDay()];

                    if (JSON.parse(action.daysOfWeek)[currentDayName.toLowerCase()] || action.frequency == 1 || action.frequency == 2) {
                        return (
                            <li key={action.id}>
                               {action.title}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <p>test</p>
        </div>
    );
};

export default Recommendation;

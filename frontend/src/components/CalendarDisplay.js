import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';

import Recommendation from './Recommendation';

const CalendarDisplay = ({ actions }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const todayActions = actions.filter((action) =>
    isSameDay(new Date(action.publishedDateTime), currentDate)
  );

  return (
    <div className="page">
      <div className="calendar">
        <Calendar value={currentDate} onChange={setCurrentDate} />
      </div>
      <div className="current-day">
        <h1>Today: {format(currentDate, 'MMMM d, yyyy')}</h1>
      </div>
      <div className="actions-list">
        <h2>Actions for {format(currentDate, 'MMMM d, yyyy')}</h2>
        <Recommendation actions={actions} />
        {todayActions.length === 0 ? (
          <p>No actions for today.</p>
        ) : (
          <ul>
            {todayActions.map((action) => (
              <li key={action.id}>{action.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalendarDisplay;

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';

import Recommendation from './Recommendation';
import ActionForm from './ActionForm';
import ActionCard from './ActionCard';

const CalendarDisplay = ({ actions, token }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    const todayActions = actions.filter((action) =>
        isSameDay(new Date(action.publishedDateTime), currentDate)
    );

    return (
        <div className="page">
            <div className="calendar-recommendation-container">
                <div className="calendar-container">
                    <h5>Bits for {format(currentDate, 'MMMM d, yyyy')}</h5>
                    <Calendar className="calendar" value={currentDate} onChange={setCurrentDate} />
                </div>
                <Recommendation actions={actions} token={token} currentDate={currentDate} />
            </div>
            <div className="action-list">
                {todayActions.length === 0 ? (
                    <h3 style={{ 'text-align': 'center', 'margin': '15px' }}>No actions for today.</h3>
                ) : (
                    <>
                        <h3 style={{ 'text-align': 'center', 'margin': '15px' }}>Today's Bits :</h3>
                        <div className="action-card-container">

                            {todayActions.map(action => (
                                <ActionCard
                                    key={action.id}
                                    action={action}
                                    token={token}
                                />
                            ))}
                        </div>
                    </>
                )}
                <ActionForm token={token} publishedDateTime={currentDate.getTime()} />
            </div>
        </div>
    );
};

export default CalendarDisplay;

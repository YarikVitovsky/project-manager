import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    Users,
    Video
} from 'lucide-react';
import './Calendar.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [showEventModal, setShowEventModal] = useState(false);

    // Sample events
    const events = [
        {
            id: 1,
            title: 'Project Kickoff Meeting',
            date: '2024-11-10',
            time: '10:00 AM',
            type: 'meeting',
            project: 'E-commerce Platform',
            participants: 5
        },
        {
            id: 2,
            title: 'Design Review',
            date: '2024-11-12',
            time: '2:00 PM',
            type: 'review',
            project: 'Mobile App Redesign',
            participants: 3
        },
        {
            id: 3,
            title: 'Sprint Planning',
            date: '2024-11-15',
            time: '9:00 AM',
            type: 'planning',
            project: 'Data Analytics Dashboard',
            participants: 8
        },
        {
            id: 4,
            title: 'Client Presentation',
            date: '2024-11-18',
            time: '3:00 PM',
            type: 'presentation',
            project: 'Marketing Website',
            participants: 6
        }
    ];

    const milestones = [
        { date: '2024-11-20', title: 'MVP Release', project: 'E-commerce Platform' },
        { date: '2024-11-25', title: 'Beta Testing', project: 'Mobile App Redesign' },
        { date: '2024-11-30', title: 'Final Delivery', project: 'Marketing Website' }
    ];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const getEventTypeColor = (type) => {
        const colors = {
            meeting: '#3b82f6',
            review: '#f59e0b',
            planning: '#10b981',
            presentation: '#a855f7'
        };
        return colors[type] || '#6b7280';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const days = getDaysInMonth(currentDate);
    const today = new Date();

    return (
        <div className="calendar-page">
            <div className="calendar-header">
                <div>
                    <h1>Project Calendar</h1>
                    <p>Schedule management, deadlines, and milestone tracking.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowEventModal(true)}>
                    <Plus size={18} />
                    Add Event
                </button>
            </div>

            <div className="calendar-content">
                {/* Calendar View */}
                <div className="calendar-section">
                    <div className="calendar-controls">
                        <div className="month-navigation">
                            <button onClick={previousMonth} className="nav-button">
                                <ChevronLeft size={20} />
                            </button>
                            <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                            <button onClick={nextMonth} className="nav-button">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <div className="view-toggle">
                            <button
                                className={view === 'month' ? 'active' : ''}
                                onClick={() => setView('month')}
                            >
                                Month
                            </button>
                            <button
                                className={view === 'week' ? 'active' : ''}
                                onClick={() => setView('week')}
                            >
                                Week
                            </button>
                        </div>
                    </div>

                    <div className="calendar-grid">
                        <div className="calendar-weekdays">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="weekday">{day}</div>
                            ))}
                        </div>
                        <div className="calendar-days">
                            {days.map((day, index) => (
                                <div
                                    key={index}
                                    className={`calendar-day ${!day ? 'empty' : ''} ${day &&
                                            day === today.getDate() &&
                                            currentDate.getMonth() === today.getMonth() &&
                                            currentDate.getFullYear() === today.getFullYear()
                                            ? 'today'
                                            : ''
                                        }`}
                                >
                                    {day && (
                                        <>
                                            <span className="day-number">{day}</span>
                                            {events.filter(e => {
                                                const eventDate = new Date(e.date);
                                                return eventDate.getDate() === day &&
                                                    eventDate.getMonth() === currentDate.getMonth();
                                            }).map(event => (
                                                <div
                                                    key={event.id}
                                                    className="calendar-event"
                                                    style={{ borderLeftColor: getEventTypeColor(event.type) }}
                                                >
                                                    {event.title}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upcoming Events & Milestones */}
                <div className="calendar-sidebar">
                    <div className="sidebar-section">
                        <h3>Upcoming Events</h3>
                        <div className="events-list">
                            {events.map(event => (
                                <div key={event.id} className="event-card">
                                    <div
                                        className="event-indicator"
                                        style={{ backgroundColor: getEventTypeColor(event.type) }}
                                    ></div>
                                    <div className="event-details">
                                        <h4>{event.title}</h4>
                                        <div className="event-meta">
                                            <span>
                                                <CalendarIcon size={12} />
                                                {formatDate(event.date)}
                                            </span>
                                            <span>
                                                <Clock size={12} />
                                                {event.time}
                                            </span>
                                        </div>
                                        <div className="event-footer">
                                            <span className="event-project">{event.project}</span>
                                            <span className="event-participants">
                                                <Users size={12} />
                                                {event.participants}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h3>Project Milestones</h3>
                        <div className="milestones-list">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="milestone-card">
                                    <div className="milestone-date">
                                        <span className="date-day">{new Date(milestone.date).getDate()}</span>
                                        <span className="date-month">
                                            {monthNames[new Date(milestone.date).getMonth()].slice(0, 3)}
                                        </span>
                                    </div>
                                    <div className="milestone-info">
                                        <h4>{milestone.title}</h4>
                                        <p>{milestone.project}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h3>Team Schedule</h3>
                        <p className="schedule-description">Track team availability and schedule meetings</p>
                        <button className="btn-secondary full-width">
                            <Users size={16} />
                            View Team Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;

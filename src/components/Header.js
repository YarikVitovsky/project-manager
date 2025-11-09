import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Settings, LogOut, Search, HelpCircle, Mail } from 'lucide-react';
import './Header.css';

const Header = ({ user = { name: 'John Doe', email: 'john.doe@projecthub.com', avatar: null } }) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, text: 'New task assigned to you', time: '5 min ago', unread: true },
        { id: 2, text: 'Project deadline approaching', time: '1 hour ago', unread: true },
        { id: 3, text: 'Team member commented on your task', time: '2 hours ago', unread: false }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                    <h1 className="logo">ProjectHub</h1>
                </div>

                <div className="header-right">
                    <div className="header-search">
                        <Search size={18} />
                        <input type="text" placeholder="Search projects, tasks..." />
                    </div>

                    <div className="header-actions">
                        <button className="icon-btn" title="Help" onClick={() => alert('Help coming soon!')}>
                            <HelpCircle size={20} />
                        </button>

                        <div className="notification-wrapper">
                            <button
                                className="icon-btn"
                                title="Notifications"
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowUserMenu(false);
                                }}
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="notification-badge">{unreadCount}</span>
                                )}
                            </button>

                            {showNotifications && (
                                <div className="notifications-dropdown">
                                    <div className="dropdown-header">
                                        <h3>Notifications</h3>
                                        <button className="mark-read-btn">Mark all as read</button>
                                    </div>
                                    <div className="notifications-list">
                                        {notifications.map(notif => (
                                            <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                                                <div className="notification-content">
                                                    <p>{notif.text}</p>
                                                    <span className="notification-time">{notif.time}</span>
                                                </div>
                                                {notif.unread && <div className="unread-dot"></div>}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="dropdown-footer">
                                        <button onClick={() => setShowNotifications(false)}>View All</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="icon-btn" title="Settings" onClick={() => navigate('/settings')}>
                            <Settings size={20} />
                        </button>

                        <div className="user-menu-wrapper">
                            <div
                                className="user-info"
                                onClick={() => {
                                    setShowUserMenu(!showUserMenu);
                                    setShowNotifications(false);
                                }}
                            >
                                <div className="user-avatar">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.name} />
                                    ) : (
                                        <User size={20} />
                                    )}
                                </div>
                                <span className="user-name">{user.name}</span>
                            </div>

                            {showUserMenu && (
                                <div className="user-dropdown">
                                    <div className="dropdown-user-info">
                                        <div className="dropdown-avatar">
                                            {user.avatar ? (
                                                <img src={user.avatar} alt={user.name} />
                                            ) : (
                                                <User size={32} />
                                            )}
                                        </div>
                                        <div>
                                            <h4>{user.name}</h4>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item" onClick={() => {
                                        navigate('/settings');
                                        setShowUserMenu(false);
                                    }}>
                                        <User size={16} />
                                        My Profile
                                    </button>
                                    <button className="dropdown-item" onClick={() => {
                                        navigate('/settings');
                                        setShowUserMenu(false);
                                    }}>
                                        <Settings size={16} />
                                        Settings
                                    </button>
                                    <button className="dropdown-item" onClick={() => {
                                        alert('Help & Support coming soon!');
                                        setShowUserMenu(false);
                                    }}>
                                        <HelpCircle size={16} />
                                        Help & Support
                                    </button>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item logout" onClick={() => {
                                        alert('Logout functionality coming soon!');
                                        setShowUserMenu(false);
                                    }}>
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
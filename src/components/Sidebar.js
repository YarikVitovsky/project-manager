import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    FolderOpen,
    Users,
    BarChart3,
    Calendar,
    Settings,
    Plus,
    CheckSquare
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
        { id: 'projects', label: 'Projects', icon: FolderOpen, path: '/projects' },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare, path: '/tasks' },
        { id: 'team', label: 'Team', icon: Users, path: '/team' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
        { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/calendar' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
    ];

    const handleItemClick = (item) => {
        navigate(item.path);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-content">
                <div className="sidebar-header">
                    <button className="btn btn-primary new-project-btn">
                        <Plus size={16} />
                        New Project
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.id} className="nav-item">
                                    <button
                                        className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <Icon size={20} />
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="workspace-info">
                        <div className="workspace-avatar">W</div>
                        <div className="workspace-details">
                            <h4>Workspace</h4>
                            <p>5 active projects</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
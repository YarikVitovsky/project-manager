import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FolderOpen,
    Users,
    CheckCircle,
    Clock,
    TrendingUp,
    Calendar,
    AlertCircle,
    Plus,
    ArrowRight
} from 'lucide-react';
import ProjectCard from './ProjectCard';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        {
            title: 'Active Projects',
            value: '12',
            change: '+2',
            icon: FolderOpen,
            color: 'blue'
        },
        {
            title: 'Team Members',
            value: '24',
            change: '+3',
            icon: Users,
            color: 'green'
        },
        {
            title: 'Completed Tasks',
            value: '156',
            change: '+12',
            icon: CheckCircle,
            color: 'purple'
        },
        {
            title: 'Pending Tasks',
            value: '43',
            change: '-5',
            icon: Clock,
            color: 'orange'
        }
    ]);

    const [recentProjects, setRecentProjects] = useState([
        {
            id: 1,
            name: 'E-commerce Platform',
            progress: 75,
            dueDate: '2024-12-15',
            team: ['John', 'Sarah', 'Mike'],
            status: 'active',
            priority: 'high'
        },
        {
            id: 2,
            name: 'Mobile App Redesign',
            progress: 45,
            dueDate: '2024-11-30',
            team: ['Emma', 'David'],
            status: 'active',
            priority: 'medium'
        },
        {
            id: 3,
            name: 'Data Analytics Dashboard',
            progress: 90,
            dueDate: '2024-11-20',
            team: ['Alex', 'Lisa', 'Tom', 'Jenny'],
            status: 'review',
            priority: 'high'
        }
    ]);

    const [upcomingTasks, setUpcomingTasks] = useState([
        {
            id: 1,
            title: 'Review wireframes',
            project: 'Mobile App Redesign',
            dueDate: '2024-11-08',
            priority: 'high'
        },
        {
            id: 2,
            title: 'Setup database schema',
            project: 'E-commerce Platform',
            dueDate: '2024-11-10',
            priority: 'medium'
        },
        {
            id: 3,
            title: 'User testing session',
            project: 'Data Analytics Dashboard',
            dueDate: '2024-11-12',
            priority: 'low'
        }
    ]);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="dashboard">
                <div className="loading-state">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back! Here's what's happening with your projects.</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className={`stat-card stat-${stat.color}`}>
                            <div className="stat-icon">
                                <Icon size={24} />
                            </div>
                            <div className="stat-content">
                                <h3>{stat.value}</h3>
                                <p>{stat.title}</p>
                                <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                                    {stat.change} this week
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="dashboard-content">
                {/* Recent Projects */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Recent Projects</h2>
                        <button className="btn btn-link" onClick={() => navigate('/projects')}>
                            View All <ArrowRight size={16} />
                        </button>
                    </div>
                    <div className="projects-grid">
                        {recentProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Upcoming Tasks</h2>
                        <button className="btn btn-link" onClick={() => navigate('/tasks')}>
                            View All <ArrowRight size={16} />
                        </button>
                    </div>
                    <div className="tasks-list">
                        {upcomingTasks.map(task => (
                            <div key={task.id} className="task-item">
                                <div className="task-content">
                                    <h4>{task.title}</h4>
                                    <p>{task.project}</p>
                                    <div className="task-meta">
                                        <span className="task-date">
                                            <Calendar size={14} />
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                        <span className={`task-priority priority-${task.priority}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                                <button className="btn btn-secondary btn-sm">View</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                    <button className="action-btn" onClick={() => navigate('/projects')}>
                        <Plus size={20} />
                        <span>Create Project</span>
                    </button>
                    <button className="action-btn" onClick={() => navigate('/team')}>
                        <Users size={20} />
                        <span>Manage Team</span>
                    </button>
                    <button className="action-btn" onClick={() => navigate('/analytics')}>
                        <TrendingUp size={20} />
                        <span>View Analytics</span>
                    </button>
                    <button className="action-btn" onClick={() => navigate('/calendar')}>
                        <Calendar size={20} />
                        <span>View Calendar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
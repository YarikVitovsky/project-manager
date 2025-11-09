import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Users,
    CheckCircle2,
    Clock,
    AlertCircle,
    BarChart3,
    PieChart,
    Activity,
    Calendar as CalendarIcon
} from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('month');
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // Simulated analytics data
        setStats({
            overview: {
                totalProjects: 12,
                projectChange: 8.5,
                activeProjects: 8,
                completedTasks: 156,
                taskChange: 12.3,
                teamMembers: 24,
                memberChange: 4.2,
                avgCompletion: 87,
                completionChange: 5.1
            },
            projectPerformance: [
                { name: 'E-commerce Platform', completion: 92, tasks: 45, onTime: true },
                { name: 'Mobile App Redesign', completion: 78, tasks: 32, onTime: true },
                { name: 'Data Analytics Dashboard', completion: 65, tasks: 28, onTime: false },
                { name: 'Marketing Website', completion: 45, tasks: 18, onTime: true }
            ],
            tasksByStatus: {
                todo: 24,
                inProgress: 18,
                review: 12,
                done: 156
            },
            tasksByPriority: {
                high: 15,
                medium: 32,
                low: 19
            },
            recentActivity: [
                { date: '2024-11-08', tasks: 12, projects: 3 },
                { date: '2024-11-07', tasks: 15, projects: 4 },
                { date: '2024-11-06', tasks: 8, projects: 2 },
                { date: '2024-11-05', tasks: 18, projects: 5 }
            ]
        });
    }, [timeRange]);

    if (!stats) return <div className="loading">Loading analytics...</div>;

    return (
        <div className="analytics-page">
            <div className="analytics-header">
                <div>
                    <h1>Analytics & Reports</h1>
                    <p>Project analytics, performance metrics, and detailed reports.</p>
                </div>
                <select
                    className="time-range-select"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="quarter">Last Quarter</option>
                    <option value="year">Last Year</option>
                </select>
            </div>

            {/* Overview Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#eff6ff' }}>
                        <BarChart3 size={24} style={{ color: '#3b82f6' }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Projects</p>
                        <h3 className="stat-value">{stats.overview.totalProjects}</h3>
                        <div className="stat-change positive">
                            <TrendingUp size={14} />
                            <span>{stats.overview.projectChange}% from last period</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#f0fdf4' }}>
                        <CheckCircle2 size={24} style={{ color: '#10b981' }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Completed Tasks</p>
                        <h3 className="stat-value">{stats.overview.completedTasks}</h3>
                        <div className="stat-change positive">
                            <TrendingUp size={14} />
                            <span>{stats.overview.taskChange}% from last period</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#fef3c7' }}>
                        <Users size={24} style={{ color: '#f59e0b' }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Team Members</p>
                        <h3 className="stat-value">{stats.overview.teamMembers}</h3>
                        <div className="stat-change positive">
                            <TrendingUp size={14} />
                            <span>{stats.overview.memberChange}% from last period</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#f3e8ff' }}>
                        <Activity size={24} style={{ color: '#a855f7' }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Avg Completion Rate</p>
                        <h3 className="stat-value">{stats.overview.avgCompletion}%</h3>
                        <div className="stat-change positive">
                            <TrendingUp size={14} />
                            <span>{stats.overview.completionChange}% from last period</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="analytics-content">
                {/* Project Performance */}
                <div className="analytics-section">
                    <div className="section-header">
                        <h2>Project Performance</h2>
                        <p>Track project progress, completion rates, and team productivity</p>
                    </div>
                    <div className="project-performance-list">
                        {stats.projectPerformance.map((project, index) => (
                            <div key={index} className="performance-item">
                                <div className="performance-info">
                                    <h4>{project.name}</h4>
                                    <div className="performance-meta">
                                        <span>{project.tasks} tasks</span>
                                        <span className={project.onTime ? 'on-time' : 'delayed'}>
                                            {project.onTime ? 'On Track' : 'Delayed'}
                                        </span>
                                    </div>
                                </div>
                                <div className="performance-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${project.completion}%`,
                                                backgroundColor: project.completion >= 70 ? '#10b981' : '#f59e0b'
                                            }}
                                        ></div>
                                    </div>
                                    <span className="progress-label">{project.completion}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tasks Distribution */}
                <div className="analytics-grid">
                    <div className="analytics-section">
                        <div className="section-header">
                            <h2>Tasks by Status</h2>
                            <p>Current task distribution</p>
                        </div>
                        <div className="chart-placeholder">
                            <div className="task-status-chart">
                                {Object.entries(stats.tasksByStatus).map(([status, count]) => (
                                    <div key={status} className="status-bar">
                                        <div className="status-info">
                                            <span className={`status-label ${status}`}>
                                                {status === 'todo' ? 'To Do' :
                                                    status === 'inProgress' ? 'In Progress' :
                                                        status === 'review' ? 'Review' : 'Done'}
                                            </span>
                                            <span className="status-count">{count}</span>
                                        </div>
                                        <div className="status-progress">
                                            <div
                                                className={`status-fill ${status}`}
                                                style={{
                                                    width: `${(count / 210) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="analytics-section">
                        <div className="section-header">
                            <h2>Priority Distribution</h2>
                            <p>Tasks by priority level</p>
                        </div>
                        <div className="chart-placeholder">
                            <div className="priority-chart">
                                {Object.entries(stats.tasksByPriority).map(([priority, count]) => (
                                    <div key={priority} className="priority-item">
                                        <div className={`priority-badge ${priority}`}>
                                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                        </div>
                                        <div className="priority-bar">
                                            <div
                                                className={`priority-fill ${priority}`}
                                                style={{
                                                    width: `${(count / 66) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="priority-count">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Tracking */}
                <div className="analytics-section">
                    <div className="section-header">
                        <h2>Time Tracking</h2>
                        <p>Detailed time logs and resource allocation analysis</p>
                    </div>
                    <div className="time-tracking-grid">
                        <div className="time-card">
                            <Clock size={32} style={{ color: '#3b82f6' }} />
                            <h3>Total Hours Logged</h3>
                            <p className="time-value">1,248 hrs</p>
                            <span className="time-period">This month</span>
                        </div>
                        <div className="time-card">
                            <CalendarIcon size={32} style={{ color: '#10b981' }} />
                            <h3>Avg Hours per Day</h3>
                            <p className="time-value">42 hrs</p>
                            <span className="time-period">Across all projects</span>
                        </div>
                        <div className="time-card">
                            <AlertCircle size={32} style={{ color: '#f59e0b' }} />
                            <h3>Overtime Hours</h3>
                            <p className="time-value">156 hrs</p>
                            <span className="time-period">This month</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;

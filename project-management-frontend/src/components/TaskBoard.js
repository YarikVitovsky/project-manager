import React, { useState, useEffect, useRef } from 'react';
import {
    Plus,
    Search,
    Filter,
    Check,
    User,
    Calendar,
    Clock,
    CheckCircle2,
    Circle,
    AlertCircle
} from 'lucide-react';
import './TaskBoard.css';

const TaskBoard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState('all');
    const [taskColumns, setTaskColumns] = useState(null);
    const [projects, setProjects] = useState(['All Projects']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentColumn, setCurrentColumn] = useState('todo');

    // Fetch tasks from backend
    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:5000/api/tasks');
            if (!res.ok) throw new Error('Failed to fetch tasks');
            const data = await res.json();
            setTaskColumns(data);

            // Extract unique project names
            const allTasks = Object.values(data).flatMap(col => col.tasks);
            const uniqueProjects = Array.from(new Set(allTasks.map(t => t.project).filter(p => p)));
            setProjects(['All Projects', ...uniqueProjects]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchTasks();
    }, []);

    // Add new task
    const handleAddTask = async (taskData) => {
        try {
            const res = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            if (!res.ok) throw new Error('Failed to create task');
            await fetchTasks();
            setShowAddModal(false);
        } catch (err) {
            alert('Error creating task: ' + err.message);
        }
    };

    // Update task
    const handleUpdateTask = async (taskId, updates) => {
        try {
            const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Failed to update task');
            await fetchTasks();
            setShowEditModal(false);
            setCurrentTask(null);
        } catch (err) {
            alert('Error updating task: ' + err.message);
        }
    };

    // Delete task
    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete task');
            await fetchTasks();
        } catch (err) {
            alert('Error deleting task: ' + err.message);
        }
    };

    // Open edit modal
    const openEditModal = (task, columnKey) => {
        setCurrentTask({ ...task, status: columnKey });
        setShowEditModal(true);
    };

    const oldTaskColumns = {
        'todo': {
            title: 'To Do',
            color: '#6b7280',
            tasks: [
                {
                    id: 1,
                    title: 'Design user authentication flow',
                    description: 'Create wireframes and mockups for login/signup process',
                    project: 'E-commerce Platform',
                    assignee: 'Sarah Wilson',
                    dueDate: '2024-11-10',
                    priority: 'high',
                    tags: ['Design', 'UX']
                },
                {
                    id: 2,
                    title: 'Setup project repository',
                    description: 'Initialize Git repo and basic project structure',
                    project: 'Mobile App Redesign',
                    assignee: 'David Brown',
                    dueDate: '2024-11-08',
                    priority: 'medium',
                    tags: ['Setup', 'Git']
                },
                {
                    id: 3,
                    title: 'Research competitors',
                    description: 'Analyze competitor features and pricing strategies',
                    project: 'E-commerce Platform',
                    assignee: 'John Doe',
                    dueDate: '2024-11-12',
                    priority: 'low',
                    tags: ['Research']
                }
            ]
        },
        'in-progress': {
            title: 'In Progress',
            color: '#3b82f6',
            tasks: [
                {
                    id: 4,
                    title: 'Implement user dashboard',
                    description: 'Build the main dashboard with charts and statistics',
                    project: 'Data Analytics Dashboard',
                    assignee: 'Alex Turner',
                    dueDate: '2024-11-15',
                    priority: 'high',
                    tags: ['Frontend', 'React']
                },
                {
                    id: 5,
                    title: 'API integration',
                    description: 'Connect frontend with backend API endpoints',
                    project: 'Mobile App Redesign',
                    assignee: 'Emma Davis',
                    dueDate: '2024-11-18',
                    priority: 'medium',
                    tags: ['API', 'Integration']
                }
            ]
        },
        'review': {
            title: 'In Review',
            color: '#f59e0b',
            tasks: [
                {
                    id: 6,
                    title: 'Code review - Payment module',
                    description: 'Review payment processing implementation',
                    project: 'E-commerce Platform',
                    assignee: 'Mike Johnson',
                    dueDate: '2024-11-09',
                    priority: 'high',
                    tags: ['Review', 'Payment']
                },
                {
                    id: 7,
                    title: 'Testing user flows',
                    description: 'Test all user interaction flows and edge cases',
                    project: 'Data Analytics Dashboard',
                    assignee: 'Lisa Chen',
                    dueDate: '2024-11-11',
                    priority: 'medium',
                    tags: ['Testing', 'QA']
                }
            ]
        },
        'done': {
            title: 'Done',
            color: '#10b981',
            tasks: [
                {
                    id: 8,
                    title: 'Database schema design',
                    description: 'Design and implement the database structure',
                    project: 'E-commerce Platform',
                    assignee: 'Tom Wilson',
                    dueDate: '2024-11-05',
                    priority: 'high',
                    tags: ['Database', 'Backend']
                },
                {
                    id: 9,
                    title: 'Logo design',
                    description: 'Create brand logo and visual identity',
                    project: 'Mobile App Redesign',
                    assignee: 'Jenny Adams',
                    dueDate: '2024-11-03',
                    priority: 'low',
                    tags: ['Design', 'Branding']
                }
            ]
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high': return <AlertCircle size={12} className="priority-high" />;
            case 'medium': return <Clock size={12} className="priority-medium" />;
            case 'low': return <Circle size={12} className="priority-low" />;
            default: return null;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const diffTime = date - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        return `${diffDays} days`;
    };

    const isOverdue = (dateString) => {
        return new Date(dateString) < new Date();
    };

    return (
        <div className="task-board">
            <div className="task-board-header">
                <div className="header-left">
                    <h1>Task Board</h1>
                    <p>Organize and track tasks across all projects</p>
                </div>
                <button className="btn btn-primary" onClick={() => { setCurrentColumn('todo'); setShowAddModal(true); }}>
                    <Plus size={16} />
                    Add Task
                </button>
            </div>

            <div className="task-controls">
                <div className="search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-box">
                    <Filter size={16} />
                    <select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        className="filter-select"
                    >
                        {projects.map(project => (
                            <option key={project} value={project === 'All Projects' ? 'all' : project}>
                                {project}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && <div className="loading">Loading tasks...</div>}
            {error && <div className="error">Error: {error}</div>}

            {taskColumns && (
                <div className="kanban-board">
                    {Object.entries(taskColumns).map(([columnId, column]) => (
                        <div key={columnId} className="kanban-column">
                            <div className="column-header">
                                <div className="column-title">
                                    <div
                                        className="column-indicator"
                                        style={{ backgroundColor: column.color }}
                                    ></div>
                                    <h3>{column.title}</h3>
                                    <span className="task-count">{column.tasks.length}</span>
                                </div>
                            </div>

                            <div className="tasks-container">
                                {column.tasks
                                    .filter(task => {
                                        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            task.description.toLowerCase().includes(searchTerm.toLowerCase());
                                        const matchesProject = selectedProject === 'all' || task.project === selectedProject;
                                        return matchesSearch && matchesProject;
                                    })
                                    .map(task => (
                                        <div key={task.id} className="task-card" onClick={() => openEditModal(task, columnId)}>
                                            <div className="task-header">
                                                <div className="task-priority">
                                                    {getPriorityIcon(task.priority)}
                                                </div>
                                                <button
                                                    className="task-complete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteTask(task.id);
                                                    }}
                                                >
                                                    <Check size={16} />
                                                </button>
                                            </div>

                                            <h4 className="task-title">{task.title}</h4>
                                            <p className="task-description">{task.description}</p>

                                            <div className="task-tags">
                                                {task.tags && task.tags.map(tag => (
                                                    <span key={tag} className="task-tag">{tag}</span>
                                                ))}
                                            </div>

                                            <div className="task-footer">
                                                <div className="task-meta">
                                                    <span className="task-project">{task.project}</span>
                                                    <span className={`task-due ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
                                                        <Calendar size={12} />
                                                        {formatDate(task.dueDate)}
                                                    </span>
                                                </div>

                                                <div className="task-assignee" title={task.assignee}>
                                                    <User size={14} />
                                                    <span>{task.assignee.split(' ')[0]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                <button className="add-task-btn" onClick={() => { setCurrentColumn(columnId); setShowAddModal(true); }}>
                                    <Plus size={16} />
                                    Add task
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Task Modal */}
            {showAddModal && (
                <TaskModal
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddTask}
                    status={currentColumn}
                />
            )}

            {/* Edit Task Modal */}
            {showEditModal && currentTask && (
                <TaskModal
                    task={currentTask}
                    onClose={() => { setShowEditModal(false); setCurrentTask(null); }}
                    onSave={(updates) => handleUpdateTask(currentTask.id, updates)}
                    onDelete={() => handleDeleteTask(currentTask.id)}
                    status={currentTask.status}
                />
            )}
        </div>
    );
};

// Task Modal Component
const TaskModal = ({ task, onClose, onSave, onDelete, status }) => {
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        project: task?.project || '',
        assignee: task?.assignee || '',
        dueDate: task?.dueDate || '',
        priority: task?.priority || 'medium',
        tags: task?.tags?.join(', ') || '',
        status: task?.status || status
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
        };
        onSave(dataToSave);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Project</label>
                            <input
                                type="text"
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Assignee</label>
                            <input
                                type="text"
                                name="assignee"
                                value={formData.assignee}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="review">In Review</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Tags (comma-separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g., Design, UX, Frontend"
                        />
                    </div>
                    <div className="modal-actions">
                        {task && onDelete && (
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                    onDelete();
                                    onClose();
                                }}
                            >
                                Delete
                            </button>
                        )}
                        <div className="modal-actions-right">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {task ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskBoard;
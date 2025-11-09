import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, Grid, List, Plus } from 'lucide-react';
import ProjectCard from './ProjectCard';
import API_URL from '../config/api';
import './ProjectList.css';

const ProjectList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'blue';
            case 'review': return 'orange';
            case 'completed': return 'green';
            case 'on-hold': return 'gray';
            default: return 'gray';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'red';
            case 'medium': return 'yellow';
            case 'low': return 'green';
            default: return 'gray';
        }
    };


    // Check if URL has ?new=true parameter to open create modal
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('new') === 'true') {
            setShowCreateForm(true);
            // Clean up URL
            navigate('/projects', { replace: true });
        }
    }, [location.search, navigate]);

    // Fetch projects from backend
    useEffect(() => {
        fetch(`${API_URL}/projects`)
            .then(response => response.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setLoading(false);
            });
    }, []);

    const handleCreateProject = async (projectData) => {
        try {
            const response = await fetch(`${API_URL}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData)
            });

            const result = await response.json();

            setProjects([...projects, result.project]);
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setShowEditForm(true);
    };

    const handleUpdateProject = async (projectData) => {
        try {
            const response = await fetch(`${API_URL}/projects/${editingProject.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData)
            });

            const result = await response.json();

            // Update the project in the list
            setProjects(projects.map(p => p.id === editingProject.id ? result.project : p));
            setShowEditForm(false);
            setEditingProject(null);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleDeleteProject = async (project) => {
        if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
            try {
                const response = await fetch(`${API_URL}/projects/${project.id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setProjects(projects.filter(p => p.id !== project.id));
                }
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    const handleViewDetails = (project) => {
        console.log('View details:', project);
        setSelectedProject(project);
        setShowDetailsModal(true);
    };


    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const statusOptions = [
        { value: 'all', label: 'All Projects' },
        { value: 'active', label: 'Active' },
        { value: 'review', label: 'In Review' },
        { value: 'completed', label: 'Completed' },
        { value: 'on-hold', label: 'On Hold' }
    ];

    return (
        <div className="project-list">
            <div className="project-list-header">
                <div className="header-left">
                    <h1>Projects</h1>
                    <p>Manage and track all your team projects</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowCreateForm(true)}
                >
                    <Plus size={16} />
                    New Project
                </button>
            </div>

            <div className="project-controls">
                <div className="controls-left">
                    <div className="search-box">
                        <Search size={16} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-box">
                        <Filter size={16} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="view-controls">
                    <button
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <Grid size={16} />
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        <List size={16} />
                    </button>
                </div>
            </div>

            <div className="project-stats">
                <div className="stat-item">
                    <span className="stat-number">{projects.length}</span>
                    <span className="stat-label">Total Projects</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{projects.filter(p => p.status === 'active').length}</span>
                    <span className="stat-label">Active</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{projects.filter(p => p.status === 'completed').length}</span>
                    <span className="stat-label">Completed</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">
                        {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
                    </span>
                    <span className="stat-label">Avg Progress</span>
                </div>
            </div>

            <div className={`projects-container ${viewMode}`}>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            viewMode={viewMode}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                            onViewDetails={handleViewDetails}
                        />
                    ))
                ) : (
                    <div className="no-projects">
                        <h3>No projects found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
            {showCreateForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Create New Project</h2>
                            <button
                                type="button"
                                className="modal-close"
                                onClick={() => setShowCreateForm(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form className="project-form" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            handleCreateProject({
                                name: formData.get('name'),
                                description: formData.get('description'),
                                priority: formData.get('priority'),
                                dueDate: formData.get('dueDate'),
                                status: 'planning'
                            });
                        }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Project Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    placeholder="Enter project name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-textarea"
                                    placeholder="Enter project description"
                                    rows="4"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="priority">Priority</label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        className="form-select"
                                        defaultValue="medium"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="dueDate">Due Date</label>
                                    <input
                                        id="dueDate"
                                        name="dueDate"
                                        type="date"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowCreateForm(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Create Project
                                </button>


                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showEditForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Edit Project</h2>
                            <button
                                type="button"
                                className="modal-close"
                                onClick={() => setShowEditForm(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form className="project-form" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            handleUpdateProject({
                                name: formData.get('name'),
                                description: formData.get('description'),
                                priority: formData.get('priority'),
                                dueDate: formData.get('dueDate'),
                                status: formData.get('status')
                            });
                        }}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="edit-name">Project Name</label>
                                <input
                                    id="edit-name"
                                    name="name"
                                    className="form-input"
                                    placeholder="Enter project name"
                                    defaultValue={editingProject?.name || ''}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="edit-description">Description</label>
                                <textarea
                                    id="edit-description"
                                    name="description"
                                    className="form-textarea"
                                    placeholder="Enter project description"
                                    defaultValue={editingProject?.description || ''}
                                    rows="4"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="edit-priority">Priority</label>
                                    <select
                                        id="edit-priority"
                                        name="priority"
                                        className="form-select"
                                        defaultValue={editingProject?.priority || 'medium'}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="edit-dueDate">Due Date</label>
                                    <input
                                        id="edit-dueDate"
                                        name="dueDate"
                                        type="date"
                                        className="form-input"
                                        defaultValue={editingProject?.dueDate || ''}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="edit-status">Status</label>
                                <select
                                    id="edit-status"
                                    name="status"
                                    className="form-select"
                                    defaultValue={editingProject?.status || 'planning'}
                                >
                                    <option value="planning">Planning</option>
                                    <option value="active">Active</option>
                                    <option value="review">In Review</option>
                                    <option value="completed">Completed</option>
                                    <option value="on-hold">On Hold</option>
                                </select>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowEditForm(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Update Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showDetailsModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Project Details</h2>
                            <button
                                type="button"
                                className="modal-close"
                                onClick={() => setShowDetailsModal(false)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="project-details">
                            <div className="detail-group">
                                <label className="detail-label">Project Name</label>
                                <p className="detail-value">{selectedProject?.name}</p>
                            </div>

                            <div className="detail-group">
                                <label className="detail-label">Description</label>
                                <p className="detail-value">{selectedProject?.description}</p>
                            </div>

                            <div className="detail-row">
                                <div className="detail-group">
                                    <label className="detail-label">Status</label>
                                    <span className={`badge badge-${getStatusColor(selectedProject?.status)}`}>
                                        {selectedProject?.status}
                                    </span>
                                </div>

                                <div className="detail-group">
                                    <label className="detail-label">Priority</label>
                                    <span className={`badge badge-${getPriorityColor(selectedProject?.priority)}`}>
                                        {selectedProject?.priority}
                                    </span>
                                </div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-group">
                                    <label className="detail-label">Due Date</label>
                                    <p className="detail-value">{selectedProject?.dueDate}</p>
                                </div>

                                <div className="detail-group">
                                    <label className="detail-label">Progress</label>
                                    <p className="detail-value">{selectedProject?.progress}%</p>
                                </div>
                            </div>

                            <div className="detail-group">
                                <label className="detail-label">Team Members</label>
                                <div className="team-list">
                                    {selectedProject?.team?.map((member, index) => (
                                        <span key={index} className="team-member">
                                            {member}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-group">
                                    <label className="detail-label">Tasks Completed</label>
                                    <p className="detail-value">{selectedProject?.tasksCompleted} / {selectedProject?.tasksTotal}</p>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setShowDetailsModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default ProjectList;
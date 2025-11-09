import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Users, MoreHorizontal } from 'lucide-react';
import './ProjectCard.css';

const ProjectCard = ({ project, onEdit, onDelete, onViewDetails }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const handleMenuClick = (action) => {
        // console.log(`${action} clicked for project:`, project.id);
        setShowDropdown(false);

        switch (action) {
            case 'edit':
                onEdit && onEdit(project);
                break;
            case 'delete':
                onDelete && onDelete(project);
                break;
            case 'details':
                onViewDetails && onViewDetails(project);
                break;
            default:
                break;
        }
    };

    return (
        <div className="project-card">
            <div className="project-header">
                <div className="project-title">
                    <h3>{project.name}</h3>
                    <div className="menu-container" ref={dropdownRef}>
                        <button
                            className="menu-btn"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <MoreHorizontal size={16} />
                        </button>

                        {showDropdown && (
                            <div className="dropdown-menu">
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleMenuClick('edit')}
                                >
                                    Edit Project
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleMenuClick('details')}
                                >
                                    View Details
                                </button>
                                <button
                                    className="dropdown-item delete"
                                    onClick={() => handleMenuClick('delete')}
                                >
                                    Delete Project
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="project-badges">
                    <span className={`badge badge-${getStatusColor(project.status)}`}>
                        {project.status}
                    </span>
                    <span className={`badge badge-${getPriorityColor(project.priority)}`}>
                        {project.priority}
                    </span>
                </div>
            </div>

            <div className="project-progress">
                <div className="progress-header">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="project-footer">
                <div className="project-meta">
                    <div className="project-due">
                        <Calendar size={14} />
                        <span>Due {formatDate(project.dueDate)}</span>
                    </div>
                    <div className="project-team">
                        <Users size={14} />
                        <span>{project.team.length} members</span>
                    </div>
                </div>

                <div className="team-avatars">
                    {project.team.slice(0, 3).map((member, index) => (
                        <div key={index} className="team-avatar" title={member}>
                            {member.charAt(0)}
                        </div>
                    ))}
                    {project.team.length > 3 && (
                        <div className="team-avatar more">
                            +{project.team.length - 3}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
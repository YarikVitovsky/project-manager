import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Mail,
    Phone,
    MoreVertical,
    Edit2,
    Trash2,
    UserPlus,
    Shield,
    User,
    MessageSquare,
    Video,
    Users
} from 'lucide-react';
import './Team.css';

const Team = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentMember, setCurrentMember] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch team members from backend
    const fetchTeamMembers = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/team');
            if (!res.ok) throw new Error('Failed to fetch team members');
            const data = await res.json();
            setTeamMembers(data);
        } catch (err) {
            console.error('Error fetching team:', err);
            // Set some default members if backend not ready
            setTeamMembers([
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@projecthub.com',
                    phone: '+1 (555) 123-4567',
                    role: 'Project Manager',
                    avatar: 'JD',
                    status: 'active'
                },
                {
                    id: 2,
                    name: 'Sarah Wilson',
                    email: 'sarah.wilson@projecthub.com',
                    phone: '+1 (555) 234-5678',
                    role: 'UX Designer',
                    avatar: 'SW',
                    status: 'active'
                },
                {
                    id: 3,
                    name: 'David Brown',
                    email: 'david.brown@projecthub.com',
                    phone: '+1 (555) 345-6789',
                    role: 'Developer',
                    avatar: 'DB',
                    status: 'active'
                },
                {
                    id: 4,
                    name: 'Emma Davis',
                    email: 'emma.davis@projecthub.com',
                    phone: '+1 (555) 456-7890',
                    role: 'Developer',
                    avatar: 'ED',
                    status: 'active'
                },
                {
                    id: 5,
                    name: 'Mike Johnson',
                    email: 'mike.johnson@projecthub.com',
                    phone: '+1 (555) 567-8901',
                    role: 'QA Engineer',
                    avatar: 'MJ',
                    status: 'active'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const handleAddMember = async (memberData) => {
        try {
            const res = await fetch('http://localhost:5000/api/team', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memberData)
            });
            if (!res.ok) throw new Error('Failed to add member');
            await fetchTeamMembers();
            setShowAddModal(false);
        } catch (err) {
            alert('Error adding member: ' + err.message);
        }
    };

    const handleUpdateMember = async (memberId, updates) => {
        try {
            const res = await fetch(`http://localhost:5000/api/team/${memberId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error('Failed to update member');
            await fetchTeamMembers();
            setShowEditModal(false);
        } catch (err) {
            alert('Error updating member: ' + err.message);
        }
    };

    const handleDeleteMember = async (memberId) => {
        if (!window.confirm('Are you sure you want to remove this team member?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/team/${memberId}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete member');
            await fetchTeamMembers();
        } catch (err) {
            alert('Error deleting member: ' + err.message);
        }
    };

    const openEditModal = (member) => {
        setCurrentMember(member);
        setShowEditModal(true);
    };

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="team-page">
            <div className="team-header">
                <div>
                    <h1>Team Management</h1>
                    <p>Team member management and collaboration tools will be implemented here.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                    <UserPlus size={18} />
                    Add Member
                </button>
            </div>

            <div className="team-content">
                {/* Team Directory Section */}
                <div className="team-section">
                    <div className="section-header">
                        <div>
                            <h2>Team Directory</h2>
                            <p>View and manage team members, roles, and permissions</p>
                        </div>
                        <div className="search-box">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search members..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="members-grid">
                        {filteredMembers.map(member => (
                            <div key={member.id} className="member-card">
                                <div className="member-header">
                                    <div className="member-avatar">{member.avatar}</div>
                                </div>
                                <div className="member-info">
                                    <h3>{member.name}</h3>
                                    <span className="member-role">{member.role}</span>
                                </div>
                                <div className="member-contact">
                                    <div className="contact-item">
                                        <Mail size={14} />
                                        <span>{member.email}</span>
                                    </div>
                                    <div className="contact-item">
                                        <Phone size={14} />
                                        <span>{member.phone}</span>
                                    </div>
                                </div>
                                <div className="member-actions">
                                    <button className="btn-secondary" onClick={() => openEditModal(member)}>
                                        <Edit2 size={14} />
                                        Edit
                                    </button>
                                    <button
                                        className="btn-danger"
                                        onClick={() => handleDeleteMember(member.id)}
                                    >
                                        <Trash2 size={14} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Collaboration Tools Section */}
                <div className="team-section">
                    <div className="section-header">
                        <div>
                            <h2>Collaboration Tools</h2>
                            <p>Chat, video calls, and real-time collaboration features</p>
                        </div>
                    </div>

                    <div className="collaboration-grid">
                        <div className="collab-card">
                            <div className="collab-icon" style={{ backgroundColor: '#3b82f6' }}>
                                <MessageSquare size={24} />
                            </div>
                            <h3>Team Chat</h3>
                            <p>Real-time messaging with your team members</p>
                            <button className="btn-secondary">Open Chat</button>
                        </div>

                        <div className="collab-card">
                            <div className="collab-icon" style={{ backgroundColor: '#10b981' }}>
                                <Video size={24} />
                            </div>
                            <h3>Video Calls</h3>
                            <p>Start or join video meetings with your team</p>
                            <button className="btn-secondary">Start Call</button>
                        </div>

                        <div className="collab-card">
                            <div className="collab-icon" style={{ backgroundColor: '#f59e0b' }}>
                                <Users size={24} />
                            </div>
                            <h3>Team Workspace</h3>
                            <p>Shared workspace for collaborative projects</p>
                            <button className="btn-secondary">Open Workspace</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Member Modal */}
            {showAddModal && (
                <MemberModal
                    title="Add Team Member"
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddMember}
                />
            )}

            {/* Edit Member Modal */}
            {showEditModal && (
                <MemberModal
                    title="Edit Team Member"
                    member={currentMember}
                    onClose={() => setShowEditModal(false)}
                    onSave={(data) => handleUpdateMember(currentMember.id, data)}
                    onDelete={() => handleDeleteMember(currentMember.id)}
                />
            )}
        </div>
    );
};

// Member Modal Component
const MemberModal = ({ title, member, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState({
        name: member?.name || '',
        email: member?.email || '',
        phone: member?.phone || '',
        role: member?.role || '',
        avatar: member?.avatar || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.role) {
            alert('Please fill in all required fields');
            return;
        }
        onSave(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="email@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>

                    <div className="form-group">
                        <label>Role *</label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            placeholder="e.g., Developer, Designer"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Avatar Initials</label>
                        <input
                            type="text"
                            value={formData.avatar}
                            onChange={(e) => setFormData({ ...formData, avatar: e.target.value.toUpperCase() })}
                            placeholder="e.g., JD"
                            maxLength={2}
                        />
                    </div>

                    <div className="modal-actions">
                        {onDelete && (
                            <button
                                type="button"
                                className="btn-danger"
                                onClick={() => {
                                    onDelete();
                                    onClose();
                                }}
                            >
                                Delete
                            </button>
                        )}
                        <div className="modal-actions-right">
                            <button type="button" className="btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary">
                                {member ? 'Update' : 'Add'} Member
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Team;

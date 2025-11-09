import React, { useState } from 'react';
import {
    User,
    Bell,
    Lock,
    Globe,
    Moon,
    Eye,
    Shield,
    Smartphone,
    Mail,
    Save,
    Users,
    Briefcase
} from 'lucide-react';
import './Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('account');
    const [settings, setSettings] = useState({
        // Account Settings
        name: 'John Doe',
        email: 'john.doe@projecthub.com',
        role: 'Project Manager',
        phone: '+1 (555) 123-4567',

        // Notification Settings
        emailNotifications: true,
        pushNotifications: true,
        taskUpdates: true,
        projectUpdates: true,
        teamMentions: true,
        weeklyDigest: false,

        // Appearance Settings
        theme: 'light',
        language: 'en',
        timezone: 'UTC-5',

        // Privacy Settings
        profileVisibility: 'team',
        showEmail: false,
        showPhone: false,

        // Workspace Settings
        workspaceName: 'My Workspace',
        defaultProject: 'none',
        taskView: 'board'
    });

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    const handleChange = (key, value) => {
        setSettings({ ...settings, [key]: value });
    };

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1>Settings</h1>
                <p>Application settings, user preferences, and workspace configuration.</p>
            </div>

            <div className="settings-content">
                <div className="settings-sidebar">
                    <button
                        className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
                        onClick={() => setActiveTab('account')}
                    >
                        <User size={18} />
                        Account Settings
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <Bell size={18} />
                        Notifications
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appearance')}
                    >
                        <Moon size={18} />
                        Appearance
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'privacy' ? 'active' : ''}`}
                        onClick={() => setActiveTab('privacy')}
                    >
                        <Shield size={18} />
                        Privacy & Security
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'workspace' ? 'active' : ''}`}
                        onClick={() => setActiveTab('workspace')}
                    >
                        <Briefcase size={18} />
                        Workspace Settings
                    </button>
                </div>

                <div className="settings-main">
                    {/* Account Settings */}
                    {activeTab === 'account' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Account Settings</h2>
                                <p>Manage your profile, notifications, and security settings</p>
                            </div>

                            <div className="settings-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        value={settings.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        value={settings.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={settings.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Role</label>
                                    <input
                                        type="text"
                                        value={settings.role}
                                        onChange={(e) => handleChange('role', e.target.value)}
                                    />
                                </div>

                                <div className="form-actions">
                                    <button className="btn-primary" onClick={handleSave}>
                                        <Save size={16} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            <div className="settings-divider"></div>

                            <div className="section-header">
                                <h3>Change Password</h3>
                                <p>Update your password to keep your account secure</p>
                            </div>

                            <div className="settings-form">
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input type="password" placeholder="Enter current password" />
                                </div>

                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" placeholder="Enter new password" />
                                </div>

                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input type="password" placeholder="Confirm new password" />
                                </div>

                                <div className="form-actions">
                                    <button className="btn-secondary">Update Password</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Settings */}
                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Notification Preferences</h2>
                                <p>Choose how you want to be notified about updates</p>
                            </div>

                            <div className="settings-list">
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <Mail size={20} />
                                        <div>
                                            <h4>Email Notifications</h4>
                                            <p>Receive updates via email</p>
                                        </div>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={settings.emailNotifications}
                                            onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <Smartphone size={20} />
                                        <div>
                                            <h4>Push Notifications</h4>
                                            <p>Receive push notifications on your devices</p>
                                        </div>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={settings.pushNotifications}
                                            onChange={(e) => handleChange('pushNotifications', e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <Bell size={20} />
                                        <div>
                                            <h4>Task Updates</h4>
                                            <p>Get notified when tasks are updated</p>
                                        </div>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={settings.taskUpdates}
                                            onChange={(e) => handleChange('taskUpdates', e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <Briefcase size={20} />
                                        <div>
                                            <h4>Project Updates</h4>
                                            <p>Get notified about project changes</p>
                                        </div>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={settings.projectUpdates}
                                            onChange={(e) => handleChange('projectUpdates', e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <Users size={20} />
                                        <div>
                                            <h4>Team Mentions</h4>
                                            <p>Get notified when someone mentions you</p>
                                        </div>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={settings.teamMentions}
                                            onChange={(e) => handleChange('teamMentions', e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <Mail size={20} />
                                        <div>
                                            <h4>Weekly Digest</h4>
                                            <p>Receive a weekly summary email</p>
                                        </div>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={settings.weeklyDigest}
                                            onChange={(e) => handleChange('weeklyDigest', e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Appearance Settings */}
                    {activeTab === 'appearance' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Appearance & Display</h2>
                                <p>Customize how ProjectHub looks and feels</p>
                            </div>

                            <div className="settings-form">
                                <div className="form-group">
                                    <label>Theme</label>
                                    <select
                                        value={settings.theme}
                                        onChange={(e) => handleChange('theme', e.target.value)}
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                        <option value="auto">Auto (System)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Language</label>
                                    <select
                                        value={settings.language}
                                        onChange={(e) => handleChange('language', e.target.value)}
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Timezone</label>
                                    <select
                                        value={settings.timezone}
                                        onChange={(e) => handleChange('timezone', e.target.value)}
                                    >
                                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                                        <option value="UTC-6">Central Time (UTC-6)</option>
                                        <option value="UTC-7">Mountain Time (UTC-7)</option>
                                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                                    </select>
                                </div>

                                <div className="form-actions">
                                    <button className="btn-primary" onClick={handleSave}>
                                        <Save size={16} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Privacy Settings */}
                    {activeTab === 'privacy' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Privacy & Security</h2>
                                <p>Control your privacy and security preferences</p>
                            </div>

                            <div className="settings-form">
                                <div className="form-group">
                                    <label>Profile Visibility</label>
                                    <select
                                        value={settings.profileVisibility}
                                        onChange={(e) => handleChange('profileVisibility', e.target.value)}
                                    >
                                        <option value="public">Public</option>
                                        <option value="team">Team Only</option>
                                        <option value="private">Private</option>
                                    </select>
                                </div>

                                <div className="form-group-checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={settings.showEmail}
                                            onChange={(e) => handleChange('showEmail', e.target.checked)}
                                        />
                                        Show email address on profile
                                    </label>
                                </div>

                                <div className="form-group-checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={settings.showPhone}
                                            onChange={(e) => handleChange('showPhone', e.target.checked)}
                                        />
                                        Show phone number on profile
                                    </label>
                                </div>

                                <div className="form-actions">
                                    <button className="btn-primary" onClick={handleSave}>
                                        <Save size={16} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Workspace Settings */}
                    {activeTab === 'workspace' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Workspace Settings</h2>
                                <p>Configure workspace preferences and team settings</p>
                            </div>

                            <div className="settings-form">
                                <div className="form-group">
                                    <label>Workspace Name</label>
                                    <input
                                        type="text"
                                        value={settings.workspaceName}
                                        onChange={(e) => handleChange('workspaceName', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Default Project View</label>
                                    <select
                                        value={settings.defaultProject}
                                        onChange={(e) => handleChange('defaultProject', e.target.value)}
                                    >
                                        <option value="none">None</option>
                                        <option value="recent">Most Recent</option>
                                        <option value="active">Active Projects</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Task View</label>
                                    <select
                                        value={settings.taskView}
                                        onChange={(e) => handleChange('taskView', e.target.value)}
                                    >
                                        <option value="board">Board View</option>
                                        <option value="list">List View</option>
                                        <option value="calendar">Calendar View</option>
                                    </select>
                                </div>

                                <div className="form-actions">
                                    <button className="btn-primary" onClick={handleSave}>
                                        <Save size={16} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;

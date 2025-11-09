import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import TaskBoard from './components/TaskBoard';
import Team from './components/Team';
import Analytics from './components/Analytics';
import Calendar from './components/Calendar';
import Settings from './components/Settings';
import './App.css';

function App() {
    const user = {
        name: 'John Doe',
        email: 'john.doe@company.com',
        avatar: null
    };

    return (
        <Router>
            <div className="App">
                <Layout
                    header={<Header user={user} />}
                    sidebar={<Sidebar />}
                >
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/projects" element={<ProjectList />} />
                        <Route path="/tasks" element={<TaskBoard />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Layout>
            </div>
        </Router>
    );
}

export default App;
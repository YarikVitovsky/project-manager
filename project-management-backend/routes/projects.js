const express = require('express');
const router = express.Router();

let projects = [
    {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Building a modern e-commerce solution',
        progress: 75,
        status: 'ACTIVE',
        dueDate: '2024-12-15',
        team: ['John Doe', 'Sarah Wilson'],
        priority: 'high',
        tasksTotal: 24,
        tasksCompleted: 18
    },
    {
        id: 2,
        name: 'Mobile App Redesign',
        description: 'Complete UI/UX overhaul',
        progress: 45,
        status: 'ACTIVE',
        dueDate: '2024-11-30',
        team: ['Emma Davis', 'David Brown'],
        priority: 'medium',
        tasksTotal: 16,
        tasksCompleted: 7
    }
];

router.get('/', (req, res) => {
    res.json(projects);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert string to number
    const project = projects.find(p => p.id === id);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
});

// POST /api/projects - Create new project
router.post('/', (req, res) => {
    const { name, description } = req.body;

    const newProject = {
        id: projects.length + 1,
        name: name,
        description: description || 'No description provided',
        progress: 0,
        status: 'ACTIVE',
        dueDate: new Date().toISOString().split('T')[0], // Today's date
        team: [],
        priority: 'medium',
        tasksTotal: 0,
        tasksCompleted: 0
    };

    projects.push(newProject);

    res.json({
        message: 'Project created successfully!',
        project: newProject,
    });
});

// PATCH /api/projects/:id - Update project
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const project = projects.find(p => p.id === id);

    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    // List of fields that can be updated
    const allowedFields = [
        'name', 'description', 'progress', 'status',
        'dueDate', 'priority', 'team', 'tasksTotal', 'tasksCompleted'
    ];

    // Update only provided fields
    allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            project[field] = req.body[field];
        }
    });

    res.json({
        message: 'Project updated successfully!',
        project: project
    });
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === id)

    if (projectIndex === -1) {
        return res.status(404).json({ message: 'Project not found' });
    }

    projects.splice(projectIndex, 1)

    res.json({
        message: `Project ${id} deleted successfully!`,
        deletedId: id
    });
});

module.exports = router;
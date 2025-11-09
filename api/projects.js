// Vercel Serverless Function for Projects API
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

module.exports = (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Parse URL for specific project ID
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const projectId = pathParts[pathParts.length - 1];
    const isIdRequest = projectId && !isNaN(parseInt(projectId));

    // GET single project by ID
    if (req.method === 'GET' && isIdRequest) {
        const id = parseInt(projectId);
        const project = projects.find(p => p.id === id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(project);
    }

    // GET all projects
    if (req.method === 'GET') {
        return res.status(200).json(projects);
    }

    // POST - Create new project
    if (req.method === 'POST') {
        const { name, description } = req.body;

        const newProject = {
            id: projects.length + 1,
            name: name,
            description: description || 'No description provided',
            progress: 0,
            status: 'ACTIVE',
            dueDate: new Date().toISOString().split('T')[0],
            team: [],
            priority: 'medium',
            tasksTotal: 0,
            tasksCompleted: 0
        };

        projects.push(newProject);

        return res.status(201).json({
            message: 'Project created successfully!',
            project: newProject,
        });
    }

    // PATCH - Update project
    if (req.method === 'PATCH' && isIdRequest) {
        const id = parseInt(projectId);
        const project = projects.find(p => p.id === id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const allowedFields = [
            'name', 'description', 'progress', 'status',
            'dueDate', 'priority', 'team', 'tasksTotal', 'tasksCompleted'
        ];

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                project[field] = req.body[field];
            }
        });

        return res.status(200).json({
            message: 'Project updated successfully!',
            project: project
        });
    }

    // DELETE project
    if (req.method === 'DELETE' && isIdRequest) {
        const id = parseInt(projectId);
        const projectIndex = projects.findIndex(p => p.id === id);

        if (projectIndex === -1) {
            return res.status(404).json({ message: 'Project not found' });
        }

        projects.splice(projectIndex, 1);

        return res.status(200).json({
            message: `Project ${id} deleted successfully!`,
            deletedId: id
        });
    }

    return res.status(405).json({ error: 'Method not allowed' });
};

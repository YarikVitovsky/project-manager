// Vercel Serverless Function for Projects API
let projects = [
    {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Building a modern e-commerce solution',
        status: 'active',
        priority: 'high',
        progress: 65,
        dueDate: '2024-12-31',
        team: ['John Doe', 'Sarah Wilson', 'Alice Brown']
    },
    {
        id: 2,
        name: 'Internal Tools',
        description: 'Development of internal productivity tools',
        status: 'active',
        priority: 'medium',
        progress: 40,
        dueDate: '2024-11-30',
        team: ['Mike Johnson']
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

    if (req.method === 'GET') {
        return res.status(200).json(projects);
    }

    if (req.method === 'POST') {
        const newProject = {
            id: Date.now(),
            ...req.body,
            progress: 0
        };
        projects.push(newProject);
        return res.status(201).json(newProject);
    }

    return res.status(405).json({ error: 'Method not allowed' });
};

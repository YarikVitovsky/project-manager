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

// Netlify serverless function handler
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Handle OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Parse URL for specific project ID
    const pathParts = event.path.split('/').filter(Boolean);
    const projectId = pathParts[pathParts.length - 1];
    const isIdRequest = projectId && !isNaN(parseInt(projectId));

    try {
        // GET single project by ID
        if (event.httpMethod === 'GET' && isIdRequest) {
            const id = parseInt(projectId);
            const project = projects.find(p => p.id === id);
            if (!project) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ message: 'Project not found' })
                };
            }
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(project)
            };
        }

        // GET all projects
        if (event.httpMethod === 'GET') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(projects)
            };
        }

        // POST - Create new project
        if (event.httpMethod === 'POST') {
            const { name, description } = JSON.parse(event.body || '{}');

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

            return {
                statusCode: 201,
                headers,
                body: JSON.stringify({
                    message: 'Project created successfully!',
                    project: newProject,
                })
            };
        }

        // PATCH - Update project
        if (event.httpMethod === 'PATCH' && isIdRequest) {
            const id = parseInt(projectId);
            const project = projects.find(p => p.id === id);

            if (!project) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ message: 'Project not found' })
                };
            }

            const allowedFields = [
                'name', 'description', 'progress', 'status',
                'dueDate', 'priority', 'team', 'tasksTotal', 'tasksCompleted'
            ];

            const updates = JSON.parse(event.body || '{}');
            allowedFields.forEach(field => {
                if (updates[field] !== undefined) {
                    project[field] = updates[field];
                }
            });

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    message: 'Project updated successfully!',
                    project: project
                })
            };
        }

        // DELETE project
        if (event.httpMethod === 'DELETE' && isIdRequest) {
            const id = parseInt(projectId);
            const projectIndex = projects.findIndex(p => p.id === id);

            if (projectIndex === -1) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ message: 'Project not found' })
                };
            }

            projects.splice(projectIndex, 1);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    message: `Project ${id} deleted successfully!`,
                    deletedId: id
                })
            };
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error', message: error.message })
        };
    }
};

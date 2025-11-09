// Vercel Serverless Function for Tasks API
// In-memory task storage (replace with database in production)
const taskColumns = {
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

// Helper for next task ID
let nextTaskId = 10;
const getNextId = () => nextTaskId++;

// Helper to find task by ID across all columns
const findTaskById = (id) => {
    for (const [columnKey, column] of Object.entries(taskColumns)) {
        const task = column.tasks.find(t => t.id === id);
        if (task) return { task, columnKey };
    }
    return null;
};

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

    // Parse URL for specific task ID
    const pathParts = event.path.split('/').filter(Boolean);
    const taskId = pathParts[pathParts.length - 1];
    const isIdRequest = taskId && !isNaN(parseInt(taskId));

    try {
        // GET single task by ID
        if (event.httpMethod === 'GET' && isIdRequest) {
            const result = findTaskById(parseInt(taskId));
            if (!result) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Task not found' })
                };
            }
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(result.task)
            };
        }

        // GET all tasks grouped by status
        if (event.httpMethod === 'GET') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(taskColumns)
            };
        }

        // POST - Create new task
        if (event.httpMethod === 'POST') {
            const { title, description, project, assignee, dueDate, priority, tags, status = 'todo' } = JSON.parse(event.body || '{}');

            if (!title || !description) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Title and description are required' })
                };
            }

            const newTask = {
                id: getNextId(),
                title,
                description,
                project: project || '',
                assignee: assignee || '',
                dueDate: dueDate || '',
                priority: priority || 'medium',
                tags: tags || []
            };

            if (taskColumns[status]) {
                taskColumns[status].tasks.push(newTask);
                return {
                    statusCode: 201,
                    headers,
                    body: JSON.stringify(newTask)
                };
            }

            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid status' })
            };
        }

        // PATCH - Update task
        if (event.httpMethod === 'PATCH' && isIdRequest) {
            const result = findTaskById(parseInt(taskId));
            if (!result) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Task not found' })
                };
            }

            const { task, columnKey } = result;
            const { title, description, project, assignee, dueDate, priority, tags, status } = JSON.parse(event.body || '{}');

            // Update task fields
            if (title !== undefined) task.title = title;
            if (description !== undefined) task.description = description;
            if (project !== undefined) task.project = project;
            if (assignee !== undefined) task.assignee = assignee;
            if (dueDate !== undefined) task.dueDate = dueDate;
            if (priority !== undefined) task.priority = priority;
            if (tags !== undefined) task.tags = tags;

            // If status changed, move task to new column
            if (status && status !== columnKey && taskColumns[status]) {
                const taskIndex = taskColumns[columnKey].tasks.findIndex(t => t.id === task.id);
                taskColumns[columnKey].tasks.splice(taskIndex, 1);
                taskColumns[status].tasks.push(task);
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(task)
            };
        }

        // DELETE task
        if (event.httpMethod === 'DELETE' && isIdRequest) {
            const result = findTaskById(parseInt(taskId));
            if (!result) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Task not found' })
                };
            }

            const { columnKey } = result;
            const taskIndex = taskColumns[columnKey].tasks.findIndex(t => t.id === parseInt(taskId));
            taskColumns[columnKey].tasks.splice(taskIndex, 1);

            return {
                statusCode: 204,
                headers,
                body: ''
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

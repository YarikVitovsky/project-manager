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
                title: 'Set up CI/CD pipeline',
                description: 'Configure automated testing and deployment workflow',
                project: 'Internal Tools',
                assignee: 'Mike Johnson',
                dueDate: '2024-11-12',
                priority: 'medium',
                tags: ['DevOps', 'Automation']
            }
        ]
    },
    'in-progress': {
        title: 'In Progress',
        color: '#3b82f6',
        tasks: [
            {
                id: 3,
                title: 'Implement payment gateway',
                description: 'Integrate Stripe API for payment processing',
                project: 'E-commerce Platform',
                assignee: 'John Doe',
                dueDate: '2024-11-15',
                priority: 'high',
                tags: ['Backend', 'Payment']
            }
        ]
    },
    'review': {
        title: 'Review',
        color: '#f59e0b',
        tasks: [
            {
                id: 4,
                title: 'Database schema design',
                description: 'Design and implement the database structure',
                project: 'E-commerce Platform',
                assignee: 'Alice Brown',
                dueDate: '2024-11-08',
                priority: 'high',
                tags: ['Database', 'Backend']
            }
        ]
    },
    'done': {
        title: 'Done',
        color: '#10b981',
        tasks: [
            {
                id: 5,
                title: 'Project kickoff meeting',
                description: 'Initial meeting with stakeholders',
                project: 'E-commerce Platform',
                assignee: 'Sarah Wilson',
                dueDate: '2024-11-01',
                priority: 'medium',
                tags: ['Meeting', 'Planning']
            }
        ]
    }
};

module.exports = (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        // Get all tasks grouped by status
        return res.status(200).json(taskColumns);
    }

    if (req.method === 'POST') {
        // Create new task
        const { title, description, project, assignee, dueDate, priority, tags, status = 'todo' } = req.body;
        
        const newTask = {
            id: Date.now(),
            title,
            description,
            project,
            assignee,
            dueDate,
            priority,
            tags
        };

        if (taskColumns[status]) {
            taskColumns[status].tasks.push(newTask);
            return res.status(201).json(newTask);
        }
        
        return res.status(400).json({ error: 'Invalid status' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
};

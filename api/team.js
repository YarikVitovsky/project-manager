// Vercel Serverless Function for Team API
let teamMembers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@projecthub.com',
        phone: '+1 (555) 123-4567',
        role: 'Full Stack Developer',
        avatar: 'JD'
    },
    {
        id: 2,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@projecthub.com',
        phone: '+1 (555) 234-5678',
        role: 'UI/UX Designer',
        avatar: 'SW'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@projecthub.com',
        phone: '+1 (555) 345-6789',
        role: 'DevOps Engineer',
        avatar: 'MJ'
    },
    {
        id: 4,
        name: 'Alice Brown',
        email: 'alice.brown@projecthub.com',
        phone: '+1 (555) 456-7890',
        role: 'Backend Developer',
        avatar: 'AB'
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
        return res.status(200).json(teamMembers);
    }

    if (req.method === 'POST') {
        const newMember = {
            id: Date.now(),
            ...req.body,
            avatar: req.body.name.split(' ').map(n => n[0]).join('').toUpperCase()
        };
        teamMembers.push(newMember);
        return res.status(201).json(newMember);
    }

    return res.status(405).json({ error: 'Method not allowed' });
};

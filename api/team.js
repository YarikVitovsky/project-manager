// Vercel Serverless Function for Team API
let teamMembers = [
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
];

let nextMemberId = 6;

module.exports = (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Parse URL for specific member ID
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const memberId = pathParts[pathParts.length - 1];
    const isIdRequest = memberId && !isNaN(parseInt(memberId));

    // GET single team member by ID
    if (req.method === 'GET' && isIdRequest) {
        const member = teamMembers.find(m => m.id === parseInt(memberId));
        if (!member) {
            return res.status(404).json({ error: 'Team member not found' });
        }
        return res.status(200).json(member);
    }

    // GET all team members
    if (req.method === 'GET') {
        return res.status(200).json(teamMembers);
    }

    // POST - Create new team member
    if (req.method === 'POST') {
        const { name, email, phone, role, avatar } = req.body;

        if (!name || !email || !role) {
            return res.status(400).json({ error: 'Name, email, and role are required' });
        }

        const memberAvatar = avatar || name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

        const newMember = {
            id: nextMemberId++,
            name,
            email,
            phone: phone || '',
            role,
            avatar: memberAvatar,
            status: 'active'
        };

        teamMembers.push(newMember);
        return res.status(201).json(newMember);
    }

    // PATCH - Update team member
    if (req.method === 'PATCH' && isIdRequest) {
        const memberIndex = teamMembers.findIndex(m => m.id === parseInt(memberId));

        if (memberIndex === -1) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        const { name, email, phone, role, avatar, status } = req.body;

        if (name !== undefined) teamMembers[memberIndex].name = name;
        if (email !== undefined) teamMembers[memberIndex].email = email;
        if (phone !== undefined) teamMembers[memberIndex].phone = phone;
        if (role !== undefined) teamMembers[memberIndex].role = role;
        if (avatar !== undefined) teamMembers[memberIndex].avatar = avatar;
        if (status !== undefined) teamMembers[memberIndex].status = status;

        return res.status(200).json(teamMembers[memberIndex]);
    }

    // DELETE - Remove team member
    if (req.method === 'DELETE' && isIdRequest) {
        const memberIndex = teamMembers.findIndex(m => m.id === parseInt(memberId));

        if (memberIndex === -1) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        const deletedMember = teamMembers.splice(memberIndex, 1)[0];
        return res.status(200).json({ message: 'Team member removed successfully', member: deletedMember });
    }

    return res.status(405).json({ error: 'Method not allowed' });
};

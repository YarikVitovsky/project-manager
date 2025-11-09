const express = require('express');
const router = express.Router();

// In-memory team members storage (replace with DB later)
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

// GET all team members
router.get('/', (req, res) => {
    res.json(teamMembers);
});

// GET single team member by ID
router.get('/:id', (req, res) => {
    const member = teamMembers.find(m => m.id === parseInt(req.params.id));
    if (!member) {
        return res.status(404).json({ error: 'Team member not found' });
    }
    res.json(member);
});

// POST - Create a new team member
router.post('/', (req, res) => {
    const { name, email, phone, role, avatar } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ error: 'Name, email, and role are required' });
    }

    // Generate avatar if not provided
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
    res.status(201).json(newMember);
});

// PATCH - Update a team member
router.patch('/:id', (req, res) => {
    const memberId = parseInt(req.params.id);
    const memberIndex = teamMembers.findIndex(m => m.id === memberId);

    if (memberIndex === -1) {
        return res.status(404).json({ error: 'Team member not found' });
    }

    const { name, email, phone, role, avatar, status } = req.body;

    // Update member fields
    if (name !== undefined) teamMembers[memberIndex].name = name;
    if (email !== undefined) teamMembers[memberIndex].email = email;
    if (phone !== undefined) teamMembers[memberIndex].phone = phone;
    if (role !== undefined) teamMembers[memberIndex].role = role;
    if (avatar !== undefined) teamMembers[memberIndex].avatar = avatar;
    if (status !== undefined) teamMembers[memberIndex].status = status;

    res.json(teamMembers[memberIndex]);
});

// DELETE - Remove a team member
router.delete('/:id', (req, res) => {
    const memberId = parseInt(req.params.id);
    const memberIndex = teamMembers.findIndex(m => m.id === memberId);

    if (memberIndex === -1) {
        return res.status(404).json({ error: 'Team member not found' });
    }

    const deletedMember = teamMembers.splice(memberIndex, 1)[0];
    res.json({ message: 'Team member removed successfully', member: deletedMember });
});

module.exports = router;

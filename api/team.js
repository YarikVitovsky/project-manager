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

    // Parse URL for specific member ID
    const pathParts = event.path.split('/').filter(Boolean);
    const memberId = pathParts[pathParts.length - 1];
    const isIdRequest = memberId && !isNaN(parseInt(memberId));

    try {
        // GET single team member by ID
        if (event.httpMethod === 'GET' && isIdRequest) {
            const member = teamMembers.find(m => m.id === parseInt(memberId));
            if (!member) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Team member not found' })
                };
            }
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(member)
            };
        }

        // GET all team members
        if (event.httpMethod === 'GET') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(teamMembers)
            };
        }

        // POST - Create new team member
        if (event.httpMethod === 'POST') {
            const { name, email, phone, role, avatar } = JSON.parse(event.body || '{}');

            if (!name || !email || !role) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Name, email, and role are required' })
                };
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
            return {
                statusCode: 201,
                headers,
                body: JSON.stringify(newMember)
            };
        }

        // PATCH - Update team member
        if (event.httpMethod === 'PATCH' && isIdRequest) {
            const memberIndex = teamMembers.findIndex(m => m.id === parseInt(memberId));

            if (memberIndex === -1) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Team member not found' })
                };
            }

            const { name, email, phone, role, avatar, status } = JSON.parse(event.body || '{}');

            if (name !== undefined) teamMembers[memberIndex].name = name;
            if (email !== undefined) teamMembers[memberIndex].email = email;
            if (phone !== undefined) teamMembers[memberIndex].phone = phone;
            if (role !== undefined) teamMembers[memberIndex].role = role;
            if (avatar !== undefined) teamMembers[memberIndex].avatar = avatar;
            if (status !== undefined) teamMembers[memberIndex].status = status;

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(teamMembers[memberIndex])
            };
        }

        // DELETE - Remove team member
        if (event.httpMethod === 'DELETE' && isIdRequest) {
            const memberIndex = teamMembers.findIndex(m => m.id === parseInt(memberId));

            if (memberIndex === -1) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Team member not found' })
                };
            }

            const deletedMember = teamMembers.splice(memberIndex, 1)[0];
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: 'Team member removed successfully', member: deletedMember })
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

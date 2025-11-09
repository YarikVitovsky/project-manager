# Quick Setup Guide

## Prerequisites
- Node.js v18+ installed
- npm or yarn
- Git

## 5-Minute Setup

### 1. Clone & Navigate
```bash
git clone <your-repo-url>
cd project-management
```

### 2. Backend Setup
```bash
cd project-management-backend
npm install
cp .env.example .env
npm start
```
✅ Backend runs on http://localhost:5000

### 3. Frontend Setup (New Terminal)
```bash
cd project-management-frontend
npm install
npm start
```
✅ Frontend runs on http://localhost:3000

### 4. Open Browser
Navigate to: http://localhost:3000

## Default Data
The app comes with sample data pre-loaded:
- **Projects**: 3 sample projects
- **Tasks**: 9 tasks across different statuses
- **Team Members**: 5 team members

## Available Pages
- **Dashboard** - `/dashboard` - Overview and stats
- **Projects** - `/projects` - Project management
- **Tasks** - `/tasks` - Kanban board
- **Team** - `/team` - Team member management
- **Analytics** - `/analytics` - Reports and charts
- **Calendar** - `/calendar` - Events and milestones
- **Settings** - `/settings` - App configuration

## Troubleshooting

### Port Already in Use
**Backend (5000):**
```bash
npx kill-port 5000
```

**Frontend (3000):**
```bash
npx kill-port 3000
```

### Node Modules Issues
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
Make sure:
1. Backend is running on port 5000
2. Frontend is running on port 3000
3. Check .env file has correct FRONTEND_URL

## Development Commands

### Backend
```bash
npm start      # Start server
npm run dev    # Start with auto-reload (nodemon)
```

### Frontend
```bash
npm start      # Development server
npm run build  # Production build
npm test       # Run tests
```

## Project Structure
```
project-management/
├── project-management-backend/   # Express API
│   ├── routes/                   # API endpoints
│   ├── server.js                 # Server entry point
│   └── .env                      # Environment config
│
└── project-management-frontend/  # React App
    ├── src/
    │   ├── components/           # React components
    │   ├── App.js               # Main app component
    │   └── index.js             # Entry point
    └── public/                   # Static files
```

## Features Overview

### ✨ Implemented
- Full CRUD for Projects, Tasks, and Team
- Kanban Task Board
- Dashboard with Statistics
- Team Management
- Analytics & Reports
- Calendar View
- Settings Page
- Responsive Design
- Search & Filter
- Real-time Updates

### 🚧 Coming Soon
- Authentication
- Database Integration
- Drag & Drop Tasks
- File Attachments
- Real-time Notifications

## API Endpoints

### Projects
- `GET /api/projects` - Get all
- `POST /api/projects` - Create
- `PATCH /api/projects/:id` - Update
- `DELETE /api/projects/:id` - Delete

### Tasks
- `GET /api/tasks` - Get all (by status)
- `POST /api/tasks` - Create
- `PATCH /api/tasks/:id` - Update
- `DELETE /api/tasks/:id` - Delete

### Team
- `GET /api/team` - Get all members
- `POST /api/team` - Add member
- `PATCH /api/team/:id` - Update
- `DELETE /api/team/:id` - Remove

## Environment Variables

### Backend (.env)
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## Need Help?
- Check the main README.md for detailed documentation
- Open an issue on GitHub
- Check console for error messages

---
Happy coding! 🚀

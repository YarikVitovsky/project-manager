# ProjectHub - Project Management Application

A modern, full-stack project management application built with React and Vercel Serverless Functions. Manage projects, tasks, teams, and track progress all in one place.

![ProjectHub Dashboard](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![Vercel](https://img.shields.io/badge/Vercel-Serverless-black)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Live Demo

**Production:** [https://yariks-project-manager.netlify.app](https://yariks-project-manager.netlify.app)

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/YarikVitovsky/project-manager.git
cd project-manager

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Visit `http://localhost:3000` to see the app running locally.

## ✨ Features

### 📊 Dashboard
- Real-time project statistics
- Active projects, team members, and task counters
- Recent projects overview
- Upcoming tasks list
- Quick action buttons for common tasks

### 📁 Project Management
- Create, edit, and delete projects
- Track project progress with visual indicators
- Set priorities (High, Medium, Low)
- Assign team members
- Monitor project status (Active, Review, Completed)
- Due date tracking

### 📋 Task Board (Kanban)
- Drag-and-drop task management (coming soon)
- Four status columns: To Do, In Progress, Review, Done
- Task details: title, description, assignee, due date, priority, tags
- Search and filter functionality
- Mark tasks as complete
- Edit and delete tasks

### 👥 Team Management
- Add and manage team members
- Role assignment
- Contact information (email, phone)
- Search team members
- Edit member details
- Remove team members

### 📈 Analytics & Reports
- Project performance tracking
- Task distribution by status
- Priority distribution charts
- Time tracking metrics
- Completion rate trends
- Weekly/Monthly/Quarterly reports

### 📅 Calendar
- Monthly calendar view
- Event scheduling
- Project milestones
- Team schedule management
- Upcoming events list

### ⚙️ Settings
- Account settings
- Notification preferences
- Appearance customization (Light/Dark theme)
- Privacy & Security settings
- Workspace configuration

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Local Development

1. **Clone and install**
   ```bash
   git clone https://github.com/YarikVitovsky/project-manager.git
   cd project-manager
   npm install
   ```

2. **Environment setup** (optional)
   ```bash
   cp .env.example .env
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   Opens at `http://localhost:3000`

### Deployment

**Deploy to Vercel** (Recommended):
```bash
npm install -g vercel
vercel
```

The project is pre-configured for Vercel with:
- Automatic builds from `main` branch
- Serverless API functions in `/api` folder
- Optimized production builds

## 📁 Project Structure

```
project-management/
├── api/                         # Vercel Serverless Functions
│   ├── projects.js              # Project API endpoints
│   ├── tasks.js                 # Task API endpoints
│   └── team.js                  # Team API endpoints
├── public/                      # Static assets
├── src/                         # React application source
│   ├── components/
│   │   ├── Dashboard.js         # Main dashboard
│   │   ├── ProjectList.js       # Projects page
│   │   ├── TaskBoard.js         # Kanban board
│   │   ├── Team.js              # Team management
│   │   ├── Analytics.js         # Analytics & reports
│   │   ├── Calendar.js          # Calendar view
│   │   ├── Settings.js          # Settings page
│   │   ├── Header.js            # Top navigation
│   │   ├── Sidebar.js           # Side navigation
│   │   └── Layout.js            # App layout wrapper
│   ├── config/
│   │   └── api.js               # API configuration
│   ├── App.js
│   ├── App.css
│   └── index.js
├── vercel.json                  # Vercel deployment config
├── package.json
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Lucide React** - Icon library
- **CSS3** - Styling

### Backend (Serverless)
- **Vercel Serverless Functions** - API endpoints
- **Node.js** - Runtime environment

### Deployment
- **Vercel** - Hosting and serverless functions

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🌐 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks (grouped by status)
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Team
- `GET /api/team` - Get all team members
- `POST /api/team` - Add team member
- `PATCH /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Remove team member

## 🎨 Features in Detail

### Dashboard
The dashboard provides an at-a-glance view of your project workspace with:
- Statistics cards showing active projects, team members, completed and pending tasks
- Recent projects with progress bars
- Upcoming tasks with due dates and priorities
- Quick action buttons for common operations

### Project Management
Full CRUD operations for projects with:
- Visual project cards with progress indicators
- Priority badges (High, Medium, Low)
- Team member avatars
- Status tracking (Active, Review, Completed)
- Search and filter capabilities

### Task Board
Kanban-style task management:
- Four customizable columns (To Do, In Progress, Review, Done)
- Task cards with detailed information
- Quick edit and delete actions
- Priority color coding
- Tag support for categorization

### Team Management
Comprehensive team member management:
- Member profiles with avatar initials
- Contact information display
- Role assignments
- Quick search functionality
- Add, edit, and remove capabilities

## 🔐 Security Features

- CORS configuration for API endpoints
- Input validation
- Serverless function isolation
- Vercel's built-in DDoS protection

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop (1920px and above)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

## 🌐 Deployment

### Current Deployment

- **Frontend**: Deployed on [Netlify](https://yarik-project-manager.netlify.app)
- **Backend**: Deployed on [Render](https://project-manager-q4bl.onrender.com)

> ⚠️ **Important:** Render's free tier spins down after 15 minutes of inactivity. The first request will take 50-90 seconds to wake up the server. Consider upgrading to a paid plan ($7/month) for instant responses, or use alternatives like Railway (better free tier with no sleep).

### Deploy to Netlify (Frontend)

1. **Build the frontend**
   ```bash
   cd project-management-frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Push your code to GitHub
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Build settings:
     - Base directory: `project-management-frontend`
     - Build command: `npm run build`
     - Publish directory: `build`
   - Add environment variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-backend-url.onrender.com/api`
   - Click "Deploy site"

### Deploy Backend to Render

1. **Push your code to GitHub**

2. **Deploy to Render**
   - Go to [Render](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Root directory: `project-management-backend`
     - Build command: `npm install`
     - Start command: `node server.js`
   - Add environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `5000`
     - `FRONTEND_URL`: `https://your-netlify-app.netlify.app`
   - Click "Create Web Service"

3. **Update Frontend with Backend URL**
   - Copy your Render backend URL
   - In Netlify, go to Site settings → Environment variables
   - Update `REACT_APP_API_URL` with your Render URL
   - Trigger a new deploy

### Alternative Deployment Options

**Frontend:**
- Vercel
- GitHub Pages
- AWS Amplify
- Firebase Hosting

**Backend:**
- Railway
- Heroku
- AWS EC2
- DigitalOcean

## �🚧 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time updates with WebSockets
- [ ] Drag-and-drop for tasks
- [ ] File attachments
- [ ] Comments and mentions
- [ ] Email notifications
- [ ] Export reports to PDF/Excel
- [ ] Time tracking
- [ ] Advanced analytics with charts
- [ ] Mobile app (React Native)
- [ ] Integration with third-party tools (Slack, GitHub, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ for modern project management

## 📞 Support

For support, email support@projecthub.com or open an issue in the repository.

---

**Note:** This is a portfolio/demonstration project. For production use, implement proper authentication, database integration, and additional security measures.
# Vercel Deploy
# Trigger deployment

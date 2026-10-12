# TeamSync — Team Collaboration & Project Management Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.x-61dafb.svg)
![TailwindCSS](https://img.shields.io/badge/tailwind-3.4-38bdf8.svg)
![Express](https://img.shields.io/badge/express-4.x-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/mongodb-atlas-47A248.svg)

**TeamSync** is an enterprise-grade full-stack SaaS platform architected for modern software engineering teams, product managers, and designers. It delivers an integrated workspace combining project portfolio tracking, sprint Kanban management, real-time channels, video sync planning, team member directory, and workspace configuration.

---

## 🏛 Platform Architecture Overview

TeamSync follows a decoupled **MERN stack architecture** (MongoDB, Express, React, Node.js) designed for scalability, continuous deployment, and concurrent multi-developer workflows:

```
┌────────────────────────────────────────────────────────┐
│                   CLIENT (React + Vite)                │
│  - Tailwind CSS (Purple & Indigo Design System)        │
│  - React Router DOM v6                                 │
│  - Central Axios Client (Base URL via VITE_API_URL)    │
│  - Lucide Icons & Responsive SaaS Dashboard Shell      │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP / REST (/api/*)
┌───────────────────────────▼────────────────────────────┐
│                  SERVER (Node.js + Express)            │
│  - Modular Router Architecture (/api/health, etc.)     │
│  - Centralized Error-Handling Middleware               │
│  - Resilient Atlas Connection Driver                   │
└───────────────────────────┬────────────────────────────┘
                            │ Mongoose ODM
┌───────────────────────────▼────────────────────────────┐
│                    MONGODB ATLAS                       │
│  - User, Project, Task, Message, Meeting, Notification │
└────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```text
teamsync/
├── .gitignore                   # Ignores .env, node_modules, dist, logs
├── README.md                    # Platform documentation & setup instructions
├── package.json                 # Monorepo root orchestration scripts
├── docs/
│   ├── architecture.md          # In-depth architectural designs & schema models
│   ├── api-documentation.md     # API convention, response format & health check spec
│   └── contribution-guide.md    # Multi-developer Git workflow, branches & PR rules
├── server/
│   ├── config/
│   │   └── db.js                # Resilient MongoDB Atlas Mongoose connection
│   ├── controllers/
│   │   └── healthController.js  # GET /api/health controller
│   ├── middleware/
│   │   ├── errorHandler.js      # Global centralized error handler
│   │   └── notFound.js          # 404 handler for unknown routes
│   ├── models/
│   │   ├── User.js              # User schema & profile definition
│   │   ├── Project.js           # Project portfolio schema
│   │   ├── Task.js              # Sprint task & Kanban schema
│   │   ├── Message.js           # Team chat message schema
│   │   ├── Meeting.js           # Video call & sync schema
│   │   └── Notification.js      # Alert notification schema
│   ├── routes/
│   │   ├── api.js               # Central router mounting subroutes
│   │   └── healthRoutes.js      # Health status route definition
│   ├── utils/
│   │   ├── apiResponse.js       # Uniform JSON response utility
│   │   └── logger.js            # Structured console logger
│   ├── app.js                   # Express application & middleware stack
│   ├── server.js                # HTTP server bootstrap & port listener
│   ├── .env.example             # Backend environment template
│   └── package.json             # Backend dependencies
└── client/
    ├── public/
    │   └── favicon.svg          # TeamSync brand icon
    ├── src/
    │   ├── api/
    │   │   └── axiosClient.js   # Central Axios client with interceptors
    │   ├── components/
    │   │   ├── common/          # Reusable UI (Badge, Button, Card, Modal, PageHeader)
    │   │   └── layout/          # Shell layout (Sidebar, Topbar, Layout)
    │   ├── data/
    │   │   └── mockData.js      # Realistic SaaS mock dataset
    │   ├── pages/               # Dashboard, Projects, Tasks, TeamChat, Meetings, TeamMembers, Settings
    │   ├── App.jsx              # React Router DOM routes
    │   ├── index.css            # Tailwind directives, theme variables & scrollbars
    │   └── main.jsx             # React DOM root entry
    ├── index.html               # HTML entry with SEO tags & Inter font
    ├── vite.config.js           # Vite build config with local proxying
    ├── tailwind.config.js       # Custom purple & indigo color tokens
    ├── postcss.config.js        # PostCSS configuration
    ├── .env.example             # Frontend environment template
    └── package.json             # Frontend dependencies
```

---

## ⚡ Quickstart & Local Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- **MongoDB Atlas Cluster**: (Free Tier M0 or higher) or local MongoDB instance

---

### Step 1: Clone and Install Dependencies

You can install all dependencies across both client and server in one command:

```bash
# From the repository root
npm run install:all
```

Or install them individually:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

### Step 2: Configure Environment Variables

#### Backend Configuration
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```
Edit `server/.env` with your desired configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster>.mongodb.net/teamsync?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```
> **Note:** If `MONGODB_URI` is not supplied initially, the backend starts in non-blocking offline mode with clear diagnostic logs, allowing local frontend evaluation without fatal crashes.

#### Frontend Configuration
Copy `client/.env.example` to `client/.env`:
```bash
cp client/.env.example client/.env
```
Default contents:
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 3: Run the Application Locally

Open two terminal windows:

#### Terminal 1 — Start Backend Server
```bash
# Starts Express with live reload on port 5000
npm run dev:server
```
Health Check Endpoint: [http://localhost:5000/api/health](http://localhost:5000/api/health)

#### Terminal 2 — Start Frontend Application
```bash
# Starts Vite dev server on port 5173
npm run dev:client
```
Client Application: [http://localhost:5173](http://localhost:5173)

---

## 🛠 Features Implemented in Initial Foundation

1. **Responsive Purple & Indigo SaaS Design System**:
   - Custom Tailwind tokens (`brand-500` / `purpleBrand-500`), glassmorphic panels, and glowing card borders.
2. **7 Complete Core Pages**:
   - **Dashboard**: High-level KPIs, project health tracks, quick task toggles, upcoming meeting card, and live activity timeline.
   - **Projects**: Portfolio grid, progress bars, category tabs, and interactive "New Project" modal.
   - **Tasks**: Dual-view Kanban board & List view with stage advancement controls and "Add Task" modal.
   - **Team Chat**: Split view with public channels (#general, #dev-sprint-core, etc.), direct messages, emoji reactions, and live message composer.
   - **Meetings**: Calendar sync cards with platform badges (TeamSync Call, Google Meet, Zoom), attendees, and "Schedule Sync" modal.
   - **Team Members**: Directory with online status presence dots, department filters, and "Invite Member" modal.
   - **Settings**: Live backend health tester, MongoDB configuration guide, user profile editor, and workspace controls.
3. **Resilient Backend Architecture**:
   - Express 4.x application with CORS, request logging, and centralized error handler.
   - 6 Mongoose schemas (`User`, `Project`, `Task`, `Message`, `Meeting`, `Notification`).
   - MongoDB Atlas connection handler with automatic retry and unconfigured fallback.
4. **Multi-Developer Collaboration Ready**:
   - Standardized Git branching strategy, semantic commits, and pull-request workflow documentation in `docs/contribution-guide.md`.

---

## 📄 Documentation Links
- [System Architecture](file:///c:/POKAK/PROJECT%20WITH%20TEAM/docs/architecture.md)
- [API Documentation](file:///c:/POKAK/PROJECT%20WITH%20TEAM/docs/api-documentation.md)
- [Contribution Guide & Git Workflow](file:///c:/POKAK/PROJECT%20WITH%20TEAM/docs/contribution-guide.md)

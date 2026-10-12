# TeamSync — API Documentation

This document describes the API conventions, standard payload envelopes, HTTP status codes, and endpoint specifications for the TeamSync platform.

---

## 1. General Conventions

- **Base URL**: `http://localhost:5000/api` (or configured `PORT`)
- **Data Format**: `application/json`
- **Character Encoding**: `UTF-8`
- **Timestamps**: ISO 8601 strings (e.g. `2026-10-11T17:30:00.000Z`)

---

## 2. Standardized Response Format

All responses use a consistent JSON wrapper provided by `server/utils/apiResponse.js`.

### Success Envelope (2xx)
```json
{
  "success": true,
  "message": "Operation successful description",
  "data": {
    "key": "value"
  },
  "timestamp": "2026-10-11T17:30:00.000Z"
}
```

### Error Envelope (4xx / 5xx)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Please provide user email",
    "Password must be at least 6 characters"
  ],
  "timestamp": "2026-10-11T17:30:00.000Z"
}
```

---

## 3. Implemented Endpoints

### 3.1 Base API Index
- **Endpoint**: `GET /api`
- **Description**: Returns general API metadata and available endpoints.
- **Example Response**:
```json
{
  "success": true,
  "message": "Welcome to TeamSync Core API",
  "version": "1.0.0",
  "documentation": "/docs/api-documentation.md",
  "endpoints": {
    "health": "/api/health"
  }
}
```

### 3.2 System & Database Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Returns real-time server health, memory footprint, uptime, and MongoDB Atlas connectivity status.
- **Example Response**:
```json
{
  "success": true,
  "message": "TeamSync API service operational",
  "data": {
    "status": "healthy",
    "platform": "TeamSync API Platform",
    "environment": "development",
    "timestamp": "2026-10-11T17:30:00.000Z",
    "uptime": "124 seconds",
    "database": {
      "status": "connected",
      "configured": true
    },
    "memory": {
      "rss": "42 MB",
      "heapUsed": "18 MB"
    },
    "version": "1.0.0"
  },
  "timestamp": "2026-10-11T17:30:00.000Z"
}
```

---

## 4. Planned Endpoint Architecture (Future Phases)

| Category | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth/register` | POST | Register new team user |
| **Auth** | `/api/auth/login` | POST | Authenticate & issue JWT |
| **Projects** | `/api/projects` | GET | List workspace projects with filters |
| **Projects** | `/api/projects` | POST | Create new project entity |
| **Projects** | `/api/projects/:id` | GET, PUT, DELETE | Manage project instance |
| **Tasks** | `/api/tasks` | GET | Query sprint tasks by status/assignee |
| **Tasks** | `/api/tasks` | POST | Create new sprint task |
| **Tasks** | `/api/tasks/:id/status` | PATCH | Update task Kanban stage |
| **Messages** | `/api/messages/channel/:channelId` | GET | Fetch channel chat history |
| **Meetings** | `/api/meetings` | GET, POST | List & schedule sync meetings |
| **Notifications** | `/api/notifications` | GET, PATCH | Fetch & mark alerts read |

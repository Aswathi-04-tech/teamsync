import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import TeamChat from './pages/TeamChat';
import Meetings from './pages/Meetings';
import TeamMembers from './pages/TeamMembers';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="chat" element={<TeamChat />} />
        <Route path="meetings" element={<Meetings />} />
        <Route path="team" element={<TeamMembers />} />
        <Route path="settings" element={<Settings />} />
        {/* Fallback to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

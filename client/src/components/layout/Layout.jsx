import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { mockProjects, mockTeamMembers } from '../../data/mockData';

const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProject, setNewTaskProject] = useState(mockProjects[0]?.key || 'TS-CORE');
  const [newTaskPriority, setNewTaskPriority] = useState('High');
  const [taskCreatedSuccess, setTaskCreatedSuccess] = useState(false);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTaskCreatedSuccess(true);
    setTimeout(() => {
      setTaskCreatedSuccess(false);
      setIsNewTaskModalOpen(false);
      setNewTaskTitle('');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Background ambient lighting effects */}
      <div className="fixed top-0 left-64 right-0 h-96 bg-gradient-to-b from-brand-600/10 via-purpleBrand-600/5 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purpleBrand-600/10 rounded-full pointer-events-none -z-10 blur-3xl" />

      {/* Persistent Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <Topbar
          setIsMobileOpen={setIsMobileOpen}
          onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ onOpenNewTaskModal: () => setIsNewTaskModalOpen(true) }} />
        </main>
      </div>

      {/* Quick Action Modal: New Task */}
      <Modal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        title="Create New Task"
        subtitle="Add a task card to the TeamSync sprint pipeline"
      >
        {taskCreatedSuccess ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
              ✓
            </div>
            <h4 className="text-base font-semibold text-white">Task Created Successfully!</h4>
            <p className="text-xs text-slate-400 mt-1">Added to sprint pipeline.</p>
          </div>
        ) : (
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Task Title *
              </label>
              <input
                type="text"
                required
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g. Build authentication middleware for API"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Project
                </label>
                <select
                  value={newTaskProject}
                  onChange={(e) => setNewTaskProject(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
                >
                  {mockProjects.map((p) => (
                    <option key={p.id} value={p.key}>
                      [{p.key}] {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Priority
                </label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNewTaskModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Create Task
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Layout;

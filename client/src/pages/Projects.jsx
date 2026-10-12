import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Calendar,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { mockProjects, mockTeamMembers } from '../data/mockData';

const categories = ['All', 'Full-Stack Web', 'Design & UI/UX', 'Backend & Cloud', 'Compliance'];

const Projects = () => {
  const [projectsList, setProjectsList] = useState(mockProjects);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Project Form state
  const [newProject, setNewProject] = useState({
    name: '',
    key: '',
    category: 'Full-Stack Web',
    priority: 'High',
    budget: '$30,000',
    dueDate: '2026-12-15',
    description: '',
  });

  const filteredProjects = projectsList.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.name) return;

    const created = {
      id: `prj_${Date.now()}`,
      key: newProject.key.toUpperCase() || 'TS-NEW',
      name: newProject.name,
      description: newProject.description || 'Newly initialized TeamSync workspace project.',
      category: newProject.category,
      status: 'In Progress',
      priority: newProject.priority,
      progress: 0,
      dueDate: newProject.dueDate,
      budget: newProject.budget,
      spent: '$0',
      members: [mockTeamMembers[0], mockTeamMembers[2]],
      tags: ['New', 'TeamSync'],
      stats: { completedTasks: 0, totalTasks: 1 },
    };

    setProjectsList([created, ...projectsList]);
    setIsModalOpen(false);
    setNewProject({
      name: '',
      key: '',
      category: 'Full-Stack Web',
      priority: 'High',
      budget: '$30,000',
      dueDate: '2026-12-15',
      description: '',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        breadcrumb="Workspaces"
        title="Projects Portfolio"
        description="Plan, track, and ship high-impact platform initiatives across cross-functional engineering teams."
        badge={
          <Badge variant="brand" size="sm">
            {projectsList.length} Active Tracks
          </Badge>
        }
      >
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          New Project
        </Button>
      </PageHeader>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-brand-600 to-purpleBrand-600 text-white shadow-glow'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name or key..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            variant="glass"
            className="flex flex-col justify-between hover:border-brand-500/30 transition-all group"
          >
            <div>
              {/* Top row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                    {project.key}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      project.priority === 'Critical'
                        ? 'danger'
                        : project.priority === 'High'
                        ? 'warning'
                        : 'brand'
                    }
                    size="xs"
                  >
                    {project.priority}
                  </Badge>
                  <Badge
                    variant={
                      project.status === 'Completed'
                        ? 'success'
                        : project.status === 'In Review'
                        ? 'purple'
                        : 'brand'
                    }
                    size="xs"
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                {project.name}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-1.5 mt-4 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom metrics section */}
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400">Progress</span>
                <span className="font-semibold text-white">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-purpleBrand-500 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.members.map((m, idx) => (
                      <div
                        key={idx}
                        title={m.name}
                        className={`w-7 h-7 rounded-full bg-gradient-to-tr ${m.avatarBg} text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-slate-900`}
                      >
                        {m.initials}
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {project.stats.completedTasks}/{project.stats.totalTasks} tasks
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {project.dueDate}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-400">
                    {project.budget}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* New Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        subtitle="Initialize a new cross-functional team project"
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="e.g. Next-Gen Realtime Gateway"
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Key *
              </label>
              <input
                type="text"
                required
                value={newProject.key}
                onChange={(e) => setNewProject({ ...newProject, key: e.target.value.toUpperCase() })}
                placeholder="TS-GW"
                maxLength={8}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 uppercase focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              >
                <option value="Full-Stack Web">Full-Stack Web</option>
                <option value="Design & UI/UX">Design & UI/UX</option>
                <option value="Backend & Cloud">Backend & Cloud</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={newProject.priority}
                onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Budget Allocation
              </label>
              <input
                type="text"
                value={newProject.budget}
                onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                placeholder="$25,000"
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Outline project deliverables and technical goals..."
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Create Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Projects;

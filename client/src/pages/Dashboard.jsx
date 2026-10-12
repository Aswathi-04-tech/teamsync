import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  FolderKanban,
  CheckSquare,
  TrendingUp,
  Users,
  ArrowUpRight,
  Plus,
  Clock,
  Calendar,
  Sparkles,
  GitCommit,
  CheckCircle2,
  FileUp,
  ChevronRight,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  mockProjects,
  mockTasks,
  mockTeamMembers,
  mockMeetings,
  mockDashboardStats,
  mockRecentActivities,
} from '../data/mockData';

const Dashboard = () => {
  const { onOpenNewTaskModal } = useOutletContext();
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'Done' ? 'In Progress' : 'Done' }
          : t
      )
    );
  };

  const activityIcons = {
    GitCommit: GitCommit,
    CheckCircle2: CheckCircle2,
    FileUp: FileUp,
    Calendar: Calendar,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <PageHeader
        breadcrumb="Overview"
        title="Engineering Workspace"
        description="Monitor sprint delivery velocity, active project milestones, and team bandwidth across services."
        badge={
          <Badge variant="brand" size="sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mr-1.5 animate-pulse" />
            Sprint 24 Live
          </Badge>
        }
      >
        <Button variant="secondary" size="sm" icon={Calendar} onClick={() => {}}>
          Sprint Calendar
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={onOpenNewTaskModal}
        >
          Create Task
        </Button>
      </PageHeader>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card variant="gradient" className="relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Projects
            </span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-110 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {mockDashboardStats.activeProjects}
            </span>
            <span className="text-xs font-medium text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> 2 launching soon
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {mockDashboardStats.completedProjects} delivered this quarter
          </p>
        </Card>

        <Card variant="glass" className="relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pending Tasks
            </span>
            <div className="p-2 rounded-xl bg-purpleBrand-500/10 text-purpleBrand-400 border border-purpleBrand-500/20 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {mockDashboardStats.pendingTasks}
            </span>
            <span className="text-xs font-medium text-brand-300">
              8 in progress
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            78% completion rate for active sprint
          </p>
        </Card>

        <Card variant="glass" className="relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Sprint Velocity
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {mockDashboardStats.velocityIncrease}
            </span>
            <span className="text-xs font-medium text-emerald-400">
              vs last sprint
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            94 story points burned down
          </p>
        </Card>

        <Card variant="glass" className="relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Team Members
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {mockTeamMembers.length}
            </span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> 5 online
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Across 3 global timezones
          </p>
        </Card>
      </div>

      {/* Main Content: Projects Progress & Quick Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Active Projects Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Active Projects Track</h2>
              <p className="text-xs text-slate-400">
                Key milestones and progress across ongoing engineering initiatives
              </p>
            </div>
            <Link
              to="/projects"
              className="text-xs font-medium text-brand-400 hover:text-brand-300 flex items-center gap-1"
            >
              View all ({mockProjects.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockProjects.map((project) => (
              <Card
                key={project.id}
                variant="glass"
                hoverable
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                      {project.key}
                    </span>
                    <Badge
                      variant={
                        project.status === 'Completed'
                          ? 'success'
                          : project.status === 'In Progress'
                          ? 'brand'
                          : 'purple'
                      }
                      size="xs"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-semibold text-white">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-purpleBrand-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.members.slice(0, 3).map((m, idx) => (
                        <div
                          key={idx}
                          title={m.name}
                          className={`w-7 h-7 rounded-full bg-gradient-to-tr ${m.avatarBg} text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-slate-900`}
                        >
                          {m.initials}
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Due {project.dueDate}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Tasks Tracker */}
          <Card
            variant="glass"
            title="Sprint Backlog Tasks"
            subtitle="Click checkbox to mark completed or update status"
            action={
              <Link
                to="/tasks"
                className="text-xs text-brand-400 hover:text-brand-300 font-medium"
              >
                Go to Kanban →
              </Link>
            }
          >
            <div className="space-y-3">
              {tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 hover:bg-slate-800/40 border border-slate-800/80 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.status === 'Done'}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-brand-500 focus:ring-brand-500 focus:ring-offset-slate-900 cursor-pointer"
                    />
                    <div>
                      <span
                        className={`text-xs font-medium transition-all ${
                          task.status === 'Done'
                            ? 'line-through text-slate-500'
                            : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {task.title}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-slate-400">
                          {task.projectKey}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[10px] text-slate-400">
                          Due {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        task.priority === 'Critical'
                          ? 'danger'
                          : task.priority === 'High'
                          ? 'warning'
                          : 'brand'
                      }
                      size="xs"
                    >
                      {task.priority}
                    </Badge>
                    <div
                      title={task.assignee.name}
                      className={`w-6 h-6 rounded-full bg-gradient-to-tr ${task.assignee.avatarBg} text-white font-bold text-[9px] flex items-center justify-center`}
                    >
                      {task.assignee.initials}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (1 col): Upcoming Meeting & Activity Feed */}
        <div className="space-y-6">
          {/* Upcoming Meeting Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-950 via-slate-900 to-purpleBrand-950 border border-brand-500/30 shadow-glow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Up Next Today
              </span>
              <Badge variant="purple" size="xs">
                {mockMeetings[1].platform}
              </Badge>
            </div>
            <h4 className="text-base font-bold text-white">
              {mockMeetings[1].title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              {mockMeetings[1].description}
            </p>

            <div className="mt-4 pt-3 border-t border-brand-500/20 flex items-center justify-between">
              <div className="text-xs text-brand-300 font-medium">
                {mockMeetings[1].time}
              </div>
              <a
                href={mockMeetings[1].link}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-brand-500 hover:bg-brand-400 text-white transition-colors"
              >
                Join Call
              </a>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <Card
            variant="glass"
            title="Team Activity"
            subtitle="Live updates across repositories and projects"
          >
            <div className="space-y-4">
              {mockRecentActivities.map((act) => {
                const Icon = activityIcons[act.icon] || GitCommit;
                return (
                  <div key={act.id} className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl bg-gradient-to-tr ${act.user.avatarBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      {act.user.initials}
                    </div>
                    <div className="flex-1 text-xs leading-relaxed">
                      <span className="font-semibold text-slate-200">
                        {act.user.name}
                      </span>{' '}
                      <span className="text-slate-400">{act.action}</span>{' '}
                      <span className="font-medium text-brand-300">
                        {act.target}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {act.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Columns,
  List as ListIcon,
  Clock,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { mockTasks, mockProjects, mockTeamMembers } from '../data/mockData';

const columns = [
  { id: 'To Do', label: 'To Do', color: 'border-slate-700' },
  { id: 'In Progress', label: 'In Progress', color: 'border-brand-500/50' },
  { id: 'In Review', label: 'In Review', color: 'border-purpleBrand-500/50' },
  { id: 'Done', label: 'Done', color: 'border-emerald-500/50' },
];

const Tasks = () => {
  const [tasksList, setTasksList] = useState(mockTasks);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [filterPriority, setFilterPriority] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetColumn, setTargetColumn] = useState('To Do');

  // Form state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    projectKey: 'TS-CORE',
    priority: 'High',
    assigneeId: mockTeamMembers[0].id,
    dueDate: 'Oct 20',
    estimatedHours: 4,
  });

  const filteredTasks = tasksList.filter((task) => {
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.projectKey.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  // Move task to next or previous stage
  const moveTask = (taskId, direction) => {
    const stageOrder = ['To Do', 'In Progress', 'In Review', 'Done'];
    setTasksList((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const currentIndex = stageOrder.indexOf(t.status);
        const nextIndex =
          direction === 'next'
            ? Math.min(currentIndex + 1, stageOrder.length - 1)
            : Math.max(currentIndex - 1, 0);
        return { ...t, status: stageOrder[nextIndex] };
      })
    );
  };

  const openAddModal = (columnName = 'To Do') => {
    setTargetColumn(columnName);
    setIsModalOpen(true);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;

    const assignee = mockTeamMembers.find((m) => m.id === newTask.assigneeId) || mockTeamMembers[0];
    const created = {
      id: `tsk_${Date.now()}`,
      title: newTask.title,
      description: newTask.description || 'Sprint task item.',
      projectKey: newTask.projectKey,
      status: targetColumn,
      priority: newTask.priority,
      assignee,
      dueDate: newTask.dueDate,
      tags: ['Sprint'],
      estimatedHours: Number(newTask.estimatedHours),
    };

    setTasksList([...tasksList, created]);
    setIsModalOpen(false);
    setNewTask({
      title: '',
      description: '',
      projectKey: 'TS-CORE',
      priority: 'High',
      assigneeId: mockTeamMembers[0].id,
      dueDate: 'Oct 20',
      estimatedHours: 4,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        breadcrumb="Execution"
        title="Sprint Task Board"
        description="Track task distribution, blockers, and team workflows in interactive Kanban or tabular view."
        badge={
          <Badge variant="purple" size="sm">
            {tasksList.length} Total Tasks
          </Badge>
        }
      >
        <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5">
          <button
            onClick={() => setViewMode('kanban')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === 'kanban'
                ? 'bg-brand-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" /> Kanban
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === 'list'
                ? 'bg-brand-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ListIcon className="w-3.5 h-3.5" /> List
          </button>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => openAddModal('To Do')}
        >
          Add Task
        </Button>
      </PageHeader>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Priority:
          </span>
          {['All', 'Critical', 'High', 'Medium', 'Low'].map((pri) => (
            <button
              key={pri}
              onClick={() => setFilterPriority(pri)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filterPriority === pri
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {pri}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter tasks by name or key..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* View Mode: KANBAN BOARD */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {columns.map((col) => {
            const columnTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="flex flex-col rounded-2xl bg-slate-900/40 border border-slate-800/80 p-3.5 backdrop-blur-md"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {col.label}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={() => openAddModal(col.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Task Cards List */}
                <div className="space-y-3 flex-1 overflow-y-auto min-h-[300px]">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-brand-500/30 transition-all shadow-sm hover:shadow-glow group relative"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded">
                          {task.projectKey}
                        </span>
                        <Badge
                          variant={
                            task.priority === 'Critical'
                              ? 'danger'
                              : task.priority === 'High'
                              ? 'warning'
                              : task.priority === 'Medium'
                              ? 'brand'
                              : 'neutral'
                          }
                          size="xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>

                      <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div
                            title={task.assignee.name}
                            className={`w-6 h-6 rounded-full bg-gradient-to-tr ${task.assignee.avatarBg} text-white font-bold text-[9px] flex items-center justify-center`}
                          >
                            {task.assignee.initials}
                          </div>
                          <span className="text-[10px] text-slate-400 truncate max-w-[70px]">
                            {task.assignee.name.split(' ')[0]}
                          </span>
                        </div>

                        {/* Move Left / Right Interactive Controls */}
                        <div className="flex items-center gap-1">
                          {col.id !== 'To Do' && (
                            <button
                              onClick={() => moveTask(task.id, 'prev')}
                              title="Move back"
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {col.id !== 'Done' && (
                            <button
                              onClick={() => moveTask(task.id, 'next')}
                              title="Advance stage"
                              className="p-1 rounded bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
                      No tasks in {col.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* View Mode: LIST VIEW */
        <Card variant="glass" className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold text-[11px]">
                <th className="pb-3 pl-2">Task</th>
                <th className="pb-3">Project</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Assignee</th>
                <th className="pb-3">Due Date</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="font-semibold text-white">{task.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      {task.description}
                    </div>
                  </td>
                  <td className="py-3.5 font-mono text-brand-300 font-bold">
                    {task.projectKey}
                  </td>
                  <td className="py-3.5">
                    <Badge
                      variant={
                        task.status === 'Done'
                          ? 'success'
                          : task.status === 'In Progress'
                          ? 'brand'
                          : task.status === 'In Review'
                          ? 'purple'
                          : 'neutral'
                      }
                      size="xs"
                    >
                      {task.status}
                    </Badge>
                  </td>
                  <td className="py-3.5">
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
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full bg-gradient-to-tr ${task.assignee.avatarBg} text-white font-bold text-[8px] flex items-center justify-center`}
                      >
                        {task.assignee.initials}
                      </div>
                      <span className="text-slate-300">{task.assignee.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-400">{task.dueDate}</td>
                  <td className="py-3.5 text-right pr-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveTask(task.id, 'next')}
                    >
                      Advance →
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Add Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Sprint Task"
        subtitle={`Adding to column: ${targetColumn}`}
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="e.g. Design user profile security tabs"
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Project Key
              </label>
              <select
                value={newTask.projectKey}
                onChange={(e) => setNewTask({ ...newTask, projectKey: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              >
                {mockProjects.map((p) => (
                  <option key={p.id} value={p.key}>
                    {p.key} - {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
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
                Assignee
              </label>
              <select
                value={newTask.assigneeId}
                onChange={(e) => setNewTask({ ...newTask, assigneeId: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              >
                {mockTeamMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Due Date
              </label>
              <input
                type="text"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                placeholder="Oct 25"
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
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Acceptance criteria and technical notes..."
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Add Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Tasks;

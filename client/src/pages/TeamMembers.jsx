import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Search,
  Mail,
  MessageSquare,
  Clock,
  Briefcase,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { mockTeamMembers } from '../data/mockData';

const departments = ['All', 'Engineering', 'Product', 'Design', 'Quality & Sec'];

const TeamMembers = () => {
  const [membersList, setMembersList] = useState(mockTeamMembers);
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(null);

  // Invite state
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'Frontend Engineer',
    department: 'Engineering',
  });

  const filteredMembers = membersList.filter((m) => {
    const matchesDept = selectedDept === 'All' || m.department === selectedDept;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleCopyEmail = (email) => {
    navigator.clipboard?.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) return;

    const initials = inviteForm.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newMember = {
      id: `usr_${Date.now()}`,
      name: inviteForm.name,
      role: inviteForm.role,
      email: inviteForm.email,
      initials: initials || 'TS',
      avatarBg: 'from-brand-600 to-indigo-600',
      department: inviteForm.department,
      status: 'active',
      projectsCount: 1,
      tasksCount: 0,
      timezone: 'UTC',
    };

    setMembersList([...membersList, newMember]);
    setIsModalOpen(false);
    setInviteForm({
      name: '',
      email: '',
      role: 'Frontend Engineer',
      department: 'Engineering',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        breadcrumb="Directory"
        title="Team Members"
        description="Connect with engineers, designers, and product leaders collaborating on TeamSync."
        badge={
          <Badge variant="brand" size="sm">
            {membersList.length} Active Members
          </Badge>
        }
      >
        <Button
          variant="primary"
          size="sm"
          icon={UserPlus}
          onClick={() => setIsModalOpen(true)}
        >
          Invite Member
        </Button>
      </PageHeader>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDept === dept
                  ? 'bg-gradient-to-r from-brand-600 to-purpleBrand-600 text-white shadow-glow'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, email..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Members Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            variant="glass"
            className="flex flex-col justify-between hover:border-brand-500/30 transition-all group"
          >
            <div>
              {/* Avatar and Status Dot */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${member.avatarBg} text-white font-bold text-lg flex items-center justify-center shadow-lg`}
                  >
                    {member.initials}
                  </div>
                  <span
                    title={member.status}
                    className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                      member.status === 'active'
                        ? 'bg-emerald-400'
                        : member.status === 'in-meeting'
                        ? 'bg-purple-400'
                        : member.status === 'away'
                        ? 'bg-amber-400'
                        : 'bg-slate-500'
                    }`}
                  />
                </div>

                <Badge
                  variant={
                    member.department === 'Engineering'
                      ? 'brand'
                      : member.department === 'Product'
                      ? 'purple'
                      : member.department === 'Design'
                      ? 'info'
                      : 'warning'
                  }
                  size="xs"
                >
                  {member.department}
                </Badge>
              </div>

              {/* Name & Role */}
              <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-brand-400 font-medium mt-0.5">
                {member.role}
              </p>

              {/* Email with copy */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                <span className="truncate pr-2 font-mono text-[11px]">
                  {member.email}
                </span>
                <button
                  onClick={() => handleCopyEmail(member.email)}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Copy email"
                >
                  {copiedEmail === member.email ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Stats & Timezone */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-800/80">
                <div className="p-2 rounded-lg bg-slate-900/60">
                  <span className="block text-xs font-bold text-white">
                    {member.projectsCount}
                  </span>
                  <span className="text-[10px] text-slate-400">Projects</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60">
                  <span className="block text-xs font-bold text-white">
                    {member.tasksCount}
                  </span>
                  <span className="text-[10px] text-slate-400">Tasks</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60">
                  <span className="block text-xs font-bold text-brand-300 truncate">
                    {member.timezone}
                  </span>
                  <span className="text-[10px] text-slate-400">Timezone</span>
                </div>
              </div>
            </div>

            {/* Message Action */}
            <div className="mt-5 pt-3 border-t border-slate-800/60">
              <Link to="/chat" className="w-full block">
                <Button variant="secondary" size="sm" icon={MessageSquare} className="w-full">
                  Direct Message
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invite New Teammate"
        subtitle="Add a collaborator to your TeamSync workspace"
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={inviteForm.name}
              onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
              placeholder="e.g. Liam Gallagher"
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Work Email *
            </label>
            <input
              type="email"
              required
              value={inviteForm.email}
              onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
              placeholder="liam.g@teamsync.internal"
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Role
              </label>
              <select
                value={inviteForm.role}
                onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              >
                <option value="Lead Developer">Lead Developer</option>
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Backend Engineer">Backend Engineer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="QA Specialist">QA Specialist</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <select
                value={inviteForm.department}
                onChange={(e) => setInviteForm({ ...inviteForm, department: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="Quality & Sec">Quality & Sec</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Send Invite
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeamMembers;

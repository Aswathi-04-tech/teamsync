import React, { useState } from 'react';
import {
  Video,
  Plus,
  Calendar,
  Clock,
  ExternalLink,
  Users,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { mockMeetings, mockTeamMembers } from '../data/mockData';

const Meetings = () => {
  const [meetingsList, setMeetingsList] = useState(mockMeetings);
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // New Meeting state
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: 'Today',
    time: '04:00 PM - 04:30 PM EST',
    platform: 'TeamSync Call',
    link: 'https://meet.teamsync.internal/room-custom',
  });

  const filteredMeetings = meetingsList.filter((m) => {
    if (activeTab === 'Upcoming') return m.status === 'Upcoming';
    if (activeTab === 'Today') return m.date === 'Today';
    return true;
  });

  const handleCopyLink = (id, link) => {
    navigator.clipboard?.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    if (!newMeeting.title) return;

    const created = {
      id: `mtg_${Date.now()}`,
      title: newMeeting.title,
      description: newMeeting.description || 'Sprint sync meeting.',
      date: newMeeting.date,
      time: newMeeting.time,
      platform: newMeeting.platform,
      link: newMeeting.link,
      status: 'Upcoming',
      attendees: [mockTeamMembers[0], mockTeamMembers[1], mockTeamMembers[2]],
    };

    setMeetingsList([created, ...meetingsList]);
    setIsModalOpen(false);
    setNewMeeting({
      title: '',
      description: '',
      date: 'Today',
      time: '04:00 PM - 04:30 PM EST',
      platform: 'TeamSync Call',
      link: 'https://meet.teamsync.internal/room-custom',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        breadcrumb="Calendar"
        title="Sync & Meetings"
        description="Schedule, join, and collaborate in architectural syncs, sprint planning, and team standups."
        badge={
          <Badge variant="purple" size="sm">
            {meetingsList.filter((m) => m.status === 'Upcoming').length} Upcoming
          </Badge>
        }
      >
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Schedule Sync
        </Button>
      </PageHeader>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {['All', 'Today', 'Upcoming'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-brand-600 to-purpleBrand-600 text-white shadow-glow'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMeetings.map((meeting) => (
          <Card
            key={meeting.id}
            variant="glass"
            className="flex flex-col justify-between hover:border-brand-500/30 transition-all group"
          >
            <div>
              {/* Top Row: Date & Platform Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-brand-300 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {meeting.date}
                </span>

                <div className="flex items-center gap-2">
                  <Badge variant="purple" size="xs">
                    {meeting.platform}
                  </Badge>
                  <Badge
                    variant={
                      meeting.status === 'Completed'
                        ? 'neutral'
                        : meeting.status === 'In Progress'
                        ? 'danger'
                        : 'success'
                    }
                    size="xs"
                  >
                    {meeting.status}
                  </Badge>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                {meeting.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {meeting.description}
              </p>

              {/* Time display */}
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-300 font-medium">
                <Clock className="w-4 h-4 text-brand-400" />
                <span>{meeting.time}</span>
              </div>
            </div>

            {/* Bottom Actions & Attendees */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {meeting.attendees.slice(0, 4).map((att, i) => (
                    <div
                      key={i}
                      title={att.name}
                      className={`w-7 h-7 rounded-full bg-gradient-to-tr ${att.avatarBg} text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-slate-900`}
                    >
                      {att.initials}
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-slate-400">
                  {meeting.attendees.length} syncers
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(meeting.id, meeting.link)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy link"
                >
                  {copiedId === meeting.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={meeting.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-600 to-purpleBrand-600 hover:from-brand-500 hover:to-purpleBrand-500 text-white shadow-glow transition-all flex items-center gap-1.5"
                >
                  Join <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Schedule Sync Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Team Meeting"
        subtitle="Reserve a sync call on the team calendar"
      >
        <form onSubmit={handleScheduleMeeting} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Meeting Title *
            </label>
            <input
              type="text"
              required
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
              placeholder="e.g. Design Token Alignment & Sprint Demo"
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Platform
              </label>
              <select
                value={newMeeting.platform}
                onChange={(e) => setNewMeeting({ ...newMeeting, platform: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              >
                <option value="TeamSync Call">TeamSync Call</option>
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Slack Huddle">Slack Huddle</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="text"
                value={newMeeting.date}
                onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                placeholder="Today or 2026-10-25"
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Time Range
            </label>
            <input
              type="text"
              value={newMeeting.time}
              onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
              placeholder="11:00 AM - 11:30 AM EST"
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Agenda & Topics
            </label>
            <textarea
              rows={3}
              value={newMeeting.description}
              onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
              placeholder="Key discussion points and preparation items..."
              className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Schedule Meeting
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Meetings;

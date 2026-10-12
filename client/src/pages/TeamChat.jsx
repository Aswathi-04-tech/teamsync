import React, { useState } from 'react';
import {
  MessageSquare,
  Hash,
  Send,
  Paperclip,
  Smile,
  Users,
  Search,
  Pin,
  MoreVertical,
  CheckCheck,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  currentUser,
  mockChannels,
  mockDirectMessages,
  mockChatMessages,
  mockTeamMembers,
} from '../data/mockData';

const TeamChat = () => {
  const [activeChannelId, setActiveChannelId] = useState('ch_dev');
  const [messages, setMessages] = useState(mockChatMessages);
  const [inputMessage, setInputMessage] = useState('');

  const activeChannel =
    mockChannels.find((c) => c.id === activeChannelId) || {
      id: activeChannelId,
      name: 'direct-conversation',
      description: 'Private encrypted direct message thread',
    };

  const currentMessages = messages[activeChannelId] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: currentUser,
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [],
    };

    setMessages((prev) => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMsg],
    }));

    setInputMessage('');
  };

  const handleAddReaction = (msgId, emoji) => {
    setMessages((prev) => {
      const channelMsgs = prev[activeChannelId] || [];
      const updated = channelMsgs.map((m) => {
        if (m.id !== msgId) return m;
        const existingReact = m.reactions.find((r) => r.emoji === emoji);
        let newReactions;
        if (existingReact) {
          newReactions = m.reactions.map((r) =>
            r.emoji === emoji ? { ...r, count: r.count + 1 } : r
          );
        } else {
          newReactions = [...m.reactions, { emoji, count: 1 }];
        }
        return { ...m, reactions: newReactions };
      });
      return { ...prev, [activeChannelId]: updated };
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        breadcrumb="Collaboration"
        title="Team Chat Hub"
        description="Real-time engineering channels, sprint standup logs, and team discussions."
        badge={
          <Badge variant="brand" size="sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
            Live Sync
          </Badge>
        }
      />

      {/* Main Chat Interface Container */}
      <div className="h-[750px] bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col md:flex-row shadow-2xl">
        {/* Left Sidebar: Channels & DMs */}
        <div className="w-full md:w-64 lg:w-72 border-r border-slate-800 bg-slate-950/40 flex flex-col shrink-0">
          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Channels & Direct
            </span>
            <span className="text-[10px] font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
              v1.0 Mock
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {/* Channels Group */}
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                Public Channels ({mockChannels.length})
              </div>
              <div className="space-y-0.5">
                {mockChannels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannelId(ch.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeChannelId === ch.id
                        ? 'bg-brand-600 text-white shadow-glow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Hash className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      <span className="truncate">{ch.name}</span>
                    </div>
                    {ch.unread > 0 && activeChannelId !== ch.id && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-brand-500 text-white">
                        {ch.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Messages Group */}
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
                Direct Messages
              </div>
              <div className="space-y-0.5">
                {mockDirectMessages.map((dm) => (
                  <button
                    key={dm.id}
                    onClick={() => setActiveChannelId(dm.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeChannelId === dm.id
                        ? 'bg-purpleBrand-600 text-white shadow-glow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="relative">
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-tr ${dm.user.avatarBg} text-white font-bold text-[8px] flex items-center justify-center`}
                        >
                          {dm.user.initials}
                        </div>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full border border-slate-900 ${
                            dm.user.status === 'active'
                              ? 'bg-emerald-400'
                              : dm.user.status === 'in-meeting'
                              ? 'bg-purple-400'
                              : 'bg-amber-400'
                          }`}
                        />
                      </div>
                      <span className="truncate">{dm.user.name}</span>
                    </div>
                    {dm.unread > 0 && activeChannelId !== dm.id && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-purpleBrand-500 text-white">
                        {dm.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Chat Feed & Composer */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900/40">
          {/* Active Channel Header */}
          <div className="h-14 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-brand-400" />
              <div>
                <h3 className="text-sm font-bold text-white">
                  {activeChannel.name}
                </h3>
                <p className="text-[11px] text-slate-400 truncate max-w-md hidden sm:block">
                  {activeChannel.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {mockTeamMembers.length} members
              </span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {currentMessages.length > 0 ? (
              currentMessages.map((msg) => {
                const isMe = msg.sender.id === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 group ${
                      isMe ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${
                        msg.sender.avatarBg || 'from-indigo-600 to-purple-600'
                      } text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      {msg.sender.initials || msg.sender.avatar || 'U'}
                    </div>

                    <div className={`max-w-[75%] ${isMe ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-200">
                          {msg.sender.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {msg.timestamp}
                        </span>
                      </div>

                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed text-slate-100 ${
                          isMe
                            ? 'bg-gradient-to-br from-brand-600 to-purpleBrand-600 text-white rounded-tr-none shadow-glow'
                            : 'bg-slate-800/90 border border-slate-700/60 rounded-tl-none shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Emoji Reactions */}
                      <div className={`flex items-center gap-1.5 mt-1.5 ${isMe ? 'justify-end' : ''}`}>
                        {msg.reactions?.map((react, i) => (
                          <button
                            key={i}
                            onClick={() => handleAddReaction(msg.id, react.emoji)}
                            className="px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 flex items-center gap-1 transition-colors"
                          >
                            <span>{react.emoji}</span>
                            <span className="text-[10px] font-semibold">{react.count}</span>
                          </button>
                        ))}
                        {/* Quick reaction trigger */}
                        <button
                          onClick={() => handleAddReaction(msg.id, '👍')}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-white transition-opacity text-xs"
                          title="React with thumbs up"
                        >
                          👍
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <MessageSquare className="w-10 h-10 text-slate-600 mb-2" />
                <h4 className="text-sm font-semibold text-slate-300">
                  No messages in #{activeChannel.name} yet
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Send the first message to initiate the discussion!
                </p>
              </div>
            )}
          </div>

          {/* Composer Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/80">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Send message to #${activeChannel.name}...`}
                  className="w-full px-4 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
                />
              </div>
              <Button type="submit" variant="primary" size="sm" icon={Send}>
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;

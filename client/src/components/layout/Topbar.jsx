import React, { useState, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Plus,
  Activity,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { currentUser, mockNotifications } from '../../data/mockData';
import { api } from '../../api/axiosClient';
import Button from '../common/Button';

const Topbar = ({ setIsMobileOpen, onOpenNewTaskModal }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [apiHealth, setApiHealth] = useState({
    status: 'checking',
    message: 'Checking API...',
    dbStatus: 'unknown',
  });

  // Check backend health status on mount
  useEffect(() => {
    let isMounted = true;
    const checkServer = async () => {
      try {
        const res = await api.getHealth();
        if (isMounted) {
          setApiHealth({
            status: 'online',
            message: 'API Live',
            dbStatus: res.data?.database?.status || 'disconnected',
            configured: res.data?.database?.configured,
          });
        }
      } catch (err) {
        if (isMounted) {
          setApiHealth({
            status: 'offline',
            message: 'Server Offline',
            dbStatus: 'disconnected',
            configured: false,
          });
        }
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 30000); // Check every 30s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, tasks, members... (Press Ctrl+K)"
            className="w-full pl-10 pr-12 py-2 text-xs bg-slate-950/70 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 text-slate-400 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: API Status, Actions, Notifications & Avatar */}
      <div className="flex items-center gap-3">
        {/* Backend & DB Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
          <span
            className={`w-2 h-2 rounded-full ${
              apiHealth.status === 'online'
                ? 'bg-emerald-400 animate-pulse'
                : apiHealth.status === 'checking'
                ? 'bg-amber-400'
                : 'bg-rose-500'
            }`}
          />
          <span className="text-slate-300 font-medium">{apiHealth.message}</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-400">
            Atlas:{' '}
            <span
              className={
                apiHealth.dbStatus === 'connected'
                  ? 'text-emerald-400'
                  : 'text-amber-400'
              }
            >
              {apiHealth.dbStatus}
            </span>
          </span>
        </div>

        {/* Quick Action Button */}
        {onOpenNewTaskModal && (
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={onOpenNewTaskModal}
            className="hidden sm:inline-flex"
          >
            New Task
          </Button>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-500 rounded-full border-2 border-slate-900" />
            )}
          </button>

          {/* Notifications Modal / Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-brand-400 hover:text-brand-300 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3.5 hover:bg-slate-800/50 transition-colors ${
                      notif.unread ? 'bg-brand-950/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-200">
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${currentUser.avatarBg} flex items-center justify-center font-bold text-xs text-white shadow-sm ring-1 ring-white/10`}
          >
            {currentUser.avatar}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

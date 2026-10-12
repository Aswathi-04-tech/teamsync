import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  MessageSquare,
  Video,
  Users,
  Settings,
  X,
  Layers,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { currentUser } from '../../data/mockData';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Projects', path: '/projects', icon: FolderKanban, badge: '4' },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare, badge: '9' },
  { name: 'Team Chat', path: '/chat', icon: MessageSquare, badge: '4', badgeColor: 'bg-brand-500' },
  { name: 'Meetings', path: '/meetings', icon: Video, badge: '2', badgeColor: 'bg-purpleBrand-500' },
  { name: 'Team Members', path: '/team', icon: Users },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900/95 border-r border-slate-800/80 backdrop-blur-xl flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-purpleBrand-500 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-brand-300 bg-clip-text text-transparent">
                TeamSync
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-brand-400 -mt-1">
                Workspace
              </span>
            </div>
          </NavLink>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Workspace Hub
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-600/20 via-brand-500/15 to-purpleBrand-500/10 text-white border border-brand-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-brand-400'
                            : 'text-slate-400 group-hover:text-brand-300'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          item.badgeColor
                            ? `${item.badgeColor} text-white`
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Sprint Info Card */}
        <div className="px-3 pb-3">
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-brand-950/80 via-slate-900 to-purpleBrand-950/60 border border-brand-500/20">
            <div className="flex items-center justify-between text-xs font-semibold text-brand-300 mb-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                Sprint 24 Active
              </span>
              <span className="text-slate-400">78%</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">
              9 of 12 milestones delivered
            </p>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-purpleBrand-500 rounded-full"
                style={{ width: '78%' }}
              />
            </div>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/60">
          <NavLink
            to="/settings"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/60 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${currentUser.avatarBg} flex items-center justify-center font-bold text-xs text-white shadow-sm`}
                >
                  {currentUser.avatar}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-white group-hover:text-brand-300 transition-colors">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[110px]">
                  {currentUser.role}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

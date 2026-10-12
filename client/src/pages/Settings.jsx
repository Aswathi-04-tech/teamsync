import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Database,
  Bell,
  Building,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Key,
  Shield,
  Palette,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { currentUser } from '../data/mockData';
import { api } from '../api/axiosClient';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('database');
  const [profile, setProfile] = useState({
    name: currentUser.name,
    role: currentUser.role,
    email: currentUser.email,
    department: currentUser.department,
    bio: 'Leading architecture and system scalability across TeamSync services.',
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Live API test state
  const [apiTesting, setApiTesting] = useState(false);
  const [apiResult, setApiResult] = useState(null);

  const testApiConnection = async () => {
    setApiTesting(true);
    setApiResult(null);
    try {
      const res = await api.getHealth();
      setApiResult({
        success: true,
        data: res.data,
      });
    } catch (err) {
      setApiResult({
        success: false,
        error: err.message || 'Could not connect to backend server',
      });
    } finally {
      setApiTesting(false);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        breadcrumb="Preferences"
        title="Settings & Integrations"
        description="Configure your personal profile, database connections, and workspace settings."
      />

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('database')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'database'
              ? 'bg-gradient-to-r from-brand-600 to-purpleBrand-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Database className="w-4 h-4" /> Database & API
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'profile'
              ? 'bg-gradient-to-r from-brand-600 to-purpleBrand-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <User className="w-4 h-4" /> User Profile
        </button>

        <button
          onClick={() => setActiveTab('workspace')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'workspace'
              ? 'bg-gradient-to-r from-brand-600 to-purpleBrand-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Building className="w-4 h-4" /> Workspace
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'notifications'
              ? 'bg-gradient-to-r from-brand-600 to-purpleBrand-600 text-white shadow-glow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Bell className="w-4 h-4" /> Notifications
        </button>
      </div>

      {/* Tab: DATABASE & API */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          <Card
            variant="glass"
            title="MongoDB Atlas Connection Foundation"
            subtitle="Connect your backend to MongoDB Atlas without hardcoding credentials"
          >
            <div className="space-y-4 text-xs leading-relaxed">
              <p className="text-slate-300">
                TeamSync uses an environment-driven Mongoose architecture. To connect your real MongoDB Atlas cluster, create a local <code className="text-brand-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">server/.env</code> file matching <code className="text-brand-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">server/.env.example</code>.
              </p>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="text-slate-500"># In server/.env:</div>
                <div className="text-emerald-400">PORT=5000</div>
                <div className="text-emerald-400">NODE_ENV=development</div>
                <div className="text-indigo-300">MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@&lt;cluster&gt;.mongodb.net/teamsync?retryWrites=true&amp;w=majority</div>
                <div className="text-emerald-400">CLIENT_URL=http://localhost:5173</div>
              </div>

              <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Security Note:</strong> Never commit your real <code className="font-mono">.env</code> to Git. Root <code className="font-mono">.gitignore</code> already ignores <code className="font-mono">.env*</code> patterns.
                </span>
              </div>
            </div>

            {/* Test Connection Section */}
            <div className="mt-6 pt-5 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Live Backend & Database Ping</h4>
                  <p className="text-xs text-slate-400">Trigger GET /api/health through central Axios client</p>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  icon={RefreshCw}
                  isLoading={apiTesting}
                  onClick={testApiConnection}
                >
                  Ping Health API
                </Button>
              </div>

              {apiResult && (
                <div
                  className={`mt-4 p-4 rounded-xl text-xs font-mono border ${
                    apiResult.success
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="font-bold mb-1">
                    {apiResult.success ? '✓ Endpoint Responded 200 OK:' : '✕ Connection Error:'}
                  </div>
                  <pre className="overflow-x-auto text-[11px]">
                    {JSON.stringify(apiResult.data || apiResult.error, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </Card>

          {/* Central Axios Info */}
          <Card
            variant="glass"
            title="Frontend API Integration"
            subtitle="Centralized client configuration at client/src/api/axiosClient.js"
          >
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All frontend network requests consume <code className="text-brand-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">import.meta.env.VITE_API_URL</code>. In development, requests default to <code className="text-brand-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">http://localhost:5000/api</code> and are proxied seamlessly via Vite.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-[11px] text-slate-300">
              <div className="text-slate-500"># In client/.env:</div>
              <div className="text-brand-300">VITE_API_URL=http://localhost:5000/api</div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab: USER PROFILE */}
      {activeTab === 'profile' && (
        <Card
          variant="glass"
          title="Personal Profile"
          subtitle="Update your publicly visible team profile information"
        >
          {savedSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Changes saved successfully!
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Department
                </label>
                <input
                  type="text"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Bio / Status Note
              </label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" variant="primary" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tab: WORKSPACE */}
      {activeTab === 'workspace' && (
        <Card
          variant="glass"
          title="TeamSync Workspace Information"
          subtitle="Enterprise organization controls and tier configuration"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">Organization</span>
                <span className="text-sm font-bold text-white">TeamSync Engineering</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">Current Plan</span>
                <span className="text-sm font-bold text-brand-400">Enterprise Dedicated</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1">Seat Usage</span>
                <span className="text-sm font-bold text-white">16 / 50 Active Seats</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Tab: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <Card
          variant="glass"
          title="Notification Preferences"
          subtitle="Choose what events trigger desktop and email updates"
        >
          <div className="space-y-4 text-xs">
            {[
              { title: 'Task assignments and mentions', desc: 'Notify me when I am assigned to a task or referenced in a comment.' },
              { title: 'Pull request reviews and approvals', desc: 'Send alerts when a teammate requests a code review.' },
              { title: 'Meeting reminders', desc: 'Alert 15 minutes before daily standups and sprint planning calls.' },
              { title: 'Weekly sprint velocity report', desc: 'Summary of burned down story points and completed milestones.' },
            ].map((item, i) => (
              <label
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:bg-slate-800/40 transition-colors"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-900 text-brand-500 focus:ring-brand-500"
                />
                <div>
                  <div className="font-semibold text-white">{item.title}</div>
                  <div className="text-slate-400 text-[11px]">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Settings;

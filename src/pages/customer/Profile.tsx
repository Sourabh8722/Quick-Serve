import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, Mail, BadgeCheck } from 'lucide-react';

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobileNumber: user?.mobileNumber || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        mobileNumber: user.mobileNumber || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (user && formData.name.trim() && formData.email.trim() && formData.mobileNumber.trim()) {
      await updateUser(user.id, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobileNumber: formData.mobileNumber.trim(),
      });
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary-800)]">Not signed in</h2>
        <p className="text-[var(--color-text-muted)] mt-2">Please sign in to view your profile and bookings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">My Profile</h1>
            <p className="text-[var(--color-text-muted)] mt-1">Account details and booking preferences.</p>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700">Cancel</button>
              <button onClick={handleSave} className="rounded-xl bg-[var(--color-primary-600)] px-4 py-2 text-sm font-semibold text-white">Save Changes</button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="rounded-xl bg-[var(--color-primary-600)] px-4 py-2 text-sm font-semibold text-white">Edit Profile</button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
            <h2 className="font-semibold text-lg text-[var(--color-text-main)] mb-6">Personal Info</h2>
            <div className="space-y-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</span>
                  {isEditing ? (
                     <input 
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none"
                     />
                  ) : (
                    <span className="text-sm font-medium text-slate-900">{user.name}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Mail size={18} />
                </div>
                <div className="flex-1">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</span>
                  {isEditing ? (
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none" />
                  ) : (
                    <span className="text-sm font-medium text-slate-900">{user.email}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <Phone size={18} />
                </div>
                <div className="flex-1">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Mobile Number</span>
                  {isEditing ? (
                    <input type="tel" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none" />
                  ) : (
                    <span className="text-sm font-medium text-slate-900">{user.mobileNumber || 'Not provided'}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <BadgeCheck size={18} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Account Role</span>
                  <span className="text-sm font-medium text-slate-900 capitalize">{user.role.toLowerCase().replace('_', ' ')}</span>
                </div>
              </div>

            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-[var(--color-border-main)] flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-lg text-[var(--color-text-main)] mb-4">Account Settings</h2>
              <p className="text-sm text-[var(--color-text-muted)]">Manage your active sessions and preferences.</p>
              
              <div className="mt-6 rounded-xl bg-gray-50 p-4 border border-gray-100">
                <p className="text-sm text-gray-600">Member since: <span className="font-medium text-gray-900">{new Date(user.joinedAt).toLocaleDateString()}</span></p>
              </div>
            </div>
            
            <button onClick={logout} className="mt-6 w-full bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 hover:border-rose-200 rounded-2xl py-3 font-semibold transition-colors">
              Sign out securely
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

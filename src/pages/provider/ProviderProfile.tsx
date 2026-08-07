import { useState, useEffect } from 'react';
import { Camera, Mail, Phone, BriefcaseBusiness, BadgeCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProviderProfile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    businessName: user?.businessName || '',
    profession: user?.profession || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        businessName: user.businessName || '',
        profession: user.profession || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (user) {
      await updateUser(user.id, formData);
      setIsEditing(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Business Profile</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Provider Profile</h2>
              <p className="mt-2 text-sm text-slate-500">Present a polished, trustworthy business profile to every customer.</p>
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button>
                <button onClick={handleSave} className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white">Save Changes</button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white">Edit Profile</button>
            )}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-sky-500/10 text-sky-600">
                {user.name ? (
                  <span className="text-3xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
                ) : (
                  <Camera size={24} />
                )}
              </div>
              <p className="mt-4 font-semibold text-slate-900">{user.name}</p>
              <p className="mt-2 text-sm text-slate-500">{user.profession || 'Service Provider'}</p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600">{user.providerStatus === 'APPROVED' ? 'Verified' : 'Pending Verification'}</span>
              </div>
            </div>

            <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Business Name</p>
                  {isEditing ? (
                     <input 
                       value={formData.businessName}
                       onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                       className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none"
                     />
                  ) : (
                    <p className="mt-2 text-sm text-slate-600">{user.businessName || 'Not provided'}</p>
                  )}
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Owner Name</p>
                  {isEditing ? (
                     <input 
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none"
                     />
                  ) : (
                    <p className="mt-2 text-sm text-slate-600">{user.name}</p>
                  )}
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Phone</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <Phone size={14} /> {user.mobileNumber || 'Not provided'}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Email</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <Mail size={14} /> {user.email}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Skills / Services</p>
                  {isEditing ? (
                     <input 
                       value={formData.profession}
                       onChange={(e) => setFormData({...formData, profession: e.target.value})}
                       className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none"
                     />
                  ) : (
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                      <BriefcaseBusiness size={14} /> {user.profession || 'Not provided'}
                    </p>
                  )}
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Status</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <BadgeCheck size={14} className={user.providerStatus === 'APPROVED' ? "text-emerald-500" : "text-amber-500"} /> 
                    {user.providerStatus}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

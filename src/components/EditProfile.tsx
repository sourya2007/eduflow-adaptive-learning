import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Bell, Shield, LogOut, Camera, ChevronRight, Save, Settings, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from './ToastProvider';

export default function EditProfile() {
  const [activeTab, setActiveTab] = useState('general');
  const { user, logout, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    updateProfile({ name, email });
    addToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen font-sans">
      <header className="bg-surface shadow-sm sticky top-0 z-50 flex items-center px-md py-sm max-w-[1200px] mx-auto h-16 border-b border-surface-variant">
        <Link to="/student" className="p-2 mr-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-[20px] font-bold text-on-surface">Account Settings</h1>
      </header>

      <main className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col md:flex-row gap-xl">
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <button onClick={() => setActiveTab('general')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-semibold transition-colors ${activeTab === 'general' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
            <User className="w-5 h-5" /> General Profile
          </button>
          <button onClick={() => setActiveTab('notifications')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-semibold transition-colors ${activeTab === 'notifications' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button onClick={() => setActiveTab('security')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-semibold transition-colors ${activeTab === 'security' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
            <Shield className="w-5 h-5" /> Security
          </button>
          <hr className="my-2 border-surface-variant" />
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-semibold text-error hover:bg-error-container transition-colors">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </aside>

        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="flex flex-col gap-lg animate-in fade-in duration-300">
              <div className="bg-surface-container-lowest p-lg rounded-[16px] shadow-sm border border-surface-variant">
                <h2 className="text-[20px] font-bold text-on-surface mb-6">Profile Picture</h2>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN8s4IQMibYGBWNHpjPIr3woSfOm-nHDE3394BKE12_YtLNwyRv8wM6CXeMmv7iqxW04MYEF5pL56tG1sGKuiBDydanE_FRnjddnmhtVD75JHlAT18UvrL-axnsx8LVavxd6O38BawlrUDvUAsqBMgqbSLFTJEYuDT9BuXX4uSGCX3xP-2xD0uAILbn9TznFhTY5hK74HLQHxuyXMPp_1vsJbDRliNkZnhJp2SqenVaDOs-_jewaRgTF_Gq4PUzRXqNrXwdTq1Wh0" alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-surface" />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary-container transition-colors border-2 border-surface">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-on-surface">Upload new image</h3>
                    <p className="text-[14px] text-on-surface-variant mb-3">JPG, GIF or PNG. Max size of 800K</p>
                    <button className="text-[14px] font-semibold text-primary border border-primary-fixed-dim px-4 py-2 rounded-lg hover:bg-primary-fixed transition-colors">Choose File</button>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-lg rounded-[16px] shadow-sm border border-surface-variant flex flex-col gap-md">
                <h2 className="text-[20px] font-bold text-on-surface mb-2">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wide">First Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-[16px]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wide">Last Name</label>
                    <input type="text" disabled className="px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-[16px] opacity-50" />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wide">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-[16px]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2 mt-2">
                    <label className="text-[12px] font-medium text-on-surface-variant uppercase tracking-wide">Learning Style</label>
                    <div className="flex items-center justify-between p-3 border border-outline-variant rounded-lg bg-surface-container-low cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary-fixed text-primary flex items-center justify-center font-bold">V</div>
                        <div>
                          <p className="text-[14px] font-semibold text-on-surface">Visual Learner</p>
                          <p className="text-[12px] text-on-surface-variant">Prefers diagrams, charts, and video</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-outline" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={handleSave} className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-lg text-[14px] font-semibold shadow-sm transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'general' && (
            <div className="bg-surface-container-lowest p-xl rounded-[16px] shadow-sm border border-surface-variant text-center flex flex-col items-center justify-center min-h-[300px]">
              <Settings className="w-12 h-12 text-outline-variant mb-4 animate-spin-slow" />
              <h2 className="text-[20px] font-bold text-on-surface mb-2">Section Under Construction</h2>
              <p className="text-[14px] text-on-surface-variant">This settings panel is coming soon in the next update.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

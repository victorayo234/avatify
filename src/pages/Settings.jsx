import React, { useState, useEffect } from 'react';
import { User, Bell, Lock, Shield, CreditCard, HelpCircle } from 'lucide-react';
import ProfileEditModal from '../components/ProfileEditModal';

const Settings = ({ addToast }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Load profile data from localStorage or use defaults
    const [profileData, setProfileData] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : {
            name: 'Alex Johnson',
            email: 'alex.johnson@pulse.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            avatar: null
        };
    });

    const handleSaveProfile = (formData) => {
        // Save to state
        setProfileData(formData);

        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify(formData));

        // Dispatch custom event to notify other components (like Sidebar)
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: formData }));

        addToast('Profile updated successfully!', 'success');
    };

    // Get initials from name
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const settingsItems = [
        { icon: User, title: 'Account Information', desc: 'Update your personal details', action: () => addToast('Account settings coming soon', 'info') },
        { icon: Bell, title: 'Notifications', desc: 'Manage your alert preferences', action: () => addToast('Notification settings coming soon', 'info') },
        { icon: Lock, title: 'Security', desc: 'Change password and 2FA', action: () => addToast('Security settings coming soon', 'info') },
        { icon: CreditCard, title: 'Billing & Subscription', desc: 'Manage your plan', action: () => addToast('Billing settings coming soon', 'info') },
        { icon: HelpCircle, title: 'Help & Support', desc: 'Get assistance with your account', action: () => addToast('Opening support center...', 'info') }
    ];

    return (
        <>
            <div className="space-y-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white">Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="col-span-1 bg-deep-purple-surface border border-white/5 rounded-3xl p-6 text-center hover-shine purple-glow group">
                        <div className="w-24 h-24 rounded-full bg-deep-purple-accent mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-deep-purple-accent/20 group-hover:scale-110 transition-transform overflow-hidden">
                            {profileData.avatar ? (
                                <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                getInitials(profileData.name)
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-white">{profileData.name}</h3>
                        <p className="text-gray-400 text-sm">Pro Member</p>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="mt-6 w-full py-2 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/5 hover:border-deep-purple-accent/50 transition-all"
                        >
                            Edit Profile
                        </button>
                    </div>

                    {/* Settings Options */}
                    <div className="col-span-2 space-y-4">
                        {settingsItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={item.action}
                                className="flex items-center p-4 bg-deep-purple-surface border border-white/5 rounded-2xl cursor-pointer hover:bg-white/5 hover:border-deep-purple-accent/30 hover:shadow-lg hover:-translate-y-1 transition-all group"
                            >
                                <div className="p-3 bg-deep-purple-dark rounded-xl text-gray-400 group-hover:text-deep-purple-accent transition-colors">
                                    <item.icon size={20} />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h4 className="font-semibold text-white group-hover:text-deep-purple-accent transition-colors">{item.title}</h4>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </div>
                                <div className="text-gray-500 group-hover:translate-x-1 transition-transform">→</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ProfileEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveProfile}
                currentProfile={profileData}
            />
        </>
    );
};

export default Settings;

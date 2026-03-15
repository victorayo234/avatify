import React, { useState } from 'react';
import { 
    User, Bell, Lock, Shield, CreditCard, 
    HelpCircle, ChevronRight, Crown, Mail, 
    Smartphone, MapPin, Globe, Palette 
} from 'lucide-react';
import { motion } from 'framer-motion';
import ProfileEditModal from '../components/ProfileEditModal';

const Settings = ({ addToast }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Load profile data
    const [profileData, setProfileData] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        return saved ? JSON.parse(saved) : {
            name: 'Ayo Ade',
            email: 'ayo@gmail.com',
            phone: '+2348000000001',
            location: 'Lagos, Nigeria',
            avatar: null
        };
    });

    const handleSaveProfile = (formData) => {
        setProfileData(formData);
        localStorage.setItem('userProfile', JSON.stringify(formData));
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: formData }));
        addToast('Profile updated successfully!', 'success');
    };

    const getInitials = (name) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    };

    const categories = [
        {
            group: "Personal Identity",
            items: [
                { id: 'acc', icon: User, title: 'Profile Details', desc: 'Managed name, contact and location', color: 'text-blue-400' },
                { id: 'pref', icon: Palette, title: 'Interface Theme', desc: 'Customize colors and layouts', color: 'text-theme-ash-light' },
            ]
        },
        {
            group: "Security & Access",
            items: [
                { id: 'sec', icon: Shield, title: 'Security Center', desc: '2FA, passwords and session logs', color: 'text-emerald-400' },
                { id: 'notif', icon: Bell, title: 'Communication', desc: 'Push, email and SMS alerts', color: 'text-orange-400' },
            ]
        },
        {
            group: "System & Billing",
            items: [
                { id: 'bill', icon: CreditCard, title: 'Plan & Billing', desc: 'Invoices and subscription status', color: 'text-purple-400' },
                { id: 'sup', icon: HelpCircle, title: 'Support Hub', desc: 'Direct access to assistance', color: 'text-gray-400' },
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Premium Hero Section */}
            <div className="relative overflow-hidden bg-dark-grey-surface/40 border border-white/5 rounded-[3rem] p-8 lg:p-12 ash-glow">
                <div className="absolute top-0 right-0 w-96 h-96 bg-theme-ash/10 blur-[120px] rounded-full -mr-20 -mt-20" />
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12">
                    {/* Large HD Avatar */}
                    <div className="relative group mb-8 lg:mb-0">
                        <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-[2.5rem] bg-gradient-to-br from-theme-ash to-dark-grey-base p-1 shadow-2xl transition-transform group-hover:scale-[1.02]">
                            <div className="w-full h-full rounded-[2.4rem] bg-dark-grey-surface flex items-center justify-center overflow-hidden border border-white/5">
                                {profileData.avatar ? (
                                    <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="text-white/40 w-1/2 h-1/2" />
                                )}
                            </div>
                        </div>
                        <div className="absolute -bottom-4 right-4 bg-emerald-500 text-black p-2 rounded-2xl shadow-xl flex items-center space-x-1">
                            <Crown size={14} className="font-bold" />
                            <span className="text-[10px] font-black uppercase tracking-tighter">PRO</span>
                        </div>
                    </div>

                    <div className="flex-1 text-center lg:text-left space-y-4">
                        <div>
                            <h2 className="text-4xl lg:text-6xl font-display font-black text-white tracking-tight">{profileData.name}</h2>
                            <p className="text-theme-ash-light font-medium mt-1 flex items-center justify-center lg:justify-start space-x-2">
                                <Crown size={18} />
                                <span>Master Subscription Tier</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
                            <div className="flex items-center space-x-3 text-gray-400 text-sm bg-white/5 p-3 rounded-2xl">
                                <Mail size={16} />
                                <span className="truncate">{profileData.email}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400 text-sm bg-white/5 p-3 rounded-2xl">
                                <Smartphone size={16} />
                                <span>{profileData.phone}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400 text-sm bg-white/5 p-3 rounded-2xl">
                                <MapPin size={16} />
                                <span>{profileData.location}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400 text-sm bg-white/5 p-3 rounded-2xl">
                                <Globe size={16} />
                                <span>UTC +01:00</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="w-full sm:w-80 px-10 py-4 bg-theme-ash text-white font-bold rounded-2xl hover:bg-theme-ash-light transition-all shadow-xl shadow-theme-ash/20"
                            >
                                Edit System Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Structured Settings Groups */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {categories.map((cat, idx) => (
                    <div key={idx} className="space-y-6">
                        <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] ml-2">{cat.group}</h4>
                        <div className="space-y-4">
                            {cat.items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ y: -2 }}
                                    onClick={() => addToast(`${item.title} specialized panel coming soon`, 'info')}
                                    className="p-6 bg-dark-grey-surface/40 border border-white/5 rounded-[2rem] cursor-pointer hover:bg-white/5 hover:border-theme-ash/30 transition-all group flex items-start space-x-4"
                                >
                                    <div className={`p-4 bg-dark-grey-base rounded-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                                        <item.icon size={22} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="font-bold text-white text-lg tracking-tight group-hover:text-theme-ash-light transition-colors">{item.title}</h5>
                                        <p className="text-xs text-gray-500 leading-relaxed mt-1">{item.desc}</p>
                                    </div>
                                    <div className="text-gray-700 group-hover:text-theme-ash-light transition-colors pt-1">
                                        <ChevronRight size={20} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>



            <ProfileEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveProfile}
                currentProfile={profileData}
            />
        </div>
    );
};

export default Settings;

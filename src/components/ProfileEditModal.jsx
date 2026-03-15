import React, { useState, useEffect } from 'react';
import { X, Upload, User, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileEditModal = ({ isOpen, onClose, onSave, currentProfile }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        avatar: null
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    // Load current profile data when modal opens
    useEffect(() => {
        if (isOpen && currentProfile) {
            setFormData(currentProfile);
            setPreviewUrl(currentProfile.avatar);
        }
    }, [isOpen, currentProfile]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData(prev => ({ ...prev, avatar: base64String }));
                setPreviewUrl(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const getInitials = (name) => {
        if (!name) return 'AJ';
        return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    };

    const labelStyle = "block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1";
    const inputStyle = "w-full bg-dark-grey-base border border-white/5 rounded-2xl px-5 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-theme-ash/40 focus:ring-4 focus:ring-theme-ash/5 transition-all";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                    >
                        <div className="bg-dark-grey-surface/90 border border-white/10 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] w-full max-w-xl overflow-hidden backdrop-blur-2xl">
                            {/* Header */}
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-display font-black text-white">System Profile</h2>
                                    <p className="text-xs text-gray-500 mt-1">Update your identification across the node network.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-3 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white transition-all border border-transparent hover:border-white/5"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                                    {/* Avatar Upload */}
                                    <div className="relative group">
                                        <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-tr from-theme-ash to-dark-grey-base p-1 shadow-2xl group-hover:scale-105 transition-transform">
                                            <div className="w-full h-full rounded-[1.8rem] bg-dark-grey-surface flex items-center justify-center overflow-hidden border border-white/5">
                                                {previewUrl ? (
                                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={48} className="text-white/40" />
                                                )}
                                            </div>
                                        </div>
                                        <label className="absolute -bottom-2 -right-2 p-3 bg-theme-ash text-black rounded-2xl cursor-pointer hover:bg-theme-ash-light transition-all shadow-xl border-4 border-dark-grey-surface group-hover:rotate-12">
                                            <Upload size={18} />
                                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                        </label>
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h4 className="text-white font-bold text-lg">Identity Snapshot</h4>
                                        <p className="text-gray-500 text-xs mt-1">Supported formats: JPG, PNG, WEBP. Max size 2MB.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={labelStyle}><User size={14} className="inline mr-2 text-theme-ash" />Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            className={inputStyle}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyle}><Mail size={14} className="inline mr-2 text-theme-ash" />Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className={inputStyle}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyle}><Phone size={14} className="inline mr-2 text-theme-ash" />Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            className={inputStyle}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelStyle}><MapPin size={14} className="inline mr-2 text-theme-ash" />Location</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => handleChange('location', e.target.value)}
                                            className={inputStyle}
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-8 py-4 rounded-2xl border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 transition-all font-bold"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-8 py-4 rounded-2xl bg-theme-ash text-white hover:bg-theme-ash-light transition-all font-bold shadow-2xl shadow-theme-ash/20"
                                    >
                                        Synchronize
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProfileEditModal;

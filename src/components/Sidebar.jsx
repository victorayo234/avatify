import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Wallet, ArrowRightLeft, PieChart, Settings, ChevronLeft, ChevronRight, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, toggleCollapse, isMobileOpen, closeMobile, addToast }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Load profile data from localStorage
    const [profileData, setProfileData] = useState({
        name: 'Ayo Ade',
        email: 'ayo@gmail.com',
        phone: '+2348000000001',
        location: 'Lagos, Nigeria',
        avatar: null
    });

    useEffect(() => {
        const loadProfile = () => {
            const saved = localStorage.getItem('userProfile');
            if (saved) {
                setProfileData(JSON.parse(saved));
            }
        };

        loadProfile();

        // Listen for storage changes (when profile is updated in Settings)
        window.addEventListener('storage', loadProfile);

        // Also listen for custom event for same-tab updates
        const handleProfileUpdate = (e) => {
            if (e.detail) {
                setProfileData(e.detail);
            }
        };
        window.addEventListener('profileUpdated', handleProfileUpdate);

        return () => {
            window.removeEventListener('storage', loadProfile);
            window.removeEventListener('profileUpdated', handleProfileUpdate);
        };
    }, []);

    // Get initials from name
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Map paths to active items
    const getActiveItem = () => {
        const path = location.pathname;
        if (path === '/') return 'Overview';
        if (path === '/assets') return 'Assets';
        if (path === '/converter') return 'Converter';
        if (path === '/market') return 'Market';
        if (path === '/settings') return 'Settings';
        return 'Overview';
    };

    const activeItem = getActiveItem();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/' },
        { name: 'Assets', icon: Wallet, path: '/assets' },
        { name: 'Converter', icon: ArrowRightLeft, path: '/converter' },
        { name: 'Market', icon: PieChart, path: '/market' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    const sidebarVariants = {
        desktop: {
            width: isCollapsed ? 80 : 250,
            transition: { duration: 0.3, type: "spring", stiffness: 100, damping: 20 }
        },
        mobile: {
            x: isMobileOpen ? 0 : -280,
            width: 280,
            transition: { duration: 0.3, type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.aside
                variants={sidebarVariants}
                animate="desktop"
                className="hidden lg:flex h-screen sticky top-0 left-0 z-50 flex-col border-r border-white/10 bg-slate-900/50 backdrop-blur-xl text-white"
            >
                <SidebarContent
                    isCollapsed={isCollapsed}
                    toggleCollapse={toggleCollapse}
                    activeItem={activeItem}
                    navigate={navigate}
                    menuItems={menuItems}
                    profileData={profileData}
                    getInitials={getInitials}
                />
            </motion.aside>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.aside
                        variants={sidebarVariants}
                        initial="mobile"
                        animate="mobile"
                        exit={{ x: -280 }}
                        className={`fixed inset-y-0 left-0 z-50 flex lg:hidden flex-col border-r border-white/10 bg-slate-900 text-white shadow-2xl`}
                    >
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <div className="text-2xl font-bold text-white tracking-wide">AVATIFY</div>
                            <button onClick={closeMobile} className="p-2 text-gray-400 hover:text-white">
                                <ChevronLeft size={24} />
                            </button>
                        </div>

                        <nav className="flex-1 px-4 space-y-2 mt-4">
                            {menuItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        navigate(item.path);
                                        closeMobile();
                                    }}
                                    className={`flex items-center w-full p-4 rounded-xl transition-all duration-300 ${activeItem === item.name
                                        ? 'bg-theme-ash text-white shadow-lg shadow-theme-ash/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon size={24} />
                                    <span className="ml-4 font-medium text-lg">{item.name}</span>
                                </button>
                            ))}
                        </nav>

                        {/* Mobile Profile Section */}
                        <div className="mx-4 mb-4 p-4 bg-white/5 rounded-2xl flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-theme-ash flex items-center justify-center font-bold text-white overflow-hidden shadow-lg shadow-theme-ash/20">
                                {profileData.avatar ? (
                                    <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={24} className="text-white/40" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{profileData.name}</h4>
                                <span className="text-xs text-gray-400">Pro Account</span>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/5">
                            <button
                                onClick={() => addToast('Logging out...', 'info')}
                                className="flex items-center w-full text-rose-400 hover:text-rose-300 transition-colors"
                            >
                                <LogOut size={24} />
                                <span className="ml-4 font-medium">Logout</span>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

const SidebarContent = ({ isCollapsed, toggleCollapse, activeItem, menuItems, navigate, profileData, getInitials }) => (
    <div className="flex flex-col h-full relative">
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-white/5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-theme-ash-light via-theme-ash to-theme-ash-light flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-theme-ash-light/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                A
            </div>
            {!isCollapsed && (
                <span className="ml-3 font-bold text-xl tracking-tight text-white">
                    Avatify<span className="text-theme-ash-light">.</span>
                </span>
            )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto scrollbar-hide">
            {menuItems.map((item) => {
                const isActive = activeItem === item.name || (activeItem === 'Overview' && item.name === 'Overview');

                return (
                    <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center p-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                            ? 'bg-theme-ash/10 text-white shadow-lg shadow-theme-ash/20 border border-theme-ash/50'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                            }`}
                    >
                        <item.icon
                            size={22}
                            className={`${activeItem === item.name ? 'text-white' : 'group-hover:text-white'} transition-colors shrink-0`}
                        />
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="ml-4 font-medium whitespace-nowrap"
                            >
                                {item.name}
                            </motion.span>
                        )}
                    </button>
                );
            })}
        </nav>

        <div className="p-4 border-t border-white/5">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'}`}>
                <div className="w-10 h-10 rounded-full bg-theme-ash flex items-center justify-center font-bold text-white shrink-0 cursor-pointer hover:ring-2 ring-white/20 transition-all overflow-hidden">
                    {profileData.avatar ? (
                        <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User size={20} className="text-white/40" />
                    )}
                </div>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 min-w-0"
                    >
                        <h4 className="font-semibold text-sm truncate">{profileData.name}</h4>
                        <span className="text-xs text-gray-400">Pro Account</span>
                    </motion.div>
                )}
            </div>
        </div>
    </div>
);

export default Sidebar;

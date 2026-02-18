import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Wallet, ArrowRightLeft, PieChart, Settings, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, toggleCollapse, isMobileOpen, closeMobile, addToast }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Load profile data from localStorage
    const [profileData, setProfileData] = useState({
        name: 'Alex Johnson',
        email: 'alex.johnson@pulse.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
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
                className="hidden md:flex h-screen sticky top-0 left-0 z-50 flex-col border-r border-white/10 bg-slate-900/50 backdrop-blur-xl text-white"
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
                        className={`fixed inset-y-0 left-0 z-50 flex md:hidden flex-col border-r border-white/10 bg-slate-900 text-white shadow-2xl`}
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
                                    className={`flex items-center w-full p-4 rounded-xl transition-all duration-200 ${activeItem === item.name
                                        ? 'bg-deep-purple-accent text-white shadow-lg shadow-deep-purple-accent/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon size={24} />
                                    <span className="ml-4 font-medium text-lg">{item.name}</span>
                                </button>
                            ))}
                        </nav>

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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-electric-blue-500 to-deep-purple-accent flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-electric-blue-500/20">
                A
            </div>
            {!isCollapsed && (
                <span className="ml-3 font-bold text-xl tracking-tight text-white">
                    Avatify<span className="text-electric-blue-500">.</span>
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
                            ? 'bg-deep-purple-accent/10 text-white shadow-lg shadow-deep-purple-accent/20 border border-deep-purple-accent/50'
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
                <div className="w-10 h-10 rounded-full bg-deep-purple-accent flex items-center justify-center font-bold text-white shrink-0 cursor-pointer hover:ring-2 ring-white/20 transition-all overflow-hidden">
                    {profileData.avatar ? (
                        <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        getInitials(profileData.name)
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

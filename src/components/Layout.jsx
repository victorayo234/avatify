import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children, addToast }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);
    const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
    const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

    return (
        <div className="flex min-h-screen bg-slate-900 text-white font-display overflow-hidden selection:bg-electric-blue-500/30">
            {/* Sidebar with responsive props */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleCollapse={toggleSidebarCollapse}
                isMobileOpen={isMobileSidebarOpen}
                closeMobile={closeMobileSidebar}
                addToast={addToast}
            />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative transition-all duration-300">
                <div className="absolute inset-0 pointer-events-none">
                    {/* Background decoration if needed */}
                </div>

                {/* Navbar with mobile toggle */}
                <Navbar onMenuClick={toggleMobileSidebar} addToast={addToast} />

                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <div className="w-full space-y-6 relative z-10 pb-20 md:pb-0">
                        {children}

                        {/* Footer */}
                        <footer className="pt-8 pb-4 text-center text-xs text-gray-400 font-medium">
                            <p>© 2026 Ayo Adebesin. Made with passion & precision.</p>
                        </footer>
                    </div>
                </div>
            </main>

            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={closeMobileSidebar}
                />
            )}
        </div>
    );
};

export default Layout;

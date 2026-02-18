import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle size={20} />,
        error: <XCircle size={20} />,
        warning: <AlertTriangle size={20} />,
        info: <Info size={20} />
    };

    const styles = {
        success: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500',
        error: 'bg-red-500/10 border-red-500/50 text-red-500',
        warning: 'bg-orange-500/10 border-orange-500/50 text-orange-500',
        info: 'bg-blue-500/10 border-blue-500/50 text-blue-500'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-lg ${styles[type]}`}
        >
            <div className="shrink-0">{icons[type]}</div>
            <p className="text-sm font-medium text-white flex-1">{message}</p>
            <button
                onClick={onClose}
                className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
                <X size={16} />
            </button>
        </motion.div>
    );
};

export const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-20 right-6 z-50 space-y-3 max-w-sm w-full">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toast;

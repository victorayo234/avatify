import React from 'react';
import { MoreHorizontal, ShoppingCart, User, AlertCircle, CheckCircle } from 'lucide-react';

const activities = [
    { id: 1, type: 'order', title: 'New Order #4292', time: '2 min ago', icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 2, type: 'user', title: 'New User Registered', time: '15 min ago', icon: User, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 3, type: 'alert', title: 'System Alert: High CPU', time: '1 hr ago', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 4, type: 'payment', title: 'Payment Received', time: '2 hrs ago', icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 5, type: 'order', title: 'New Order #4291', time: '3 hrs ago', icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

const RecentActivity = () => {
    return (
        <div className="bg-deep-purple-surface border border-white/5 rounded-3xl p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="space-y-6 relative ml-2">
                {/* Timeline vertical line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/5 -z-10" />

                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/5 ${activity.bg} ${activity.color}`}>
                            <activity.icon size={18} />
                        </div>
                        <div className="flex-1 pt-1">
                            <h4 className="text-sm font-bold text-white">{activity.title}</h4>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 rounded-xl border border-white/5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                View All Activity
            </button>
        </div>
    );
};

export default RecentActivity;

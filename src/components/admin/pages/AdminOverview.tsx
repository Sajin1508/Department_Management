import React from 'react';
import { SUBJECTS, INTERNAL_MARKS_DATA } from '../../../constants';
import { UsersIcon, BriefcaseIcon, MarksIcon, SendIcon, UserPlusIcon, ChartBarIcon } from '../../icons/Icons';
import { useAppContext } from '../../../contexts/AppContext';
import type { AdminPage } from '../../../types';

const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string; onClick: () => void; }> = ({ title, value, icon, color, onClick }) => (
    <button onClick={onClick} className={`bg-surface p-6 rounded-xl shadow-lg flex items-center space-x-4 border-l-4 ${color} text-left w-full transition-transform transform hover:scale-105`}>
        <div className="text-primary">{icon}</div>
        <div>
            <p className="text-3xl font-bold text-text-primary">{value}</p>
            <p className="text-text-secondary">{title}</p>
        </div>
    </button>
);

const QuickActionCard: React.FC<{ title: string, description: string, icon: React.ReactNode, onClick: () => void }> = ({ title, description, icon, onClick }) => (
    <button onClick={onClick} className="bg-gray-700/50 p-5 rounded-lg text-left w-full hover:bg-gray-700 transition-colors flex items-center space-x-4">
        <div className="text-primary">{icon}</div>
        <div>
            <h4 className="font-semibold text-text-primary">{title}</h4>
            <p className="text-sm text-text-secondary">{description}</p>
        </div>
    </button>
);

const CircularProgress: React.FC<{ percentage: number; size?: number; strokeWidth?: number; }> = ({ percentage, size = 120, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
            <circle
                className="text-gray-700"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                className="text-secondary"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
            <text
                className="text-text-primary font-bold"
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize={size / 5}
                transform={`rotate(90 ${size/2} ${size/2})`}
            >
                {`${Math.round(percentage)}%`}
            </text>
        </svg>
    );
};

interface AdminOverviewProps {
    onNavigate: (page: AdminPage) => void;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigate }) => {
    const { students, staff } = useAppContext();
    
    const calculateOverallPerformance = () => {
        if (INTERNAL_MARKS_DATA.length === 0) return 0;
        const totalSum = INTERNAL_MARKS_DATA.reduce((acc, curr) => acc + curr.total, 0);
        return totalSum / INTERNAL_MARKS_DATA.length;
    };

    const overallPerformance = calculateOverallPerformance();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-text-primary mb-2">System Overview</h2>
                <p className="text-text-secondary">A quick glance at the department's key metrics.</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Students" value={students.length} icon={<UsersIcon />} color="border-primary" onClick={() => onNavigate('STUDENTS')} />
                <StatCard title="Total Staff" value={staff.length} icon={<BriefcaseIcon />} color="border-secondary" onClick={() => onNavigate('STAFF')} />
                 <div className="bg-surface p-6 rounded-xl shadow-lg flex items-center space-x-4 border-l-4 border-yellow-500 text-left w-full">
                    <div className="text-primary"><MarksIcon /></div>
                    <div>
                        <p className="text-3xl font-bold text-text-primary">{SUBJECTS.length}</p>
                        <p className="text-text-secondary">Total Subjects</p>
                    </div>
                </div>
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-surface rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-2">
                        <ChartBarIcon className="w-5 h-5 text-secondary mr-3" />
                        <h3 className="text-xl font-semibold text-text-primary">Overall Performance</h3>
                    </div>
                    <p className="text-sm text-text-secondary mb-4">Based on average internal marks.</p>
                    <div className="flex items-center justify-center mt-4">
                        <CircularProgress percentage={overallPerformance} />
                    </div>
                </div>
                <div className="lg:col-span-2 bg-surface rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-text-primary">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <QuickActionCard title="Create New User" description="Add a new student, staff, or admin." icon={<UserPlusIcon/>} onClick={() => onNavigate('CREATE_USER')} />
                        <QuickActionCard title="Send Notification" description="Broadcast a message to all students." icon={<SendIcon/>} onClick={() => onNavigate('SEND_NOTIFICATION')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
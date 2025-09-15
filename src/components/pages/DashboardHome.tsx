import React from 'react';
// FIX: The 'Page' type was not exported from App.tsx. The correct type for the student dashboard is 'StudentPage' from '../../types'.
import type { StudentPage } from '../../types';
import { ATTENDANCE_DATA } from '../../constants';
import { TimetableIcon, MarksIcon, AttendanceIcon, NotificationIcon, NotesIcon } from '../icons/Icons';
import { useAppContext } from '../../contexts/AppContext';

interface DashboardHomeProps {
    onNavigate: (page: StudentPage) => void;
}

const QuickAccessCard: React.FC<{
  title: string;
  page: StudentPage;
  icon: React.ReactNode;
  onNavigate: (page: StudentPage) => void;
  bgColor: string;
}> = ({ title, page, icon, onNavigate, bgColor }) => (
  <button
    onClick={() => onNavigate(page)}
    className={`p-6 rounded-xl flex flex-col items-center justify-center text-center text-white transition-transform transform hover:scale-105 hover:shadow-2xl ${bgColor}`}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
  </button>
);

const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
    // FIX: Replaced NOTIFICATIONS_DATA with notifications from AppContext to fix import error.
    const { notifications } = useAppContext();
    const lowAttendanceSubjects = ATTENDANCE_DATA.filter(sub => sub.percentage < 90);
    const unreadNotifications = notifications.filter(n => !n.isRead);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-text-primary mb-2">Hello, Sajin!</h2>
                <p className="text-text-secondary">Here's a quick overview of your academic status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <QuickAccessCard title="Timetable" page="TIMETABLE" onNavigate={onNavigate} icon={<TimetableIcon />} bgColor="bg-gradient-to-br from-blue-500 to-blue-600" />
                <QuickAccessCard title="Internal Marks" page="MARKS" onNavigate={onNavigate} icon={<MarksIcon />} bgColor="bg-gradient-to-br from-green-500 to-green-600" />
                <QuickAccessCard title="Attendance" page="ATTENDANCE" onNavigate={onNavigate} icon={<AttendanceIcon />} bgColor="bg-gradient-to-br from-yellow-500 to-yellow-600" />
                <QuickAccessCard title="Notifications" page="NOTIFICATIONS" onNavigate={onNavigate} icon={<NotificationIcon />} bgColor="bg-gradient-to-br from-purple-500 to-purple-600" />
                <QuickAccessCard title="Notes" page="NOTES" onNavigate={onNavigate} icon={<NotesIcon />} bgColor="bg-gradient-to-br from-pink-500 to-pink-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-text-primary">Recent Notifications</h3>
                    <div className="space-y-4">
                        {unreadNotifications.slice(0, 3).map(notification => (
                            <div key={notification.id} className="p-3 bg-gray-700/50 rounded-lg">
                                <p className="font-semibold text-primary">{notification.title}</p>
                                <p className="text-sm text-text-secondary">{notification.content}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                            </div>
                        ))}
                         {unreadNotifications.length === 0 && <p className="text-text-secondary">No new notifications.</p>}
                    </div>
                </div>

                <div className="bg-surface rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-text-primary">Attendance Alert</h3>
                    {lowAttendanceSubjects.length > 0 ? (
                        <div className="space-y-3">
                            {lowAttendanceSubjects.map(sub => (
                                 <p key={sub.subjectId} className="text-sm text-yellow-400">Your attendance in <span className="font-bold">{sub.subjectId.toUpperCase()}</span> is <span className="font-bold">{sub.percentage}%</span>. Please be regular.</p>
                            ))}
                        </div>
                    ) : (
                        <p className="text-text-secondary">Great job! Your attendance is good in all subjects.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
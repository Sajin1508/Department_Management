import React, { useState, useCallback } from 'react';
// FIX: The 'StudentPage' type was not exported from App.tsx. It is defined in types.ts.
import type { StudentPage, User } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardHome from './pages/DashboardHome';
import Timetable from './pages/Timetable';
import InternalMarks from './pages/InternalMarks';
import Attendance from './pages/Attendance';
import Notifications from './pages/Notifications';
import NotesChat from './pages/NotesChat';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const pageTitles: { [key in StudentPage]: string } = {
    DASHBOARD: 'Dashboard',
    TIMETABLE: 'Timetable',
    MARKS: 'Internal Marks',
    ATTENDANCE: 'Attendance',
    NOTIFICATIONS: 'Notifications',
    NOTES: 'Notes & Materials',
};

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState<StudentPage>('DASHBOARD');

  const navigate = useCallback((page: StudentPage) => {
    setCurrentPage(page);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'TIMETABLE':
        return <Timetable />;
      case 'MARKS':
        return <InternalMarks />;
      case 'ATTENDANCE':
        return <Attendance />;
      case 'NOTIFICATIONS':
        return <Notifications />;
      case 'NOTES':
        return <NotesChat />;
      case 'DASHBOARD':
      default:
        return <DashboardHome onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={navigate} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={pageTitles[currentPage]} user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
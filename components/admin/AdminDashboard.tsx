import React, { useState, useCallback } from 'react';
import type { AdminPage } from '../../types';
import type { User } from '../../types';
import AdminSidebar from './AdminSidebar';
import Header from '../Header';
import AdminOverview from './pages/AdminOverview';
import ManageStudents from './pages/ManageStudents';
import ManageStaff from './pages/ManageStaff';
import ManageDayOrder from './pages/ManageDayOrder';
import SendNotification from './pages/SendNotification';
import SendNote from './pages/SendNote';
import CreateUser from './pages/CreateUser';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const pageTitles: { [key in AdminPage]: string } = {
    OVERVIEW: 'Admin Overview',
    STUDENTS: 'Manage Students',
    STAFF: 'Manage Staff',
    MANAGE_DAY_ORDER: 'Set Day Order',
    SEND_NOTIFICATION: 'Send Notification',
    SEND_NOTE: 'Send Note/Material',
    CREATE_USER: 'Create New User',
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('OVERVIEW');

  const navigate = useCallback((page: AdminPage) => {
    setCurrentPage(page);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'STUDENTS':
        return <ManageStudents />;
      case 'STAFF':
        return <ManageStaff />;
      case 'MANAGE_DAY_ORDER':
        return <ManageDayOrder />;
      case 'SEND_NOTIFICATION':
        return <SendNotification />;
      case 'SEND_NOTE':
        return <SendNote />;
      case 'CREATE_USER':
        return <CreateUser />;
      case 'OVERVIEW':
      default:
        return <AdminOverview onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar currentPage={currentPage} onNavigate={navigate} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={pageTitles[currentPage]} user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
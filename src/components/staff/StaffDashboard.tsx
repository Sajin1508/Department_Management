import React, { useState, useCallback } from 'react';
// FIX: The 'StaffPage' type was not exported from App.tsx. It is defined in types.ts.
import type { StaffPage, User } from '../../types';
import StaffSidebar from './StaffSidebar';
import Header from '../Header';
import StaffDashboardHome from './pages/StaffDashboardHome';

interface StaffDashboardProps {
  user: User;
  onLogout: () => void;
}

const pageTitles: { [key in StaffPage]: string } = {
    DASHBOARD: 'Staff Dashboard',
};

const StaffDashboard: React.FC<StaffDashboardProps> = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState<StaffPage>('DASHBOARD');

  const navigate = useCallback((page: StaffPage) => {
    setCurrentPage(page);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'DASHBOARD':
      default:
        return <StaffDashboardHome user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <StaffSidebar currentPage={currentPage} onNavigate={navigate} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={pageTitles[currentPage]} user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
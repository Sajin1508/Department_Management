import React, { useState, useCallback } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import StaffDashboard from './components/staff/StaffDashboard';
import type { User } from './types';
import { AppContextProvider } from './contexts/AppContext';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const renderContent = () => {
    if (!currentUser) {
      return <Auth onLogin={handleLogin} />;
    }
    switch (currentUser.role) {
      case 'STUDENT':
        return <Dashboard user={currentUser} onLogout={handleLogout} />;
      case 'ADMIN':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
       case 'STAFF':
         return <StaffDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        // This case should not be reached if roles are handled correctly
        return <Auth onLogin={handleLogin} />;
    }
  };

  return (
    <AppContextProvider>
      <div className="min-h-screen bg-background text-text-primary">
        {renderContent()}
      </div>
    </AppContextProvider>
  );
};

export default App;
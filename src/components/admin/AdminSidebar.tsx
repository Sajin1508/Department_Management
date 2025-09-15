import React from 'react';
import type { AdminPage } from '../../types';
// FIX: Imported the missing NotesIcon component.
import { DashboardIcon, UsersIcon, BriefcaseIcon, LogoutIcon, CalendarDayIcon, SendIcon, UserPlusIcon, NotesIcon } from '../icons/Icons';

interface AdminSidebarProps {
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  page: AdminPage;
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ page, currentPage, onNavigate, icon, label }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onNavigate(page)}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-primary text-white shadow-lg'
          : 'text-text-secondary hover:bg-surface hover:text-text-primary'
      }`}
    >
      {icon}
      <span className="ml-4">{label}</span>
    </button>
  );
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
  return (
    <div className="w-64 bg-surface flex-shrink-0 p-4 flex flex-col justify-between border-r border-border">
      <div>
        <div className="flex items-center justify-center p-4 mb-6">
          <h1 className="text-2xl font-bold text-white">Admin<span className="text-primary">. Panel</span></h1>
        </div>
        <nav className="space-y-2">
          <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dashboard</h3>
          <NavItem page="OVERVIEW" currentPage={currentPage} onNavigate={onNavigate} icon={<DashboardIcon />} label="Overview" />

          <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</h3>
          <NavItem page="STUDENTS" currentPage={currentPage} onNavigate={onNavigate} icon={<UsersIcon />} label="Manage Students" />
          <NavItem page="STAFF" currentPage={currentPage} onNavigate={onNavigate} icon={<BriefcaseIcon />} label="Manage Staff" />
          <NavItem page="CREATE_USER" currentPage={currentPage} onNavigate={onNavigate} icon={<UserPlusIcon />} label="Create User" />

          <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</h3>
          <NavItem page="MANAGE_DAY_ORDER" currentPage={currentPage} onNavigate={onNavigate} icon={<CalendarDayIcon />} label="Set Day Order" />
          <NavItem page="SEND_NOTIFICATION" currentPage={currentPage} onNavigate={onNavigate} icon={<SendIcon />} label="Send Notification" />
          <NavItem page="SEND_NOTE" currentPage={currentPage} onNavigate={onNavigate} icon={<NotesIcon />} label="Send Note" />
        </nav>
      </div>
      <div>
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-text-secondary hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
        >
          <LogoutIcon />
          <span className="ml-4">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
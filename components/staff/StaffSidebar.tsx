import React from 'react';
// FIX: The 'StaffPage' type was not exported from App.tsx. It is defined in types.ts.
import type { StaffPage } from '../../types';
import { DashboardIcon, MarksIcon, AttendanceIcon, NotesIcon, LogoutIcon } from '../icons/Icons';

interface StaffSidebarProps {
  currentPage: StaffPage;
  onNavigate: (page: StaffPage) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  page: StaffPage;
  currentPage: StaffPage;
  onNavigate: (page: StaffPage) => void;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
}> = ({ page, currentPage, onNavigate, icon, label, disabled }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onNavigate(page)}
      disabled={disabled}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-primary text-white shadow-lg'
          : disabled 
            ? 'text-gray-500 cursor-not-allowed' 
            : 'text-text-secondary hover:bg-surface hover:text-text-primary'
      }`}
    >
      {icon}
      <span className="ml-4">{label}</span>
      {disabled && <span className="text-xs ml-auto bg-gray-600 px-2 py-0.5 rounded-full">Soon</span>}
    </button>
  );
};

const StaffSidebar: React.FC<StaffSidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
  return (
    <div className="w-64 bg-surface flex-shrink-0 p-4 flex flex-col justify-between border-r border-border">
      <div>
        <div className="flex items-center justify-center p-4 mb-6">
          <h1 className="text-2xl font-bold text-white">Staff<span className="text-primary">. Portal</span></h1>
        </div>
        <nav className="space-y-2">
          <NavItem page="DASHBOARD" currentPage={currentPage} onNavigate={onNavigate} icon={<DashboardIcon />} label="Dashboard" />
          <NavItem page="DASHBOARD" currentPage={currentPage} onNavigate={onNavigate} icon={<MarksIcon />} label="Manage Marks" disabled />
          <NavItem page="DASHBOARD" currentPage={currentPage} onNavigate={onNavigate} icon={<AttendanceIcon />} label="Manage Attendance" disabled />
          <NavItem page="DASHBOARD" currentPage={currentPage} onNavigate={onNavigate} icon={<NotesIcon />} label="Send Notes" disabled />
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

export default StaffSidebar;
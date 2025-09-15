import React from 'react';
// FIX: The 'Page' type was not exported from App.tsx. The correct type for the student dashboard sidebar is 'StudentPage' from '../types'.
import type { StudentPage } from '../types';
import { DashboardIcon, TimetableIcon, MarksIcon, AttendanceIcon, NotificationIcon, NotesIcon, LogoutIcon } from './icons/Icons';

interface SidebarProps {
  currentPage: StudentPage;
  onNavigate: (page: StudentPage) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  page: StudentPage;
  currentPage: StudentPage;
  onNavigate: (page: StudentPage) => void;
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


const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
  return (
    <div className="w-64 bg-surface flex-shrink-0 p-4 flex flex-col justify-between border-r border-border">
      <div>
        <div className="flex items-center justify-center p-4 mb-6">
          <h1 className="text-2xl font-bold text-white">Dept<span className="text-primary">. Portal</span></h1>
        </div>
        <nav className="space-y-2">
          <NavItem page="DASHBOARD" currentPage={currentPage} onNavigate={onNavigate} icon={<DashboardIcon />} label="Dashboard" />
          <NavItem page="TIMETABLE" currentPage={currentPage} onNavigate={onNavigate} icon={<TimetableIcon />} label="Timetable" />
          <NavItem page="MARKS" currentPage={currentPage} onNavigate={onNavigate} icon={<MarksIcon />} label="Internal Marks" />
          <NavItem page="ATTENDANCE" currentPage={currentPage} onNavigate={onNavigate} icon={<AttendanceIcon />} label="Attendance" />
          <NavItem page="NOTIFICATIONS" currentPage={currentPage} onNavigate={onNavigate} icon={<NotificationIcon />} label="Notifications" />
          <NavItem page="NOTES" currentPage={currentPage} onNavigate={onNavigate} icon={<NotesIcon />} label="Notes" />
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

export default Sidebar;
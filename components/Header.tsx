import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  title: string;
  user: User;
}

const Header: React.FC<HeaderProps> = ({ title, user }) => {
  return (
    <header className="bg-surface p-4 border-b border-border flex justify-between items-center flex-shrink-0">
      <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold text-text-primary">{user.name}</p>
          <p className="text-sm text-text-secondary capitalize">{user.role.toLowerCase()}</p>
        </div>
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
          alt="User profile"
        />
      </div>
    </header>
  );
};

export default Header;

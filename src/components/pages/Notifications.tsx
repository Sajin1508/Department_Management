import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Notifications: React.FC = () => {
  const { notifications } = useAppContext();

  return (
    <div className="bg-surface rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Notifications</h2>
        <div className="space-y-4">
            {notifications.slice().reverse().map(notification => (
                <div key={notification.id} className={`p-4 rounded-lg border-l-4 ${notification.isRead ? 'border-gray-600 bg-gray-700/30' : 'border-primary bg-primary/10'}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className={`font-semibold ${notification.isRead ? 'text-text-secondary' : 'text-primary'}`}>{notification.title}</h3>
                            <p className="text-sm text-text-secondary mt-1">{notification.content}</p>
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{notification.date}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Notifications;
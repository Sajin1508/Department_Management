import React, { useState } from 'react';
import { useAppContext } from '../../../contexts/AppContext';

const SendNotification: React.FC = () => {
    const { addNotification } = useAppContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        addNotification(title, content);
        setFeedback('Notification sent successfully!');
        setTitle('');
        setContent('');
        setTimeout(() => setFeedback(''), 3000);
    };

    return (
        <div className="bg-surface rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Send a New Notification</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="notification-title" className="block mb-2 text-sm font-medium text-text-secondary">
                        Title
                    </label>
                    <input type="text" id="notification-title" value={title} onChange={e => setTitle(e.target.value)}
                           className="bg-gray-700 border border-border text-text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                           placeholder="e.g., Internal Marks Published" required />
                </div>
                <div>
                    <label htmlFor="notification-content" className="block mb-2 text-sm font-medium text-text-secondary">
                       Content
                    </label>
                    <textarea id="notification-content" rows={4} value={content} onChange={e => setContent(e.target.value)}
                              className="block p-2.5 w-full text-sm text-text-primary bg-gray-700 rounded-lg border border-border focus:ring-primary focus:border-primary"
                              placeholder="Write the notification details here..."></textarea>
                </div>
                 <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-lg transition-colors">
                    Send Notification
                </button>
                 {feedback && <p className="text-green-400 text-sm mt-2 text-center">{feedback}</p>}
            </form>
        </div>
    );
};

export default SendNotification;

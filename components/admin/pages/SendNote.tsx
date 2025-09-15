import React, { useState } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import { SUBJECTS } from '../../../constants';

const SendNote: React.FC = () => {
    const { addNote } = useAppContext();
    const [subjectId, setSubjectId] = useState(SUBJECTS[0].id);
    const [content, setContent] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        addNote(subjectId, content);
        setFeedback('Note sent successfully!');
        setContent('');
        setTimeout(() => setFeedback(''), 3000);
    };

    return (
        <div className="bg-surface rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Send Note or Material</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label htmlFor="subject-select" className="block mb-2 text-sm font-medium text-text-secondary">
                        Select Subject
                    </label>
                    <select id="subject-select" value={subjectId} onChange={e => setSubjectId(e.target.value)}
                            className="bg-gray-700 border border-border text-text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                        {SUBJECTS.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="note-content" className="block mb-2 text-sm font-medium text-text-secondary">
                       Note Content
                    </label>
                    <textarea id="note-content" rows={4} value={content} onChange={e => setContent(e.target.value)}
                              className="block p-2.5 w-full text-sm text-text-primary bg-gray-700 rounded-lg border border-border focus:ring-primary focus:border-primary"
                              placeholder="Enter your note, link to material, etc..."></textarea>
                </div>
                 <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-lg transition-colors">
                    Send Note
                </button>
                 {feedback && <p className="text-green-400 text-sm mt-2 text-center">{feedback}</p>}
            </form>
        </div>
    );
};

export default SendNote;

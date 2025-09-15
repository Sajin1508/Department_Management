import React, { useState } from 'react';
import { SUBJECTS } from '../../constants';
import type { Subject } from '../../types';
import { useAppContext } from '../../contexts/AppContext';

const NotesChat: React.FC = () => {
  const { notes } = useAppContext();
  const [selectedSubject, setSelectedSubject] = useState<Subject>(SUBJECTS[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = notes.filter(
    (msg) =>
      msg.subjectId === selectedSubject.id &&
      msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-surface rounded-lg shadow-lg overflow-hidden">
      {/* Subject List */}
      <div className="w-1/3 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-semibold">Subjects</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {SUBJECTS.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className={`w-full text-left p-4 ${
                selectedSubject.id === subject.id
                  ? 'bg-primary/20'
                  : 'hover:bg-gray-700/30'
              }`}
            >
              <p className="font-semibold">{subject.name}</p>
              <p className="text-sm text-text-secondary">{subject.code}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="w-2/3 flex flex-col">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">{selectedSubject.name}</h3>
            <p className="text-sm text-text-secondary">Notes & Materials</p>
          </div>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-800/50">
          {filteredMessages.map((msg) => (
            <div key={msg.id} className="flex">
              <div className="bg-primary text-white p-3 rounded-lg max-w-lg">
                <p>{msg.content}</p>
                <p className="text-xs text-indigo-200 mt-2 text-right">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          {filteredMessages.length === 0 && (
            <div className="text-center text-text-secondary">
              No notes found for this subject.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesChat;
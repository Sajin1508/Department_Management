import React, { useState } from 'react';
import type { UserRole } from '../../../types';
import { useAppContext } from '../../../contexts/AppContext';
import { SUBJECTS } from '../../../constants';

const CreateUser: React.FC = () => {
    const { addUser } = useAppContext();
    const [role, setRole] = useState<UserRole>('STUDENT');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [idNumber, setIdNumber] = useState(''); // For Register No or Staff ID
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubjectChange = (subjectId: string) => {
        setSelectedSubjects(prev =>
            prev.includes(subjectId)
                ? prev.filter(id => id !== subjectId)
                : [...prev, subjectId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);
        setIsLoading(true);

        const userData: any = {
            name,
            email,
            role,
            password: 'password' // Default password for new users
        };

        if (role === 'STUDENT') {
            userData.registerNumber = idNumber;
        } else if (role === 'STAFF') {
            userData.staffId = idNumber;
            userData.subjects = selectedSubjects;
        }
        
        try {
            await addUser(userData);
            setFeedback({ type: 'success', message: `${role.charAt(0) + role.slice(1).toLowerCase()} created successfully!` });
            // Reset form
            setName('');
            setEmail('');
            setIdNumber('');
            setSelectedSubjects([]);
        } catch(error: any) {
            setFeedback({ type: 'error', message: error.message || 'Failed to create user.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-surface rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Create New User</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className="text-sm font-medium text-text-secondary mb-2 block">User Role</label>
                    <div className="flex items-center justify-between mt-2 rounded-lg bg-gray-700 p-1">
                        {(['STUDENT', 'STAFF', 'ADMIN'] as UserRole[]).map(r => (
                            <button type="button" key={r} onClick={() => setRole(r)}
                            className={`w-full py-2 text-sm font-medium rounded-md transition-colors ${role === r ? 'bg-primary text-white' : 'text-text-secondary hover:bg-gray-600'}`}>
                                {r.charAt(0) + r.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="name" className="text-sm font-medium text-text-secondary mb-2 block">Full Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}
                           className="w-full bg-gray-700 border border-border rounded-lg p-2.5 text-text-primary focus:ring-primary focus:border-primary" required />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-text-secondary mb-2 block">Email Address</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}
                           className="w-full bg-gray-700 border border-border rounded-lg p-2.5 text-text-primary focus:ring-primary focus:border-primary" required />
                </div>

                {role === 'STUDENT' && (
                     <div>
                        <label htmlFor="regNo" className="text-sm font-medium text-text-secondary mb-2 block">Register Number</label>
                        <input type="text" id="regNo" value={idNumber} onChange={e => setIdNumber(e.target.value)}
                               className="w-full bg-gray-700 border border-border rounded-lg p-2.5 text-text-primary focus:ring-primary focus:border-primary" required />
                    </div>
                )}
                 {role === 'STAFF' && (
                     <>
                        <div>
                            <label htmlFor="staffId" className="text-sm font-medium text-text-secondary mb-2 block">Staff ID</label>
                            <input type="text" id="staffId" value={idNumber} onChange={e => setIdNumber(e.target.value)}
                                   className="w-full bg-gray-700 border border-border rounded-lg p-2.5 text-text-primary focus:ring-primary focus:border-primary" required />
                        </div>
                         <div>
                            <label className="text-sm font-medium text-text-secondary mb-2 block">Assign Subjects</label>
                            <div className="grid grid-cols-2 gap-2 p-4 bg-gray-700 rounded-lg">
                                {SUBJECTS.map(subject => (
                                    <label key={subject.id} className="flex items-center space-x-2">
                                        <input type="checkbox"
                                               checked={selectedSubjects.includes(subject.id)}
                                               onChange={() => handleSubjectChange(subject.id)}
                                               className="form-checkbox h-4 w-4 text-primary bg-gray-800 border-gray-600 rounded focus:ring-primary"
                                        />
                                        <span className="text-sm">{subject.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {feedback && (
                    <p className={`text-sm ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{feedback.message}</p>
                )}
                 <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                    {isLoading ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
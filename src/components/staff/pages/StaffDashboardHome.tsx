import React from 'react';
import type { User } from '../../../types';
import { SUBJECTS } from '../../../constants';
import { useAppContext } from '../../../contexts/AppContext';

interface StaffDashboardHomeProps {
    user: User;
}

const StaffDashboardHome: React.FC<StaffDashboardHomeProps> = ({ user }) => {
    // FIX: Replaced STAFF_DATA with staff from AppContext to fix import error.
    const { staff } = useAppContext();
    const staffInfo = staff.find(s => s.email === user.email);
    const assignedSubjects = staffInfo?.subjects.map(subId => SUBJECTS.find(s => s.id === subId)).filter(Boolean);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-text-primary mb-2">Welcome, {user.name}!</h2>
                <p className="text-text-secondary">This is your portal for managing your academic responsibilities.</p>
            </div>

            <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-text-primary">Assigned Subjects</h3>
                {assignedSubjects && assignedSubjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {assignedSubjects.map(subject => subject && (
                            <div key={subject.id} className="p-4 bg-gray-700/50 rounded-lg">
                                <p className="font-semibold text-primary">{subject.name}</p>
                                <p className="text-sm text-text-secondary">{subject.code}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-text-secondary">You have not been assigned any subjects yet.</p>
                )}
            </div>
             <div className="bg-surface rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-text-primary">Upcoming Features</h3>
                <p className="text-text-secondary">Soon you will be able to manage marks, update attendance, and send notes directly from this portal.</p>
            </div>
        </div>
    );
};

export default StaffDashboardHome;
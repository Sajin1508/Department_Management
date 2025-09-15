import React from 'react';
import { ATTENDANCE_DATA, SUBJECTS } from '../../constants';
import type { Subject } from '../../types';

const getSubjectById = (id: string): Subject | undefined => SUBJECTS.find(sub => sub.id === id);

const AttendanceBar: React.FC<{ percentage: number }> = ({ percentage }) => {
    let bgColor = 'bg-green-500';
    if (percentage < 90) bgColor = 'bg-yellow-500';
    if (percentage < 75) bgColor = 'bg-red-500';

    return (
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className={`${bgColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

const Attendance: React.FC = () => {
  return (
    <div className="bg-surface rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-1">Attendance Status</h2>
        <p className="text-text-secondary mb-6">Track your attendance for each subject to stay on top.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ATTENDANCE_DATA.map(att => {
                const subject = getSubjectById(att.subjectId);
                return (
                    <div key={att.subjectId} className="bg-gray-700/50 p-5 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">{subject?.name}</h3>
                            <span className="text-xs text-text-secondary">{subject?.code}</span>
                        </div>
                        <div className="flex items-center space-x-4 mb-3">
                            <AttendanceBar percentage={att.percentage} />
                            <span className="font-bold text-lg">{att.percentage}%</span>
                        </div>
                        <p className="text-sm text-text-secondary">
                            Attended: {att.attended} / {att.total} classes
                        </p>
                    </div>
                )
            })}
        </div>
    </div>
  );
};

export default Attendance;
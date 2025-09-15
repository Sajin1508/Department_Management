import React from 'react';
import { TIMETABLE_DATA, SUBJECTS } from '../../constants';
import type { DayOrder } from '../../types';
import { useAppContext } from '../../contexts/AppContext';

const getSubjectName = (id: string | null) => {
  if (!id) return 'LUNCH';
  return SUBJECTS.find(sub => sub.id === id)?.name || 'Free';
};

const Timetable: React.FC = () => {
    const { dayOrder } = useAppContext();
    const currentDay = dayOrder;

  return (
    <div className="space-y-6">
       <div className="bg-surface p-6 rounded-lg shadow-lg">
         <h2 className="text-2xl font-bold mb-4 text-primary">Today's Schedule ({currentDay})</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {(TIMETABLE_DATA.find(d => d.day === currentDay) || TIMETABLE_DATA[0]).periods.map(period => (
                <div key={period.period} className={`p-4 rounded-md ${period.subjectId ? 'bg-gray-700' : 'bg-gray-800'}`}>
                    <p className="font-bold text-text-secondary">Period {period.period}</p>
                    <p className="text-sm text-text-primary">{getSubjectName(period.subjectId)}</p>
                </div>
            ))}
         </div>
       </div>

      <div className="bg-surface p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-text-primary">Full Day Order Timetable</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="p-3">Day</th>
                {[...Array(7)].map((_, i) => <th key={i} className="p-3 text-center">Period {i + 1}</th>)}
              </tr>
            </thead>
            <tbody>
              {TIMETABLE_DATA.map((dayOrder: DayOrder) => (
                <tr key={dayOrder.day} className="border-b border-border">
                  <td className="p-3 font-semibold">{dayOrder.day}</td>
                  {dayOrder.periods.map(period => (
                    <td key={period.period} className={`p-3 text-center text-sm ${!period.subjectId ? 'text-gray-500' : 'text-text-secondary'}`}>
                      {getSubjectName(period.subjectId)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
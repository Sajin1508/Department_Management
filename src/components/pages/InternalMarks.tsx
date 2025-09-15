import React from 'react';
import { INTERNAL_MARKS_DATA, SUBJECTS } from '../../constants';
import type { Subject } from '../../types';

const getSubjectById = (id: string): Subject | undefined => SUBJECTS.find(sub => sub.id === id);

const InternalMarks: React.FC = () => {
  return (
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-text-primary">Internal Marks</h2>
        <p className="text-text-secondary mt-1">Summary of your performance in internal assessments.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4 font-semibold">Subject Name</th>
              <th className="p-4 font-semibold">Subject Code</th>
              <th className="p-4 font-semibold text-center">Assessment 1</th>
              <th className="p-4 font-semibold text-center">Assessment 2</th>
              <th className="p-4 font-semibold text-center">Model Exam</th>
              <th className="p-4 font-semibold text-center bg-primary/20 text-primary">Total (Avg)</th>
            </tr>
          </thead>
          <tbody>
            {INTERNAL_MARKS_DATA.map((mark) => {
              const subject = getSubjectById(mark.subjectId);
              return (
                <tr key={mark.subjectId} className="border-b border-border hover:bg-gray-700/30 transition-colors">
                  <td className="p-4">{subject?.name}</td>
                  <td className="p-4 text-text-secondary">{subject?.code}</td>
                  <td className="p-4 text-center">{mark.assessment1}</td>
                  <td className="p-4 text-center">{mark.assessment2}</td>
                  <td className="p-4 text-center">{mark.modelExam}</td>
                  <td className="p-4 text-center font-bold text-lg text-primary">{mark.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternalMarks;
import React from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import { TrashIcon } from '../../icons/Icons';

const ManageStudents: React.FC = () => {
  const { students, deleteUser } = useAppContext();

  const handleDelete = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
        deleteUser(studentId);
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-text-primary">Manage Students</h2>
        <p className="text-text-secondary mt-1">View, add, or edit student records. Total: {students.length}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4 font-semibold">Student Name</th>
              <th className="p-4 font-semibold">Register Number</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-border hover:bg-gray-700/30 transition-colors">
                <td className="p-4">{student.name}</td>
                <td className="p-4 text-text-secondary">{student.registerNumber}</td>
                <td className="p-4 text-text-secondary">{student.email}</td>
                <td className="p-4 text-center space-x-4">
                  <button className="text-primary hover:underline text-sm">Edit</button>
                   <button onClick={() => handleDelete(student.id)} className="text-red-500 hover:underline text-sm inline-flex items-center group">
                      <TrashIcon className="w-4 h-4 mr-1 text-gray-500 group-hover:text-red-500 transition-colors" />
                      <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
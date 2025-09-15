import React from 'react';
import { SUBJECTS } from '../../../constants';
import { useAppContext } from '../../../contexts/AppContext';
import { TrashIcon } from '../../icons/Icons';

const ManageStaff: React.FC = () => {
    const { staff: staffData, deleteUser } = useAppContext();

    const getSubjectNames = (subjectIds: string[]) => {
        return subjectIds.map(id => SUBJECTS.find(s => s.id === id)?.name).filter(Boolean).join(', ');
    };

    const handleDelete = (staffId: string) => {
        if (window.confirm('Are you sure you want to delete this staff member? This action cannot be undone.')) {
            deleteUser(staffId);
        }
    };

  return (
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-text-primary">Manage Staff</h2>
        <p className="text-text-secondary mt-1">View, add, or edit staff records. Total: {staffData.length}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4 font-semibold">Staff Name</th>
              <th className="p-4 font-semibold">Staff ID</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Subjects Handled</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff) => (
              <tr key={staff.id} className="border-b border-border hover:bg-gray-700/30 transition-colors">
                <td className="p-4">{staff.name}</td>
                <td className="p-4 text-text-secondary">{staff.staffId}</td>
                <td className="p-4 text-text-secondary">{staff.email}</td>
                <td className="p-4 text-text-secondary text-sm">{getSubjectNames(staff.subjects)}</td>
                <td className="p-4 text-center space-x-4">
                  <button className="text-primary hover:underline text-sm">Edit</button>
                   <button onClick={() => handleDelete(staff.id)} className="text-red-500 hover:underline text-sm inline-flex items-center group">
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

export default ManageStaff;
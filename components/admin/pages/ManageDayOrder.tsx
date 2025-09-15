import React, { useState } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import { TIMETABLE_DATA } from '../../../constants';

const ManageDayOrder: React.FC = () => {
  const { dayOrder, setDayOrder } = useAppContext();
  const [selectedDay, setSelectedDay] = useState(dayOrder);
  const [feedback, setFeedback] = useState('');

  const handleUpdate = () => {
    setDayOrder(selectedDay);
    setFeedback(`Day order successfully updated to ${selectedDay}.`);
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <div className="bg-surface rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-text-primary mb-2">Set Current Day Order</h2>
      <p className="text-text-secondary mb-6">Select the day order to be displayed as "Today's Schedule" for students.</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="day-order-select" className="block mb-2 text-sm font-medium text-text-secondary">
            Current Day Order is: <span className="font-bold text-primary">{dayOrder}</span>
          </label>
          <select
            id="day-order-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="bg-gray-700 border border-border text-text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          >
            {TIMETABLE_DATA.map((day) => (
              <option key={day.day} value={day.day}>
                {day.day}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleUpdate}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-lg transition-colors"
        >
          Update Day Order
        </button>
        {feedback && <p className="text-green-400 text-sm mt-2 text-center">{feedback}</p>}
      </div>
    </div>
  );
};

export default ManageDayOrder;

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import type { Notification, NoteMessage, Student, Staff, User } from '../types';

const API_URL = '/api';

interface AppContextType {
  dayOrder: string;
  setDayOrder: (day: string) => void;
  notifications: Notification[];
  addNotification: (title: string, content: string) => Promise<void>;
  notes: NoteMessage[];
  addNote: (subjectId: string, content: string) => Promise<void>;
  students: Student[];
  staff: Staff[];
  users: User[];
  addUser: (userData: any) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dayOrder, setDayOrder] = useState<string>('D1');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notes, setNotes] = useState<NoteMessage[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [usersRes, studentsRes, staffRes, notificationsRes, notesRes] = await Promise.all([
        fetch(`${API_URL}/users`),
        fetch(`${API_URL}/students`),
        fetch(`${API_URL}/staff`),
        fetch(`${API_URL}/notifications`),
        fetch(`${API_URL}/notes`),
      ]);

      if (!usersRes.ok || !studentsRes.ok || !staffRes.ok || !notificationsRes.ok || !notesRes.ok) {
        throw new Error('Failed to fetch data from the server. Please ensure it is running.');
      }

      const usersData = await usersRes.json();
      const studentsData = await studentsRes.json();
      const staffData = await staffRes.json();
      const notificationsData = await notificationsRes.json();
      const notesData = await notesRes.json();

      setUsers(usersData);
      setStudents(studentsData);
      setStaff(staffData);
      setNotifications(notificationsData);
      setNotes(notesData);

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred while connecting to the backend.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const addNotification = async (title: string, content: string) => {
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      const newNotification = await response.json();
      setNotifications(prev => [newNotification, ...prev]);
    } catch (error) {
      console.error("Failed to add notification:", error);
    }
  };

  const addNote = async (subjectId: string, content: string) => {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectId, content })
      });
      const newNote = await response.json();
      setNotes(prev => [...prev, newNote]);
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  const addUser = async (userData: any) => {
     try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if(!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to create user');
      }
      // Refetch all data to ensure consistency
      await fetchData();
    } catch (error) {
      console.error("Failed to add user:", error);
      throw error; // re-throw to be caught in the component
    }
  };

  const deleteUser = async (userId: string) => {
    try {
        await fetch(`${API_URL}/users/${userId}`, {
            method: 'DELETE'
        });
        // Refetch data to reflect deletion
        await fetchData();
    } catch (error) {
        console.error("Failed to delete user:", error);
    }
  };

  const contextValue = {
    dayOrder,
    setDayOrder,
    notifications,
    addNotification,
    notes,
    addNote,
    students,
    staff,
    users,
    addUser,
    deleteUser,
    isLoading,
    error,
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text-primary">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-xl">Loading Application Data...</p>
        <p className="text-sm text-text-secondary">Connecting to server...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-900/20 text-text-primary p-8">
        <div className="text-center bg-surface p-8 rounded-lg shadow-2xl max-w-lg">
          <h2 className="text-3xl font-bold text-red-400 mb-4">Application Error</h2>
          <p className="mb-4 text-text-secondary">Could not load data from the server. This usually means the backend server is not running or is unreachable.</p>
          <p className="text-text-secondary mb-4">Please follow the instructions in `README.md` to start the backend server in a separate terminal.</p>
          <pre className="bg-background p-4 rounded text-left text-sm text-red-300 whitespace-pre-wrap">{error}</pre>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
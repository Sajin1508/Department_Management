import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import type { Notification, NoteMessage, Student, Staff, User } from '../types';

const API_URL = 'http://localhost:5000/api';

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
        throw new Error('Failed to fetch data from the server.');
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
      setError(err.message || 'An unknown error occurred.');
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
      setNotifications(prev => [...prev, newNotification]);
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

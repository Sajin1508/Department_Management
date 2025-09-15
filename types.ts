export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface TimetableEntry {
  period: number;
  subjectId: string | null;
}

export interface DayOrder {
  day: string;
  periods: TimetableEntry[];
}

export interface InternalMark {
  subjectId: string;
  assessment1: number;
  assessment2: number;
  modelExam: number;
  total: number;
}

export interface Attendance {
  subjectId:string;
  percentage: number;
  attended: number;
  total: number;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
}

export interface NoteMessage {
  id: string;
  sender: 'Faculty' | 'You';
  content: string;
  timestamp: string;
  subjectId: string;
}

// User role and data structure types
export type UserRole = 'STUDENT' | 'STAFF' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Student {
    id: string;
    name: string;
    registerNumber: string;
    email: string;
}

export interface Staff {
    id: string;
    name: string;
    staffId: string;
    email: string;
    subjects: string[]; // array of subject IDs
}

// Page navigation types
export type StudentPage = 'DASHBOARD' | 'TIMETABLE' | 'MARKS' | 'ATTENDANCE' | 'NOTIFICATIONS' | 'NOTES';
export type AdminPage = 'OVERVIEW' | 'STUDENTS' | 'STAFF' | 'MANAGE_DAY_ORDER' | 'SEND_NOTIFICATION' | 'SEND_NOTE' | 'CREATE_USER';
export type StaffPage = 'DASHBOARD';
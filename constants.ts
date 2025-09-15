import type { Subject, DayOrder, InternalMark, Attendance } from './types';

export const SUBJECTS: Subject[] = [
  { id: 'os', name: 'Operating System', code: 'CS8493' },
  { id: 'asp', name: 'ASP.NET', code: 'IT8501' },
  { id: 'asp-lab', name: 'ASP.NET Lab', code: 'IT8511' },
  { id: 'nm', name: 'Naan Mudhalvan', code: 'NM2023' },
  { id: 'spm', name: 'Software Project Management', code: 'MG8591' },
  { id: 'ai', name: 'Artificial Intelligence', code: 'CS8691' },
];

export const TIMETABLE_DATA: DayOrder[] = [
  {
    day: 'D1',
    periods: [
      { period: 1, subjectId: 'os' },
      { period: 2, subjectId: 'asp' },
      { period: 3, subjectId: 'spm' },
      { period: 4, subjectId: 'ai' },
      { period: 5, subjectId: null }, // Lunch
      { period: 6, subjectId: 'nm' },
      { period: 7, subjectId: 'asp-lab' },
    ],
  },
  {
    day: 'D2',
    periods: [
      { period: 1, subjectId: 'asp' },
      { period: 2, subjectId: 'ai' },
      { period: 3, subjectId: 'nm' },
      { period: 4, subjectId: 'os' },
      { period: 5, subjectId: null },
      { period: 6, subjectId: 'spm' },
      { period: 7, subjectId: 'asp-lab' },
    ],
  },
  {
    day: 'D3',
    periods: [
      { period: 1, subjectId: 'spm' },
      { period: 2, subjectId: 'nm' },
      { period: 3, subjectId: 'ai' },
      { period: 4, subjectId: 'asp' },
      { period: 5, subjectId: null },
      { period: 6, subjectId: 'os' },
      { period: 7, subjectId: 'asp-lab' },
    ],
  },
  {
    day: 'D4',
    periods: [
      { period: 1, subjectId: 'ai' },
      { period: 2, subjectId: 'os' },
      { period: 3, subjectId: 'asp-lab' },
      { period: 4, subjectId: 'spm' },
      { period: 5, subjectId: null },
      { period: 6, subjectId: 'nm' },
      { period: 7, subjectId: 'asp' },
    ],
  },
  {
    day: 'D5',
    periods: [
      { period: 1, subjectId: 'nm' },
      { period: 2, subjectId: 'asp-lab' },
      { period: 3, subjectId: 'os' },
      { period: 4, subjectId: 'ai' },
      { period: 5, subjectId: null },
      { period: 6, subjectId: 'asp' },
      { period: 7, subjectId: 'spm' },
    ],
  },
    {
    day: 'D6',
    periods: [
      { period: 1, subjectId: 'asp-lab' },
      { period: 2, subjectId: 'spm' },
      { period: 3, subjectId: 'asp' },
      { period: 4, subjectId: 'nm' },
      { period: 5, subjectId: null },
      { period: 6, subjectId: 'ai' },
      { period: 7, subjectId: 'os' },
    ],
  },
];

export const INTERNAL_MARKS_DATA: InternalMark[] = [
  { subjectId: 'os', assessment1: 85, assessment2: 90, modelExam: 88, total: 87 },
  { subjectId: 'asp', assessment1: 92, assessment2: 88, modelExam: 95, total: 91 },
  { subjectId: 'asp-lab', assessment1: 95, assessment2: 98, modelExam: 96, total: 96 },
  { subjectId: 'nm', assessment1: 80, assessment2: 85, modelExam: 82, total: 82 },
  { subjectId: 'spm', assessment1: 78, assessment2: 81, modelExam: 80, total: 79 },
  { subjectId: 'ai', assessment1: 88, assessment2: 91, modelExam: 90, total: 89 },
];

export const ATTENDANCE_DATA: Attendance[] = [
  { subjectId: 'os', percentage: 92, attended: 46, total: 50 },
  { subjectId: 'asp', percentage: 88, attended: 44, total: 50 },
  { subjectId: 'asp-lab', percentage: 100, attended: 20, total: 20 },
  { subjectId: 'nm', percentage: 95, attended: 19, total: 20 },
  { subjectId: 'spm', percentage: 85, attended: 42.5, total: 50 },
  { subjectId: 'ai', percentage: 98, attended: 49, total: 50 },
];

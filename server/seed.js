const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Student = require('./models/Student');
const Staff = require('./models/Staff');
const Notification = require('./models/Notification');
const Note = require('./models/Note');

// Mock data (adapted from original constants.ts)
const USERS_DATA = [
    { _id: new mongoose.Types.ObjectId("66a2e8c9c7a6b8f3c3a9c7b1"), name: 'Sajin S', email: 'student@demo.com', role: 'STUDENT', password: 'password' },
    { _id: new mongoose.Types.ObjectId("66a2e8c9c7a6b8f3c3a9c7b2"), name: 'Admin User', email: 'admin@demo.com', role: 'ADMIN', password: 'password' },
    { _id: new mongoose.Types.ObjectId("66a2e8c9c7a6b8f3c3a9c7b3"), name: 'John Doe', email: 'staff@demo.com', role: 'STAFF', password: 'password' },
];

const STUDENTS_DATA = [
    { user: USERS_DATA[0]._id, name: 'Sajin S', registerNumber: '951021CS001', email: 'sajin.student@example.com' },
];

const STAFF_DATA = [
    { user: USERS_DATA[2]._id, name: 'John Doe', staffId: 'STF001', email: 'john.staff@example.com', subjects: ['os', 'ai'] },
];

const NOTIFICATIONS_DATA = [
    { title: 'Internal Marks Published', content: 'Internal marks for the 2nd assessment have been published. Please check the marks section.', date: '2024-07-28', isRead: false },
    { title: 'Special Class for ASP.NET', content: 'A special class for ASP.NET will be held on Saturday at 10 AM.', date: '2024-07-27', isRead: false },
];

const NOTES_MESSAGES = [
  { sender: 'Faculty', content: 'Here are the notes for OS Unit 1: Introduction to Operating Systems.', timestamp: '10:30 AM', subjectId: 'os' },
  { sender: 'Faculty', content: 'Please find the attached PDF for ASP.NET session state management.', timestamp: '11:00 AM', subjectId: 'asp' },
];


// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Import data into DB
const importData = async () => {
  try {
    await User.deleteMany();
    await Student.deleteMany();
    await Staff.deleteMany();
    await Notification.deleteMany();
    await Note.deleteMany();

    await User.create(USERS_DATA);
    await Student.create(STUDENTS_DATA);
    await Staff.create(STAFF_DATA);
    await Notification.create(NOTIFICATIONS_DATA);
    await Note.create(NOTES_MESSAGES);
    
    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Student.deleteMany();
    await Staff.deleteMany();
    await Notification.deleteMany();
    await Note.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}

const express = require('express');
const router = express.Router();

// Import Models
const User = require('../models/User');
const Student = require('../models/Student');
const Staff = require('../models/Staff');
const Notification = require('../models/Notification');
const Note = require('../models/Note');

// --- Auth Routes ---
router.post('/auth/login', async (req, res) => {
    const { email, role } = req.body;
    try {
        // In a real app, you would also check the password
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(404).json({ message: `No ${role.toLowerCase()} account found for this email.` });
        }
        res.status(200).json({ id: user._id, name: user.name, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// --- User Routes ---
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role })));
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/users', async (req, res) => {
    const { name, email, role, password, registerNumber, staffId, subjects } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({ name, email, role, password });
        await user.save();

        if (role === 'STUDENT') {
            const student = new Student({ user: user._id, name, email, registerNumber });
            await student.save();
        } else if (role === 'STAFF') {
            const staff = new Staff({ user: user._id, name, email, staffId, subjects });
            await staff.save();
        }
        res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (user.role === 'STUDENT') {
            await Student.deleteOne({ user: user._id });
        } else if (user.role === 'STAFF') {
            await Staff.deleteOne({ user: user._id });
        }
        
        await User.deleteOne({ _id: req.params.id });

        res.json({ message: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// --- Data Routes ---
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students.map(s => ({ id: s.user, name: s.name, registerNumber: s.registerNumber, email: s.email })));
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.get('/staff', async (req, res) => {
    try {
        const staff = await Staff.find();
        res.json(staff.map(s => ({ id: s.user, name: s.name, staffId: s.staffId, email: s.email, subjects: s.subjects })));
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ date: -1 });
         res.json(notifications.map(n => ({ id: n._id, title: n.title, content: n.content, date: n.date, isRead: n.isRead })));
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/notifications', async (req, res) => {
    try {
        const newNotification = new Notification({
            title: req.body.title,
            content: req.body.content,
            date: new Date().toISOString().split('T')[0],
            isRead: false
        });
        const notification = await newNotification.save();
        res.status(201).json({ 
            id: notification._id, 
            title: notification.title, 
            content: notification.content,
            date: notification.date,
            isRead: notification.isRead
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes.map(n => ({ 
            id: n._id,
            sender: n.sender,
            content: n.content,
            timestamp: n.timestamp,
            subjectId: n.subjectId
        })));
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/notes', async (req, res) => {
    try {
        const newNote = new Note({
            subjectId: req.body.subjectId,
            content: req.body.content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'Faculty'
        });
        const note = await newNote.save();
        res.status(201).json({
            id: note._id,
            sender: note.sender,
            content: note.content,
            timestamp: note.timestamp,
            subjectId: note.subjectId
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
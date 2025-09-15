const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    staffId: {
        type: String,
        required: [true, 'Please add a staff ID'],
        unique: true,
    },
    subjects: {
        type: [String], // Array of subject IDs from constants
    },
});

module.exports = mongoose.model('Staff', StaffSchema);

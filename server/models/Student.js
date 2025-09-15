const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
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
    registerNumber: {
        type: String,
        required: [true, 'Please add a register number'],
        unique: true,
    },
});

module.exports = mongoose.model('Student', StudentSchema);

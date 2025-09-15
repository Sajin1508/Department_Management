const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    sender: {
        type: String,
        default: 'Faculty',
    },
    content: {
        type: String,
        required: [true, 'Please add content'],
    },
    timestamp: {
        type: String,
        required: true,
    },
    subjectId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Note', NoteSchema);

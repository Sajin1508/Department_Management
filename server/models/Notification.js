const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    content: {
        type: String,
        required: [true, 'Please add content'],
    },
    date: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);

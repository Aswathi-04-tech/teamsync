const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide meeting title'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    startTime: {
      type: Date,
      required: [true, 'Please provide meeting start time'],
    },
    endTime: {
      type: Date,
      required: [true, 'Please provide meeting end time'],
    },
    meetingLink: {
      type: String,
      default: 'https://meet.teamsync.internal/room-alpha',
    },
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    platform: {
      type: String,
      enum: ['TeamSync Call', 'Google Meet', 'Zoom', 'Slack Huddle'],
      default: 'TeamSync Call',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Meeting', meetingSchema);

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    senderName: {
      type: String,
      default: 'Team Member',
    },
    senderAvatar: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: [true, 'Message content cannot be empty'],
      trim: true,
      maxlength: [4000, 'Message cannot exceed 4000 characters'],
    },
    chatType: {
      type: String,
      enum: ['channel', 'direct'],
      default: 'channel',
    },
    channelId: {
      type: String,
      default: 'general',
      trim: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    attachments: [
      {
        name: String,
        url: String,
        fileType: String,
        size: Number,
      },
    ],
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);

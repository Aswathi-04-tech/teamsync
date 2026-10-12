const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide project name'],
      trim: true,
      maxlength: [120, 'Project name cannot exceed 120 characters'],
    },
    key: {
      type: String,
      uppercase: true,
      trim: true,
      maxlength: [10, 'Project key cannot exceed 10 characters'],
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    category: {
      type: String,
      default: 'Web Application',
    },
    status: {
      type: String,
      enum: ['Planning', 'In Progress', 'In Review', 'Completed', 'On Hold'],
      default: 'In Progress',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    budget: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    default: [],
  }],
  bio: {
    type: String,
    default: '',
  },
  preferences: {
    cleanliness: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    noise: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    sleepSchedule: {
      type: String,
      enum: ['early', 'night', 'flexible'],
      default: 'flexible',
    },
    smoking: {
      type: Boolean,
      default: false,
    },
    pets: {
      type: Boolean,
      default: false,
    },
  },
  matches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  lastActive: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
}, {
  timestamps: true,
});

// Update lastActive timestamp on each interaction
userSchema.pre('save', function(next) {
  this.lastActive = new Date();
  next();
});

module.exports = mongoose.model('User', userSchema); 
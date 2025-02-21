const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leadershipGoal: {
    type: String,
    enum: [
      'Emotion Management especially Anger',
      'Healthy habits',
      'Chores and responsibilities',
      'Learning challenges',
      'Building/Rebuilding Trust',
      "I haven't decided yet"
    ]
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non Binary', 'Self Identity', 'Prefer not to say']
  },
  ageGroup: {
    type: String,
    enum: [
      'Less than 5',
      '5-7',
      '8-12',
      '13-16',
      '16-18',
      '18-20',
      '20s',
      '30s',
      '40s',
      '50s',
      '60s',
      '>70s'
    ]
  },
  focusArea: {
    type: String,
    enum: [
      'Social Relationships - Peers',
      'Social Relationships - Authority figures',
      'Building trust - especially broken relationships',
      'Managing conflicts',
      'Flexibility and Time Management',
      'Giving and receiving feedback',
      'Active Listening',
      'Self Awareness',
      'Decision making',
      'Growth Mindset',
      'Anger Management',
      'Continuous learning'
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Profile', profileSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  role: {
    type: String,
    enum: ['parent', 'child'],
    default: 'parent'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  authProvider: {
    type: String,
    required: true,
    enum: ['email', 'apple', 'facebook'],
    default: 'email'
  },
  socialId: {
    type: String,
    sparse: true
  },
  profile: {
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
    }
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
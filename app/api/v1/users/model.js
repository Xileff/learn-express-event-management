const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is mandatory'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is mandatory'],
    },
    password: {
      type: String,
      required: [true, 'Password is mandatory'],
    },
    role: {
      type: String,
      enum: ['admin', 'organizer', 'owner'],
      default: 'admin',
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function hashify(next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function comparify(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model('User', userSchema);

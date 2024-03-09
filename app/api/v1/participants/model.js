const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');

const participantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is mandatory.'],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is mandatory.'],
    },
    password: {
      type: String,
      required: [true, 'Password is mandatory.'],
      minlength: 6,
    },
    role: {
      type: String,
      default: '-',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

participantSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
})

participantSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('Participant', participantSchema);

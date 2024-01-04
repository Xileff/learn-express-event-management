const { Schema, model } = require('mongoose');

const organizerSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, 'Name is required'],
    },
  },
  { timestamps: true },
);

module.exports = model('Organizer', organizerSchema);

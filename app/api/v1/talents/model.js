const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is mandatory'],
    },
    role: {
      type: String,
      default: '-',
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
  },
  { timestamp: true },
);

module.exports = model('Talent', talentSchema);

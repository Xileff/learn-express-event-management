const { model, Schema } = require('mongoose');

const imageSchema = Schema(
  {
    url: { type: String },
  },
  { timestamps: true },
);

module.exports = model('Image', imageSchema);

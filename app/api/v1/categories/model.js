const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Min length for category name is 3 characters'],
      maxlength: [20, 'Max length for category name is 20 characters'],
      required: [true, 'Category name is mandatory'],
    },
  },
  { timestamps: true },
);

module.exports = model('Category', categorySchema);

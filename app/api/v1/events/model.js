const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ticketCategoriesSchema = Schema(
  {
    type: {
      type: String,
      required: [true, 'Ticket type is mandatory'],
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
  },
);

const eventSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is mandatory'],
      minlength: 3,
      maxlength: 50,
    },
    date: {
      type: Date,
      required: [true, 'Date and time is mandatory'],
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is mandatory'],
    },
    keyPoints: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, 'Venue is mandatory'],
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: 'Talent',
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = model('Event', eventSchema);

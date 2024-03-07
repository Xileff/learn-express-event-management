const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const orderDetailSchema = Schema({
  ticketCategory: {
    type: {
      type: String,
      required: [true, 'Ticket type is mandatory'],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  sumTicket: {
    type: Number,
    required: true,
  },
});

const orderSchema = Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    personalDetail: {
      firstName: {
        type: String,
        required: [true, 'First name is mandatory'],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, 'Last name is mandatory'],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, 'Email is mandatory'],
      },
      role: {
        type: String,
        default: 'Designer',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
      type: mongoose.Types.ObjectId,
      ref: 'Participant',
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    historyEvent: {
      // title: {
      //   type: String,
      //   required: [true, 'Title is mandatory'],
      //   minlength: 3,
      //   maxlength: 50,
      // },
      // date: {
      //   type: Date,
      //   required: [true, 'Date and time is mandatory'],
      // },
      // about: {
      //   type: String,
      // },
      // tagline: {
      //   type: String,
      //   required: [true, 'Tagline is mandatory'],
      // },
      // keyPoints: {
      //   type: [String],
      // },
      // venueName: {
      //   type: String,
      //   required: [true, 'Venue is mandatory'],
      // },
      // status: {
      //   type: String,
      //   enum: ['Draft', 'Published'],
      //   default: 'Draft',
      // },
      // tickets: {
      //   type: [ticketCategoriesSchema],
      //   required: true,
      // },
      // image: {
      //   type: mongoose.Types.ObjectId,
      //   ref: 'Image',
      //   required: true,
      // },
      // category: {
      //   type: mongoose.Types.ObjectId,
      //   ref: 'Category',
      //   required: true,
      // },
      // talent: {
      //   type: mongoose.Types.ObjectId,
      //   ref: 'Talent',
      //   required: true,
      // },
      organizer: {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true,
      },
    },
  },
  { timestamps: true },
);

module.exports = model('Order', orderSchema);

const { Schema, model } = require('mongoose');

const billSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  customCategory: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Bill = model('Bill', billSchema);

module.exports = Bill;

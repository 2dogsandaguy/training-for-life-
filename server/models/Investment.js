const { Schema, model } = require('mongoose');

const investmentSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  url: {
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

const Investment = model('Investment', investmentSchema);

module.exports = Investment;

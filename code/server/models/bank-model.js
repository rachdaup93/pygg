const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankSchema = new Schema({
  title: {type: String, required: true},
  totalValue: { type: Number, required: true },
  date: { type: Date, required: true },
  dateFormatted: { type: String, required: true },
  ownerId:{ type: Schema.Types.ObjectId, ref: 'User', required: true},
  payments: {
    startDate: { type: Date, required: true },
    remainingCost: { type: Number, required: true },
    period: { type: String, required: true },
    numberPaymentsLeft: { type: Number, required: true },
    paymentLog:[]
  },
  description: { type: String },
  completed: { type: Boolean, required: true, default: false }
  });

const bankModel = mongoose.model('Bank', bankSchema);
const UserModel = require('./user-model');

module.exports = bankModel;

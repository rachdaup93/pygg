const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankSchema = new Schema({
  title: {type: String, required: true},
  totalValue: { type: Number, required: true },
  date: { type: Date, required: true },
  dateFormatted: { type: String, required: true },
  payments: {
    ownerId:{ type: Schema.Types.ObjectId, required: true},
    startDate: { type: Date, required: true },
    remainingCost: { type: Number, required: true },
    period: { type: String, required: true },
    numberPaymentsLeft: { type: Number, required: true },
    paymentLog:[]
  },
  description: { type: String },
  // private: {type: Boolean}
  });

const bankModel = mongoose.model('Bank', bankSchema);


module.exports = bankModel;

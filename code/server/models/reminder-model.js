'use strict';

const mongoose = require('mongoose');
const moment   = require('moment');
const cfg      = require('../config');
const Twilio   = require('twilio');
const Schema   = mongoose.Schema;

const RemainderSchema = new Schema({
  name: { type: String },
  bankId: { type: Schema.Types.ObjectId },
  bankTitle: { type: String },
  phoneNumber: { type: String },
  payment: {}
});

RemainderSchema.methods.requiresNotification = function(date) {
  return moment(date) === moment(this.payment.date).add(7, hours).add(30, minutes);
};

RemainderSchema.statics.sendNotifications = function(callback) {
  // now
  const searchDate = new Date();
  Remainder
    .find()
    .then(function(remainders) {
      remainders = remainders.filter(function(remainder) {
              return remainder.requiresNotification(searchDate);
      });
      if (remainders.length > 0) {
        sendNotifications(remainders);
      }
    });

    /**
    * Send messages to all appoinment owners via Twilio
    * @param {array} remainders List of remainders.
    */
    function sendNotifications(remainders) {
        const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
        remainders.forEach(function(remainder) {
            // Create options to send the message
            const options = {
                to: `+1${remainder.phoneNumber}`,
                from: cfg.twilioPhoneNumber,
                /* eslint-disable max-len */
                body: `PYGG Reminder: Hi ${remainder.name}, your payment of $${remainder.payment.paymentVal} is due for Pyggie Bank: ${remainder.bank}`,
                /* eslint-enable max-len */
            };

            // Send the message!
            client.messages.create(options, function(err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    let masked = remainder.phoneNumber.substr(0,
                        remainder.phoneNumber.length - 5);
                    masked += '*****';
                    console.log(`Message sent to ${masked}`);
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call();
        }
    }
};


const Remainder = mongoose.model('remainder', RemainderSchema);
module.exports = Remainder;

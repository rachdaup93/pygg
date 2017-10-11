'use strict';

const express        = require('express');
const momentTimeZone = require('moment-timezone');
const moment         = require('moment');
const ReminderModel  = require('../models/reminder-model');
const router         = new express.Router();
const cfg            = require('../config');
const Twilio         = require('twilio');

const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

// GET: /remainders
router.get('/remainders', function(req, res, next) {
  ReminderModel.find(
    (err,remainders)=>{
      if(err){
        return res.status(500).json({errorMessage: 'Could not obtain pyggie bank list.'})
      }
    })
});

// GET: /remainders/create
router.post('/remainders/newBankNotifier', function(req, res, next) {
  const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
  // Create options to send the message
  const options = {
      to: `+1 ${req.body.phoneNumber}`,
      from: cfg.twilioPhoneNumber,
      /* eslint-disable max-len */
      body: `Hi ${req.body.firstName}! Congratulations! You have created a new Pyggie Bank: ${req.body.title}. Your first payment of $${req.body.payment.toFixed(2)} is due on ${req.body.dueDate}.`,
      /* eslint-enable max-len */
  };

  // Send the message!
  client.messages.create(options, function(err, response) {
      if (err) {
          // Just log it for now
          res.status(500).json({ErrorMessage: "Oh no"})
          console.error(err);
      } else {
          // Log the last few digits of a phone number
          console.log(response)
          res.status(200).json({SuccessMessage: "Yay!"})
      }
  });
});

// POST: /remainders
router.post('/remainders', function(req, res, next) {
  const remainder = new ReminderModel({
    name: req.body.firstName,
    bankId: req.body.id,
    bankTitle: req.body.title,
    phoneNumber: req.body.phoneNumber,
    payment: req.body.payment
  });

  remainder.save((err)=>{
    if(remainder.errors){
      return res.status(400).json({
        errorMessage: 'Database validation failed.',
        validationErrors: remainder.errors
      });
    }
    if(err){
      return res.status(500).json({errorMessage: 'Could not submit new remainder.'});
    }

    res.status(200).json(remainder);
  });
})

// GET: /remainders/:id/edit
router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  ReminderModel.findOne({_id: id})
    .then(function(remainder) {
      res.render('remainders/edit', {timeZones: getTimeZones(),
                                       remainder: remainder});
    });
});

// POST: /remainders/:id/edit
router.post('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const notification = req.body.notification;
  const timeZone = req.body.timeZone;
  const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');

  ReminderModel.findOne({_id: id})
    .then(function(remainder) {
      remainder.name = name;
      remainder.phoneNumber = phoneNumber;
      remainder.notification = notification;
      remainder.timeZone = timeZone;
      remainder.time = time;

      remainder.save()
        .then(function() {
          res.redirect('/');
        });
    });
});

// POST: /remainders/:id/delete
router.delete('remainders/:id/delete', function(req, res, next) {
  const id = req.params.id;

  ReminderModel.removeById(
    id,
    (err, remainderDeleted)=> {
      res.redirect('/');
    });
});

router.get('/send', (req,res,next)=>{
  const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
  // Create options to send the message
  const options = {
      to: `+19548029957`,
      from: cfg.twilioPhoneNumber,
      /* eslint-disable max-len */
      body: `Hi. Just a reminder that you have an remainder coming up.`,
      /* eslint-enable max-len */
  };

  // Send the message!
  client.messages.create(options, function(err, response) {
      if (err) {
          // Just log it for now
          res.status(500).json({ErrorMessage: "Oh no"})
          console.error(err);
      } else {
          // Log the last few digits of a phone number
          res.status(200).json({SuccessMessage: "Yay!"})
      }
  });
})

module.exports = router;

const express = require('express');
const BankModel = require('../models/bank-model.js');

const router = express.Router();

router.get('/banks', (req, res, next)=>{
  BankModel.find(
    (err, bankList)=>{
      if(err){
        return res.status(500).json({errorMessage: 'Could not obtain pyggie bank list.'})
      }

      res.status(200).json(bankList);
    });
})

router.post('/banks', (req, res, next)=>{
  const bank = new BankModel({
    title: req.body.title,
    totalValue: req.body.totalValue,
    date: req.body.date,
    dateFormatted: req.body.dateFormatted,
    payments: {
      startDate: req.body.payments.startDate,
      remainingCost: req.body.payments.remainingCost,
      period: req.body.payments.period,
      numberPaymentsLeft: req.body.payments.numberPaymentsLeft,
      paymentLog: req.body.payments.paymentLog
    }
    });

  bank.save((err)=>{
    if(bank.errors){
      return res.status(400).json({
        errorMessage: 'Database validation failed.',
        validationErrors: bank.errors
      });
    }
    if(err){
      return res.status(500).json({errorMessage: 'Could not submit new pyggie bank.'});
    }

    res.status(200).json(bank);
  });
})

router.put('/banks/:id', (req, res, next)=>{
  BankModel.findById(
    req.params.id,
    (err, bank)=>{
      if(err){
        return res.status(500).json({errorMessage: 'Could not obtain pyggie bank.'})
      }
      bank.set({
        title: req.body.title,
        totalValue: req.body.totalValue,
        date: req.body.date,
        dateFormatted: req.body.dateFormatted,
        payments: {
          startDate: req.body.payments.startDate,
          remainingCost: req.body.payments.remainingCost,
          period: req.body.payments.period,
          numberPaymentsLeft: req.body.payments.numberPaymentsLeft,
          paymentLog: req.body.payments.paymentLog
        }})

        if(req.body.description){
          bank["description"] = req.body.description;
        }
      bank.save((err)=>{
        if(bank.errors){
          return res.status(400).json({
            errorMessage: 'Database validation failed.',
            validationErrors: bank.errors
          });
        }
        if(err){
          return res.status(500).json({errorMessage: 'Could not submit new pyggie bank.'});
        }

        res.status(200).json(bank);
      });
    }
  );
});

module.exports = router;

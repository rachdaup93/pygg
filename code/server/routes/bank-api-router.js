const express = require('express');
const BankModel = require('../models/bank-model.js');

const router = express.Router();

router.get('/banks', (req, res, next)=>{

  BankModel.find(
    { ownerId: req.user._id},
    (err, bankList)=>{
      if(err){
        return res.status(500).json({errorMessage: 'Could not obtain pyggie bank list.'})
      }

      res.status(200).json(bankList);
    });
})

router.post('/banks', (req, res, next)=>{
  console.log(req.user._id)
  const bank = new BankModel({
    title: req.body.title,
    totalValue: req.body.totalValue,
    date: req.body.date,
    dateFormatted: req.body.dateFormatted,
    ownerId: req.user._id,
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

router.get('/banks/:bankId', (req, res, next)=>{
  BankModel.findById(
    req.params.bankId,

    (err, bank)=>{
      if(err){
        return res.status(500).json({errorMessage: 'Could not obtain pyggie bank.'})
      }

      res.status(200).json(bank);
    });
})

router.put('/banks/:bankId', (req, res, next)=>{
  BankModel.findById(
    req.params.bankId,
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
          ownerId: req.user._id,
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

router.delete('/banks/:bankId', (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ errorMessage: 'Not logged in. 🥊' });
        return;
    }

    BankModel.findById(
      req.params.bankId,

      (err, bankFromDb) => {
          if (err) {
              console.log('Bank owner confirm ERROR', err);
              res.status(500).json(
                { errorMessage: 'Bank owner confirm went wrong 💩' }
              );
              return;
          }

          BankModel.findByIdAndRemove(
            req.params.bankId,
            (err, bankFromDb) => {
                if (err) {
                    console.log('Bank delete ERROR', err);
                    res.status(500).json({ errorMessage: 'Bank delete went wrong 💩' });
                    return;
                }

                res.status(200).json(bankFromDb);
            }
          ); // BankModel.findByIdAndRemove()
      }
    ); // BankModel.findById()
}); // DELETE /banks/:bankId

module.exports = router;

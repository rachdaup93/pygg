'use strict';

const CronJob = require('cron').CronJob;
const notificationsWorker = require('./workers/notificationsWorker');
const moment = require('moment');

const schedulerFactory = function() {
  return {
    start: function() {
  // Runs every day at 7:30:00 AM.
      new CronJob('00 30 7 * * *', function() {
        console.log('Running Send Notifications Worker for ' +
          moment().format());
        notificationsWorker.run();
      }, null, true, '');
    },
  };
};

module.exports = schedulerFactory();

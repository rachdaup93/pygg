const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const UserModel = require('../models/user-model');


const router = express.Router();


router.post('/process-signup', (req, res, next) => {
    if (!req.body.signupFullName ||
          !req.body.signupUsername ||
          !req.body.signupPassword) {
        res.status(400).json(
          { errorMessage: 'We need full name, username and password.' }
        );
        return;
    }

    UserModel.findOne(
      { username: req.body.signupUsername },
      (err, userFromDb) => {
          if (err) {
              console.log('User find error 🚨', err);
              res.status(500).json({ errorMessage: 'Error finding username.' });
              return;
          }

          if (userFromDb) {
              res.status(400).json({ errorMessage: 'Username was taken.' });
              return;
          }

          const salt = bcrypt.genSaltSync(10);
          const hashPass = bcrypt.hashSync(req.body.signupPassword, salt);

          const theUser = new UserModel({
              fullName: req.body.signupFullName,
              username: req.body.signupUsername,
              encryptedPassword: hashPass
          });

          theUser.save((err) => {
              if (err) {
                  console.log('User save error 🚨', err);
                  res.status(500).json({ errorMessage: 'Error saving user.' });
                  return;
              }

              // "req.login" is a Passport method
              // (logs in the user automatically)
              req.login(theUser, (err) => {
                  if (err) {
                      console.log('User auto-login error 🚨', err);
                      res.status(500).json({ errorMessage: 'Error loggin in user.' });
                      return;
                  }

                  // clear out the password before sending the user info
                  theUser.encryptedPassword = undefined;
                  res.status(200).json(theUser);
              });
          });
      }
    ); // UserModel.findOne()
}); // POST /api/process-signup

router.post('/process-login', (req, res, next) => {
    const customAuthCallback =
      passport.authenticate('local', (err, theUser, extraInfo) => {
          if (err) {
              res.status(500).json({ errorMessage: 'Login failed. 💩' });
              return;
          }

          if (!theUser) {
              res.status(401).json({ errorMessage: extraInfo.message });
              return;
          }

          req.login(theUser, (err) => {
              if (err) {
                  res.status(500).json({ errorMessage: 'Login failed. 👽' });
                  return;
              }

              // clear out the password before sending the user info
              theUser.encryptedPassword = undefined;
              res.status(200).json(theUser);
          });
      }); // passport.authenticate('local')

    customAuthCallback(req, res, next);
}); // POST /api/process-login

router.delete('/logout', (req, res, next) => {
    // "req.logout" is defined by Passport
    req.logout();
    res.status(200).json({ successMessage: 'Log out success! 🤣' });
});

router.get('/checklogin', (req, res, next) => {
    let amILoggedIn = false;

    if (req.user) {
        req.user.encryptedPassword = undefined;
        amILoggedIn = true;
    }

    res.status(200).json(
      {
          isLoggedIn: amILoggedIn,
          userInfo: req.user
      }
    );
});

// link to "/auth/facebook" to take the user to the Facebook Website for login
router.get('/auth/facebook', passport.authenticate('facebook'));
// the "/auth/facebook/callback" URL is where the user will arrive after login
router.get('/auth/facebook/callback',
            // name of strategy    settings object
            //               |      |
  passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
  })
);

router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read",
          "https://www.googleapis.com/auth/calendar"]
}));

router.get("/auth/google/callback",
passport.authenticate('google', (err, theUser, extraInfo) => {
          if (err) {
              res.status(500).json({ errorMessage: 'Login failed. 💩' });
              return;
          }

          if (!theUser) {
              res.status(401).json({ errorMessage: extraInfo.message });
              return;
          }

          req.login(theUser, (err) => {
              if (err) {
                  res.status(500).json({ errorMessage: 'Login failed. 👽' });
                  return;
              }

              // clear out the password before sending the user info
              theUser.encryptedPassword = undefined;
              res.status(200).json(theUser);
          });
      }),
);

// router.get("/auth/google/callback",
// passport.authenticate('google', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }),
// );

module.exports = router;

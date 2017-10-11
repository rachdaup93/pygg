const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UserModel = require('../models/user-model');


// serializeUser: what to save in the session after logging in
passport.serializeUser((userFromDb, done) => {
    done(null, userFromDb._id);
});

// deserializeUser: what will become "req.user" on every request
passport.deserializeUser((idFromSession, done) => {
    UserModel.findById(
      idFromSession,
      (err, userFromDb) => {
          if (err) {
              done(err);
              return;
          }

          done(null, userFromDb);
                 // "userFromDb" becomes "req.user" in our routes
      }
    );
});


// LocalStrategy from "passport-local"
// -----------------------------------
// Log in with username and password.

passport.use(
  new LocalStrategy(
    {
      usernameField: 'loginUsername',
      passwordField: 'loginPassword'
    },

    (sentUsername, sentPassword, done) => {
        UserModel.findOne(
          { username: sentUsername },
          (err, userFromDb) => {
              if (err) {
                  done(err);
                  return;
              }

              if (!userFromDb) {
                  // "false" tells Passport that the login failed
                  done(null, false, { message: 'Bad username 🤢' });
                  return;
              }

              const isPasswordGood =
                bcrypt.compareSync(sentPassword, userFromDb.encryptedPassword);

              if (!isPasswordGood) {
                  // "false" tells Passport that the login failed
                  done(null, false, { message: 'Bad password 🤢' });
                  return;
              }

              // if we get here, log in was successful!
              // make "userFromDb" the logged in user
              done(null, userFromDb);
          }
        ); // UserModel.findOne()
    }
  ) // new LocalStrategy()
);

const FbStrategy = require('passport-facebook').Strategy;

// "passport.use()" sets up a new strategy
passport.use(
  new FbStrategy(
    // 1st arg -> settings object
    // "fb_app_id" & "fb_app_secret" are defined in the ".env" file
    {
        // clientID = App ID
        clientID: process.env.fb_app_id,
        // clientSecret = App Secret
        clientSecret: process.env.fb_app_secret,
        callbackURL: '/auth/facebook/callback'
    },

    // 2nd arg -> callback
    // gets called after a SUCCESSFUL Facebook login
    (accessToken, refreshToken, profile, done) => {
        console.log('Facebook user info:');
        console.log(profile);

        // check to see if it's the first time they log in
        UserModel.findOne(
          { facebookID: profile.id },

          (err, userFromDb) => {
              if (err) {
                  done(err);
                  return;
              }

              // if the user already has an account, GREAT! log them in.
              if (userFromDb) {
                  done(null, userFromDb);
                  return;
              }

              // if they don't have an account, make one for them.
              const theUser = new UserModel({
                  facebookID: profile.id,
                  email: profile.displayName
              });

              theUser.save((err) => {
                  if (err) {
                      done(err);
                      return;
                  }

                  // if save is successful, log them in.
                  done(null, theUser);
              });
          }
        ); // close UserModel.findOne( ...
    }
  ) // close new FbStrategy( ...
);

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  new GoogleStrategy({
    clientID: process.env.google_app_id,
    clientSecret: process.env.google_app_secret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {

    UserModel.findOne(

      { googleID: profile.id },

      (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }

      const newUser = new UserModel({
        googleID: profile.id,
        email: profile.emails[0].value
      });

      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });

}));

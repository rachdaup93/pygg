const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
      fullName: {
          type: String,
          required: [true, 'Please give us your name.']
      },
      username: {
          type: String,
          required: [true, 'Username is required.']
      },
      encryptedPassword: {
          type: String,
          required: [true, 'Password is required.']
      },

          // for Facebook login users
      facebookID: { type: String },

      googleID: { type: String },
  },

  {
      timestamps: true
  }
);

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;

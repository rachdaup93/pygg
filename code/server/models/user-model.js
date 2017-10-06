const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },

    // for users who did normal login with email and password
    encryptedPassword: { type: String },

    // for Facebook login users
    facebookID: { type: String },

    // determines whether you are an admin or not
    role: {
      type: String,
      enum: [ 'normal', 'admin' ],
      default: 'normal'
    }
  },

  // optional settings object for this schema
  {
    // adds "createdAt" and "updatedAt" fields to the schema
    timestamps: true
  }
);

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;

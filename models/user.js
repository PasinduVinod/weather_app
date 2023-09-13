// user.js

const mongoose = require('mongoose');

// define the schema for the User model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
});

// create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

// data.js

const mongoose = require('mongoose');

// define the schema for the data model
const dataSchema = new mongoose.Schema({
  UID: {
    type: String,
  },
  Age: {
    type: Number,
  },
});

// create the data model from the schema
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;

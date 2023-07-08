const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;

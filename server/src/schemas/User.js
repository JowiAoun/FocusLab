// --- Imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// --- Define the schemas
const noteSchema = new Schema({
  title: {
    type: String,
    default: "New Book",
  },
  text: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const userSchema = new Schema({
  username: {
    // TODO: Allow no special characters and add max/min length
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  settings: {
    type: String,
  },
  notes: {
    type: [noteSchema],
  },
});

// Export schema
module.exports = mongoose.model("User", userSchema);
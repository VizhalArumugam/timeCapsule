// imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// a simple notes schema to store a user's notes
const NoteSchema = new Schema({
  content: { type: String , required: true},
  createdAt: {type: Date, default: new Date()}
});

// exporting and creating the Note model
module.exports = mongoose.model("Note", NoteSchema);
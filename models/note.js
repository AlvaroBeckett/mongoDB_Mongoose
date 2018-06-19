var mongoose = require("mongoose");
var schema = mongoose.Schema;
var noteSchema = new Schema({
  title: String,
  body: String
});
var note = mongoose.model("Note", noteSchema);
module.exports = note;

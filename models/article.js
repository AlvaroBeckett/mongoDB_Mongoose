var mongoose = require("mongoose");
var schema = mongoose.schema;
var articleSchema = new schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean,
    default: false,
    required: false
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});
var article = mongoose.model("Article", articleSchema);

module.exports = article;
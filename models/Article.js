const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: String,
  link: String,
  body: String,
  section: String,
  isSaved: Boolean,
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;

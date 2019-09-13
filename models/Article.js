const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
        title : String,
        body: String,
        section: String,
        // note: {
        //     type: Schema.Type.ObjectID,
        //     ref: "Note"
        // }
})
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
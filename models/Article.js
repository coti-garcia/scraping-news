const mongoose = require("mongoose");
const Schema = mongoose.schema;
const articleSchema = new Schema({
        title : String,
        body: String,
        section: String,
        note: {
            type: Schema.Type.ObjectID,
            ref: "Note"
        }
})
const Article = mongoose.model("Article", articleSchema)
module.exports = Article;
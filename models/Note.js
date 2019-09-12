const mongoose = require("mongoose");
const Schema = mongoos.schema;
const noteSchema = new Schema({
    title: String,
    body: String
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;



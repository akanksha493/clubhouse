const mongoose = require("mongoose");
// const Schema = new mongoose.Schema;

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Story", storySchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isMember:{
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema);
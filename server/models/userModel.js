const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false,
    },
    profilePic: {
        type: String
    }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
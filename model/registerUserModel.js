const mongoose = require("mongoose");

const RegisterUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    numberPhone: {
        type: String,
        required: true,
    },
    laborField: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", RegisterUserSchema);
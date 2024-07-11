const mongoose = require("mongoose");

const RegisterHouseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    municipality: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    }
});

module.exports = mongoose.model("House", RegisterHouseSchema);
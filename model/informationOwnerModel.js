const mongoose = require("mongoose");

const InformationOwnerSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    housePhone: {
        type: String,
        required: true,
    },
    extraInfo: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model("informationProperty", InformationOwnerSchema);
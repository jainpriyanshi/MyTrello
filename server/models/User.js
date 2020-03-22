const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    isVerified: {
        type : Boolean,
        required: true
    },
    boards: [
        {
            boardid: {
                type: String
            },
            name: {
                type: String
            },
            accepted: {
                type: Boolean
            }
    }]
});

module.exports = User = mongoose.model("users",UserSchema);

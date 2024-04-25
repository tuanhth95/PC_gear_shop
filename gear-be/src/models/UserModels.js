const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        phone: {type: Number, required: true},
        address: {type: String, required: true},
        password: {type: String, required: true},
        acess_token: {type: String},
        refresh_token: {type: String},
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;

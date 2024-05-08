const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        phone: {type: Number, required: true},
        address: {type: String, required: true},
        password: {type: String, required: true},
        avatar: { type: String },
        access_token: {type: String},
        refresh_token: {type: String},
        createTokenAt: {type: Date}
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
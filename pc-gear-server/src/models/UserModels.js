const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        phone: {type: Number, required: true},
        address: {type: String, required: true},
        shippingAddress: [{
            addressName: {type: String, required: true},
            addressPhone: {type: String, required: true},
            addressProvince: {type: String, required: true},
            addressDistrict: {type: String, required: true},
            addressWard: {type: String, required: true},
            addressNumber: {type: String, required: true},
        }],
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
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, //Users are not created as admin, defaultly.
    isProductManager: {type: Boolean, default: false},
    isSalesManager: {type: Boolean, default: false},
    taxId: {type: String}
},
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("User", UserSchema);
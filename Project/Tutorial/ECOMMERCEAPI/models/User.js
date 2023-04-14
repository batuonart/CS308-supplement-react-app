const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, //Maybe we can use username as a id
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type:Number},
    isAdmin: { type: Boolean, default: false }, //Users are not created as admin, defaultly.
    //A point system like in Suplemeter can be added. When you buy something your rank/points increase giving you better deals
},
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("User", UserSchema);
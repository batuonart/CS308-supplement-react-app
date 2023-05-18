const mongoose = require("mongoose")

const AdressSchema = new mongoose.Schema(
    {
    userId: { type: String, required: true},
    adressId:{type:String},
    adressline1:{
        type:String,
        required: true,
    },
    adressline2:{
        type:String,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
    },
    isDefault:{
        type: Boolean,
        default: false
    }
        },
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("Adress", AdressSchema)
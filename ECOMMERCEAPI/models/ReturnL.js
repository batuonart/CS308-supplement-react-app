const mongoose = require("mongoose")

const ReturnLSchema = new mongoose.Schema(
    {
        buyerId: { type: String },
        productId: { type: String },
        productTitle: { type: String },
        returnAcpt: { type: Boolean, default: false },
        quantity: { type: Number },
        productPrc: { type: Number },
    },
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("ReturnL", ReturnLSchema)
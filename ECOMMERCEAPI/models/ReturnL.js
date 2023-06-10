const mongoose = require("mongoose")

const ReturnLSchema = new mongoose.Schema(
    {
    managerId: { type: String, required: true},
    products: [
        {
            buyerId: {type: String},
            productId: {type: String},
            productTitle: {type: String},
            productImg: {type: String},
            returnAcpt: {type: Boolean, default: false},
            quantity: {type: Number},
            returnRsn: {type: String},
            productPrc: {type: Number},
            productDsc: {type: Number},
        },
    ],

},
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("ReturnL", ReturnLSchema)
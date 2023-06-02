const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {type: String},
                productTitle: {type: String},
                productImg: {type: String},
                quantity: {type: Number,default: 1}
            },

        ],
        amount: { type: Number, required: true },
        address: { type: String, required: true },
        status: {type:String, default:"Pending..."},
    },
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("Order", OrderSchema)
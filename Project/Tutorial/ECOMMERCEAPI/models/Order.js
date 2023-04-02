const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1, //Default number of items to add to Order.
                }
            },

        ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        satus: {type:String, default:"Pending..."},
    },
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("Order", OrderSchema)
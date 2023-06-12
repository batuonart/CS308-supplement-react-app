const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
    {
    userId: { type: String, required: true},
    products: [
        {
            productId: {
                type: String
            },
            productTitle: {type: String},
            productImg: {type: String},
            quantity: {
                type: Number,
                default: 1, //Default number of items to add to Order.
            }
        },

    ],

},
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("Cart", CartSchema)
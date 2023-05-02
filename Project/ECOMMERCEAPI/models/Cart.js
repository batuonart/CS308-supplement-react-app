const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
    {
    userId: { type: String, required: true},
    products: [
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default: 1, //Default number of items to add to cart.
            }
        }
    ]

},
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("Cart", CartSchema)
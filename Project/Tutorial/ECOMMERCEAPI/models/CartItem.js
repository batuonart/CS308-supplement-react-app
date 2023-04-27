//This will be used for HOW LONG THE PRODUCT STAYED IN THE CART
// AND DID THIS GET BUY OR CHANGED FOR ANOTHER PRODUCT OR
// JUST DROPPED

const mongoose = require("mongoose")

const CartItemSchema = new mongoose.Schema(
    {
    userId: { type: String, required: true},
    productId: { type: String, required: true},
    cartId: { type: String, required: true},
    status:{type: Number, default: 0} //If Status is 0 the it is in the cart, 1-> Bought, 2-> Dropped from cart
},
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("CartItem", CartItemSchema)
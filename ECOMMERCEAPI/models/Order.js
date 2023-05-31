const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String
                },
                productTitle: { type: String, required: true, unique: true },
                productDesc: { type: String, required: true },
                productImg: { type: String, required: true },
                productCategories: { type: Array },
                productSize: { type: String },
                productPrice: { type: Number },
                productAroma: { type: Array, required: true },
                productRating: { type: Number, default: 0},
                productRatingcount: { type: Number, default: 0},
                productInstock: { type: Boolean, default: true },
                stockCount: {type: Number, default: 0},
                quantity: {
                    type: Number,
                    default: 1, //Default number of items to add to Order.
                }
            },

        ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: {type:String, default:"Pending..."},
    },
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("Order", OrderSchema)
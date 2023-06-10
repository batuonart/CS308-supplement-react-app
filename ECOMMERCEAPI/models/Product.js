const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    price: { type: Number },
    aroma: { type: Array, required: true },
    rating: { type: Number, default: 0},
    ratingcount: { type: Number, default: 0},
    inStock: { type: Boolean, default: true },
    stockCount: {type: Number, default: 0},
    discountRate: {type: Number, default: 1}
},
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("Product", ProductSchema)
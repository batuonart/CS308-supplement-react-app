const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    price: { type: Number },
    aroma: { type: Array, required: true },
    rating: { type: Number },
    comments: { type: Array },
    inStock: { type: Boolean, deafault: true },
},
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("Product", ProductSchema)
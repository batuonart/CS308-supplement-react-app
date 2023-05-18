const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
    {
    productId: { type: String, required: true},
    userId: { type: String, required: true},
    userName:{
        type: String,
        required: true
    },
    userComment:{
        type: String
    },
    rating:{
        type: Number
    },
    isPassed: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("Comment", CommentSchema)
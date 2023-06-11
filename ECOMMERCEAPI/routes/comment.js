const router = require("express").Router();

const Comment = require("../models/Comment");
const Product = require('../models/Product'); // replace with the actual path to your product model

const mongoose = require('mongoose');

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//ADD COMMENT
router.post("/", async (req, res) => {
    const newComment = new Comment({
        userId: req.body.userId,
        productId: req.body.productId,
        userName: req.body.username,
        userComment: req.body.usercomment,
        rating: req.body.rating,
    });

    try {
        const savedComment = await newComment.save();
        console.log("Rating added is:",req.body.rating)
        // after a comment is added, update the product rating
        await updateProductRating(req.body.productId);
        return res.status(200).json(savedComment);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//DELETE COMMENT
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        return res.status(200).json("Comment has been deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
})
// FIND COMMENTS
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const findComment = await Comment.findById(req.params.id);
        return res.status(200).json(findComment);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// UPDATE Comment // Will be used for Modifying Comments
router.put("/:id", async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        return res.status(200).json(updatedComment);
    } catch (err) {
        return res.status(500).json(err);
    }

})

// GET ALL, View all Comments of all users.
router.get("/", async (req, res) => {
    try {
        // Return ALL Comments
        const comments = await Comment.find();
        res.header('Content-Range', 'comments 0-24/319');
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET ALL Comment By ProductId
router.get("/findbyproduct/:productId", async (req, res) => {
    try {
        const findComment = await Comment.find({ productId: req.params.productId });

        
        return res.status(200).json(findComment);
    } catch (err) {
        return res.status(500).json(err);
    }
})

async function updateProductRating(productId) {
    try {
        console.log("Inside update")
        const avgRating = await Comment.aggregate([
            { $match: { productId: productId } },
            { $group: { _id: "$productId", avgRating: { $avg: "$rating" } } },
        ]);
        console.log("avgRating:", avgRating)
        
        if (avgRating.length > 0) {
            await Product.findByIdAndUpdate(productId, { rating: avgRating[0].avgRating, ratingcount: avgRating.length });
        } else {
            // handle the case where there are no comments for a given product
            await Product.findByIdAndUpdate(productId, { rating: 0, ratingcount: 0 });
        }
    } catch (err) {
        console.log(err);
    }
}

router.get("/:id", async (req, res) => {
    try {
        const orders = await Comment.find({ _id: req.params.id });

 
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router;
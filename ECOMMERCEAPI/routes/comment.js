const router = require("express").Router();

const Comment = require("../models/Comment");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//ADD COMMENT
router.post("/", async (req, res) => {
    const newComment
 = new Comment({
        userId: req.body.userId,
        productId: req.body.productId,
        userName: req.body.username,
        userComment: req.body.usercomment,
        rating: req.body.rating,
    });

    try {
        const savedComment = await newComment.save();
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
router.put("/:id", verifyToken, async (req, res) => {
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
        const Comments = await Comment.find();
        return res.status(200).json(Comments);
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
module.exports = router;

const router = require("express").Router();

const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// Here, we'll be using express router.

// CREATE CART
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        return res.status(200).json(savedCart);
    } catch (err) {
        return res.status(500).json(err);
    }

});

// DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        return res.status(200).json("Cart has been deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
})


// GET USER CART, id will be USER ID, !!! NOT CART ID !!!
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        // Send everything but password. 
        // Send user the access token
        return res.status(200).json(cart);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// UPDATE cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        return res.status(200).json(updatedCart);
    } catch (err) {
        return res.status(500).json(err);
    }

})

// GET ALL, View all carts of all users.
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Return ALL carts
        const carts = await Cart.find();
        return res.status(200).json(carts);
    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router
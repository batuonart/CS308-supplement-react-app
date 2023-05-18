const router = require("express").Router();

const CartItem = require("../models/CartItem");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//ADD CartItem
router.post("/", verifyToken, async (req, res) => {
    const newCartItem
 = new CartItem({
        userId: req.body.userId,
        productId: req.body.productId,
        cartId: req.body.cartId
        });

    try {
        const savedCartItem = await newCartItem.save();
        return res.status(200).json(savedCartItem);
    } catch (err) {
        return res.status(500).json(err);
    }

});

//DELETE CartItem
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await CartItem.findByIdAndDelete(req.params.id)
        return res.status(200).json("CartItem has been deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
})
// FIND CartItemS
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const findCartItem = await CartItem.findById(req.params.id);
        return res.status(200).json(findCartItem);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// UPDATE CartItem // Will be used for Modifying CartItems
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedCartItem = await CartItem.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        return res.status(200).json(updatedCartItem);
    } catch (err) {
        return res.status(500).json(err);
    }

})

// GET ALL, View all CartItems of all users.
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Return ALL CartItems
        const CartItems = await CartItem.find();
        return res.status(200).json(CartItems);
    } catch (err) {
        return res.status(500).json(err);
    }
})
// GET CartItem By UserId
router.get("/findbyuser/:userId", verifyTokenAndAdmin, async (req, res) => {
    try {
        const findCartItem = await CartItem.find({ userId: req.params.userId });

        
        return res.status(200).json(findCartItem);
    } catch (err) {
        return res.status(500).json(err);
    }
})
// GET CartItem By ProductId
router.get("/findbyproduct/:productId", verifyTokenAndAdmin, async (req, res) => {
    try {
        const findCartItem = await CartItem.find({ productId: req.params.productId });

        
        return res.status(200).json(findCartItem);
    } catch (err) {
        return res.status(500).json(err);
    }
})
// GET CartItem By CarttId
router.get("/findbycart/:cartId", verifyTokenAndAdmin, async (req, res) => {
    try {
        const findCartItem = await CartItem.find({ cartId: req.params.cartId });

        
        return res.status(200).json(findCartItem);
    } catch (err) {
        return res.status(500).json(err);
    }
})
module.exports = router;

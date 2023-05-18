const router = require("express").Router();

const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// Here, we'll be using express router.

// CREATE CART
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder);
    } catch (err) {
        return res.status(500).json(err);
    }

});

// UPDATE cart
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        return res.status(200).json(updatedOrder);
    } catch (err) {
        return res.status(500).json(err);
    }

})

// DELETE CART
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json("Order has been deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
})


// GET USER ORDERS
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // Not using findOne here because user can have more than one orders.
        const cart = await Cart.find({ userId: req.params.userId });
        // Send everything but password. 
        // Send user the access token
        return res.status(200).json(cart);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET ALL, View all carts of all users.
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Return ALL carts
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date(); // the current date
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); // 1 one before from now
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1)); // 2 months before from now

    try {
        const income = await Order.aggregate([
          { $match: { createdAt: { $gte: previousMonth } } },
          {
            $project: {
              month: { $month: "$createdAt" },
              sales: "$amount",
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: "$sales" },
            },
          },
        ]);
        res.status(200).json(income);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router
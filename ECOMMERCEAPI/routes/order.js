const router = require("express").Router();

const Order = require("../models/Order");
// const Cart = require("../models/Cart");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// Here, we'll be using express router.

// CREATE CART
router.post("/", async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder);
    } catch (err) {
        return res.status(500).json(err);
    }

});

// UPDATE cart
router.put("/:id", async (req, res) => {
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

// Change status
router.put("/changestatus/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            status: req.body.status
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




// Get only user
router.get("/find/:userId", async (req, res) => {
    try {
        // Not using findOne here because user can have more than one orders.
        const orders = await Order.find({ userId: req.params.userId });
        // Send everything but password. 
        // Send user the access token
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
})


//GET USER FOR ADMIN PANEL
router.get("/:id", async (req, res) => {
    try {
        const orders = await Order.find({ _id: req.params.id });

 
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET ALL, View all carts of all users.
router.get("/", async (req, res) => {
    try {
        // Return ALL carts
        const orders = await Order.find();
        res.header('Content-Range', 'orders 0-24/319');

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
const router = require('express').Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../models/Order"); // import your Order model
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


router.post("/payment", verifyToken, (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenID,
            amount: req.body.amount,
            currency: "usd",
        },
        {
            apiKey: process.env.STRIPE_KEY
        },
        async (stripeErr, stripeRes) => {
            if (stripeErr) {
                return res.status(500).json(stripeErr);
            } else {
                const newOrder = new Order({
                    userId: req.body.userId, // assuming this is the user id
                    products: req.body.products, // products should be included in the request body
                    amount: req.body.amount,
                    address: req.body.address,
                    // add any other fields you need
                });
                try {
                    const savedOrder = await newOrder.save();
                    return res.status(200).json({ stripeRes, savedOrder });
                } catch (err) {
                    return res.status(500).json(err);
                }
            }
        }
    );
});

module.exports = router;

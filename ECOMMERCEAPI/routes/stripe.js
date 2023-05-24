const router = require('express').Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../models/Order"); // import your Order model
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


router.post("/payment", verifyToken, (req, res) => {
    // console.log(req.body, "- stripe.js");
    // console.log(req.body.products.products, " - req.body.products");
    // console.log("-------------------------------");
    stripe.charges.create(
        {
            source: "tok_visa",
            amount: req.body.amount,
            currency: "usd",
        },
        {
            apiKey: process.env.STRIPE_KEY
        },
        async (stripeErr, stripeRes) => {
            if (stripeErr) {
                // console.log(stripeErr);
                return res.status(500).json(stripeErr);
            } else {
                const newOrder = new Order({
                    userId: req.body.userId, // assuming this is the user id
                    products: req.body.products.products, // products should be included in the request body
                    amount: req.body.amount,
                    address: req.body.address,
                    // add any other fields you need
                });
                try {
                    const savedOrder = await newOrder.save();
                    console.log("request body:", req.body.products.products);
                    // console.log(newOrder);
                    // console.log(req.body.products);
                    return res.status(200).json({ stripeRes, savedOrder });
                } catch (err) {
                    // console.log(err);
                    return res.status(500).json(err);
                }
            }
        }
    );
});

module.exports = router;

const router = require('express').Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenID,
            amount: req.body.amount,
            currency: "usd",
        }, 
        {
            apiKey: process.env.STRIPE_KEY
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                return res.status(500).json(stripeErr);
            } else {
                return res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;

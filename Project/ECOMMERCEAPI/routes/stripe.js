const router = require('express').Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("payment", (req, res) => {
    stripe.charges.create(
        {
            sourse: req.body.tokenId,
            amount: req.body.amount,
            currency: "try"
        }, 
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                return res.status(500).json(err);
            } else {
                return res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;

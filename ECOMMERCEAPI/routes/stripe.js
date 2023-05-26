const router = require('express').Router();
const stripe = require("stripe")("sk_test_51N48DWDAwaH6hFG0zt1x5vOfpY0ZLrpA0MbYtWvP733TjmslqfOgYL5IHRynxea2HGk8D7fTZ8lljUDHNlsRr97c00ChWwPU2L");
const Order = require("../models/Order"); // import your Order model
const axios = require('axios');
const { verifyToken } = require("./verifyToken");

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
            apiKey: "sk_test_51N48DWDAwaH6hFG0zt1x5vOfpY0ZLrpA0MbYtWvP733TjmslqfOgYL5IHRynxea2HGk8D7fTZ8lljUDHNlsRr97c00ChWwPU2L"
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
                    let currUser = await axios.get(`http://localhost:5000/api/users/find/${req.body.userId}`);
                    console.log(currUser);

                    
                    const customer = await stripe.customers.create({
                        email: "developer.egemen@gmail.com",
                        name: currUser.username,
                        address: currUser.address,
                    });
                    const invoice = await stripe.invoices.create({
                        customer: customer.id,
                        collection_method: 'send_invoice',
                        days_until_due: 30,
                        // customer_address:currUser.address,
                        // amount_paid: 1000,
                        // currency: "try"
                    });

                    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
                    const sentInvoice = await stripe.invoices.sendInvoice(finalizedInvoice.id);
                    
                    console.log(invoice);
                    console.log("sentInvoice:", sentInvoice);
                    if (currUser) {
                        // console.log("Current user:", currUser);
                        // const customer = await stripe.customers.create({
                        //     email: currUser.email,
                        //     name: currUser.username,
                        //     address: currUser.address,
                        // });
                        // const invoice = await stripe.invoices.create({
                        //     customer: customer.id,
                        //     collection_method: 'send_invoice', // This sends an email to the customer with a link to the invoice
                        //     days_until_due: 30,
                        // });
                        // const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
                        // const sentInvoice = await stripe.invoices.sendInvoice(finalizedInvoice.id);
                        // console.log(invoice)
                        // console.log("--------------------------------------------------------------");
                        // console.log(customer);
                    }
                    // console.log("request body:", req.body);
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

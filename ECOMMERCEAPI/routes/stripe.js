const router = require('express').Router();
const stripe = require("stripe")("sk_test_51N48DWDAwaH6hFG0zt1x5vOfpY0ZLrpA0MbYtWvP733TjmslqfOgYL5IHRynxea2HGk8D7fTZ8lljUDHNlsRr97c00ChWwPU2L");
const Order = require("../models/Order"); // import your Order model
const axios = require('axios');
const { verifyToken } = require("./verifyToken");

router.post("/payment", (req, res) => {
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
                    const savedOrder = newOrder;
                    let currUser = await axios.get(`http://localhost:5000/api/users/find/${req.body.userId}`);
                    // console.log("currUser:", currUser);
                    // console.log("savedOrder:", savedOrder);
                    // console.log("savedOrder.products:", savedOrder.products);
                    // console.log("savedOrder.products._id:", savedOrder.products._id);



                    const customer = await stripe.customers.create({
                        email: "developer.egemen@gmail.com",
                        name: currUser.username,
                        address: currUser.address,
                    });

                    // let sum = 0;
                    let invoiceItems = [];

                    // const invoice = await stripe.invoices.create({
                    //     customer: customer.id,
                    //     collection_method: 'send_invoice',
                    //     days_until_due: 5,
                    //     customer_address: currUser.address,
                    //     currency: "usd",
                    //     description: "Payment successful!",
                    //     footer: "Thank you for choosing SUPPS",
                    // });

                    // Create invoice items
                    const invoice = await stripe.invoices.create({
                        customer: customer.id,
                        collection_method: 'send_invoice',
                        days_until_due: 5,
                        customer_address: currUser.address,
                        currency: "usd",
                        description: "Payment successful!",
                        footer: "Thank you for choosing SUPPS",
                        default_tax_rates: [], // add any tax rates here
                        auto_advance: false
                    });
                    
                    for (let productSaved of savedOrder.products) {
                        // console.log("savedOrder.productSaved.product:", productSaved._id.toString())
                        let currProduct = await axios.get(`http://localhost:5000/api/products/find/${productSaved._id.toString()}`);
                        console.log(productSaved._id.toString());
                        // console.log("currProduct.data", currProduct.data.title, currProduct.data.price);
                        // sum += currProduct.data.price;

                        const price = await stripe.prices.create({
                            currency: 'usd',
                            unit_amount: currProduct.data.price * 100, // convert to cents
                            product_data: {
                                name: currProduct.data.title,
                                // description: currProduct.data.desc,
                            },
                        });
                        console.log(price)
                        // const invoice_item = await stripe.products.create({
                        //     name: currProduct.data.title,
                        //     default_price_data: {
                        //         unit_amount: currProduct.data.price * 100, // Convert to cents
                        //         currency: 'usd',
                        //     },
                        //     expand: ['default_price'],
                        // });

                        // const prods = await stripe.products.list({
                        //     limit: 3,
                        // });
                        // console.log("=============================", prods)

                        // const invoiceItem = await stripe.invoiceItems.create({
                        //     customer: customer.id,
                        //     invoice: invoice.id,
                        //     // quantity: currProduct.data.rating, // make sure your currProduct object has 'quantity'
                        //     // unit_amount: currProduct.data.price * 100, // convert to cents and make sure your currProduct object has 'unit_amount'
                        //     // description: currProduct.data.desc,
                        //     price_data : {
                        //         'currency' : 'usd', 
                        //         'unit_amount' :10000 ,
                        //         'tax_behavior': 'exclusive'
                        //         'product' : "prod_Ny1WelaXLPNW5e"
                        //     }
                        // });
                        const invoiceItem = await stripe.invoiceItems.create({
                            customer: customer.id,
                            price: price.id,
                            invoice: invoice.id
                        });
                        console.log("Invoice Item Is:", invoiceItem, '\n')

                        invoiceItems.push(invoiceItem);
                        // console.log(invoiceItem)

                    }
                    console.log("Invoice Items Are:", invoiceItems, '\n')

                    // await new Promise(resolve => setTimeout(resolve, 6000));

                    // console.log(invoice)

                    // const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
                    // const sentInvoice = await stripe.invoices.sendInvoice(finalizedInvoice.id);


                    // console.log("sum:", sum)
                    // retreieve invoice
                    // let invoiceId = "in_1NC0n1DAwaH6hFG0Jw3DncKP";  // replace with your invoice id

                    // stripe.invoices.retrieve(
                    //     invoiceId,
                    //     function (err, invoice) {
                    //         if (err) {
                    //             console.log(err);
                    //         } else {
                    //             console.log("invoice.retrieve:",invoice);
                    //         }
                    //     }
                    // );
                    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

                    const sentInvoice = await stripe.invoices.sendInvoice(finalizedInvoice.id);

                    console.log("sentInvoice:", sentInvoice);
                    console.log("finalizedInvoice:", finalizedInvoice);
                    if (currUser) {
                        console.log(currUser);
                    }

                    return res.status(200).json({ stripeRes: sentInvoice, savedOrder: savedOrder, invoiceItems: invoiceItems });
                } catch (err) {
                    return res.status(500).json(err);
                }
            }
        }
    );
});

module.exports = router;
// Import express library
const express = require('express');

// Initialize application
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/products");
const cartsRoute = require("./routes/cart");
const ordersRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const commentsRoute = require("./routes/comment");
const adressesRoute = require("./routes/adress");
const couponsRoute = require("./routes/coupon");
const cors = require("cors");

dotenv.config();

// Use mongoose to connnect to our Mango Cloud Database
mongoose.
    connect(process.env.MONGO_URL)
    .then(() => console.log("DBConnection successful!"))
    .catch((err) => {
        console.log(err) 
    });

    app.get("/api/test", () => {
        console.log("Test is successfull")
    });

app.use(express.json());

// Whenever we go to api/user, our app will use userRoute, which is located in routes/user
// Its sort of a rule to use plural words in Rest APIs.
app.use("/api/auth", authRoute); 
app.use("/api/users", userRoute); 
app.use("/api/products", productsRoute); 
app.use("/api/carts", cartsRoute); 
app.use("/api/orders", ordersRoute); 
app.use("/api/comments", commentsRoute); 
app.use("/api/adresses", adressesRoute); 
app.use("/api/coupons", couponsRoute);
app.use(cors());
app.use("/api/checkout", stripeRoute); 


app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running")
});
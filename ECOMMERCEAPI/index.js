// Import express library
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/products");
const cartsRoute = require("./routes/cart");
const ordersRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const commentRoute = require("./routes/comment");
const adressRoute = require("./routes/adress");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors({
  origin: '*', // You can change this to a specific origin or an array of allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token', 'Authentication','Range'],
  exposedHeaders: ['Content-Range'], // Expose the Content-Range header
  }));

// Use mongoose to connect to our Mongo Cloud Database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

// Whenever we go to api/user, our app will use userRoute, which is located in routes/user
// Its sort of a rule to use plural words in Rest APIs.
app.use("/api/auth", authRoute); 
app.use("/api/users", userRoute); 
app.use("/api/products", productsRoute); 
app.use("/api/carts", cartsRoute); 
app.use("/api/orders", ordersRoute); 
app.use("/api/comments", commentRoute); 
app.use("/api/adresses", adressRoute); 
app.use("/api/checkout", stripeRoute); 
app.use(cors());




app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running")
});
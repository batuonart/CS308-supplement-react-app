const Product = require("../models/Product");
const User = require("../models/User");
const nodemailer = require('nodemailer');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndSalesManager } = require("./verifyToken");
// Here, we'll be using express router.
const router = require("express").Router();

// CREATE product
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        return res.status(200).json(savedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }

});

// DELETE product
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json("Product has been deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
})


// GET PRODUCT, users and admins can reach specific product data.
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        // Send everything but password. 
        // Send user the access token
        res.header('Content-Range', 'products 0-24/319');
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//GET FOR ADMIN PANEL
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        // Send everything but password. 
        // Send user the access token
        res.header('Content-Range', 'products 0-24/319');
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
})


// GET ALL USERS, everyone can get all products.
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            // Fetch most recent 5 products
            // To use the API localhost:5000/api/products?new=true
            //  ⟶ new?true query allows you to fetch the recent products.
            products = await Product.find().sort({ createdAt: -1 }).limit(1) //Change limit to 1 to change how many recent products to fetch.

        } else if (qCategory) {
            // Get products by category
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            // Get all products
            products = await Product.find();
        }
        products = await Product.find();
        res.header('Content-Range', 'products 0-24/319');

        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//Using $regex to find name by substr. Ex: Finding Hardline by line or ard
router.get("/findbytitle/:title", async (req, res) => {
    try {
        const product = await Product.find({ title: { $regex: req.params.title } })
        // Send everything but password. 
        // Send user the access token
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//Using $regex to find name by substr. Ex: Finding Banana Protein Powder by Banana, protein ...
router.get("/findbydesc/:desc", async (req, res) => {
    try {
        const product = await Product.find({ desc: { $regex: req.params.desc } })
        // Send everything but password. 
        // Send user the access token
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
})


//Using $regex to find name by all. Ex: Finding Banana Protein Powder by Banana, protein ...
router.get("/findbyall/:all", async (req, res) => {

    try {
        const product = await Product.find({ $or: [{ desc: { $regex: req.params.all, $options: 'i' } }, { title: { $regex: req.params.all, $options: 'i' } }] })

        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
})


// UPDATE Product
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        return res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// SET DISCOUNT RATE
router.put("/set-discount/:id", verifyTokenAndSalesManager, async (req, res) => {
    try {
        const discountRate = req.body.discountRate;
        if (discountRate < 0 || discountRate > 1) {
            return res.status(400).json("Invalid discount rate. It should be between 0 and 1.");
        }

        // Fetch the current product
        const product = await Product.findById(req.params.id);

        // Calculate the new price
        const newPrice = product.price * (1 - discountRate);

        // Update the product with the new discount rate and price
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: {
                discountRate: 1 - discountRate,
                price: newPrice
            }
        },
            { new: true }
        );

        // Fetch all users
        const users = await User.find();
        users.forEach(async user => {
            console.log("checking for user", user.username, user.wishlist, user)
            
            // Check if wishlist contains product
            const hasProductInWishlist = user.wishlist.some(wishlistItem => wishlistItem._id.toString() === req.params.id);
            
            if (hasProductInWishlist) {
              let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'developer.egemen',
                  pass: 'mksljwidjpugnfjr'
                }
              });
          
              let mailOptions = {
                from: 'developer.egemen@gmail.com',
                to: user.email,
                subject: 'A product on your wishlist is on sale!',
                text: `Hello ${user.username}, the product ${product.title} is now on sale. Check it out!`
              };
          
              console.log("Before transporter")
              try {
                let info = await transporter.sendMail(mailOptions);
                console.log('Email sent: ' + info.response);
              } catch (err) {
                console.log(err)
              }
              console.log("After transporter")
            }
          });
          

        return res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Add Rating Product
router.put("/addrating/:id", verifyToken, async (req, res) => {
    const product = await Product.findById(req.params.id)
    let addRating = req.body.rating
    let prevRating = product.rating
    let totalrating= addRating+prevRating

    let rCount= product.ratingcount
    let incrementedRCount=rCount + 1
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            rating: totalrating,
            ratingcount: incrementedRCount
        },
            { new: true }
        );
        return res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
})


//It is for finding aromas of an category
router.get("/findaroma/:categories", async (req, res) => {
    try {
        const products = await Product.find({categories: req.params.categories})
        const aromaArray=[]
        for (let product of products){
            for(const aromaB of product.aroma){
                if ((aromaArray.includes(aromaB.charAt(0).toUpperCase()+aromaB.slice(1)) === false)) 
                { aromaArray.push(aromaB.charAt(0).toUpperCase()+aromaB.slice(1))}
            }
        }
        return res.status(200).json(aromaArray);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//It is for sorting of an category
router.get("/sort/:categories", async (req, res) => {
    let sortType = req.body.sortType
    let sortParam = req.body.sortParam
    try {
        const products = await Product.find({categories: req.params.categories}).sort({sortParam:sortType})
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//It is for finding weight of an category
router.get("/findsize/:categories", async (req, res) => {
    try {
        const products = await Product.find({categories: req.params.categories})
        const sizeArray=[]
        for (let product of products){
            if ((sizeArray.includes(product.size) === false)) 
                { sizeArray.push(product.size)}
        }
        return res.status(200).json(sizeArray);
    } catch (err) {
        return res.status(500).json(err);
    }
})
module.exports = router;

const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// Here, we'll be using express router.
const router = require("express").Router();

// CREATE product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        return res.status(200).json(savedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }

});

// DELETE product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
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
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//Using $regex to find name by substr. Ex: Finding Hardline by line or ard
router.get("/findbytitle/:title", async (req, res) => {
    try {
        const product = await Product.find( {title: { $regex: req.params.title}})
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
        const product = await Product.find( {desc: { $regex: req.params.desc}})
        // Send everything but password. 
        // Send user the access token
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
        if (qNew){
            // Fetch most recent 5 products
            // To use the API localhost:5000/api/products?new=true
            //  ⟶ new?true query allows you to fetch the recent products.
            products = await Product.find().sort({createdAt: -1}).limit(1) //Change limit to 1 to change how many recent products to fetch.

        } else if (qCategory){
            // Get products by category
            products = await Product.find({categories: {
                $in: [qCategory],
            },
        });
        } else {
            // Get all products
            products = await Product.find();
        }

        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
})


// UPDATE
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
//     if (req.body.password) {
//         req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//             $set: req.body
//         },
//             { new: true }
//         );
//         return res.status(200).json(updatedUser);
//     } catch (err) {
//         return res.status(500).json(err);
//     }

// })




// // GET USER, only admin can get user.
// router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         const { password, ...others } = user._doc;
//         // Send everything but password. 
//         // Send user the access token
//         return res.status(200).json(others);
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// })


// // GET USER STATS, returns total number of users per month.
// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); //Returns the last year for today.
//     try {

//         // Use MongoDB Aggregate
//         const data = await User.aggregate([
//             { $match: { createdAt: { $gte: lastYear } } },
//             {
//                 // Create users by month here.
//                 $project: {
//                     month: { $month: "$createdAt" },
//                 },
//             },
//             {
//                     $group: {
//                         _id: "$month",
//                         total: { $sum: 1}, // Total user number. It's gonna sum every register at User.
//                     }
//             }
//         ]);
//         return res.status(200).json(data);
//     } catch (err) {
//     return res(500).json("Error fetching stats");
// }
// })

module.exports = router;

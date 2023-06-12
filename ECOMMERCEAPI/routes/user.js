const User = require("../models/User");
const Product = require("../models/Product");
var CryptoJS = require('crypto-js');

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// Here, we'll be using express router.
const router = require("express").Router();
// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }

})

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json("User has been deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET USER, only admin can get user.
// Removed verifyTokenandAdmin
router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        // Send everything but password. 
        // Send user the access token
        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET USER, only admin can get user.
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        // Send everything but password. 
        // Send user the access token
        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get("/", async (req, res) => {
    const query = req.query.new;
  
    try {
      let users;
  
   
        users = await User.find();
      
  
      // Send everything but the password.
      // Send the user the access token.
      res.header('Content-Range', 'users 0-24/' + users.length);

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  

// GET USER STATS, returns total number of users per month.
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); //Returns the last year for today.
    try {

        // Use MongoDB Aggregate
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                // Create users by month here.
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1}, // Total user number. It's gonna sum every register at User.
                    }
            }
        ]);
        return res.status(200).json(data);
    } catch (err) {
    return res(500).json("Error fetching stats");
}
})

//Adding to the wishlist
router.put("/addwishlist/:id", verifyToken, async (req, res) => {
    const user=await User.findOne({ _id: req.body.userId })
    const wishlist=user.wishlist
    const product = await Product.findOne({ _id: req.params.id })
    wishlist.push(product)

    try {
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            wishlist: wishlist
        },
            { new: true }
        );
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//Removing from the wishlist
router.put("/remwishlist/:id", verifyToken, async (req, res) => {
    const user=await User.findOne({ _id: req.body.userId })
    const prodId=req.params.id
    const wishlist=[]
    for(const products of user.wishlist){
        if( prodId != products._id){
            wishlist.push(products)
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            wishlist: wishlist
        },
            { new: true }
        );
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//It is for finding aromas of an category
router.get("/finddiscount/:id", async (req, res) => {
    try {
        const id=req.params.id
        const users=await User.find()
        const wishlistUsers=[]
        for (let user of users){
            for(const prod of user.wishlist){
                if(prod._id==id && wishlistUsers.includes(user._id) === false ){
                    wishlistUsers.push(user._id)
                }
            }
        }
        return res.status(200).json(wishlistUsers);
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;

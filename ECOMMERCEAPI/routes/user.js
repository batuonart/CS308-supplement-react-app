const User = require("../models/User");
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

// !GET ALL USERS, only admin can get user. CHANGE TO VERIFYTOKENANDADMIN LATER
router.get("/", async (req, res) => {
    const query = req.query.new;

    try {
        // Fetch the last 5 users that are recently registered.
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find()
        // Send everything but password. 
        // Send user the access token
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
})

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

module.exports = router;

const router = require("express").Router();
const Coupon = require("../models/Coupon");

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// ADD Coupon
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newCoupon = new Coupon({
        couponHeader: req.body.couponHeader,
        couponInfo: req.body.couponInfo,
        couponPoint: req.body.couponPoint,
        couponCode: req.body.couponCode,
        couponType: req.body.couponType,
        couponAmount: req.body.couponAmount,
    });

    try {
        const savedCoupon = await newCoupon.save();
        return res.status(200).json(savedCoupon);
    } catch (err) {
        return res.status(500).json(err);
    }

});

// DELETE Coupon
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id)
        return res.status(200).json("Coupon has been deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET Coupon
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const findCoupon = await Coupon.findById(req.params.id)

        
        return res.status(200).json(findCoupon);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// GET Coupon By Copuon Code
router.get("/findbycode/:couponCode", verifyToken, async (req, res) => {
    try {
        const findCoupon = await Coupon.findOne({ couponCode: req.params.couponCode });

        
        return res.status(200).json(findCoupon);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// UPDATE Coupon
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        return res.status(200).json(updatedCoupon);
    } catch (err) {
        return res.status(500).json(err);
    }

})

// GET ALL, View all Coupons of all users.
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Return ALL Coupons
        const Coupons = await Coupon.find();
        return res.status(200).json(Coupons);
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;

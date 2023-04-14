const router = require("express").Router();
const Adress = require("../models/Adress");

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
    const newAdress = new Adress({
        userId: req.body.userId,
        adressline1: req.body.adressline1,
        adressline2: req.body.adressline2,
        city: req.body.city,
        postalCode: req.body.postalCode,
    });

    try {
        const savedAdress = await newAdress.save();
        return res.status(200).json(savedAdress);
    } catch (err) {
        return res.status(500).json(err);
    }

});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Adress.findByIdAndDelete(req.params.id)
        return res.status(200).json("Adress has been deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
})

//
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const Adress = await Adress.findOne({ userId: req.params.userId });
        // Send everything but password. 
        // Send user the access token
        return res.status(200).json(Adress);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// UPDATE Adress
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedAdress = await Adress.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        return res.status(200).json(updatedAdress);
    } catch (err) {
        return res.status(500).json(err);
    }

})

// GET ALL, View all Adresss of all users.
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Return ALL Adresss
        const Adresss = await Adress.find();
        return res.status(200).json(Adresss);
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;

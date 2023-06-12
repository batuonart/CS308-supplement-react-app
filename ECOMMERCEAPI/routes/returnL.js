const router = require("express").Router();

const RList = require("../models/ReturnL");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// Here, we'll be using express router.

// CREATE RList
router.post("/", async (req, res) => {
    const newRList = new RList(req.body);

    try {
        const savedRList = await newRList.save();
        return res.status(200).json(savedRList);
    } catch (err) {
        return res.status(500).json(err);
    }

});

// DELETE RList
router.delete("/:id", async (req, res) => {
    try {
        await RList.findByIdAndDelete(req.params.id)
        return res.status(200).json("RList has been deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
})


// GET USER RList, id will be USER ID, !!! NOT RList ID !!!
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const rList = await RList.findOne({ userId: req.params.userId });
        // Send user the access token
        return res.status(200).json(rList);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// UPDATE Rlist
router.put("/:id", async (req, res) => {
    try {
        const updatedRlist = await RList.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );
        return res.status(200).json(updatedRlist);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// UPDATE RList
router.put("/addprd/:id", verifyTokenAndAuthorization, async (req, res) => {
    const rList = await RList.findOne({ userId: req.params.userId })
    var List = rList.products
    var addPrd = {
        buyerId: req.body.buyerId,
        productId: req.body.productId,
        productTitle: req.body.title,
        returnAcpt: req.body.returnAcpt,
        quantity: req.body.quantity,
        productPrc: req.body.productPrc,
    }
    List.push(addPrd)
    try {
        const updatedRList = await RList.findByIdAndUpdate(req.params.id, {
            products: List
        },
            { new: true }
        );
        return res.status(200).json(updatedRList);
    } catch (err) {
        return res.status(500).json(err);
    }

})

// GET ALL, View all RLists of all users.
router.get("/", async (req, res) => {
    try {
        // Return ALL RLists
        const rLists = await RList.find();
        res.header('Content-Range', 'rLists 0-24/319');
        return res.status(200).json(rLists);
    } catch (err) {
        return res.status(500).json(err);
    }
})

//GET FOR ADMIN PANEL
router.get("/:id", async (req, res) => {
    try {
        const rLists = await RList.findById(req.params.id)
        // Send everything but password. 
        // Send user the access token
        res.header('Content-Range', 'rLists 0-24/319');
        return res.status(200).json(rLists);
    } catch (err) {
        return res.status(500).json(err);
    }
})



module.exports = router
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
// Register route, we're using async here to make user saving 
// fully complete.
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        address: req.body.address
    });

    // Save user to DB, it is an async function, a promise.
    //  Update delete or any other stuff and other db takes ms.

    try {
        const savedUser = await newUser.save();
        // console.log(savedUser);
        res.status(201).json(savedUser);
        // 200 OK, 201 is SUCCESSFUL    LY ADDED
    } catch (err) {
        // We'll write 500 for user.
        res.status(500).json(err);
        // console.log(err);
    }

});

router.post("/login", async (req, res) => {
    // Find user in DB, using try catch since I have await
    /*
    ! There was a bug here, that resulted (node:7876) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT].
    ! Fixed it by using return statements instead of using && short-hand notation.
    !   ⟶ It ensures that one request is sent at a time.
    */
    try {
        const user = await User.findOne({ username: req.body.username });
        // await Promise.all(user);
        if (!user)
            return res.status(401).json("Wrong credentials!")

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword != req.body.password)
            return res.status(401).json("Wrong credentials!")

        // Keep user id and isadmin properties inside token.
        const accessToken = jwt.sign({
            id: user._id, isAdmin: user.isAdmin,
            isSalesManager: user.isSalesManager,
            isProductManager: user.isProductManager
        }, process.env.JWT_SEC,
            { expiresIn: "3d" } // User will have to login back after 3 days because the token will expire.
        );

        // I added ._doc because MongoDB stores the user information in it.
        // Not adding ._doc results in unnecessary info to be sent.
        const { password, ...others } = user._doc;
        // Send everything but password. 
        // Send user the access token
        return res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;

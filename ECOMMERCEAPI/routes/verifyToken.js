const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(403).json("Token is expired or wrong.")
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated!")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that!")
        }
    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that!")
        }
    });
}

const verifyTokenAndProductManager = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.ProductManager) {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that!")
        }
    });
}

const verifyTokenAndSalesManager = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("User object:", req.user); // Add this line to log the user object
        console.log("isSalesManager:", req.user.isSalesManager); // Add this line to log the isSalesManager property
        if (req.user.isSalesManager) {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that!")
        }
    });
}



module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndProductManager, verifyTokenAndSalesManager }
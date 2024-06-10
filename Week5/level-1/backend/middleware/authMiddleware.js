const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token)
        return res.sendStatus(401).json({message: "Unauthorized: No token provided"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error) {
        console.error("JWT verification failed:", error);
        return res.sendStatus(401).json({message: "Unauthorized: Invalid token"});
    }
};

module.exports = authMiddleware;
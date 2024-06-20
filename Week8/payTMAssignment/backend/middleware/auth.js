import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token)
        return res.status(401).json({message: "Authorization token not found"});

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err)
            return res.status(403).json({message: "Invalid token"});
        req.userId = user.id;
        next();
    });
} 

export default authenticateToken;
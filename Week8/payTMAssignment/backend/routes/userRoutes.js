import express from "express";
import {User} from "../db.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    try{
        const {query} = req.query;
        const users = await User.find({username: {$regex: query, $options: "i"}}).select("username email");
        res.json(users);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.get("/:userId", authenticateToken, async (req, res) => {
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId).select("username email");
        if(!user)
            return res.status(404).json({message: "User not found"});

        res.json(user);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

export default router;
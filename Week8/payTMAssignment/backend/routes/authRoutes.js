import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../db.js";
import {UserSchema} from "../validations.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

router.post("/signup", async (req, res) => {
    try {
        const {username, email, password} = UserSchema.parse(req.body);
        const existingUser = await User.findOne({$or: [{username}, {email}]});

        if (existingUser) 
            return res.status(400).json({message: "Username or email already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.post("/login", async (req, res) => {
    try {
        const {username, password} = UserSchema.parse(req.body);
        const user = await User.findOne({username});

        if(!user)
            return res.status(401).json({message: "Invalid username or password"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid)
            return res.status(401).json({message: "Invalid credentials"});

        const token = jwt.sign({id: user._id}, JWT_SECRET);
        res.status(200).json({token});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});


router.get("/me", authenticateToken, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");

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
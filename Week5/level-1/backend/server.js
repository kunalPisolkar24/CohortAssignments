import express from "express";
import cors from "cors";
import {connectDB, User, Card} from "./db.js";
import {connect} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {userSignupSchema, userLoginSchema, cardSchema} from "./validation.js";
import authMiddleware from "./middleware/authMiddleware.js";
import adminMiddleware from "./middleware/adminMiddleware.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

const generateToken = (user) => {
    const token = jwt.sign({
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET);
    return token;
};

app.post("/signup", async (req, res) => {
    try {
        const validationResult = userSignupSchema.parse(req.body);

        const {username, email, password} = validationResult;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Failed to create user"});
    }
});

app.post("/login", async (req, res) => {
    try {
        const validationResult = userLoginSchema.parse(req.body);  
        
        const user = await User.findOne({ email: validationResult.email });
        if(!user) 
            return res.status(401).json({ message: "Invalid credentials" });

        const passwordMatch = await bcrypt.compare(validationResult.password, user.password);
        if(!passwordMatch) 
            return res.status(401).json({ message: "Invalid credentials" });
        
        const token = generateToken(user);
        res.json({ message: "Login successful", token });
    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Login Failed"}); 
    }
});

connectDB().then(()=> {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});
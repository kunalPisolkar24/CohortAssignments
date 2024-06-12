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

app.get("/cards", authMiddleware, async (req, res) => {
    try {
        const cards = await Card.find();
        res.json({ cards });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Error fetching cards"});
    }
});

app.get("/cards/:id", authMiddleware, async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if(!card)
            return res.status(404).json({message: "Card not found"});
        res.json({ card });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Error fetching card"});
    }
});

app.post("/cards", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        // 1. Validate incoming data (Zod will handle optional fields)
        const validationResult = cardSchema.parse(req.body); 

        // 2. Create new card data object, handling optional fields
        const newCardData = {
            name: validationResult.name,
            description: validationResult.description,
            linkedin: validationResult.linkedin,
            twitter: validationResult.twitter,    
            interests: validationResult.interests
        };

        // 3. Create and save the new card
        const newCard = new Card(newCardData);
        const savedCard = await newCard.save();

        res.status(201).json(savedCard); 

    } catch (error) {
        console.error(error);
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.issues[0].message });
        } else { 
            res.status(500).json({ message: "Error creating card" }); 
        }
    }
});

app.put("/cards/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const validationResult = cardSchema.parse(req.body);

        const updatedCard = await Card.findByIdAndUpdate(req.params.id, validationResult, { new: true });
        if(!updatedCard)
            return res.status(404).json({message: "Card not found"});
        res.json(updatedCard);
    }
    catch(error) {
        console.error(error);
        if(error instanceof z.ZodError) 
            res.status(400).json({ message: error.issues[0].message });
        else 
            res.status(500).json({message: "Error updating card"});
    }
});

app.delete("/cards/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const deletedCard = await Card.findByIdAndDelete(req.params.id);
        if(!deletedCard)
            return res.status(404).json({message: "Card not found"});
        res.json({ message: "Card deleted successfully" });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Error deleting card"});
    }
});

connectDB().then(()=> {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});
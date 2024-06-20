import express from "express";
import {Payment, User} from "../db.js";
import authenticateToken from "../middleware/auth.js";
import {PaymentSchema} from "../validations.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
    try{
        const {recipient: recipientId, amount} = PaymentSchema.parse(req.body);
        const senderId = req.userId;

        const sender = await User.findById(senderId);
        if(sender.balance < amount)
            return res.status(400).json({message: "Insufficient balance"});

        const recipient = await User.findById(recipientId);
        if(!recipient)
            return res.status(404).json({message: "Recipient not found"});

        const newPayment = new Payment({sender: senderId, recipient: recipientId, amount});
        await newPayment.save();

        await User.findOneAndUpdate({_id: senderId}, {$inc: {balance: -amount}});

        await User.findOneAndUpdate({_id: recipientId}, {$inc: {balance: amount}}, {new: true});

        await Payment.findOneAndUpdate({_id: newPayment._id}, {$set: {status: "success"}});

        res.status(201).json({message: "Payment successful", payment: newPayment});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.get("/", authenticateToken, async (req, res) => {
    try{
        const userId = req.userId;
        const payments = await Payment.find({$or: [{sender: userId}, {recipient: userId}]}).populate("sender", "username").populate("recipient", "username");
        res.json(payments);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

export default router;
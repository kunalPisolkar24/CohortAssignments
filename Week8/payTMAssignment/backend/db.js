import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
}

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    balance: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now}
});

const paymentSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    amount: {type: Number, required: true, min: 0.01},
    status: {type: String, default: "pending", enum: ["pending", "success", "failed"]},
    createdAt: {type: Date, default: Date.now}
});

export const User = mongoose.model("User", userSchema);
export const Payment = mongoose.model("Payment", paymentSchema);
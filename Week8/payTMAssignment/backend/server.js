import express from "express";
import {connectDB} from "./db.js";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import dotenv from "dotenv";

dotenv.config();

const app  = express();
const PORT = 3000;

app.use(express.json());

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}`);
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

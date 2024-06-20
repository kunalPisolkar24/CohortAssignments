import {z} from "zod";

export const UserSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must be at most 20 characters long"),
    balance: z.number().min(0, "Balance cannot be negative").optional(), 
    createdAt: z.date().optional()
});

export const PaymentSchema = z.object({
    recipient: z.string().min(1, "Recipient is required"),
    amount: z.number().min(0.01, "Amount must be at least 0.01"),
    createdAt: z.date().optional()
});
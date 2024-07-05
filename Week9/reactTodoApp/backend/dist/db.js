"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const mongoURI = process.env.MONGO_URI || "default_uri";
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
const todoSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
});
const Todo = mongoose_1.default.model("Todo", todoSchema);
exports.default = Todo;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const types_1 = require("./types");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = types_1.createTodoSchema.parse(req.body);
        const newTodo = new db_1.default({ title, description, completed: false });
        yield newTodo.save();
        res.status(201).json(newTodo);
    }
    catch (err) {
        if (err.issues) {
            res.status(400).json({ error: err.issues });
        }
        else {
            console.error(err);
            res.status(500).json({ error: "Failed to create TODO" });
        }
    }
}));
app.get("/todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield db_1.default.find({});
        res.json(todos);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch TODOs" });
    }
}));
app.put("/todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, completed } = types_1.updateTodoSchema.parse(req.body);
        const updatedTodo = yield db_1.default.findByIdAndUpdate(req.params.id, { title, description, completed }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ error: "TODO not found" });
        }
        res.json(updatedTodo);
    }
    catch (err) {
        if (err.issues) {
            res.status(400).json({ error: err.issues });
        }
        else {
            console.error(err);
            res.status(500).json({ error: "Failed to update the TODO" });
        }
    }
}));
app.delete("/todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield db_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: "TODO not found" });
        }
        res.json({ message: "TODO deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete the TODO" });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});

import express, {Request, Response} from "express";
import cors from "cors";
import Todo from "./db";
import { createTodoSchema, updateTodoSchema } from "./types";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/todo", async (req: Request, res: Response) => {
  try {
    const { title, description } = createTodoSchema.parse(req.body);
    const newTodo = new Todo({ title, description, completed: false }); 
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err:any) {
    if (err.issues) {
      res.status(400).json({ error: err.issues }); 
    } else {
      console.error(err);
      res.status(500).json({ error: "Failed to create TODO" });
    }
  }
});

app.get("/todo", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch TODOs" });
  }
});

app.put("/todo/:id", async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = updateTodoSchema.parse(req.body); 
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true } 
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "TODO not found" });
    }

    res.json(updatedTodo);
  } catch (err: any) {
    if (err.issues) {
      res.status(400).json({ error: err.issues }); 
    } else {
      console.error(err);
      res.status(500).json({ error: "Failed to update the TODO" });
    }
  }
});

app.delete("/todo/:id", async (req: Request, res: Response) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "TODO not found" });
    }

    res.json({ message: "TODO deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete the TODO" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
}); 
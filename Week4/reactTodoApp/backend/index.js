const express = require("express");
const Todo = require("./db");
const { createTodoSchema, updateTodoSchema } = require("./types");

const app = express();
app.use(express.json());

// Create a new TODO
app.post("/todo", async (req, res) => {
  try {
    const { title, description } = createTodoSchema.parse(req.body);
    const newTodo = new Todo({ title, description, completed: false }); // Explicitly set completed to false
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    if (err.issues) {
      // Zod validation error
      res.status(400).json({ error: err.issues }); 
    } else {
      console.error(err);
      res.status(500).json({ error: "Failed to create TODO" });
    }
  }
});

// Get all TODOs
app.get("/todo", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch TODOs" });
  }
});

// Update a TODO by ID
app.put("/todo/:id", async (req, res) => {
  try {
    const { title, description, completed } = updateTodoSchema.parse(req.body); 
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "TODO not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    if (err.issues) {
      // Zod validation error
      res.status(400).json({ error: err.issues }); 
    } else {
      console.error(err);
      res.status(500).json({ error: "Failed to update the TODO" });
    }
  }
});

// Delete a TODO by ID
app.delete("/todo/:id", async (req, res) => {
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

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
}); 
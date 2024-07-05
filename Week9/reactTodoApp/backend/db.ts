
import mongoose, {Schema, Model} from "mongoose";
require('dotenv').config(); 

const mongoURI = process.env.MONGO_URI || "default_uri";

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

interface ITodo {
  title:string;
  description: string;
  completed: boolean;
}

const todoSchema: Schema<ITodo> = new mongoose.Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo:Model<ITodo> = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;
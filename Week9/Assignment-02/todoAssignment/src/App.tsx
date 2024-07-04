import React, {useState} from "react";
import Todo, {TodoType} from "./components/Todo";

export default function App() {
  const [todo, setTodo] = useState<TodoType>({
    title: "", 
    description: "",
    done: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const {name, value} = event.target;
    setTodo({...todo, [name]: value});
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(todo);
  };

  return (
    <>
      <h1>Enter Todo</h1> 
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={todo.title}  onChange={handleChange}/>
        </div>
        <div className="">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={todo.description} onChange={handleChange}></textarea>
        </div>
      </form>

      <h2>Current todo: </h2>
      <Todo todo={todo} />
    </>
  );
}
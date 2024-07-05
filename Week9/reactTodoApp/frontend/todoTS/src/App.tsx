import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:3000/todo');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching TODOs:', error); 
      }
    };

    fetchTodos();
  }, []); 

  const addTodo = async (newTodo: Omit<Todo, '_id'>) => {
    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        const addedTodo = await response.json();
        setTodos([...todos, addedTodo]);
      } else {
        console.error('Error adding TODO:', response.status);
      }
    } catch (error) {
      console.error('Error adding TODO:', error);
    }
  };

  const toggleComplete = async (id: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === id);
      if(!todoToUpdate) return;

      const updatedTodos = todos.map(todo => 
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);

      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todoToUpdate.completed }),
      });

      if (!response.ok) {
        console.error('Error toggling TODO completion:', response.status);
        setTodos(todos); 
      }
    } catch (error) {
      console.error('Error toggling TODO completion:', error);
      setTodos(todos); 
    }
  };

  const editTodo = async (id: string, newTitle: string, newDescription: string) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map(t => (t._id === id ? updatedTodo : t)));
      } else {
        console.error('Error editing TODO:', response.status);
      }
    } catch (error) {
      console.error('Error editing TODO:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo._id !== id));
      } else {
        console.error('Error deleting TODO:', response.status);
      }
    } catch (error) {
      console.error('Error deleting TODO:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My TODO App</h1>
      <TodoForm addTodo={addTodo} /> 
      <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete} 
        editTodo={editTodo} 
        deleteTodo={deleteTodo} 
      />
    </div>
  );
}

export default App;
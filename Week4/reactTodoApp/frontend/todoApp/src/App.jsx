import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch TODOs from your backend API when the component mounts
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
  }, []); // The empty array [] ensures this effect runs once on mount

  // Function to add a new TODO (passed to TodoForm)
  const addTodo = async (newTodo) => {
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

  // Function to toggle TODO completion
  const toggleComplete = async (id) => {
    try {
      // 1. Find the TODO in the state
      const todoToUpdate = todos.find(todo => todo._id === id);

      // 2. Optimistically update the UI
      const updatedTodos = todos.map(todo => 
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);

      // 3. Send the update to the backend 
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todoToUpdate.completed }),
      });

      if (!response.ok) {
        // If the update fails, revert the UI changes
        console.error('Error toggling TODO completion:', response.status);
        setTodos(todos); 
      }
    } catch (error) {
      console.error('Error toggling TODO completion:', error);
      setTodos(todos); 
    }
  };

  // Function to edit a TODO 
  const editTodo = async (id, newTitle, newDescription) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        // Update the state with the edited TODO
        setTodos(todos.map(t => (t._id === id ? updatedTodo : t)));
      } else {
        console.error('Error editing TODO:', response.status);
      }
    } catch (error) {
      console.error('Error editing TODO:', error);
    }
  };

  // Function to delete a TODO 
  const deleteTodo = async (id) => {
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
      <TodoForm addTodo={addTodo} /> {/* Pass addTodo function to TodoForm */}
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
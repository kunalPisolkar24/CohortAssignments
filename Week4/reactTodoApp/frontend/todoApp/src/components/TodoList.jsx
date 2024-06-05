import React from 'react';
import TodoItem from './TodoItem'; // Import the TodoItem component

function TodoList({ todos, toggleComplete, editTodo, deleteTodo }) {
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem 
          key={todo._id} 
          todo={todo} 
          toggleComplete={toggleComplete} 
          editTodo={editTodo} 
          deleteTodo={deleteTodo} 
        />
      ))}
    </ul>
  );
}

export default TodoList;
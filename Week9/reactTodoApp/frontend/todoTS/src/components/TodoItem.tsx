import React, { useState } from 'react';

interface TodoItemProps {
  todo: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  };
  toggleComplete: (id: string) => void;
  editTodo: (id: string, newTitle: string, newDescription: string) => void;
  deleteTodo: (id: string) => void;
};

function TodoItem({ todo, toggleComplete, editTodo, deleteTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, field: "title" | "description") => {
    (field === 'title') ? setEditedTitle(e.target.value) : setEditedDescription(e.target.value);
  };

  const handleSaveEdit = () => {
    editTodo(todo._id, editedTitle, editedDescription);
    setIsEditing(false); 
  };

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'bg-light' : ''}`}>
      <div>
        {isEditing ? ( 
          <>
            <input type="text" value={editedTitle} onChange={(e) => handleEditChange(e, 'title')} className="form-control form-control-sm me-2" />
            <input type="text" value={editedDescription} onChange={(e) => handleEditChange(e, 'description')} className="form-control form-control-sm" />
          </>
        ) : ( 
          <>
            <span className={`me-2 ${todo.completed ? 'text-decoration-line-through' : ''}`}> 
              {todo.title}
            </span>
            <small className={`text-muted ${todo.completed ? 'text-decoration-line-through' : ''}`}> 
              {todo.description}
            </small>
          </>
        )}
      </div>

      <div>
        {isEditing ? ( 
          <button onClick={handleSaveEdit} className="btn btn-sm btn-success me-2">Save</button>
        ) : (
          <>
            <button onClick={() => toggleComplete(todo._id)} className={`btn btn-sm me-2 ${todo.completed ? 'btn-warning' : 'btn-success'}`}>
              {todo.completed ? 'Undo' : 'Done'}
            </button>
            <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-warning me-2">
              Edit
            </button>
          </>
        )}
        <button onClick={() => deleteTodo(todo._id)} className="btn btn-sm btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
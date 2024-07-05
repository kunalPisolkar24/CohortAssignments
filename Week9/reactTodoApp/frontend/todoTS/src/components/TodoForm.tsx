import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (newTodo: {title: string; description: string; completed: boolean }) => void;
}

function TodoForm({ addTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (title.trim() === '' || description.trim() === '') return; 

    addTodo({ title, description , completed: false});
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-6">
          <input 
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control mb-2" 
          />
        </div>
        <div className="col-md-6">
          <input 
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control mb-2"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Add TODO
          </button>
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
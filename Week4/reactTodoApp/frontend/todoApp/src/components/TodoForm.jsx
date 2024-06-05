import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (title.trim() === '' || description.trim() === '') return; // Basic validation

    addTodo({ title, description }); // Pass the new TODO to the parent (App)
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
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: {
    _id: string;
    title: string;
    description: string;
    completed: boolean; 
  }[];
  toggleComplete: (id: string) => void;
  editTodo:(id: string, newTitle: string, newDescription: string) => void;
  deleteTodo: (id: string) => void;
}

function TodoList({ todos, toggleComplete, editTodo, deleteTodo }: TodoListProps) {
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
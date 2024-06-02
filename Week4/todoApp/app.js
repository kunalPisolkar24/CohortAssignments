let todos = [];

// Function to add a todo item to the DOM
function addTodoToDom(todo) {
    const todoList = document.getElementById('todo-list');
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item', 'p-3', 'd-flex', 'justify-content-between', 'align-items-center');
    todoItem.setAttribute('id', `todo-${todo.id}`);
    if (todo.done) {
        todoItem.classList.add('done');
    }
    todoItem.innerHTML = `
        <div>
            <h5>${todo.title}</h5>
            <p>${todo.description}</p>
        </div>
        <div>
            <button class="btn btn-success btn-sm me-2" onclick="toggleDone(${todo.id})">${todo.done ? 'Undo' : 'Done'}</button>
            <button class="btn btn-warning btn-sm me-2" onclick="editTodo(${todo.id})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTodoFromState(${todo.id})">Delete</button>
        </div>
    `;
    todoList.appendChild(todoItem);
}

// Function to remove a todo item from the DOM
function removeTodoFromDom(todoId) {
    const todoItem = document.getElementById(`todo-${todoId}`);
    if (todoItem) {
        todoItem.remove();
    }
}

// Function to update a todo item in the DOM
function updateTodoInDom(todo) {
    const todoItem = document.getElementById(`todo-${todo.id}`);
    if (todoItem) {
        todoItem.classList.toggle('done', todo.done);
        todoItem.innerHTML = `
            <div>
                <h5>${todo.title}</h5>
                <p>${todo.description}</p>
            </div>
            <div>
                <button class="btn btn-success btn-sm me-2" onclick="toggleDone(${todo.id})">${todo.done ? 'Undo' : 'Done'}</button>
                <button class="btn btn-warning btn-sm me-2" onclick="editTodo(${todo.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTodoFromState(${todo.id})">Delete</button>
            </div>
        `;
    }
}

// Function to update the state and reflect changes in the DOM
function updateState(newTodos) {
    const oldTodos = [...todos];
    todos = [...newTodos];

    // Add or update todos
    newTodos.forEach(newTodo => {
        const oldTodo = oldTodos.find(todo => todo.id === newTodo.id);
        if (!oldTodo) {
            // Add new todo
            addTodoToDom(newTodo);
        } else if (oldTodo.title !== newTodo.title || oldTodo.description !== newTodo.description || oldTodo.done !== newTodo.done) {
            // Update existing todo
            updateTodoInDom(newTodo);
        }
    });

    // Remove todos that are no longer in the new state
    oldTodos.forEach(oldTodo => {
        if (!newTodos.find(todo => todo.id === oldTodo.id)) {
            removeTodoFromDom(oldTodo.id);
        }
    });
}

// Function to handle form submission
document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const newTodo = {
        title: title,
        description: description,
        id: Date.now(),
        done: false
    };
    updateState([...todos, newTodo]);
    this.reset();
});

// Function to toggle done status of a todo
function toggleDone(todoId) {
    const newTodos = todos.map(todo => {
        if (todo.id === todoId) {
            return { ...todo, done: !todo.done };
        }
        return todo;
    });
    updateState(newTodos);
}

// Function to delete a todo from the state
function deleteTodoFromState(todoId) {
    const newTodos = todos.filter(todo => todo.id !== todoId);
    updateState(newTodos);
}

// Function to edit a todo
function editTodo(todoId) {
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
        const newTitle = prompt("Edit Title", todo.title);
        const newDescription = prompt("Edit Description", todo.description);
        if (newTitle !== null && newDescription !== null) {
            const newTodos = todos.map(t => {
                if (t.id === todoId) {
                    return { ...t, title: newTitle, description: newDescription };
                }
                return t;
            });
            updateState(newTodos);
        }
    }
}

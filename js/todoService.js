import { Todo } from './todoModel.js';
let todos = [];

export function getTodos() {
    let sortedTodo = [ ...todos ]
        .sort((a, b) => (a.status < b.status) ? 1 : -1)

    return sortedTodo;
}

export function createTodo(description) {
    let todo = new Todo();
    todo = {
        id: crypto.randomUUID(),
        description,
        status: "pending"
    }

    todos.push(todo);
}

export function updateTodo(todo) {
    const todoToUpdate = todos.find(t => t.id === todo.id);
    
    todoToUpdate.description = todo.description;
    todoToUpdate.status = todo.status;
}

export function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
}

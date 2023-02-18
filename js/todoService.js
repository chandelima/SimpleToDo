import { Todo } from './todoModel.js';
import { LocalStorageRepository } from './localStorageRepo.js';

let todos = [];
let repository = new LocalStorageRepository("todoApp");

export function getTodos() {
    todos = repository.retrieve();
    const sortedTodo = [ ...todos ]
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
    repository.persist(todos);
}

export function updateTodo(todo) {
    const todoToUpdate = todos.find(t => t.id === todo.id);
    
    todoToUpdate.description = todo.description;
    todoToUpdate.status = todo.status;

    repository.persist(todos);
}

export function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);

    repository.persist(todos);
}

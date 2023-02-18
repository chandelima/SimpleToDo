import { Todo } from './todoModel.js';
import * as Service from './todoService.js';

const inputDescription = document.getElementById("description");
let todo = new Todo();

function validateInput() {
    if(inputDescription.value === "") {
        alert("Você precisa fornecer uma descrição.");
        inputDescription.focus();
        return false;
    }

    return true;
}

export function saveTodo() {
    if(!validateInput())
        return;

    todo.description = inputDescription.value;

    if(!todo.id) {
        Service.createTodo(todo.description);
    } else {
        Service.updateTodo(todo);
    }

    clear();
    fillTable();
}

function fillCard(todo) {
    const todoCard = document.createElement("div");

    if(todo.status == "done") {
        todoCard.innerHTML = `
        <div class="todoCard todoDone">
            <p class="todoTextDone">${todo.description}</p>
            <span class="material-symbols-outlined" 
              onclick="js.markAsPending('${todo.id}')">
                undo
            </span>
            <span class="material-symbols-outlined" 
              onclick="js.updateTodo('${todo.id}')">
                edit
            </span>
            <span class="material-symbols-outlined" 
              onclick="js.deleteTodo('${todo.id}')">
                delete
            </span>
        </div>`;
    } else {
        todoCard.innerHTML = `
        <div class="todoCard">
            <p>${todo.description}</p>
            <span class="material-symbols-outlined" 
              onclick="js.markAsDone('${todo.id}')">
                done
            </span>
            <span class="material-symbols-outlined" 
              onclick="js.updateTodo('${todo.id}')">
                edit
            </span>
            <span class="material-symbols-outlined" 
              onclick="js.deleteTodo('${todo.id}')">
                delete
            </span>
        </div>`;
    }

    return todoCard;
}

function fillTable() {
    const listElement = document.getElementById("list");
    listElement.innerHTML = "";

    Service.getTodos().forEach(t => {
        listElement.appendChild(fillCard(t));
    })
}

export function markAsDone(id) {
    const todo = Service.getTodos().find(p => p.id === id);
    
    if(!todo) {
        alert("A tarefa selecionada não foi encontrada.");
        return;
    }

    todo.status = "done";
    Service.updateTodo(todo);
    fillTable();
}

export function markAsPending(id) {
    const todo = Service.getTodos().find(p => p.id === id);
    
    if(!todo) {
        alert("A tarefa selecionada não foi encontrada.");
        return;
    }

    todo.status = "pending";
    Service.updateTodo(todo);
    fillTable();
}

export function updateTodo(id) {
    todo = Service.getTodos().find(p => p.id === id);
    
    if(!todo) {
        alert("A tarefa selecionada não foi encontrada.");
        return;
    }

    inputDescription.value = todo.description;
}

export function deleteTodo(id) {
    const result = confirm("Tem certeza que deseja deletar a tarefa selecionada?");

    if(!result)
        return;
    
    Service.deleteTodo(id);
    fillTable();
    clear();
}

function clear() {
    todo = new Todo();
    inputDescription.value = "";
    inputDescription.focus();
}
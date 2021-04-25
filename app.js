function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.entries(props).map(([key, value]) => element.setAttribute(key, value));

    if (children.length > 0) {
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }
            element.appendChild(child);
        });
    }

    return element;
}

function createTodoItem(title) {
    const currentItemsLength = todoList.children.length;
    const id = `todo-${currentItemsLength + 1}`;

    const checkbox = createElement("input", {type: "checkbox", class: "checkbox", id});
    const label = createElement("label", {class: "title", for: id}, title);
    const editInput = createElement("input", {type: "text", class: "text-field"});
    const editButton = createElement("button", {class: "edit"}, "Изменить");
    const deleteButton = createElement("button", {class: "delete"}, "Удалить");
    const listItem = createElement("li", {class: "todo-item"}, checkbox, label, editInput, editButton, deleteButton);

    bindEvents(listItem);

    return listItem;
}

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector(".checkbox");
    const editButton = todoItem.querySelector("button.edit");
    const deleteButton = todoItem.querySelector("button.delete");

    checkbox.addEventListener("change", toggleTodoItem);
    editButton.addEventListener("click", editTodoItem);
    deleteButton.addEventListener("click", deleteTodoItem);
}

function addTodoItem(event) {
    event.preventDefault();

    if (!addInput.value) return alert("Необходимо ввести название задачи");

    const todoItem = createTodoItem(addInput.value);

    todoList.appendChild(todoItem);
    addInput.value = "";
}

// к элементу на котором произошло событие можно обратиться через this или вытянуть из event и свойства target
function toggleTodoItem({target}) {
    const listItem = target.parentNode;
    listItem.classList.toggle("completed")
}

// здесь из this
function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector(".title");
    const editInput = listItem.querySelector(".text-field");
    const isEditing = listItem.classList.contains("editing");

    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = "Изменить"
    } else {
        editInput.value = title.innerText;
        this.innerText = "Сохранить";
    }

    listItem.classList.toggle("editing");
}

function deleteTodoItem() {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
}

const todoForm = document.getElementById("todo-form");
const addInput = document.getElementById("add-input");
const todoList = document.getElementById("todo-list");
const todoItems = document.querySelectorAll(".todo-item");

function init() {
    todoForm.addEventListener("submit", addTodoItem);
    todoItems.forEach(item => bindEvents(item))
}

init();


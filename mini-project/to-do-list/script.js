const todoList = [
  {
    text: "tidur",
    isCompleted: false,
  },
];

function addTodoList(todo) {
  const todoIndex = document.createElement("div");
  todoIndex.classList.add("todo-index");

  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.name = "todo-check";
  todoCheckbox.className = "todo-check";
  todoCheckbox.value = "todo-check";
  // seperti todoCheckbox.checked = true/false
  todoCheckbox.checked = todo.isCompleted; // tolong liat status isCompleted di objek data saat ini. Kalau isinya true, centang kotaknya. Kalau false, kosongkan kotaknya

  todoCheckbox.addEventListener("click", function () {
    todo.isCompleted = !todo.isCompleted;
    displayTodoList(); // kalau checkbox diklik, maka html akan dirender ulang
  });

  const todoText = document.createElement("p");
  todoText.innerText = todo.text;

  if (todo.isCompleted) {
    // jika property isCompeleted = true, maka jalankan ini
    todoText.classList.add("selesai");
  }

  todoIndex.append(todoCheckbox, todoText);

  const todoContainer = document.getElementById("todo-container");
  const doneContainer = document.getElementById("done-container");
  if (todo.isCompleted === true) {
    doneContainer.appendChild(todoIndex);
  } else {
    todoContainer.appendChild(todoIndex);
  }
}

function displayTodoList(filteredList = todoList) {
  const todoContainer = document.getElementById("todo-container");
  const doneContainer = document.getElementById("done-container");
  todoContainer.innerHTML = "";
  doneContainer.innerHTML = "";
  // perulangan akan berjalan selama nilai i kurang dari panjang array
  for (let i = 0; i < filteredList.length; i++) {
    const todo = filteredList[i];

    addTodoList(todo);
  }
}

document.forms["todo-form"].addEventListener("submit", function (event) {
  event.preventDefault();

  const newTodo = document.forms["todo-form"]["todo"].value;
  const todoObject = {
    text: newTodo,
    isCompleted: false,
  };
  todoList.push(todoObject);

  document.forms["todo-form"].reset();

  console.log(todoList);
  displayTodoList();
});

const filterInput = document.getElementById("filter");

filterInput.addEventListener("input", function () {
  const keyWord = filterInput.value.toLowerCase();

  const filterResult = todoList.filter(function (todo) {
    return todo.text.toLowerCase().includes(keyWord);
  });
  displayTodoList(filterResult);
});

displayTodoList();

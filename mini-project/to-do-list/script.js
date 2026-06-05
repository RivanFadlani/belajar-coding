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

// = todoList adalah Default Parameter
// kalau semisal displayTodoList() dikirim tanpa argumen, maka akan memakai data todoList yang asli
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

// jadi kalau function input tertrigger dengan input di kolom filter, maka displayTodoList() akan menerima argument. dan,
// kalau displayTodoList() tidak menerima argument, maka dia akan menampilkan data 'todoList' (array) yang ada
// kalau user menghapus semua karakter di kolom input, event input akan tetap tertrigger. bedanya dia mengirim kolom input kosong
filterInput.addEventListener("input", function () {
  const keyWord = filterInput.value.toLowerCase();

  // .filter() secara otomatis melakukan iterasi, dan akan dikirim ke parameter 'todo'
  const filterResult = todoList.filter(function (todo) {
    return todo.text.toLowerCase().includes(keyWord);
  });
  displayTodoList(filterResult);
});

displayTodoList();

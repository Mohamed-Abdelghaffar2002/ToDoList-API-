const apiKey = "676c740360a208ee1fdec7bd";
const title = document.getElementById("title");
const inputBtn = document.getElementById("inputBtn");
const todosContent = document.getElementById("todosContent");
const loader = document.getElementById("loader");

getAllTodos();

inputBtn.addEventListener("click", function () {
  var task = {
    title: title.value,
    apiKey: apiKey,
  };
  addTodo(task);
  clearInput();
});

async function addTodo(task) {
  const response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "post",
    body: JSON.stringify(task),
    headers: { "content-type": "application/json" },
  });
  var data = await response.json();
  if (data.message == "success") {
    getAllTodos();
  }
}

async function deleteTodo(id) {
  const response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "delete",
    body: JSON.stringify({ todoId: id }),
    headers: { "content-type": "application/json" },
  });
  var data = await response.json();
  if (data.message == "success") getAllTodos();
}

async function markCompleted(id) {
  const response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "put",
    body: JSON.stringify({ todoId: id }),
    headers: { "content-type": "application/json" },
  });
  var data = await response.json();
  if (data.message == "success") getAllTodos();
}

async function getAllTodos() {
  todosContent.style.display = "none";
  loader.style.display = "block";
  var response = await fetch(
    `https://todos.routemisr.com/api/v1/todos/${apiKey}`
  );
  var data = await response.json();
  if (data.message == "success") {
    loader.style.display = "none";
    todosContent.style.display = "block";
    displayTodos(data.todos);
  }
}

function displayTodos(data) {
  var allTodos = "";
  if(data.length==0){
    allTodos=`
    <div class="text-center">
   <p class="m-2 display-2">No Tasks !</p>
 </div>
 `
  }else{
    for (let i = 0; i < data.length; i++) {
        allTodos += `
             <div class="alert alert-secondary d-flex justify-content-between align-items-center">
              <p class="m-0 ${
                data[i].completed ? "text-decoration-line-through" : ""
              }">${data[i].title}</p>
              <div class="icons d-flex ">
                <i class="fa-solid fa-pen-to-square fs-5 mx-2 text-warning" onclick="markCompleted('${
                  data[i]._id
                }')"></i>
                <i  class="fa-solid fa-trash fs-5 mx-2 text-danger" onclick="deleteTodo('${
                  data[i]._id
                }')"></i>
              </div>
            </div>
            `;
      }

  }

  todosContent.innerHTML = allTodos;
}

function clearInput() {
  title.value = "";
}

document.addEventListener("keydown", function (e) {
    if (e.code=='Enter'){
        var task = {
            title: title.value,
            apiKey: apiKey,
          };
          addTodo(task);
          clearInput();
    }
} );
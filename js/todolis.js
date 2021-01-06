const toDoform = document.querySelector(".todo_input_form"),
  toDoInput = document.querySelector(".todo_input"),
  toDoList = document.querySelector(".pending_list"),
  compToDoList = document.querySelector(".success_list");

const TODOS_LS = "toDos";
const COMPTODOS_LS = "compToDos";

let toDos = [];
let compToDos = [];

function deletToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function filterFn(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function compToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  checkBtn.classList.add("far", "fa-check-square");
  compToDoList.appendChild(li);

  selectedToDo(toDos, li.id);
  cleanToDos(toDos, li.id);
  saveToDos(TODOS_LS);
  saveToDos(CHECKED_LS);
}

function saveToDos() {
  switch (LS) {
    case COMPTODOS_LS:
      localStorage.setItem(COMPTODOS_LS, JSON.stringify(compToDos));
      break;
    case TODOS_LS:
      localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
      break;
  }
}

function paintToDo(text, LS) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const checkBtn = document.createElement("i");
  const delBtn = document.createElement("i");
  const newId = Date.now() + Math.random();
  const toDoObj = {
    text: text,
    id: newId,
  };
  span.innerText = text;
  checkBtn.classList.add("far", "fa-check-square");
  delBtn.classList.add("far", "fa-times-circle");
  checkBtn.addEventListener("click", compToDo);
  delBtn.addEventListener("click", deletToDo);
  delBtn.id = "delBtn";
  li.id = newId;
  toDoList.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(span);
  toDos.push(toDoObj);
  saveToDos();

  switch (LS) {
    case TODOS_LS:
      li.appendChild(span);
      li.appendChild(checkBtn);
      li.appendChild(delBtn);
      toDoList.appendChild(li);
      toDos.push(toDoObj);
      saveToDos(TODOS_LS);
      break;
    case COMPTODOS_LS:
      li.appendChild(span);
      li.appendChild(checkBtn);
      li.appendChild(delBtn);
      compToDoList.appendChild(li);
      compToDos.push(toDoObj);
      saveToDos(COMPTODOS_LS);
      break;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue, TODOS_LS);
  toDoInput.value = "";
}

function loadtoDos(LS) {
  const loadedToDos = localStorage.getItem(LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, LS);
    });
  }
}
function init() {
  loadtoDos(TODOS_LS);
  loadtoDos(COMPTODOS_LS);
  toDoform.addEventListener("submit", handleSubmit);
}

init();

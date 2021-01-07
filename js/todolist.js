const toDoForm = document.querySelector(".todo_input_form"),
  toDoInput = document.querySelector(".todo_input"),
  pendingList = document.querySelector(".pending_list_ul"),
  successList = document.querySelector(".success_list_ul"),
  toDoBox = document.querySelector(".todo_box"),
  todoClickBox = document.querySelector(".todo_click_box"),
  clickTodo = document.querySelector(".click_todolist"),
  clickTodoDel = todoClickBox.querySelector("i");

const PENDING_LS = "pendingArray",
  SUCCESS_LS = "successArray",
  NOT_SHOWING = "display_none";

let pendingArray = [];
let successArray = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const listName = event.path[2];
  if (listName.classList.contains("pending_list_ul")) {
    pendingList.removeChild(li);
    cleanToDos(pendingArray, li.id);
    saveToDos(PENDING_LS);
  } else {
    successList.removeChild(li);
    cleanToDos(successArray, li.id);
    saveToDos(SUCCESS_LS);
  }
}

function resetToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const checkBtn = li.querySelector(".fa-undo-alt");
  checkBtn.classList.remove("fa-undo-alt");
  checkBtn.classList.add("fa-check");
  checkBtn.removeEventListener("click", resetToDo);
  checkBtn.addEventListener("click", checkToDo);
  pendingList.appendChild(li);
  selectedToDo(successArray, li.id);
  cleanToDos(successArray, li.id);
  saveToDos(PENDING_LS);
  saveToDos(SUCCESS_LS);
}

function cleanToDos(PENDING_LS, id) {
  const cleanToDos = PENDING_LS.filter(function (todo) {
    return JSON.stringify(todo.id) !== id;
  });
  switch (PENDING_LS) {
    case pendingArray:
      pendingArray = cleanToDos;
      break;
    case successArray:
      successArray = cleanToDos;
      break;
  }
}
function selectedToDo(PENDING_LS, id) {
  const clickedToDo = PENDING_LS.filter(function (toDo) {
    return JSON.stringify(toDo.id) === id;
  });
  switch (PENDING_LS) {
    case pendingArray:
      successArray = successArray.concat(clickedToDo);
      break;
    case successArray:
      pendingArray = pendingArray.concat(clickedToDo);
      break;
  }
}

function checkToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const checkBtn = li.querySelector(".fa-check");
  checkBtn.classList.remove("fa-check");
  checkBtn.classList.add("fa-undo-alt");
  checkBtn.removeEventListener("click", checkToDo);
  checkBtn.addEventListener("click", resetToDo);
  successList.appendChild(li);
  selectedToDo(pendingArray, li.id);
  cleanToDos(pendingArray, li.id);
  saveToDos(PENDING_LS);
  saveToDos(SUCCESS_LS);
}

function saveToDos(LS) {
  switch (LS) {
    case PENDING_LS:
      localStorage.setItem(PENDING_LS, JSON.stringify(pendingArray));
      break;
    case SUCCESS_LS:
      localStorage.setItem(SUCCESS_LS, JSON.stringify(successArray));
      break;
  }
}

function paintToDo(text, LS) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const checkBtn = document.createElement("i");
  const resetBtn = document.createElement("i");
  const delBtn = document.createElement("i");
  const newId = Date.now() + Math.random();
  const toDoObj = {
    text: text,
    id: newId,
  };
  span.innerText = text;
  checkBtn.classList.add("fas", "fa-xs", "fa-check", "li_style");
  resetBtn.classList.add("fas", "fa-xs", "fa-undo-alt", "li_style");
  delBtn.classList.add("fas", "fa-xs", "fa-times", "li_style");
  checkBtn.addEventListener("click", checkToDo);
  resetBtn.addEventListener("click", resetToDo);
  delBtn.addEventListener("click", deleteToDo);
  li.id = newId;
  switch (LS) {
    case PENDING_LS:
      li.appendChild(span);
      li.appendChild(checkBtn);
      li.appendChild(delBtn);
      pendingList.appendChild(li);
      pendingArray.push(toDoObj);
      saveToDos(PENDING_LS);
      break;
    case SUCCESS_LS:
      li.appendChild(span);
      li.appendChild(resetBtn);
      li.appendChild(delBtn);
      successList.appendChild(li);
      successArray.push(toDoObj);
      saveToDos(SUCCESS_LS);
      break;
  }
}

function toDoHandleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue, PENDING_LS);
  toDoInput.value = "";
}

function loadToDos(LS) {
  const loadedToDos = localStorage.getItem(LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, LS);
    });
  }
}

function toDoNotShowing() {
  document.querySelector(".greeting").classList.remove(NOT_SHOWING);
  document.querySelector(".today_work_total").classList.remove(NOT_SHOWING);
  document.querySelector(".today_focus_total").classList.remove(NOT_SHOWING);
  clickTodo.classList.remove(NOT_SHOWING);
  toDoForm.classList.add(NOT_SHOWING, "animation");
  toDoBox.classList.add(NOT_SHOWING, "animation");
  clickTodoDel.id = NOT_SHOWING;
}

function toDoShowing() {
  document.querySelector(".greeting").classList.add(NOT_SHOWING);
  document.querySelector(".today_work_total").classList.add(NOT_SHOWING);
  document.querySelector(".today_focus_total").classList.add(NOT_SHOWING);
  clickTodo.classList.add(NOT_SHOWING, "animation");
  clickTodoDel.classList.add(NOT_SHOWING, "animation");
  clickTodoDel.removeAttribute("id");
  toDoForm.classList.remove(NOT_SHOWING);
  toDoBox.classList.remove(NOT_SHOWING);
}

function clickBox() {
  clickTodo.addEventListener("click", toDoShowing);
  clickTodoDel.addEventListener("click", toDoNotShowing);
  toDoForm.classList.add(NOT_SHOWING, "animation");
  toDoBox.classList.add(NOT_SHOWING, "animation");
  clickTodoDel.id = NOT_SHOWING;
}

function init() {
  clickBox();
  loadToDos(PENDING_LS);
  loadToDos(SUCCESS_LS);
  toDoForm.addEventListener("submit", toDoHandleSubmit);
}

init();

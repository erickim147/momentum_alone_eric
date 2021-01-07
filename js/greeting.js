const greetingTitle = document.querySelector(".greeting_data"),
  greetingForm = document.querySelector(".greeting_name"),
  greetingInput = greetingForm.querySelector("input"),
  greetingSpan = document.querySelector(".greeting_span");

const USER_LS = "currentUser",
  FORM_NONE = "form_none";

function getGreetingTime() {
  const greetingDate = new Date();
  const greetingHours = greetingDate.getHours();
  if (greetingHours >= 6 && greetingHours <= 12) {
    greetingTitle.innerText = `Good Morning.`;
  } else if (greetingHours >= 13 && greetingHours <= 17) {
    greetingTitle.innerText = `Good afternoon.`;
  } else if (greetingHours >= 18 && greetingHours <= 20) {
    greetingTitle.innerText = `Good Evening.`;
  } else if (greetingHours >= 21 && greetingHours <= 23) {
    greetingTitle.innerText = `Good Night.`;
  } else if (greetingHours >= 0 && greetingHours <= 5) {
    greetingTitle.innerText = `Good Dreams.`;
  }
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
  greetingSpan.classList.remove(FORM_NONE);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = greetingInput.value;
  if (currentValue.length < 2) {
    alert("Please enter at least two letter");
    loadName();
  } else {
    printGreeting(currentValue);
    saveName(currentValue);
  }
}

function askForName() {
  greetingForm.addEventListener("submit", handleSubmit);
}

function printGreeting(text) {
  greetingForm.classList.add(FORM_NONE);
  greetingSpan.innerText = `${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    printGreeting(currentUser);
  }
}

function modify() {
  localStorage.removeItem(USER_LS);
  greetingForm.classList.remove(FORM_NONE);
  greetingSpan.classList.add(FORM_NONE);
  greetingInput.focus();
  loadName();
}

function nameModify() {
  greetingSpan.addEventListener("click", modify);
}

function init() {
  getGreetingTime();
  loadName();
  nameModify();
}

init();

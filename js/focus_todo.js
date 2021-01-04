const TodayWorkTotal = document.querySelector(".today_work_total"),
  TodayFocus = document.querySelector(".today_focus"),
  todayForcusForm = document.querySelector(".today_focus_form"),
  ForcusFormInput = todayForcusForm.querySelector("input"),
  TodayWorkBox = document.querySelector(".today_work_box"),
  TodayWork = TodayWorkBox.querySelector(".today_work"),
  WorkCheckBox = document.querySelector(".work_check_box"),
  checkbox = document.querySelector("input[name=checkbox]"),
  WorkCheck = document.querySelector(".work_check"),
  WorkDel = document.querySelector(".work_del");

const FORCUS_WORK = "forcusWork",
  DISPLAY_NONE = "display_none",
  DISPLAY_BLOCK = "display_block",
  TEXT_LINE = "textline";

function saveForcus(text) {
  localStorage.setItem(FORCUS_WORK, text);
}

function printForcus(text) {
  TodayWorkTotal.classList.remove(DISPLAY_NONE);
  TodayWorkBox.classList.remove(DISPLAY_NONE);
  TodayFocus.classList.add(DISPLAY_NONE);
  TodayFocus.classList.remove(DISPLAY_BLOCK);
  TodayWork.innerText = `${text}`;
}

function focushandleSubmit(event) {
  event.preventDefault();
  const currentForcusVal = ForcusFormInput.value;
  if (currentForcusVal.length < 2) {
    alert("Please enter at least two letter");
    loadFocusWork();
  } else {
    printForcus(currentForcusVal);
    saveForcus(currentForcusVal);
  }
}

function askForForcus() {
  todayForcusForm.addEventListener("submit", focushandleSubmit);
}
function loadFocusWork() {
  const currentForcus = localStorage.getItem(FORCUS_WORK);
  TodayWorkBox.classList.add(DISPLAY_NONE);
  TodayFocus.classList.add(DISPLAY_BLOCK);
  if (currentForcus === null) {
    askForForcus();
  } else {
    printForcus(currentForcus);
  }
}

function workDelHandleEvent() {
  localStorage.removeItem(FORCUS_WORK);
  localStorage.removeItem("work_check", WorkCheck.checked);
  TodayWorkTotal.classList.add(DISPLAY_NONE);
  checkbox.checked = false;
  unclick();
  loadFocusWork();
  ForcusFormInput.value = "";
  ForcusFormInput.focus();
}

function FocusWorkDel() {
  WorkDel.addEventListener("click", workDelHandleEvent);
}

function mouseenter() {
  WorkCheckBox.classList.remove(DISPLAY_NONE);
  WorkDel.classList.remove(DISPLAY_NONE);
}

function mouseleave() {
  WorkCheckBox.classList.add(DISPLAY_NONE);
  WorkDel.classList.add(DISPLAY_NONE);
}

function workIconNone() {
  if (TodayWorkTotal.addEventListener("mouseenter", mouseenter)) {
    mouseenter();
  }
  if (TodayWorkTotal.addEventListener("mouseleave", mouseleave)) {
    mouseleave();
  }
}

function checkedsave() {
  WorkCheck;
  localStorage.setItem("work_check", WorkCheck.checked);
}

function checkedloading() {
  var checkLoad = JSON.parse(localStorage.getItem("work_check"));
  WorkCheck.checked = checkLoad;
  if (checkLoad === true) {
    TodayWork.classList.add(TEXT_LINE);
    WorkCheckBox.classList.remove(DISPLAY_NONE);
    WorkDel.classList.remove(DISPLAY_NONE);
    TodayWorkTotal.removeEventListener("mouseenter", mouseenter);
    TodayWorkTotal.removeEventListener("mouseleave", mouseleave);
  }
  if (checkLoad === false) {
    TodayWork.classList.remove(TEXT_LINE);
    WorkCheckBox.classList.add(DISPLAY_NONE);
    WorkDel.classList.add(DISPLAY_NONE);
    TodayWorkTotal.addEventListener("mouseenter", mouseenter);
    TodayWorkTotal.addEventListener("mouseleave", mouseleave);
  }
}

function clicks() {
  TodayWork.classList.add(TEXT_LINE);
  TodayWorkTotal.removeEventListener("mouseenter", mouseenter);
  TodayWorkTotal.removeEventListener("mouseleave", mouseleave);
  checkedsave();
}

function unclick() {
  localStorage.removeItem("work_check", WorkCheck.checked);
  TodayWork.classList.remove(TEXT_LINE);
  WorkCheckBox.classList.add(DISPLAY_NONE);
  WorkDel.classList.add(DISPLAY_NONE);
  TodayWorkTotal.addEventListener("mouseenter", mouseenter);
  TodayWorkTotal.addEventListener("mouseleave", mouseleave);
}

function checkSequence() {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      clicks();
    } else {
      unclick();
    }
  });
}

function init() {
  loadFocusWork();
  workIconNone();
  checkSequence();
  checkedloading();
  FocusWorkDel();
}

init();

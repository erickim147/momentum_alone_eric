const body = document.querySelector("body"),
  toDoPendingBox = document.querySelector(".pending_box"),
  toDoSuccessBox = document.querySelector(".success_box"),
  toDoPendingList = document.querySelector(".pending_list"),
  toDoSuccessList = document.querySelector(".success_list");

const IMG_NUMBER = 6;

function handleImgLoad() {
  console.log("finished loading");
}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `image/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);

  switch (imgNumber) {
    case 0:
      toDoPendingBox.classList.add("bgcolorWhite");
      toDoSuccessBox.classList.add("bgcolorWhite");
      toDoPendingList.classList.add("bgcolorWhite");
      toDoSuccessList.classList.add("bgcolorWhite");
      break;
    case 1:
      toDoPendingBox.classList.add("bgcolorWhite");
      toDoSuccessBox.classList.add("bgcolorWhite");
      toDoPendingList.classList.add("bgcolorWhite");
      toDoSuccessList.classList.add("bgcolorWhite");
      break;
    case 2:
      toDoPendingBox.classList.add("bgcolorBlack");
      toDoSuccessBox.classList.add("bgcolorBlack");
      toDoPendingList.classList.add("bgcolorBlack");
      toDoSuccessList.classList.add("bgcolorBlack");
      break;
    case 3:
      toDoPendingBox.classList.add("bgcolorBlack");
      toDoSuccessBox.classList.add("bgcolorBlack");
      toDoPendingList.classList.add("bgcolorBlack");
      toDoSuccessList.classList.add("bgcolorBlack");
      break;
    case 4:
      toDoPendingBox.classList.add("bgcolorWhite");
      toDoSuccessBox.classList.add("bgcolorWhite");
      toDoPendingList.classList.add("bgcolorWhite");
      toDoSuccessList.classList.add("bgcolorWhite");
      break;
    case 5:
      toDoPendingBox.classList.add("bgcolorWhite");
      toDoSuccessBox.classList.add("bgcolorWhite");
      toDoPendingList.classList.add("bgcolorWhite");
      toDoSuccessList.classList.add("bgcolorWhite");
      break;
  }
}

function genRandom() {
  const nember = Math.floor(Math.random() * IMG_NUMBER);
  return nember;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();

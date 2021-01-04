const clockContainer = document.querySelector(".date_year", ".date_time"),
  yearTitle = document.querySelector(".date_year__data"),
  timeTitle = document.querySelector(".date_time__data");

function getTime() {
  const date = new Date();
  const years = date.getFullYear();
  const month = date.getMonth() + 1;
  const getdate = date.getDate();
  var hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  hours = hours % 12;
  hours = hours ? hours : 12;
  yearTitle.innerText = `${years}.${month < 10 ? `0${month}` : month}.${
    getdate < 10 ? `0${getdate}` : getdate
  }`;
  timeTitle.innerText = `${ampm} ${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  } : ${seconds < 10 ? `0${seconds}` : seconds} `;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();

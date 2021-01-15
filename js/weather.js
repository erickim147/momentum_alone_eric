const weather_temp = document.querySelector(".weather_icon_temp");
const weather_place = document.querySelector(".weather_place");
const icon = document.querySelector("i");

var API_KEY = "7556e151a5567c98f8c38de66e8342d0";
const COORDS = "coords";
const WEATHER_DAY_SUNNY = "fa-sun";
const WEATHER_DAY_CLOUDY = "fa-cloud-sun";
const WEATHER_CLOUD = "fa-cloud";
const WEATHER_CLOUDY = "fa-cloud";
const WEATHER_RAIN = "fa-umbrella";
const WEATHER_THUNDER = "fa-poo-storm";
const WEATHER_SNOW = "fa-snowflake";
const WEATHER_DUST = "fa-cloud-sun-rain";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = Math.round(json.main.temp);
      const place = json.name;
      const iconVal = json.weather[0].icon;
      weather_temp.innerText = `${temperature}°`;
      weather_place.innerText = `${place} .Korea`;
      if (iconVal === "01n" || iconVal === "01d") {
        icon.classList.add("far", WEATHER_DAY_SUNNY);
      } else if (iconVal === "02d" || iconVal === "02n") {
        icon.classList.add("fas", WEATHER_DAY_CLOUDY);
      } else if (iconVal === "03d" || iconVal === "03n") {
        icon.classList.add("fas", WEATHER_CLOUD);
      } else if (iconVal === "04d" || iconVal === "04n") {
        icon.classList.add("fas", WEATHER_CLOUDY);
      } else if (iconVal === "09d" || iconVal === "09n") {
        icon.classList.add("fas", WEATHER_RAIN);
      } else if (iconVal === "10d" || iconVal === "10n") {
        icon.classList.add("fas", WEATHER_RAIN);
      } else if (iconVal === "11d" || iconVal === "11n") {
        icon.classList.add("fas", WEATHER_THUNDER);
      } else if (iconVal === "13d" || iconVal === "13n") {
        icon.classList.add("fas", WEATHER_SNOW);
      } else if (iconVal === "50d" || iconVal === "50n") {
        icon.classList.add("fas", WEATHER_DUST);
      }
      console.log(iconVal);
    });
}

function saveCoords(coordsobj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsobj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsobj = {
    latitude,
    longitude,
  };
  saveCoords(coordsobj);
  getWeather(latitude, longitude);
}

function handleGeoErro() {
  console.log("can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoErro);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();

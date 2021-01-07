const weather_temp = document.querySelector(".weather_icon_temp");
const weather_place = document.querySelector(".weather_place");
const icon = document.querySelector("i");

var API_KEY = "7556e151a5567c98f8c38de66e8342d0";
const COORDS = "coords";
const WEATHER_DAY_SUNNY = "wi-day-sunny";
const WEATHER_DAY_CLOUDY = "wi-day-cloudy";
const WEATHER_CLOUD = "wi-cloud";
const WEATHER_CLOUDY = "wi-cloudy";
const WEATHER_RAIN = "wi-rain";
const WEATHER_THUNDER = "wi-thunderstorm";
const WEATHER_SNOW = "wi-snow";
const WEATHER_DUST = "wi-dust";

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
      if (iconVal === "01n" || "01d") {
        icon.classList.add(WEATHER_DAY_SUNNY);
      } else if (iconVal === "02d" || "02n") {
        icon.classList.add(WEATHER_DAY_CLOUDY);
      } else if (iconVal === "03d" || "03n") {
        icon.classList.add(WEATHER_CLOUD);
      } else if (iconVal === "04d" || "04n") {
        icon.classList.add(WEATHER_CLOUDY);
      } else if (iconVal === "09d" || "09n" || "10d" || "10n") {
        icon.classList.add(WEATHER_RAIN);
      } else if (iconVal === "11d" || "11n") {
        icon.classList.add(WEATHER_THUNDER);
      } else if (iconVal === "13d" || "13n") {
        icon.classList.add(WEATHER_SNOW);
      } else if (iconVal === "50d" || "50n") {
        icon.classList.add(WEATHER_DUST);
      }
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

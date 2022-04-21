function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = now.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  return `${day}, ${date} ${month}, ${year} `;
}

// USER SEARCHES FOR CITY AND IT DISPLAYS NAME AND TEMPERATURE
function showWeather(response) {
  //user city
  let userCityElement = document.querySelector("#user-city");
  //celcius temp
  let celciusTempElement = document.querySelector("#celcius-temp");
  //humidity
  let humidityElement = document.querySelector("#humidity");
  //wind
  let windSpeedElement = document.querySelector("#wind");
  //weather description e.g cloudy
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  //time
  let timeElement = document.querySelector("#time");
  //day of the week
  let dayElement = document.querySelector("#day");
  //weather icon
  let weatherIconElement = document.querySelector("#weather-element");

  celciusTemperature = response.data.main.temp;

  userCityElement.innerHTML = `${response.data.name}`;
  celciusTempElement.innerHTML = `${Math.round(celciusTemperature)}`;
  humidityElement.innerHTML = `<strong>Humidity:</strong> ${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `<strong>Wind Speed:</strong> ${Math.round(
    response.data.wind.speed
  )} m/s`;
  weatherDescriptionElement.innerHTML = `${response.data.weather[0].description}`;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  dayElement.innerHTML = formatDay(response.data.dt * 1000);
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png `
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchCity(city) {
  let apiKey = "85b2f9ddbf909c56fc814cf91c0ccce6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function retrieveCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#celcius-temp");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#celcius-temp");
  let celciusTemp = celciusTemperature;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let search = document.querySelector("#search-weather");
search.addEventListener("submit", handleSubmit);

let currentPlace = document.querySelector("#current-location-button");
currentPlace.addEventListener("click", retrieveCurrentPosition);

let celciusTemperature = null;
let fahrenheitbutton = document.querySelector("#to-fahrenheit-temp");
fahrenheitbutton.addEventListener("click", displayFahrenheitTemperature);
let celciusButton = document.querySelector("#to-celcius-temp");
celciusButton.addEventListener("click", displayCelciusTemperature);

searchCity("Vilanculos");

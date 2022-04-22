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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  // let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(
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
  getForecast(response.data.coord);
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
  celciusButton.classList.remove("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#celcius-temp");
  fahrenheitButton.classList.remove("active");
  // let celciusTemp = celciusTemperature;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast-data");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
             <div class="card col-2 m-2 p-3">
                 <h4 class="weather-forecast-day">${formatForecastDay(
                   forecastDay.dt
                 )}</h4>
                 <img id="forecast-icon" src="http://openweathermap.org/img/wn/${
                   forecastDay.weather[0].icon
                 }@2x.png" alt=""/>
                 <span class="temp-min"><em>Min:</em> ${Math.round(
                   forecastDay.temp.min
                 )}°C</span> 
                 <span class ="temp-max"><em>Max:</em> ${Math.round(
                   forecastDay.temp.max
                 )}°C </span>
             </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let search = document.querySelector("#search-weather");
search.addEventListener("submit", handleSubmit);

let currentPlace = document.querySelector("#current-location-button");
currentPlace.addEventListener("click", retrieveCurrentPosition);

let celciusTemperature = null;
let fahrenheitButton = document.querySelector("#to-fahrenheit-temp");
fahrenheitButton.addEventListener("click", displayFahrenheitTemperature);
let celciusButton = document.querySelector("#to-celcius-temp");
celciusButton.addEventListener("click", displayCelciusTemperature);

searchCity("Vilanculos");

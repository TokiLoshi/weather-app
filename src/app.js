function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  console.log(day);
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
  console.log(day);
  // let pDay = document.querySelector("#day");
  // pDay.innerHTML = `${day}`;
  return `${day}, ${date} ${month}, ${year} `;
}

// let now = new Date();
// let date = now.getDate();
// let days = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
// let day = days[now.getDay()];

// let months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
// let month = months[now.getMonth()];
// let year = now.getFullYear();
// let hour = now.getHours();
// if (hour < 10) {
//   hour = `0${hour}`;
// }
// let minutes = now.getMinutes();
// if (minutes < 10) {
//   minutes = `0${minutes}`;
// }
// let seconds = now.getSeconds();
// if (seconds < 10) {
//   seconds = `0${seconds}`;
// }
// let pDay = document.querySelector("#day");
// pDay.innerHTML = `${day}`;
// let pDate = document.querySelector("#date");
// pDate.innerHTML = `${date} ${month}, ${year}`;
// let pTime = document.querySelector("#time");
// pTime.innerHTML = `${hour}:${minutes}`;

// USER SEARCHES FOR CITY AND IT DISPLAYS NAME AND TEMPERATURE
function showWeather(response) {
  document.querySelector("#user-city").innerHTML = `${response.data.name}`;
  document.querySelector("#celcius-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `<strong>Humidity:</strong> ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `<strong>Wind Speed:</strong> ${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#day").innerHTML = formatDay(response.data.dt * 1000);
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

let search = document.querySelector("#search-weather");
search.addEventListener("submit", handleSubmit);

let currentPlace = document.querySelector("#current-location-button");
currentPlace.addEventListener("click", retrieveCurrentPosition);

searchCity("Vilanculos");

// Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
function changeToFar() {
  let farTemp1 = document.querySelector("#fahrenheit-temp");
  farTemp1.innerHTML = "/°F";
  let celTemp1 = document.querySelector("#celcius-temp");
  celTemp1.innerHTML = "24°C";
}

function changeToCel() {
  let celTemp2 = document.querySelector("#celcius-temp");
  celTemp2.innerHTML = "°C /";
  let farTemp2 = document.querySelector("#fahrenheit-temp");
  farTemp2.innerHTML = "°F";
}

let celToFar = document.querySelector("#celcius-temp");
celToFar.addEventListener("click", changeToFar);
let farToCel = document.querySelector("#fahrenheit-temp");
farToCel.addEventListener("click", changeToCel);

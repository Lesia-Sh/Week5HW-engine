//Display current time
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let formattedDate = `${currentDay}, ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

let currentTime = new Date();
// console.log(formatDate(currentTime));

let element = document.querySelector("#current-time");
element.innerHTML = `${formatDate(currentTime)}`;

let city = document.querySelector("#searchInput");
let cityHeading = document.querySelector("#place");

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "0f0f10bca37612242d03bb7a3cb3baa8";

function getWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `${temp}`;
  console.log(response.data);
  let description = document.querySelector("#description-main");
  description.innerHTML = response.data.weather[0].description;
}

function inputCity(event) {
  event.preventDefault();
  cityHeading.innerHTML = `${city.value}`;

  axios
    .get(`${apiUrl}q=${city.value}&appid=${apiKey}&units=metric`)
    .then(getWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", inputCity);

// // current
function findLocation(response) {
  let apiKey = "0f0f10bca37612242d03bb7a3cb3baa8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${response.coords.latitude}&lon=${response.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrent);

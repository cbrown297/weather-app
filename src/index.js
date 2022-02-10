function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function search(city) {
  let units = "&units=imperial";
  let apiKey = "&appid=cfdab66ad524dca3797a910286a0542f";
  let api = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${api}${city}${apiKey}${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#looks-like").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "&appid=cfdab66ad524dca3797a910286a0542f";
  let api = "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "&units=imperial";
  let apiUrl = `${api}lat=${lat}&lon=${lon}${apiKey}${units}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function convertToF(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = 22;
}

function convertToC(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = 16;
}

let currentLocation = document.querySelector("#current-btn");
currentLocation.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fTemp = document.querySelector("#fahrenheit");
fTemp.addEventListener("click", convertToF);

let cTemp = document.querySelector("#celsius");
cTemp.addEventListener("click", convertToC);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let showDate = new Date();

let date = document.querySelector("small");

let currentDate = days[showDate.getDay()];
let currentTime = showDate.getHours();
let minutes = showDate.getMinutes();

date.innerHTML = `${currentDate} ${currentTime}:${minutes}`;

search("New York");

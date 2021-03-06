function getForecast(coordinates) {
  console.log(coordinates);
  let api = "https://api.openweathermap.org/data/2.5/onecall?"
  let apiKey ="&appid=cfdab66ad524dca3797a910286a0542f"
  let units ="&units=imperial"
  let apiUrl = `${api}lat=${coordinates.lat}&lon=${coordinates.lon}${apiKey}${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#looks-like").innerHTML = response.data.weather[0].description;
  document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  /*fahreneheitTemperature = response.data.main.temp;*/ 
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#date").innerHTML = formatDate(response.data.dt *1000);
  document.querySelector("#weather-icon").setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();

  let minutes = date.getMinutes();

  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  ];

  let day = days[date.getDay()];
  if (hours<10) {
  hours =`0${hours}`;
  }
  if (minutes<10) {
  minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;    
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon","Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function(forecastDay, index) {
    if (index < 4) {
    forecastHTML = forecastHTML + `
    <div class="col-3">
      <div class="forecast-date">
          ${formatDay(forecastDay.dt)}
      </div>
      <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
       alt="" 
       width="52">
      <div class="forecast-temp">
        <span class="forecast-temp-max">
          ${Math.round(forecastDay.temp.max)}??
        </span>&nbsp
        <span class="forecast-temp-min">
          ${Math.round(forecastDay.temp.min)}??
        </span>
      </div>
    </div>
  `;
    }
  })
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let api ="https://api.openweathermap.org/data/2.5/weather?q="
  let apiKey ="&appid=cfdab66ad524dca3797a910286a0542f"
  let units ="&units=imperial"
  let url=`${api}${city}${apiKey}${units}`
  axios.get(url).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)


search("Scotland");

/*function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = (fahrenheitTemperature-32)/1.8;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", displayCelsiusTemperature);*/
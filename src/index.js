function displayTemperature(response) {
  console.log(response.data)
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#looks-like").innerHTML = response.data.weather[0].description;
  document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitTemperature = response.data.main.temp;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#date").innerHTML = formatDate(response.data.dt *1000);
  document.querySelector("weather-icon").setAttribute("alt", `${response.data.weather[0].description}`)
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function(day) {
    forecastHTML = forecastHTML + `
    <div class="col-2">
      <div class="forecast-date">
          ${day}
      </div>
      <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="52">
      <div class="forecast-temp"><span class="forecast-temp-max">18°</span> <span class="forecast-temp-min">12°</span>
      </div>
    </div>
  `;
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

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = (fahrenheitTemperature-32)/1.8;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}


let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", displayCelsiusTemperature);

search("Scotland")
displayForecast();
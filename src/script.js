function formatDate(timestamp) {
  let now = new Date(timestamp);

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
    "December"
  ];

  let currentYear = now.getFullYear();
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
 
  return `${currentMonth} ${currentDate}, ${currentYear}`;
}

function formatDay(timestamp){
  let now = new Date (timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[now.getDay()];
  return `${currentDay}`;
}

function formatTime(timestamp){
  let now = new Date(timestamp);
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentHour}:${currentMinute}`;
}

function convertDtToHours(dt){
  let day = new Date(dt *1000);
  let dayHour = day.getUTCHours();
  let dayMinutes = day.getUTCMinutes();

  if (dayHour < 10) {
    dayHour = `0${dayHour}`;
  } 

  if (dayMinutes < 10) {
    dayMinutes = `0${dayMinutes}`;
  } 
  
  return `${dayHour}:${dayMinutes}`
}

function showForecast(response){
  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 1; index < 7; index++) {
    forecast = response.data.daily[index];
    let dayForecast = formatDay(forecast.dt * 1000)
    let forecastDescription = forecast.weather[0].main;
    minForecastTemperature = Math.round(forecast.temp.min);
    maxForecastTemperature = Math.round(forecast.temp.max);
    forecastElement.innerHTML += `
      <div class="col">
        <p class="weather-forecast-day">
          ${dayForecast}
        </p>
        <div class="weather-forecast-icon">
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
        </div>
        <p class="weather-forecast-description">
          ${forecastDescription}
        </p>    
        <p class="weather-forecast-temperature">
          <span class="min-forecast-temperature">${minForecastTemperature}</span><span>°</span>
          <span class="max-forecast-temperature">${maxForecastTemperature}</span><span>°</span>
        </p>    
      </div>
      `;  
    }
  }

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  maxCelsiusTemperature = response.data.main.temp_max;
  minCelsiusTemperature = response.data.main.temp_min;
  feelsLikeTemperature = response.data.main.feels_like;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-explaination").innerHTML = response.data.weather[0].description;
  document.querySelector("#main-temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#today-min-temperature").innerHTML = Math.round(minCelsiusTemperature);
  document.querySelector("#today-max-temperature").innerHTML = Math.round(maxCelsiusTemperature);

  document.querySelector("#sunrise-details").innerHTML = convertDtToHours(response.data.sys.sunrise + response.data.timezone);
  document.querySelector("#rain-details").innerHTML = `${Math.round(response.data.clouds.all)}%`;
  document.querySelector("#windspeed-details").innerHTML = `${Math.round(response.data.wind.speed)}m/s`;

  document.querySelector("#sunset-details").innerHTML = convertDtToHours(response.data.sys.sunset + response.data.timezone);
  document.querySelector("#humidity-details").innerHTML = `${Math.round(response.data.main.humidity)}%`;
  document.querySelector("#feels-like-details").innerHTML = `${Math.round(feelsLikeTemperature)}`;
  
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#day").innerHTML = formatDay(response.data.dt * 1000);
  document.querySelector("#time").innerHTML = formatTime(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

  let units = "metric";
  let apiKey = "20d2bbd509fde70ccf859259bef834b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly.daily&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showForecast);
}

function errorFunction(){
  alert(`Sorry, the location was not found. Please check the spelling.`)
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "20d2bbd509fde70ccf859259bef834b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature).catch(errorFunction);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "20d2bbd509fde70ccf859259bef834b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showCity(event) {
  event.preventDefault();
  let cityChange = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city");
  if (cityChange.value.length === 0) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    currentCity.innerHTML = `${cityChange.value}`;
    searchCity(cityChange.value);
  }
}

document.querySelector("#search-city-form").addEventListener("submit", showCity);
document.querySelector("#searchButton").addEventListener("click", getCurrentPosition);

function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#main-temperature").innerHTML = Math.round(
    celsiusTemperature * (9 / 5) + 32
    );
  document.querySelector("#today-min-temperature").innerHTML = Math.round(
    minCelsiusTemperature * (9 / 5) + 32
    );
  document.querySelector("#today-max-temperature").innerHTML = Math.round(
    maxCelsiusTemperature * (9 / 5) + 32
    );
  document.querySelector("#feels-like-details").innerHTML = Math.round(
    feelsLikeTemperature * (9 / 5) + 32
    );
  
  document.querySelectorAll(".min-forecast-temperature")
  .forEach(function(item){
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(currentTemp * (9 / 5) + 32);
  });

    document.querySelectorAll(".max-forecast-temperature")
    .forEach(function(item){
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(currentTemp * (9 / 5) + 32);
  });

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  fahrenheitLink.removeEventListener("click",convertToFahrenheit);
  celsiusLink.addEventListener("click",convertToCelsius);
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click",convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  document.querySelector("#main-temperature").innerHTML = Math.round(
    celsiusTemperature
    );
  document.querySelector("#today-min-temperature").innerHTML = Math.round(
    minCelsiusTemperature
    );
  document.querySelector("#today-max-temperature").innerHTML = Math.round(
    maxCelsiusTemperature
    );
  document.querySelector("#feels-like-details").innerHTML = Math.round(
    feelsLikeTemperature
    );

  document.querySelectorAll(".min-forecast-temperature")
  .forEach(function(item){
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(currentTemp - 32 * (5 / 9));
  });

    document.querySelectorAll(".max-forecast-temperature")
    .forEach(function(item){
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(currentTemp - 32 * (5 / 9));
  });

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  fahrenheitLink.addEventListener("click",convertToFahrenheit);
  celsiusLink.removeEventListener("click",convertToCelsius);
}

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click",convertToCelsius);

let celsiusTemperature = null;
let maxCelsiusTemperature = null;
let minCelsiusTemperature = null;

searchCity("Batu Pahat");
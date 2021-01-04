let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

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
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let updatedDate = document.querySelector("#date");
  updatedDate.innerHTML = `${currentMonth} ${currentDate}, ${currentYear} <br /> ${currentDay}, ${currentHour}:${currentMinute}`;
}

formatDate(now);


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

function searchCity(city) {
  let units = "metric";
  let apiKey = "20d2bbd509fde70ccf859259bef834b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let submitCity = document.querySelector("#search-city-form");
submitCity.addEventListener("submit", showCity);


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(temperature * (9 / 5) + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 17;
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);


function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  let weatherDescriptionElement = document.querySelector("#weather-explaination");
  let temperatureElement = document.querySelector("#main-temperature");
  let maxTemperatureElement = document.querySelector("#today-max-temperature");
  let minTemperatureElement = document.querySelector("#today-min-temperature");
 // let sunriseElement = document.querySelector("#sunrise-details");
  let rainElement = document.querySelector("#rain-details");
  let windspeedElement = document.querySelector("#windspeed-details");
  let sunsetElement = document.querySelector("#sunset-details");
  let humidityElement = document.querySelector("#humidity-details");
  let feelsLikeElement = document.querySelector("#feels-like-details");

  cityElement.innerHTML = response.data.name;
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  maxTemperatureElement.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  minTemperatureElement.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
 // sunriseElement.innerHTML = Math.round(response.data.sys.sunrise);
  rainElement.innerHTML = `${Math.round(response.data.clouds.all)}%`;
  windspeedElement.innerHTML = `${Math.round(response.data.wind.speed)}m/s`;
  sunsetElement.innerHTML = Math.round(response.data.sys.sunset*1000);
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}°`;

//  console.log(`The temperature in ${currentCity} is ${temperatureNow} degrees`);
  console.log(response.data);
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

let clickForCurrentLocation = document.querySelector("#searchButton");
searchButton.addEventListener("click", getCurrentPosition);

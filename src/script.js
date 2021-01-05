function formatDate(timestamp) {
  let now = new Date(timestamp);

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

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentMonth} ${currentDate}, ${currentYear} <br/> ${currentDay}, ${currentHour}:${currentMinute}`;
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
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-explaination").innerHTML = response.data.weather[0].description;
  document.querySelector("#main-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#today-max-temperature").innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  document.querySelector("#today-min-temperature").innerHTML = `${Math.round(response.data.main.temp_min)}°`;
 // document.querySelector("#sunrise-details").innerHTML = Math.round(response.data.sys.sunrise);
  document.querySelector("#rain-details").innerHTML = `${Math.round(response.data.clouds.all)}%`;
  document.querySelector("#windspeed-details").innerHTML = `${Math.round(response.data.wind.speed)}m/s`;
 // document.querySelector("#sunset-details").innerHTML = Math.round(response.data.sys.sunset*1000);
  document.querySelector("#humidity-details").innerHTML = `${Math.round(response.data.main.humidity)}%`;
  document.querySelector("#feels-like-details").innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);

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

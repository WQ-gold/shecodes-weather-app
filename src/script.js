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

//challenge 2
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

//challenge 3
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

//Week 5 Homework

function showTemperature(response) {
  let currentCity = response.data.name;
  let temperatureNow = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#main-temperature");
  cityElement.innerHTML = `${currentCity}`;
  temperatureElement.innerHTML = `${temperatureNow}`;

  console.log(`The temperature in ${currentCity} is ${temperatureNow} degrees`);
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

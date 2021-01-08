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

  return `${currentMonth} ${currentDate}, ${currentYear} 
  <br/> ${currentDay}, ${currentHour}:${currentMinute}`;
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

document.querySelector("#search-city-form").addEventListener("submit", showCity);


function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#main-temperature").innerHTML = Math.round(celsiusTemperature * (9 / 5) + 32);
  document.querySelector("#today-min-temperature").innerHTML = Math.round(minCelsiusTemperature * (9 / 5) + 32);
  document.querySelector("#today-max-temperature").innerHTML = Math.round(maxCelsiusTemperature * (9 / 5) + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

document.querySelector("#fahrenheitLink").addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  document.querySelector("#main-temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#today-min-temperature").innerHTML = Math.round(minCelsiusTemperature);
  document.querySelector("#today-max-temperature").innerHTML = Math.round(maxCelsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

document.querySelector("#celsiusLink").addEventListener("click", convertToCelcius);


function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  maxCelsiusTemperature = response.data.main.temp_max;
  minCelsiusTemperature = response.data.main.temp_min;

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
  document.querySelector("#feels-like-details").innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

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


let celsiusTemperature = null;
let maxCelsiusTemperature = null;
let minCelsiusTemperature = null;

document.querySelector("#searchButton").addEventListener("click", getCurrentPosition);

searchCity("Batu Pahat");
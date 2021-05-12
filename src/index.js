//Date and Time

let now = new Date();

let current = document.querySelector("p");

let date = now.getDate();
let year = now.getFullYear();
let currentTime = now.toLocaleString(undefined, {
  minute: "2-digit",
  hour: "2-digit",
});

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

current.innerHTML = `${day} ${month} ${date}, ${year} ${currentTime}`;

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  let feelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("h5").innerHTML = `Feels like ${feelsLike}°`;

  let currentDescription = response.data.weather[0].main;
  document.querySelector(
    "#weather-description"
  ).innerHTML = `${currentDescription}`;
}

function searchLocation(position) {
  let apiKey = "80791a0ef9679c89428b222ffd6823ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "80791a0ef9679c89428b222ffd6823ff";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", getCurrentLocation);

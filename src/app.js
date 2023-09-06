function searchedCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input").value;
  let apiKey = "0fatb32bfcf4bc9f20b4dc9001dca93o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${input}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;

  let displayTemp = document.querySelector("h1");
  let temperature = Math.round(response.data.temperature.current);
  displayTemp.innerHTML = `${temperature}°C`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.temperature.humidity)}%`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `${response.data.temperature.pressure} mb`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.icon);
}

let findCity = document.querySelector("#navigation");
findCity.addEventListener("submit", searchedCity);

let currentDate = document.querySelector("#current-date");
let now = new Date();
let hour = now.getHours().toString().padStart(2, "0");
let minute = now.getMinutes().toString().padStart(2, "0");
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
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
let year = now.getFullYear();
currentDate.innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minute}`;

function search(city) {
  let apiKey = "0fatb32bfcf4bc9f20b4dc9001dca93o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input").value;
  search(input);
}

function displayTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;

  let temperature = document.querySelector("h1");
  let temperatureValue = Math.round(response.data.temperature.current);
  temperature.innerHTML = `${temperatureValue}°C`;

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

  function toFahrenheit(event) {
    let fahrenheit = Math.round(temperature * 1.8 + 32);
    displayTemp.innerHTML = `${fahrenheit}°F`;
  }
  let fahrenheitButton = document.querySelector("#btnradio3");
  fahrenheitButton.addEventListener("click", toFahrenheit);

  function toCelsius(event) {
    displayTemp.innerHTML = `${temperature}°C`;
  }
  let celsiusButton = document.querySelector("#btnradio1");
  celsiusButton.addEventListener("click", toCelsius);
}

function gps() {
  function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "0fatb32bfcf4bc9f20b4dc9001dca93o";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `
    <div class="card">
      <div class="card-body">
        <ul class="list-group list-group-flush">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <li class="list-group-item d-flex align-items-start">
      <span class="me-auto row">
        <img
          id="forecast-icon"
          class="col me-3"
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
          alt=""
        />
        <span class="col">
          <span class="days fw-bold">${day}</span><br />
          <span
            class="forecast-description"
            style="white-space: nowrap"
            >Broken clouds</span
          >
        </span></span>
      +38° <span class="lowest-temp">⸺ +22°</span>
    </li>`;
  });

  forecastHTML = forecastHTML + `</div> </div> </ul>`;
  forecastElement.innerHTML = forecastHTML;
}

let findCity = document.querySelector("#navigation");
findCity.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", gps);

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

search("Sydney");
displayForecast();

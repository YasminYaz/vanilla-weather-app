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
}

let findCity = document.querySelector("#navigation");
findCity.addEventListener("submit", searchedCity);

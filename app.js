const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "4b2ce9723ac4533c3a59d69c47503bb1";
const mode = document.getElementById("mode");
const settings = document.getElementById("settings");
const logo = document.getElementById("logo");
let modeStatus = "dark";

mode.addEventListener("click", () => {
  let root = document.documentElement;
  if (modeStatus === "dark") {
    modeStatus = "light";
    mode.innerHTML = `<img src="media/mode_light.svg" />`;
    settings.innerHTML = `<img src="media/settings_light.svg" alt="Settings" />`;
    logo.innerHTML = `<img src="media/light_nav.png" alt="WeatherBoard" />`;
    root.style.setProperty("--bg-color", "#cbc3e3");
    root.style.setProperty("--nav-bg-color", "rgba(203,195,227,0.7)");
    root.style.setProperty("--text-color", "black");
    root.style.setProperty("--hover-color", "rgb(159, 134, 232)");
    root.style.setProperty("--second-hover-color", "rgb(115, 87, 198)");
    root.style.setProperty("--third-hover-color", "rgb(85, 54, 177)");
    root.style.setProperty("--header-color", "black");
  } else {
    modeStatus = "dark";
    mode.innerHTML = `<img src="media/mode.svg" />`;
    settings.innerHTML = `<img src="media/settings.svg" alt="Settings" />`;
    logo.innerHTML = `<img src="media/dark_nav.png" alt="WeatherBoard" />`;
    root.style.setProperty("--bg-color", "#0b0316");
    root.style.setProperty("--nav-bg-color", "rgba(11, 3, 22, 0.7)");
    root.style.setProperty("--text-color", "white");
    root.style.setProperty("--hover-color", "#25194c");
    root.style.setProperty("--second-hover-color", "#392879");
    root.style.setProperty("--third-hover-color", "#1b133a");
    root.style.setProperty("--header-color", "#793dcd");
  }
});

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a valid city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("could not fetch");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.style.visibility = "visible";
  card.textContent = "";
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${Math.round(temp - 273.15)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  let des = description.split("");
  des.splice(0, 1, des[0].toUpperCase());
  descDisplay.textContent = des.join("");
  weatherEmoji.textContent = getWeatherEmoji(id);
  cityDisplay.classList.add("city-name");
  tempDisplay.classList.add("temp-display");
  humidityDisplay.classList.add("humidity-display");
  descDisplay.classList.add("desc-display");
  weatherEmoji.classList.add("weather-emoji");
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId > 800 && weatherId < 810:
      return "☁️";
    default:
      return "👽";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.classList.add("error-display");
  errorDisplay.textContent = "";
  errorDisplay.innerHTML = message;
  card.style.visibility = "visible";
  card.appendChild(errorDisplay);
}

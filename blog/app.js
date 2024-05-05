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
    mode.innerHTML = `<img src="/media/mode_light.svg" />`;
    settings.innerHTML = `<img src="/media/settings_light.svg" alt="Settings" />`;
    logo.innerHTML = `<img src="/media/light_nav.png" alt="WeatherBoard" />`;
    root.style.setProperty("--bg-color", "#cbc3e3");
    root.style.setProperty("--nav-bg-color", "rgba(203,195,227,0.7)");
    root.style.setProperty("--text-color", "black");
    root.style.setProperty("--hover-color", "rgb(159, 134, 232)");
    root.style.setProperty("--second-hover-color", "rgb(115, 87, 198)");
    root.style.setProperty("--third-hover-color", "rgb(85, 54, 177)");
    root.style.setProperty("--header-color", "black");
  } else {
    modeStatus = "dark";
    mode.innerHTML = `<img src="/media/mode.svg" />`;
    settings.innerHTML = `<img src="/media/settings.svg" alt="Settings" />`;
    logo.innerHTML = `<img src="/media/dark_nav.png" alt="WeatherBoard" />`;
    root.style.setProperty("--bg-color", "#0b0316");
    root.style.setProperty("--nav-bg-color", "rgba(11, 3, 22, 0.7)");
    root.style.setProperty("--text-color", "white");
    root.style.setProperty("--hover-color", "#25194c");
    root.style.setProperty("--second-hover-color", "#392879");
    root.style.setProperty("--third-hover-color", "#1b133a");
    root.style.setProperty("--header-color", "#793dcd");
  }
});

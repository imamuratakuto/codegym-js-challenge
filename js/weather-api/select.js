const select = document.getElementById("selectCountry");
const weathers = {
  Clear: "晴れ",
  Clouds: "くもり",
  Rain: "雨",
  Snow: "雪",
  Mist: "霧",
};
const getUrl = () => {
  const index = select.selectedIndex;
  const selectCountry = select[index].value;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    selectCountry +
    "&units=metric&appid=4b5774e9f3d2a07b84f0f2f88e486224";
  const getWeather = (data) => {
    const weather_text = document.getElementById("weather");
    const temp_text = document.getElementById("temp");
    const humidity_text = document.getElementById("humidity");
    weather_text.innerHTML = weathers[data.weather[0]["main"]];
    temp_text.innerHTML = data.main["temp"] + "℃";
    humidity_text.innerHTML = data.main["humidity"] + "%";
  };
  fetch(url)
    .then((response) => response.json())
    .then((data) => getWeather(data))
    .catch((error) => console.log("失敗しました"));
};
window.addEventListener("load", getUrl);
select.addEventListener("change", getUrl);

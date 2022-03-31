let select = document.getElementById('selectCountry');
console.log(select);
const getUrl = () => {
        const index = select.selectedIndex;
        const selectCountry = select[index].value;
        const url =  "https://api.openweathermap.org/data/2.5/weather?q="+ selectCountry +"&appid=4b5774e9f3d2a07b84f0f2f88e486224";
        fetch(url)
            .then(response => response.json())
            .then(data => getWeather(data))
            .catch(error => console.log("失敗しました"));
  
        const getWeather = (data) => {
            const result_text = document.getElementById('result-text');
            result_text.innerHTML = "天気 : " + data.weather[0]["main"] + "<br>" + "平均気温 : " + data.main["temp"] + "<br>" + "湿度 : " + data.main["humidity"] + "%";
            };
};
window.addEventListener('load', getUrl);
select.addEventListener('change', getUrl);
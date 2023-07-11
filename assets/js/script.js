document
  .getElementById("weathersearch")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var city = document.getElementById("cityname").value;
    var storeCity = JSON.parse(localStorage.getItem("WeatherDashboard")) || [];
    storeCity.push(city);
    localStorage.setItem("WeatherDashboard", JSON.stringify(storeCity));
    document.getElementById("cityname").value = "";
    currentForecast(city);
    fiveDaysForecast(city);
    storecityName();
  });

var API = "4c22e0710598a7b61533045d9ad30012";
function currentForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=imperial`
  )
    .then((response) => response.json())
    .then((apiData) => {
      console.log(apiData);
      var h1Ele = document.createElement("h1");
      h1Ele.textContent = "City: " + apiData.name;
      var h2Ele = document.createElement("h2");
      h2Ele.textContent = "Humidity: " + apiData.main.humidity;
      var h3Ele = document.createElement("h3");
      h3Ele.textContent = "Temperature: " + apiData.main.temp;
      var h4Ele = document.createElement("h4");
      h4Ele.textContent = "Wind Speed: " + apiData.wind.speed;
      var imgEle = document.createElement("img");
      imgEle.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`
      );
      var h4Ele2 = document.createElement("h4");
      h4Ele2.textContent = "Description: " + apiData.weather[0].description;
      var articleEle = document.createElement("article");
      articleEle.appendChild(h1Ele);
      articleEle.appendChild(h4Ele2);
      articleEle.appendChild(imgEle);
      articleEle.appendChild(h2Ele);
      articleEle.appendChild(h3Ele);
      articleEle.appendChild(h4Ele);
      document.getElementById("todaysWeather").innerHTML = "";
      document.getElementById("todaysWeather").append(articleEle);
    });
}

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

function fiveDaysForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}&units=imperial`
  )
    .then((response) => response.json())
    .then((apiData) => {
      console.log(apiData);
      let i = 0;
      while (i < apiData.list.length) {
        var current = moment().format("L");
        console.log(current, moment(apiData.list[i].dt_txt).format("L"));
        i++;
        // if(apiData.list[i].dt_tx)
      }
      document.getElementById("nextFiveDays").innerHTML = "";
      for (let i = 0; i < apiData.list.length; i = i + 8) {
        var h1Ele = document.createElement("h5");
        h1Ele.textContent = moment(apiData.list[i].dt_txt).format("MM/DD/YYYY");
        var h2Ele = document.createElement("h6");
        h2Ele.textContent = "Humidity: " + apiData.list[i].main.humidity;
        var h3Ele = document.createElement("h6");
        h3Ele.textContent = "Temperature: " + apiData.list[i].main.temp;
        var h4Ele = document.createElement("h6");
        h4Ele.textContent = "Wind Speed: " + apiData.list[i].wind.speed;
        var imgEle = document.createElement("img");
        imgEle.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${apiData.list[i].weather[0].icon}@2x.png`
        );
        var h4Ele2 = document.createElement("h5");
        h4Ele2.textContent =
          "Description: " + apiData.list[i].weather[0].description;
        var articleEle = document.createElement("article");
        articleEle.appendChild(h1Ele);
        articleEle.appendChild(h4Ele2);
        articleEle.appendChild(imgEle);
        articleEle.appendChild(h2Ele);
        articleEle.appendChild(h3Ele);
        articleEle.appendChild(h4Ele);
        articleEle.classList.add("border"); // border-warning");
        articleEle.classList.add("border-warning");
        articleEle.classList.add("cards");

        document.getElementById("nextFiveDays").append(articleEle);
      }
    });
}

function storecityName() {
  var storeCity = JSON.parse(localStorage.getItem("WeatherDashboard")) || [];
  var history = "";
  for (let i = 0; i < storeCity.length; i++) {
    history += `<button class="btn btn-secondary history" type="button">${storeCity[i]}</button>`;
  }
  document.getElementById("city-names").innerHTML = history;
  var searchCityList = document.querySelectorAll(".history");
  searchCityList.forEach((city) => city.addEventListener("click", getWeather));
}

storecityName();

function getWeather(event) {
  var cityName = event.target.textContent;
  fiveDaysForecast(cityName);
  currentForecast(cityName);
}

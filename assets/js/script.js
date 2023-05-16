document.getElementById("weathersearch").addEventListener("submit", function (event) {
    event.preventDefault();
    var city = document.getElementById("cityname").value
    currentForecast(city);
});

var API = "4c22e0710598a7b61533045d9ad30012"
function currentForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=imperial`)
        .then(response => response.json())
        .then(apiData => {
            console.log(apiData)
            var h1Ele = document.createElement("h1")
            h1Ele.textContent = "City: " + apiData.name
            var h2Ele = document.createElement("h2")
            h2Ele.textContent = "Humidity: " + apiData.main.humidity
            var h3Ele = document.createElement("h3")
            h3Ele.textContent = "Temperature: " + apiData.main.temp
            var h4Ele = document.createElement("h4")
            h4Ele.textContent = "Wind Speed: " + apiData.wind.speed
            var imgEle = document.createElement("img")
            imgEle.setAttribute("src", `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`)
            var h4Ele2 = document.createElement("h4")
            h4Ele2.textContent = "Description: " + apiData.weather[0].description
            var articleEle = document.createElement("article")
            articleEle.appendChild(h1Ele)
            articleEle.appendChild(h2Ele)
            articleEle.appendChild(h3Ele)
            articleEle.appendChild(h4Ele)
            articleEle.appendChild(imgEle)
            articleEle.appendChild(h4Ele2)
            document.getElementById("currentforecast").append(articleEle)

        })
}
function rendercityName() {

    cityList.innerHTML = "";
    cityCountSpan.textContent = cityName.length;


    for (var i = 0; i < cityName.length; i++) {
        var city = cityName[i];

        var li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("data-index", i);
        cityList.appendChild(li);
    }
}
// function storecityName() {

//     localStorage.setItem("cityName", JSON.stringify(cityname));
// }

// storecityName();
//  rendercityName();

// function showtodaysWeather(city) {
//     var cityHTML = `
//     <div class="card">
//             <div class="card-body">
//             <h2 class="card-title">${city.name}</h2> <br>
//             <p class="card-text">${city.humidity}</p>
//             <p class="card-text">${city.temp}</p>
//             <p class="card-text">${city.speed}</p>
//         </div>
//     </div>
//     `

//     $("#todaysWeather").html(cityHTML)
// }


// function shownextFiveDays(name) {
//     var nextFiveDays = [];

//     while (nextFiveDays.length < 5) {
//         var randomIndex = Math.floor(Math.random() * alldays.length);
//         var city = alldays[randomIndex];

//         if (city.cityName !== name) {
//             nextFiveDays.push(city)
//         }
//     }


//     $("#nextFiveDays").empty();

//     for (let i = 0; i < nextFiveDays.length; i++) {
//         const friend = nextFiveDays[i];

//         var cityCard = $(`
//        <div class="col"
//        <div class="card">
//        <div class="card-body">
//        <h2 class="card-title">${city.cityName}</h2> <br>
//        <p class="card-text">${city.humidity}</p>
//        <p class="card-text">${city.temp}</p>
//        <p class="card-text">${city.speed}</p>
//        </div>
//        </div>
//  `)

//         $("#nextFiveDays").append(cityCard)
//     }
// }
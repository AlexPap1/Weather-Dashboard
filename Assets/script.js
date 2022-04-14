var apiKey = "2831e983c10c1f8b557906c4cc256f77";
var city = document.getElementById('enter-city');
var searchButton = document.getElementById('search-button');
var weatherNow= document.getElementById('weatherNow');
var savedData= document.getElementById('savedData')
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var UvIndexNow = document.getElementById('UvIndexNow');
var WeatherImage = document.getElementById('WeatherImage');
var NameOfCity = document.getElementById("NameOfCity");
var temperature = document.getElementById("temperature");
var humidity = document.getElementById("humidity");
var windSpeed = document.getElementById("windSpeed");

function weatherData(cityName) {
    /*first API Call */
    let api = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    fetch(api)
        .then((res) => {
           return res.json();
           temperature.inneraHTML = "Temperature " + res.data.main.temp + "degrees";
           humidity.innerHTML = "Humidity " + res.data.main.humidity + "%";
           windSpeed.innerHTML = "Wind Speed " + res.data.wind.speed + "MPH";
           var icon = res.data.weather[0].icon;
           WeatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
        })
        .then((data) => {
            console.log(data)
        })
        
}


searchButton.addEventListener('click', function () {
    /*trims spaces for cities with spaces to avoid breaking api url*/
    const searchTerm = city.value.trim();
    weatherData(searchTerm);
    console.log(searchTerm);
    history();
});

/*makes enter button trigger search button click*/
document.getElementById("enter-city")
    .addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            document.getElementById("search-button").click();
        }
    });

/*save input in local storage and display under search history*/
function history() {
    const searchTerm = city.value;
   // weatherData(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    savedData.textContent = (city.value);
    console.log(savedData.textContent);
    localStorage.setItem("history", JSON.stringify(savedData.textContent));
};

/*reloads function when clicking city name in history */
savedData.addEventListener("click", function() {
    searchTerm = city.value;
    weatherData(searchTerm)
}); 

/*display multiple city searches*/
/*trims spaces for cities with spaces to avoid breaking api url*/


/* https://api.openweathermap.org/data/2.5/weather?q=Newark&appid=2831e983c10c1f8b557906c4cc256f77 */
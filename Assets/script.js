//global
var apiKey = "2831e983c10c1f8b557906c4cc256f77";
var city = document.getElementById('enter-city');
var searchButton = document.getElementById('search-button');
var weatherNow= document.getElementById('weatherNow');
var savedData= document.getElementById('savedData')
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const UvIndex = document.getElementById('UvIndexNow');
const WeatherImage = document.getElementById('WeatherImage');
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const nameOfCity = document.getElementById("cityName");

function weatherData(cityName) {
    /*first API Call */
    weatherNow.classList.remove("d-none");
    let api = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    fetch(api).then((res) => {

        res.json().then((data) => {
    
            console.log(data);
            nameOfCity.innerHTML = data.name;
            temperature.innerHTML = "Temperature " + Math.round(((data.main.temp)-273) * (9/5) + 32) + " &#176F";
            humidity.innerHTML = "Humidity " + data.main.humidity + "%";
            windSpeed.innerHTML = "Wind Speed " + data.wind.speed + "MPH";
            var icon = data.weather[0].icon;
            WeatherImage.setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" + icon + "@2x.png"
          );
        //add UV index api call
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
        console.log(UVQueryURL);
        fetch(UVQueryURL).then((data) => {
            res.json().then((data) => {
                // When UV Index is good, shows green, when ok shows yellow, when bad shows red
                if (data[0].value < 4 ) {
                    UvIndex.setAttribute("class", "text-success");
                }
                else if (data[0].value < 8) {
                    UvIndex.setAttribute("class", "text-warning");
                }
                else {
                    UvIndex.setAttribute("class", "text-danger");
                }
                UvIndex.innerHTML = "UV Index: " + data[0].value;
            })});
            console.log(data.value);
        });
      });
};

searchButton.addEventListener('click', function () {
    /*trims spaces for cities with spaces to avoid breaking api url*/
    const searchTerm = city.value.trim();
    weatherData(searchTerm);
    console.log(searchTerm);
    history();
    document.getElementById("date").innerHTML = Date();
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
/*uv Index*/
/*five day forecast*/


/* https://api.openweathermap.org/data/2.5/weather?q=Newark&appid=2831e983c10c1f8b557906c4cc256f77 */
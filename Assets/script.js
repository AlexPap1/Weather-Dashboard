var apiKey = "2831e983c10c1f8b557906c4cc256f77";
var city = document.getElementById('enter-city'); 
var searchButton = document.getElementById('search-button');
var weatherNow= document.getElementById('weatherNow');

function weatherData(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    /*search.value.trim?*/
    console.log(apiUrl);
};

searchButton.addEventListener('click', function () {
    const searchTerm = city.value;
    weatherData(searchTerm);
    console.log(searchTerm);
    /*save input in local storage and display under search history... see quiz challenge*/
});

/* https://api.openweathermap.org/data/2.5/weather?q=Newark&appid=2831e983c10c1f8b557906c4cc256f77 

var getWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

};*/
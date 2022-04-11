var apiKey = "2831e983c10c1f8b557906c4cc256f77";
var city = document.getElementById('enter-city');
var searchButton = document.getElementById('search-button');
var weatherNow= document.getElementById('weatherNow');
var savedData= document.getElementById('savedData')

function weatherData(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    /*search.value.trim?*/
    console.log(apiUrl);
};

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
    savedData.textContent = (city.value);
    console.log(savedData.textContent);
    localStorage.setItem("history", JSON.stringify(savedData));

};

/*save multiple city searches and make them buttons to redirect back*/
/*adjust spacing for history... display under History Banner*/


/* https://api.openweathermap.org/data/2.5/weather?q=Newark&appid=2831e983c10c1f8b557906c4cc256f77 

var getWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

};*/
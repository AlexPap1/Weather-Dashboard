var apiKey = "2831e983c10c1f8b557906c4cc256f77";
var city = document.getElementById('enter-city');
var searchButton = document.getElementById('search-button');
var weatherNow= document.getElementById('weatherNow');
var savedData= document.getElementById('savedData')
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

function weatherData(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    console.log(apiUrl);
};

searchButton.addEventListener('click', function () {
    /*trims spaces for cities with spaces to avoid breaking api url*/
    /*trims spaces for cities with spaces to avoid breaking api url*/
    /*trims spaces for cities with spaces to avoid breaking api url*/
    /*trims spaces for cities with spaces to avoid breaking api url*/
    /*trims spaces for cities with spaces to avoid breaking api url*/
    /*trims spaces for cities with spaces to avoid breaking api url*/
    /*trims spaces for cities with spaces to avoid breaking api url*/
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
    weatherData(searchTerm);
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

/*save multiple city searches*/


/* https://api.openweathermap.org/data/2.5/weather?q=Newark&appid=2831e983c10c1f8b557906c4cc256f77 */
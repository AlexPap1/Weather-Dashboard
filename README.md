# Weather-Dashboard
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

GIVEN a weather dashboard with form inputs

WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city


        /*second API call for UV index*/
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
        let UvUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
        fetch(UvUrl).then(function(response) {
            let UvIndex = document.createElement("span");
            /* UV index changes color based on response*/
            if (response.data[0].value < 4 ) {
                UvIndex.setAttribute("class", "badge badge-success");
            }
            else if (response.data[0].value < 8) {
                UvIndex.setAttribute("class", "badge badge-warning");
            }
            else {
                UvIndex.setAttribute("class", "badge badge-danger");
            }   
            UvIndexNow=innerHTML = "UV Index: ";
            UvIndexNow.append(UvIndex);
        });



        function weatherData(cityName) {
    /*first API Call */
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    console.log(apiUrl);
    console.log(cityName)
    
    fetch(apiUrl)
    .then(function (res) {
        console.log(res)
        return res.json();
        // temperature.inneraHTML = "Temperature " + response.data.main.temp + "degrees";
        // humidity.innerHTML = "Humidity " + response.data.main.humidity + "%";
        // windSpeed.innerHTML = "Wind Speed " + response.data.wind.speed + "MPH";
        // var icon = response.data.weather[0].icon;
        // WeatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");

    }
)};

function fireFirst() {
    let api = "https://api.openweathermap.org/data/2.5/weather?q=Trenton&appid=2831e983c10c1f8b557906c4cc256f77"
    fetch(api)
        .then((res) =>//replace with funton {
           return res.json();
        })
        .then((data) => {
            console.log(data)
        })
}

fireFirst();
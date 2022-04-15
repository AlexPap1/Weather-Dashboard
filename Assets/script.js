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
        fetch(UVQueryURL).then((res) => {
            res.json().then((data) => {
              console.log(data);
              // When UV Index is good, shows green, when ok shows yellow, when bad shows red
              if (data[0].value < 2) {
                UvIndex.setAttribute('class', 'text-success');
              } else if (data[0].value < 7) {
                UvIndex.setAttribute('class', 'text-warning');
              } else {
                UvIndex.setAttribute('class', 'text-danger');
              }
              UvIndex.innerHTML = 'UV Index: ' + data[0].value;
            });
          });
        });
      });
};

//api call for five day forecast
function weatherDataFuture(cityName) {
   let apiSecond = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
    fetch(apiSecond)
    .then(function(response){
       return response.json()
   }).then(function(data){
    console.log("future array")
       displayData(data);
  })
};

function displayData(data){
    //create holder for data
    document.querySelector(".forecast").textContent= "";
    var dataHolder = document.createElement("div");
    dataHolder.classList.add("row")
     document.querySelector(".forecast").appendChild(dataHolder)
    //runs current date at i+7 but wont include fifth day at i+8
    for(var i = 0; i<40; i=i+7) {
        var theDay = data.list[i].dt_txt
        console.log(theDay);
        var dt = data.list[i].main.temp
        console.log(dt);
        //css for cards
        var dataHolder = document.createElement("div");
        dataHolder.classList.add("card");
        dataHolder.classList.add("col-2");
        dataHolder.classList.add("bg-dark");
        dataHolder.classList.add("text-light");
        document.querySelector(".forecast").appendChild(dataHolder);
        //content within each card
        var day = document.createElement("h3");
        theDay = theDay.split(" ");
        console.log(theDay);
        editedDay = theDay[0].split("-");
        console.log(editedDay);
        var monthInWords = ""
            if (editedDay[1] == '01') {
                monthInWords = "Jan"
            } else if (editedDay[1] == '02') {
                monthInWords = "Feb"
            } else if (editedDay[1] == '03') {
                monthInWords = "Mar"
            } else if (editedDay[1] == '04') {
                monthInWords = "Apr"
            } else if (editedDay[1] == '05') {
                monthInWords = "May"
            } else if (editedDay[1] == '06') {
                monthInWords = "Jun"
            } else if (editedDay[1] == '07') {
                monthInWords = "Jul"
            } else if (editedDay[1] == '08') {
                monthInWords = "Aug"
            } else if (editedDay[1] == '09') {
                monthInWords = "Sep"
            } else if (editedDay[1] == '10') {
                monthInWords = "Oct"
            } else if (editedDay[1] == '11') {
                monthInWords = "Nov"
            } else {
                monthInWords = "Dec"
            }
        console.log(monthInWords);
        day.textContent = monthInWords + " " + editedDay[2];
        dataHolder.appendChild(day);
        //image for each card
        var weatherImage = document.createElement("img");
        var icon = data.list[i].weather[0].icon;
         weatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
         dataHolder.appendChild(weatherImage);
        //temp/wind/humidity for each card
         var temp = document.createElement("p");
        temp.textContent = ("Temperature " + data.list[i].main.temp + " °F");
        dataHolder.appendChild(temp);
        var humidity = document.createElement("p");
         humidity.textContent = ("Humidity " + data.list[i].main.humidity + "%");
         dataHolder.appendChild(humidity);
         var windSpeed = document.createElement("p");
         windSpeed.textContent = ("Wind Speed " + data.list[i].wind.speed + "MPH");
         dataHolder.appendChild(windSpeed);
   }
};

searchButton.addEventListener('click', function () {
    /*trims spaces for cities with spaces to avoid breaking api url*/
    const searchTerm = city.value.trim();
    weatherData(searchTerm);
    weatherDataFuture(searchTerm);
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
    localStorage.setItem("history", JSON.stringify(savedData.textContent));
    renderHistory();
};

//fixed to display all history items
function renderHistory() {
    savedData.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function() {
            weatherData(historyItem.value);
        })
        savedData.append(historyItem);
    }
}

/*five day forecast*/

//sample api link to test
/* https://api.openweathermap.org/data/2.5/weather?q=Newark&appid=2831e983c10c1f8b557906c4cc256f77 */
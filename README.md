Weather Dashboard
===============================================================================================================

This page will display the weather for a given input for a city. This incldues a five day forecast, humdity, wind speed, temperature, and UV index.
---------------------------------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------------------------------

**Issue**
<br />
AS A traveler 
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly.

---------------------------------------------------------------------------------------------------------------

![](Assets/Screenshot%202022-04-15%20145526.png)

---------------------------------------------------------------------------------------------------------------
WHEN I search for a city
<br />
THEN I am presented with current and future conditions for that city and that city is added to the search history
<br />
There is an input linked to a button with an add event listener. This button runs three functions. One for the current city conditions, one for the future city conditions, and one to log the history of the input.

---------------------------------------------------------------------------------------------------------------

WHEN I view current weather conditions for that city
<br />
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
<br />
there are two api calls for this to function. one takes the cityname from the input to gather the name, icon, temperature, humidity, wind speed, as well as latitude and longitude. The second api call takes the lat/lon inputs from the first api as an input for the second call, which takes the UV index values.

---------------------------------------------------------------------------------------------------------------

WHEN I view the UV index
<br />
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
<br />
An if/else statement takes the value of the UV data and assigns it a class in bootstrap based on its value. Green for under 2, yellow for under 7, and red for above 7. 

---------------------------------------------------------------------------------------------------------------

WHEN I view future weather conditions for that city
<br />
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
<br />
The third api call takes future data using a for loop and displays it within cards underneath the curret forecast.

---------------------------------------------------------------------------------------------------------------

WHEN I click on a city in the search history
<br />
THEN I am again presented with current and future conditions for that city
<br />
Within the function that displays the history, there is an event listener for a click on the previous input element, which reloads the weatherData function with that input element's value as the function's input. 

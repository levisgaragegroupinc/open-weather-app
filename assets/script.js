var currentDateTime = moment();
var currentDate = (currentDateTime.format('dddd MMM Do'));
console.log(currentDate);

// Search city
var citySearchButton = document.querySelector('#search-for-city');
var cityFavorites = document.querySelector('.city-favorites');
var currentCityDate = document.querySelector('.city-date');

// var apiKey = myApiKeys.openWeatherApiToken;
var apiKey = 'f92ad4f9215ca6d1f087deb61f40e189'
var cityName;
var latLongData;
var cityLat;
var cityLon;

// Add event listener on city search button.
$('#city-search-button').click(function(event){
    event.preventDefault();
    cityName = $(this).siblings('#city-search-input').val();
    console.log(cityName);
    // Remove search name from input field.
    document.getElementById('city-search-input').value = '';
    // Append city to and todays date to weather card.
    var cityNameAndCurrentDate = cityName + ' ' + '(' + currentDate + ')' ;
    currentCityDate.textContent = cityNameAndCurrentDate;
    // call the get lat long function.
    getlatLong();
});

// Start of get lat long function. Geocoding API call.
function getlatLong() {
    var cityLatLong = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    console.log(cityLatLong);

    fetch(cityLatLong)
    .then(function (latLongResponse) {
        return latLongResponse.json();
    })
    .then(function (data) {
        console.log(data);
        cityLat = data[0].lat;
        cityLon = data[0].lon;

        // Call the getCurrentWeather function.
        getCurrentWeather();
    })
};
// End of get lat long function.

// Start of get current weather function.
// https://openweathermap.org/api/one-call-api
// Current weather API call https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=imperial&exclude={part}&appid={API key}
function getCurrentWeather() {
    var inputCityLat = cityLat;
    var inputCityLon = cityLon;
    console.log(inputCityLat);
    console.log(inputCityLon);

    var currentWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + inputCityLat + '&' + 'lon=' + inputCityLon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey;
    console.log(currentWeather);

    fetch(currentWeather)
    .then(function (currentWeatherResponse) {
        return currentWeatherResponse.json();
    })
    .then(function (data) {
        console.log(data);

        getFavoriteCities();
    })
};

// Function to check retrieve local storage, check if new city is in list, if not, append and return to local storage. 
function getFavoriteCities() {
    var favoriteCities = localStorage.getItem('favoriteCities');
    var parsedFavoriteCities = JSON.parse(favoriteCities);
    if (parsedFavoriteCities === null) {
        parsedFavoriteCities = [];
        parsedFavoriteCities.push(cityName);
        var newfavoriteCities = JSON.stringify(parsedFavoriteCities);
        localStorage.setItem('favoriteCities', newfavoriteCities)
        printFavoriteCities();
    } else if (parsedFavoriteCities.includes(cityName)) {
        console.log(cityName + ' already in local storage');
        printFavoriteCities();
        } else {
            parsedFavoriteCities.push(cityName);
            var newfavoriteCities = JSON.stringify(parsedFavoriteCities);
            localStorage.setItem('favoriteCities', newfavoriteCities)
            printFavoriteCities();
        }
    };
// End of function to save city to favorite cities array in local storage.

// Start of function to print favorite cities to list.
function printFavoriteCities() {
    cityFavorites.textContent = '';
    var favoriteCities = localStorage.getItem('favoriteCities');
    if (favoriteCities === null) {
        console.log('No favorite cities in local storage.');        
    } else {
        favoriteCities = JSON.parse(favoriteCities);
        console.log(favoriteCities.length);
        console.log(favoriteCities.length);
        for (i = favoriteCities.length-1; i >= 0; i--) {
            var createButton = document.createElement('button');
            createButton.setAttribute('class', 'favorites');
            createButton.setAttribute('data-favorite', favoriteCities[i]);
            createButton.textContent = favoriteCities[i];
            cityFavorites.appendChild(createButton);

        } 
    }  
};
// End of function to print favorites to cities list.



// Traverse the response
// data.current.clouds
// data.current.dew_point
// data.current.humidity
// data.current.temp
// data.current.uvi
// data.current.wind_speed
// data.current.weather[0].icon

// Traverse daily
// data.daily[0].clouds
// data.daily[0].dew_point
// data.daily[0].humidity
// data.daily[0].temp
// data.daily[0].uvi
// data.daily[0].wind_speed
// data.daily[0].weather[0].icon

// Icon URL: http://openweathermap.org/img/wn/10d@2x.png


// https://api.openweathermap.org/data/2.5/onecall?lat=47.6038321&lon=-122.3300624$units=imperial&exclude=minutely,hourly,alerts&appid=f92ad4f9215ca6d1f087deb61f40e189


// https://openweathermap.org/forecast5
// 5-day forecast API call
// var fiveDayWeather = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&imperial&appid=' + apiKey;





// Favorite cities array
var favoriteCitiesArray = [
    {
        favoriteCity: '',
        lat: '',
        lon: '',
    },
    {
        favoriteCity: '',
        lat: '',
        lon: '',
    },
    {
        favoriteCity: '',
        lat: '',
        lon: '',
    },
    {
        favoriteCity: '',
        lat: '',
        lon: '',
    },
    {
        favoriteCity: '',
        lat: '',
        lon: '',
    },
    {
        favoriteCity: '',
        lat: '',
        lon: '',
    },
];


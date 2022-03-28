var currentDateTime = moment();
var currentDate = (currentDateTime.format('dddd MMM Do'));
console.log(currentDate);


// Search city
var citySearchButton = document.querySelector('#search-for-city');
var cityFavorites = document.querySelector('.city-container');
var currentCityDate = document.querySelector('.city-date');

var apiKey = 'f92ad4f9215ca6d1f087deb61f40e189';
var lat;
var lon;
var cityName;
var latLongData;
var cityLat;
var cityLon;
// Test variables
// lat = 46.729365;
// lon = -117.181148;
cityName = 'Seattle';


// Test lat and long
// 46.729365
// -117.181148

// Add event listener on city search button, and store city to local storage.
$('#city-search-button').click(function(event){
    event.preventDefault();
    cityName = $(this).siblings('#city-search-input').val();
    localStorage.setItem('name', cityName);
    console.log(cityName);
    // Remove search name from input field
    document.getElementById('city-search-input').value = '';
    // Append city to list
    var createButton = document.createElement('button');
    createButton.textContent = cityName;
    createButton.setAttribute('class', 'favorites');
    cityFavorites.appendChild(createButton);
    // Append city to and todays date to weather card
  
    var cityNameAndCurrentDate = cityName + ' ' + '(' + currentDate + ')' ;
    currentCityDate.textContent = cityNameAndCurrentDate;
    
    getlatLong();
});


// Start of get lat long function. 
// United states country code 840 // https://www.iso.org/obp/ui/#search
// https://openweathermap.org/api/geocoding-api
// Geocoding API call
function getlatLong() {
    var cityLatLong = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;
    console.log(cityLatLong);

    fetch(cityLatLong)
    .then(function (latLongResponse) {
        return latLongResponse.json();
    })
    .then(function (data) {
        console.log(data);
        // console.log(data[0].lon);
        // console.log(data[0].lat);
        cityLat = data[0].lat;
        cityLon = data[0].lon;
        console.log(cityLat);
        console.log(cityLon);
    })
};
// End of get lat long function.

// https://openweathermap.org/api/one-call-api
// Current weather API call https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=imperial&exclude={part}&appid={API key}
var currentWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +
 '&' + 'lon=' + lon + '$units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey;

// https://openweathermap.org/forecast5
// 5-day forecast API call
var fiveDayWeather = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&imperial&appid=' + apiKey;





// Favorite cities array
var favoriteCitiesArray = {
        name: '',
        location: {
            lat: '',
            lon: ''
        },
};

// Retrieve favorites from local storage




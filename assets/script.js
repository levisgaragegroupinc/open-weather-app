// Declare variables.
var currentDateTime = moment();
var currentDate = (currentDateTime.format('dddd MMM Do'));

// Search and other variables.
var citySearchButton = document.querySelector('#search-for-city');
var cityFavorites = document.querySelector('.city-favorites');
var currentCityDate = document.querySelector('.city-date');
var weatherResultsContainer = document.querySelector('.weather-results-container');
var img1 = document.querySelector('#city-data');


// Todays weather variables.
var list0 = document.getElementById('list0');
var list1 = document.getElementById('list1');
var list2 = document.getElementById('list2');
var uvIndex = document.getElementById('uv-index');
var icon1 = document.getElementById('icon1');
// Five day variables.
var list3 = document.getElementById('list3');
var list4 = document.getElementById('list4');
var list5 = document.getElementById('list5');
var icon2 = document.getElementById('icon2');

var list6 = document.getElementById('list6');
var list7 = document.getElementById('list7');
var list8 = document.getElementById('list8');
var icon3 = document.getElementById('icon3');

var list9 = document.getElementById('list9');
var list10 = document.getElementById('list10');
var list11 = document.getElementById('list11');
var icon4 = document.getElementById('icon4');

var list12 = document.getElementById('list12');
var list13 = document.getElementById('list13');
var list14 = document.getElementById('list14');
var icon5 = document.getElementById('icon5');

var list15 = document.getElementById('list15');
var list16 = document.getElementById('list16');
var list17 = document.getElementById('list17');
var icon6 = document.getElementById('icon6');

// Variable for api response.
var myWeatherData;

// var apiKey = myApiKeys.openWeatherApiToken;
var apiKey = 'f92ad4f9215ca6d1f087deb61f40e189'
var cityName;
var latLongData;
var cityLat;
var cityLon;
var degreeLabel = '°';
var mphLabel = 'mph';
var humdityLabel = '%';


// Add event listener on city search button.
$('#city-search-button').click(function(event){
    event.preventDefault();
    cityName = $(this).siblings('#city-search-input').val();
    // If search field is blank.
    if(cityName === '') {
        console.log("No city name entered");
        return;
    };

    // Remove search name from input field.
    document.getElementById('city-search-input').value = '';
    // Append city to and todays date to weather card.
    var cityNameAndCurrentDate = cityName + ' ' + '(' + currentDate + ')' ;
    currentCityDate.textContent = cityNameAndCurrentDate;
    // call the get lat long function.
    getlatLong(cityName, apiKey);
});

// Start of get lat long function. Geocoding API call.
function getlatLong(cityName, apiKey) {
    var cityLatLong = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey;

    fetch(cityLatLong)
    .then(function (latLongResponse) {
        return latLongResponse.json();
    })
    .then(function (data) {
        cityLat = data[0].lat;
        cityLon = data[0].lon;

        // Call the getCurrentWeather function.
        getCurrentWeather();
    })
};
// End of get lat long function.

// Start of get current weather function.
function getCurrentWeather() {
    var inputCityLat = cityLat;
    var inputCityLon = cityLon;
    var currentWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + inputCityLat + '&' + 'lon=' + inputCityLon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey;
    
    fetch(currentWeather)
    .then(function (currentWeatherResponse) {
        return currentWeatherResponse.json();
    })
    .then(function (weatherData) {
        myWeatherData = weatherData;
        // Call get Cities and Print Weather functions.
        getFavoriteCities();
        printWeatherData();
    })
  

};
// End of get current weather function.

// Start of print weather parameters to page function.
function printWeatherData() {
    var newWeatherData = myWeatherData;
    console.log(newWeatherData);
    console.log(newWeatherData.current.temp);
    console.log(newWeatherData.current.wind_speed);
    console.log(newWeatherData.current.humidity);
    console.log(newWeatherData.current.uvi);
    console.log(newWeatherData.current.weather[0].description);
    console.log(newWeatherData.current.weather[0].icon);
    
    // Clear content
    for (i = 0; i < 17; i++) {
        var listId = 'list' + [i];
        var listItem = document.getElementById(listId);        
        listItem.textContent = '';
    };

    uvIndex.textContent = '';

    // Print todays weather
    list0.append(myWeatherData.current.temp);
    list1.append(myWeatherData.current.wind_speed);
    list2.append(myWeatherData.current.humidity);
    uvIndex.append(myWeatherData.current.uvi);
    
    // Set the color for the UV index
    var indexValue = myWeatherData.current.uvi;
    if (indexValue <= 2) {
        var scaleColor = 'indexGreen';       
    } else if (indexValue <= 5) {
        scaleColor = 'indexYellow';
    } else if (indexValue <= 7) {
        scaleColor = 'indexOrange';
    } else {
        scaleColor = 'indexRed';
    };
    
    uvIndex.setAttribute('data-index', scaleColor);
    icon1.src = 'https://openweathermap.org/img/wn/' + myWeatherData.current.weather[0].icon + '.png';

    // Five day content

    // for (i = 0; i < 15; i++) {
    //     var fiveDayListId = 'list' + [i];
    //     var fiveDaylistItem = document.getElementById(fiveDayListId);
    //     fiveDaylistItem.textContent = '';
    //     fiveDaylistItem.textContent = 


    // Forecast day 1
    var tempDay1 = myWeatherData.daily[0].temp.day + degreeLabel;
    console.log(degreeLabel);
    list3.append(tempDay1);
    list3.append(myWeatherData.daily[0].temp.day + degreeLabel);
    list4.append(myWeatherData.daily[0].wind_speed);
    list5.append(myWeatherData.daily[0].humidity);
    icon2.src = 'https://openweathermap.org/img/wn/' + myWeatherData.daily[0].weather[0].icon + '.png';
    // Forecast day 2
    list6.append(myWeatherData.daily[1].temp.day);
    list7.append(myWeatherData.daily[1].wind_speed);
    list8.append(myWeatherData.daily[1].humidity);
    icon3.src = 'https://openweathermap.org/img/wn/' + myWeatherData.daily[1].weather[0].icon + '.png';
    // Forecast day 3
    list9.append(myWeatherData.daily[2].temp.day);
    list10.append(myWeatherData.daily[2].wind_speed);
    list11.append(myWeatherData.daily[2].humidity);
    icon4.src = 'https://openweathermap.org/img/wn/' + myWeatherData.daily[2].weather[0].icon + '.png';
    // Forecast day 4
    list12.append(myWeatherData.daily[3].temp.day);
    list13.append(myWeatherData.daily[3].wind_speed);
    list14.append(myWeatherData.daily[3].humidity);
    icon5.src = 'https://openweathermap.org/img/wn/' + myWeatherData.daily[3].weather[0].icon + '.png';

    // Forecast day 5
    list15.append(myWeatherData.daily[4].temp.day);
    list16.append(myWeatherData.daily[4].wind_speed);
    list17.append(myWeatherData.daily[4].humidity);
    icon6.src = 'https://openweathermap.org/img/wn/' + myWeatherData.daily[4].weather[0].icon + '.png';

    // Show container
    weatherResultsContainer.setAttribute('data-visible', 'yes');

};

// Traverse the response
// data.current.clouds
// data.current.dew_point
// data.current.humidity
// data.current.temp
// data.current.uvi
// data.current.wind_speed
// data.current.weather[0].icon



// Function to retrieve local storage, check if new city is in list, if not, append and return to local storage. 
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
        for (i = favoriteCities.length-1; i >= 0; i--) {
            var createButton = document.createElement('button');
            createButton.setAttribute('class', 'favorites');
            createButton.setAttribute('data-favorite', favoriteCities[i]);
            createButton.textContent = favoriteCities[i];
            cityFavorites.appendChild(createButton);
            // Call the print weather data function.
            // printWeatherData();

        } 
    }  
};
// End of function to print favorites to cities list.

// Listen for click on favorite cities list.
var favoriteCityButtonClickHandler = function (event) {
    var favoriteCityName = event.target.getAttribute('data-favorite');
    // Append city to and todays date to weather card.
    var cityNameAndCurrentDate = favoriteCityName + ' ' + '(' + currentDate + ')' ;
    currentCityDate.textContent = cityNameAndCurrentDate;
    // Call the get lat long function.
    getlatLong(favoriteCityName, apiKey);
};

// Add event listeners.
cityFavorites.addEventListener('click', favoriteCityButtonClickHandler);
// End of event listeners.


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


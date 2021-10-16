// set up map
mapboxgl.accessToken = 'pk.eyJ1IjoieXV1a2l4dWFuIiwiYSI6ImNrdG5tMnhycjA0MjEyb3JvNWdmbnprN3QifQ.yOVs5Dk9bKw5-joBWp2wJw';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/yuukixuan/ckugh1lbr3c7w17qmxmugfkr0',
    center: [144.942, -37.817],
    zoom: 12
});

map.on('load', e => {
    map.addLayer({
        "id": "Melbourne_Municipal_Boundary",
        "type": "fill",
        "source": {
            "type": "vector",
            "url": "mapbox://yuukixuan.0el3s1ed"
        },
        "source-layer": "Melbourne_Municipal_Boundary_-b6c9bk",
        'layout': {
            'visibility': 'visible'
        },
        "paint": {
            "fill-color": { 'base': 1.75, stops: [[10, "rgba(184, 233, 148, 0.5)"], [13.5, "rgba(184, 233, 148, 0)"]] },
            "fill-outline-color": "#d35400"
        }
    })

    map.addLayer({
        "id": "Melbourne_CityCircle_tram",
        "type": "line",
        "source": {
            "type": "vector",
            "url": "mapbox://yuukixuan.ck1lhwp6"
        },
        "source-layer": "Melbourne_CityCircle_tram_MGA-a8xe4f",
        'layout': {
            'visibility': 'visible'
        },
        "paint": {
            "line-color": "rgb(174,1,126)",
            "line-width": 2,
            "line-opacity": { 'base': 1.75, stops: [[11, 0], [13, 1]] }
        }
    })

    map.addLayer({
        "id": "BusMetroRoutes",
        "type": "line",
        "source": {
            "type": "vector",
            "url": "mapbox://yuukixuan.7vggsmll"
        },
        "source-layer": "BusMetroRoutes-7rmww8",
        'layout': {
            'visibility': 'visible'
        },
        "paint": {
            "line-color": "rgba(246, 185, 59, 0.5)",
            "line-width": 2,
            "line-opacity": { 'base': 1.75, 'stops': [[11, 0], [13, 1]] }
        }
    })

    map.addLayer({
        "id": "Melbourne_Street_Names",
        "type": "line",
        "source": {
            "type": "vector",
            "url": "mapbox://yuukixuan.d80eodwo"
        },
        "source-layer": "Melbourne_Street_Names_MGA-3uge6l",
        'layout': {
            'visibility': 'visible'
        },
        "paint": {
            "line-color": "rgba(229, 80, 57, 0.6)",
            "line-width": 2,
            "line-opacity": { 'base': 1.75, 'stops': [[11, 0], [13, 1]] }
        }
    })

    map.loadImage("https://cdn-icons-png.flaticon.com/512/821/821354.png", (error, image) => {
        if (error) throw error;
        map.addImage("trainStations", image);
        map.addLayer({
            "id": "trainStations",
            "type": "symbol",
            "source": {
                "type": "vector",
                "url": "mapbox://yuukixuan.8ruko1c0"
            },
            "source-layer": "trainStations-bvrawm",
            'layout': {
                'visibility': 'visible'
            },
            'layout': {
                'icon-image': "trainStations",
                'icon-size': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [13, 0.035], // zoom: 8.5, opacity: 0
                        [20, 0.25]
                    ]
                }
            },
            "paint": {
                'icon-opacity': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [12, 0], // zoom: 8.5, opacity: 0
                        [13, 1]
                    ]
                }
            }
        })
    })

    map.loadImage("https://cdn-icons-png.flaticon.com/512/308/308150.png", (error, image) => {
        if (error) throw error;
        map.addImage("restaurants", image);
        map.addLayer({
            "id": "restaurants",
            "type": "symbol",
            "source": {
                "type": "vector",
                "url": "mapbox://yuukixuan.7j7k5j5s"
            },
            "source-layer": "Cafe__restaurant__bistro_seat-5bepx1",
            'layout': {
                'icon-image': "restaurants",
                'icon-size': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16, 0.025], // zoom: 8.5, opacity: 0
                        [17, 0.05]
                    ]
                }
            },
            "paint": {
                'icon-opacity': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16, 0], // zoom: 8.5, opacity: 0
                        [17, 1]
                    ]
                }
            }
        })
    })
});

//// Javascript code for ther filter menu stars from here, Reference:https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/ ////
map.on('idle', () => {
    if (!map.getLayer('Melbourne_Municipal_Boundary') || !map.getLayer('Melbourne_CityCircle_tram')
    || !map.getLayer('BusMetroRoutes') || !map.getLayer('Melbourne_Street_Names') 
    || !map.getLayer('trainStations')) {
        return;  
    }
  
  
    const LayerIds = ['Melbourne_Municipal_Boundary', 'Melbourne_CityCircle_tram','BusMetroRoutes', 'Melbourne_Street_Names', 'trainStations'];
  
    
    for (const id of LayerIds) {
        if (document.getElementById(id)) {
            continue;
        }
  
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        link.className = 'active';
  
      
        link.onclick = function(e) {
            const clicked = this.textContent;
            e.preventDefault();
            e.stopPropagation();
  
            const visibility = map.getLayoutProperty(
            clicked,
            'visibility'
        );
  
        if (visibility === 'visible') {
            map.setLayoutProperty(clicked, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(
            clicked,
            'visibility',
            'visible'
            );
        }
        };  
  
      const layers = document.getElementById('menu');
      layers.appendChild(link);
    }
});
  

//// Javascript code for the weather panel stars from here, Reference:https://www.youtube.com/watch?v=KqZGuzrY9D4&t=17s ////
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


// OpenWeather key
const K = 273;
const key = "46056ec3e71acc6cec6e3cae8884eb22";

// Set the weather panel data
const weather = {};
weather.temperature = {
    unit : "celsius"
}

// Check user's geolocation information, and whether the browswer support the geolocation function
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Geolocation not enabled</p>";
}

// Locate the current location of user
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// Show error message when geolocation function cannot work
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Fetch weather condition data from API
function getWeather(latitude, longitude){
    let weather_api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(weather_api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - K);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// Display data on the interface
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Conversion from Celsius to Fahrenheit 
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// On click effect from user
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

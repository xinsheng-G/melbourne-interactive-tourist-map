// set up map
mapboxgl.accessToken = 'pk.eyJ1IjoieXV1a2l4dWFuIiwiYSI6ImNrdG5tMnhycjA0MjEyb3JvNWdmbnprN3QifQ.yOVs5Dk9bKw5-joBWp2wJw';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [144.942, -37.817],
    zoom: 12
});

function toggleSidebar(id) {
    const elem = document.getElementById(id);
    const collapsed = elem.classList.toggle('collapsed');
    const padding = {};
    padding[id] = collapsed ? 0 : 300;
    map.easeTo({
        padding: padding,
        duration: 1000
    });
}

map.on('load', e => {
    map.addLayer({
        "id": "City of Melbourne Boundary",
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
        "id": "Tram CityCircle",
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
        "id": "Bus Routes",
        "type": "line",
        "source": {
            "type": "vector",
            "url": "mapbox://yuukixuan.7vggsmll"
        },
        "source-layer": "BusMetroRoutes-7rmww8",
        'layout': {
            'visibility': 'none',
        },
        "paint": {
            "line-color": "rgba(246, 185, 59, 0.5)",
            "line-width": 2,
            "line-opacity": { 'base': 1.75, 'stops': [[11, 0], [13, 1]] }
        }
    })

    map.addLayer({
        "id": "Streets",
        "type": "line",
        "source": {
            "type": "vector",
            "url": "mapbox://yuukixuan.d80eodwo"
        },
        "source-layer": "Melbourne_Street_Names_MGA-3uge6l",
        'layout': {
            'visibility': 'none'
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
            "id": "Train Stations",
            "type": "symbol",
            "source": {
                "type": "vector",
                "url": "mapbox://yuukixuan.8ruko1c0"
            },
            "source-layer": "trainStations-bvrawm",
            'layout': {
                'visibility': 'visible',
                'text-field': ['get', 'STATIONNAM'],
                'text-offset': { 'stops': [[13, [0, 1.5]], [20, [0, 5]]] },
                'text-size': { 'base': 1.75, 'stops': [[13, 11], [20, 16]] },
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
                'text-opacity': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [12, 0], // zoom: 8.5, opacity: 0
                        [13, 1]
                    ]
                },
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
        map.addImage("Restaurants", image);
        map.addLayer({
            "id": "Restaurants",
            "type": "symbol",
            "source": {
                "type": "vector",
                "url": "mapbox://yuukixuan.7j7k5j5s"
            },
            "source-layer": "Cafe__restaurant__bistro_seat-5bepx1",
            'layout': {
                'visibility': 'none',
                'text-field': ['get', 'Trading name'],
                'text-offset': [0, 2.5],
                'text-size': { 'base': 1.75, 'stops': [[16.5, 11], [17, 13]] },
                'icon-image': "Restaurants",
                'icon-size': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16.5, 0.025], // zoom: 8.5, opacity: 0
                        [17, 0.05]
                    ]
                }
            },
            "paint": {
                'text-opacity': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16.5, 0], // zoom: 8.5, opacity: 0
                        [17, 1]
                    ]
                },
                'icon-opacity': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16.5, 0], // zoom: 8.5, opacity: 0
                        [17, 1]
                    ]
                }
            }
        })
    })

    map.loadImage("https://cdn-icons-png.flaticon.com/512/931/931949.png", (error, image) => {
        if (error) throw error;
        map.addImage("Bars", image);
        map.addLayer({
            "id": "Bars",
            "type": "symbol",
            "source": {
                "type": "vector",
                "url": "mapbox://yuukixuan.bcit03kl"
            },
            "source-layer": "Bar__tavern__pub_patron_capac-88xeh3",
            'layout': {
                'visibility': 'none',
                'text-field': ['get', 'Trading name'],
                'text-offset': [0, 2.5],
                'text-size': { 'base': 1.75, 'stops': [[16.5, 11], [17, 13]] },
                'icon-image': "Bars",
                'icon-size': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16.5, 0.025], // zoom: 8.5, opacity: 0
                        [17, 0.05]
                    ]
                }
            },
            "paint": {
                'text-opacity': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16.5, 0], // zoom: 8.5, opacity: 0
                        [17, 1]
                    ]
                },
                'icon-opacity': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16.5, 0], // zoom: 8.5, opacity: 0
                        [17, 1]
                    ]
                }
            }
        })
    })

    map.addLayer({
        "id": "Open Space",
        "type": "fill",
        "source": {
            "type": "vector",
            "url": "mapbox://yuukixuan.6ocrto1t"
        },
        "source-layer": "Melbourne_OpenSpace_MGA-6dj4ql",
        'layout': {
            'visibility': 'visible'
        },
        "paint": {
            "fill-color": "rgba(16, 172, 132, 0.8)",
            "fill-outline-color": "gray",
            "fill-opacity": { 'base': 1.75, stops: [[10, 0], [13.5, 1]] },
        }
    })

    map.loadImage("https://cdn-icons-png.flaticon.com/512/1422/1422872.png", (error, image) => {
        if (error) throw error;
        map.addImage("Accommodation", image);
        map.addLayer({
            "id": "Accommodation",
            "type": "symbol",
            "source": {
                "type": "vector",
                "url": "mapbox://yuukixuan.di42pdwp"
            },
            "source-layer": "Building_information_2019-deg9zz",
            'layout': {
                'visibility': 'visible',
                'text-field': ['get', 'Building name'],
                'text-offset': [0, 2.5],
                'text-size': { 'base': 1.75, 'stops': [[16.5, 11], [17, 13]] },
                'icon-image': "Accommodation",
                'icon-size': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16.5, 0.03], // zoom: 8.5, opacity: 0
                        [17, 0.055]
                    ]
                }
            },
            "paint": {
                'text-opacity': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16.5, 0], // zoom: 8.5, opacity: 0
                        [17, 1]
                    ]
                },
                'icon-opacity': { // opacity vary with zoom
                    'base': 1.75,
                    'stops': [
                        [16.5, 0], // zoom: 8.5, opacity: 0
                        [17, 1]
                    ]
                }
            },
            "filter": ["==", "Predominant space use", "Commercial Accommodation"]
        })
    })

    // Landmark
    for (let poi of poi_icon) {
        map.loadImage(poi.icon, (error, image) => {
            if (error) throw error;
            map.addImage(poi.poi_theme, image);
            map.addLayer({
                "id": poi.poi_theme,
                "type": "symbol",
                "source": {
                    "type": "vector",
                    "url": "mapbox://yuukixuan.bftcvsmb"
                },
                "source-layer": "Landmarks-1t9shf",
                'layout': {
                    'visibility': 'visible',
                    'text-field': ['get', 'Feature Name'],
                    'text-offset': [0, 3],
                    'text-size': { 'base': 1.75, 'stops': [[12, 11], [15, 13]] },
                    'icon-image': poi.poi_theme,
                    'icon-size': { // opacity vary with zoom
                        'base': 1.75,
                        'stops': [
                            [12, 0.025], // zoom: 8.5, opacity: 0
                            [15, 0.075]
                        ]
                    }
                },
                "paint": {
                    'text-opacity': { // opacity vary with zoom
                        'base': 1.75,
                        'stops': [
                            [14, 0], // zoom: 8.5, opacity: 0
                            [15, 1]
                        ]
                    },
                    'icon-opacity': { // opacity vary with zoom
                        'base': 1.75,
                        'stops': [
                            [12, 0], // zoom: 8.5, opacity: 0
                            [13, 1]
                        ]
                    }
                },
                "filter": ["==", "Theme", poi.poi_theme]
            })
        })
    }

    const Layers = ['Restaurants', 'Bars', 'Accommodation'];
    for (const poi_type of poi_icon) {
        Layers.push(poi_type.poi_theme)
    }

    for (const layer of Layers) {
        map.on('mouseenter', layer, e => {
            map.getCanvas().style.cursor = 'pointer';
            // console.log(e.features[0].properties)
        });

        map.on('click', layer, e => {
            // console.log(layer)
            // let pop_score_list = []
            let pop_score_list = [
                e.features[0].properties.January_Popular_Score,
                e.features[0].properties.February_Popular_Score,
                e.features[0].properties.March_Popular_Score,
                e.features[0].properties.April_Popular_Score,
                e.features[0].properties.May_Popular_Score,
                e.features[0].properties.June_Popular_Score,
                e.features[0].properties.July_Popular_Score,
                e.features[0].properties.August_Popular_Score,
                e.features[0].properties.September_Popular_Score,
                e.features[0].properties.October_Popular_Score,
                e.features[0].properties.November_Popular_Score,
                e.features[0].properties.December_Popular_Score,
            ];
            console.log(pop_score_list);
            // draw here, eg drawBar(pop_score_list)
            drawBar(pop_score_list);
        })
        
        map.on('mouseleave', layer, e => {
            map.getCanvas().style.cursor = '';
        })
    }
});

//// Javascript code for ther layer filter stars from here, Reference:https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/ ////
map.on('idle', () => {
    if (!map.getLayer('City of Melbourne Boundary') || !map.getLayer('Tram CityCircle')
        || !map.getLayer('Bus Routes') || !map.getLayer('Streets')
        || !map.getLayer('Train Stations')) {
        return;
    }


    const LayerIds = ['City of Melbourne Boundary', 'Tram CityCircle', 'Bus Routes', 'Streets', 'Train Stations'];
    const tagLayerIds = ['Restaurants', 'Bars', 'Open Space', 'Accommodation'];
    const poiLayerIds = []

    for (const poi_type of poi_icon) {
        poiLayerIds.push(poi_type.poi_theme)
    }


    for (const id of LayerIds) {
        if (document.getElementById(id)) {
            continue;
        }

        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        if (id == 'Bus Routes' || id == 'Streets') {
            link.className = '';
        } else {
            link.className = 'active';
        }

        link.onclick = function (e) {
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

        const layers = document.getElementById('layer_filter');
        layers.appendChild(link);
    }

    for (const id of tagLayerIds) {
        if (document.getElementById(id)) {
            continue;
        }

        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        if (id == 'Restaurants' || id == 'Bars') {
            link.className = '';
        } else {
            link.className = 'active';
        }


        link.onclick = function (e) {
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
        const section = document.createElement('div')
        section.appendChild(link);
        const layers = document.getElementById('tags');
        layers.appendChild(section)
    }

    const link = document.createElement('a');
    link.id = "Point of Interest";
    link.href = '#';
    link.textContent = "Point of Interest";
    link.className = 'active';

    link.onclick = function (e) {
        for (const poi_theme of poiLayerIds) {
            console.log(poi_theme)
            const clicked = poi_theme;
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
        }
    };

    if (!document.getElementById("Point of Interest")) {
        const section = document.createElement('div')
        section.appendChild(link);
        const layers = document.getElementById('tags');
        layers.appendChild(section)

    }
});

const sight_list = ["National Gallery of Victoria", "Queen Victoria Market", "Eureka Skydeck 88", "Royal Botanic Gardens Victoria", "Federation Square"]

for (const each_signt of sight_list) {
    let sight = document.getElementById(each_signt);

    sight.addEventListener("mouseover", function (event) {
        console.log(each_signt)
        // do what you want to do here
        document.querySelector('#infoPanel').style.display = 'block';
        let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + each_signt + '?redirect=true';
        fetch(url).then(response => response.json()).then(json => {
            document.querySelector('#infoPanelTitle').textContent = each_signt;

            let html = json.extract_html;

            fetch(url).then(response => response.json()).then(json => {
                // At the START of the html, add an image
                if (json.thumbnail) {
                    html = '<img src="' + json.thumbnail.source +
                        '" width="220" id="infoPanelImage">' + html;
                }

                document.querySelector('#infoPanelContents').innerHTML = html;
            });
        });
    }, false);

    sight.addEventListener("mouseout", function (event) {
        console.log("not hovered")
        // do what you want to do here
        document.querySelector('#infoPanel').style.display = 'none';
    }, false);
}

// Add event listener for interactable buttons
let top_sightseeing_menu = document.querySelector(".top_sightseeing_menu");
let sightseeing_btn = document.querySelector(".sightseeing_btn");
let sightseeing_dropdown = document.querySelector(".sightseeing_dropdown");
let infoPanel = document.querySelector('#infoPanel');

top_sightseeing_menu.addEventListener("mouseover", function (event) {
    sightseeing_btn.innerHTML = "Click to Locate Sight";
    sightseeing_dropdown.style.display = "block";
}, false)

top_sightseeing_menu.addEventListener("mouseout", function (event) {
    sightseeing_btn.innerHTML = "Top Sights"
    sightseeing_dropdown.style.display = "none";
}, false)

infoPanel.addEventListener("mouseover", function (event) {
    this.style.display = "block";
}, false)

infoPanel.addEventListener("mouseout", function (event) {
    this.style.display = "none";
}, false)

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
    unit: "celsius"
}

// Check user's geolocation information, and whether the browswer support the geolocation function
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Geolocation not enabled</p>";
}

// Locate the current location of user
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

// Show error message when geolocation function cannot work
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Fetch weather condition data from API
function getWeather(latitude, longitude) {
    let weather_api = `http://api.openweathermap.org/data/2.5/weather?lat=-37.8135911985281&lon=144.963855087868&appid=${key}`;

    fetch(weather_api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - K);
            weather.iconId = data.weather[0].icon;
            weather.description = data.weather[0].description;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

// Display data on the interface
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Conversion from Celsius to Fahrenheit 
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

// On click effect from user
tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

//need change to click
map.on('load', (e) => {
    list = [1,2,3,4,5,6,7,8,9,10,11,12];
    drawPieAndLine(list);
});

//add barChart
function drawBar(data) {
    var listData = data;
    var chartDom = document.getElementById('barChart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: 'Weekly thermal value'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Thermal Value',
                type: 'bar',
                itemStyle: {
                    color: '#4287f5'
                },
                emphasis: {
                    itemStyle: {
                        color: '#3451f7'
                    }
                },
                barWidth: '60%',
                data: listData,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }]
                }
            }
        ]
    };
    option && myChart.setOption(option);
}

//add pie and line Chart
function drawPieAndLine(data) {
    var data = data;
    var chartDom = document.getElementById('ThemeChart');
    var myChart = echarts.init(chartDom);
    var option;

    setTimeout(function () {
        option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                showContent: false
            },
            dataset: {
                source: [
                    ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                    ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
                    ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                    ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                    ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
                ]
            },
            xAxis: { type: 'category' },
            yAxis: { gridIndex: 0 },
            grid: { top: '55%' },
            series: [
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    emphasis: {
                        focus: 'self'
                    },
                    label: {
                        formatter: '{b}: {@2012} ({d}%)'
                    },
                    encode: {
                        itemName: 'product',
                        value: '2012',
                        tooltip: '2012'
                    }
                }
            ]
        };
        myChart.on('updateAxisPointer', function (event) {
            const xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                const dimension = xAxisInfo.value + 1;
                myChart.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension
                        }
                    }
                });
            }
        });
        myChart.setOption(option);
    });

    option && myChart.setOption(option);
}
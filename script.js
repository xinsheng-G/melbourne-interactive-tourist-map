// set up map
mapboxgl.accessToken = 'pk.eyJ1IjoieXV1a2l4dWFuIiwiYSI6ImNrdG5tMnhycjA0MjEyb3JvNWdmbnprN3QifQ.yOVs5Dk9bKw5-joBWp2wJw';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [144.942, -37.817],
    zoom: 12
});

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function filterByMonth(month) {
    const filters = ['==', 'month', month];
    map.setFilter('pop-circles', filters);
    map.setFilter('pop-labels', filters);

    // Set the label to the month
    document.getElementById('month').textContent = months[month];
}

function setVisibility(e, clicked, link) {
    e.preventDefault();
    e.stopPropagation();

    const visibility = map.getLayoutProperty(
        clicked,
        'visibility'
    );

    if (visibility === 'visible') {
        map.setLayoutProperty(clicked, 'visibility', 'none');
        link.className = '';
    } else {
        link.className = 'active';
        map.setLayoutProperty(
            clicked,
            'visibility',
            'visible'
        );
    }
}

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
    d3.json('/data/landmarks_pop.geojson',
        function (err, data) {
            if (err) throw err;

            map.addSource('pop_score', {
                'type': 'geojson',
                data: data
            });
            map.addLayer({
                'id': 'pop-circles',
                'type': 'circle',
                'source': 'pop_score',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'circle-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'score'],
                        0, '#FCA107',
                        2000, '#7F3121'
                    ],
                    'circle-opacity': { 'base': 1.75, 'stops': [[10, 0], [13.5, 0.75]] },
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        12,
                        ["interpolate",
                            ["linear"], ['get', 'score'],
                            0, 5,
                            2000, 20
                        ],
                        15,
                        ["interpolate",
                            ["linear"], ['get', 'score'],
                            0, 10,
                            2000, 40
                        ]
                    ]
                }
            });
            map.addLayer({
                'id': 'pop-labels',
                'type': 'symbol',
                'source': 'pop_score',
                'layout': {
                    'visibility': 'none',
                    'text-field': ['concat', ['to-string', ['get', 'score']]],
                    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                    'text-size': 12
                },
                'paint': {
                    'text-color': 'rgba(0,0,0,0.5)',
                    'text-opacity': { 'base': 1.75, 'stops': [[14.5, 0], [15, 1]] },
                }
            });
            filterByMonth(0);
            document.getElementById('slider').addEventListener('input', function (e) {
                var month = parseInt(e.target.value, 10);
                filterByMonth(month);
            });
        });




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
            // draw here, eg drawBar(pop_score_list)
            drawBar(pop_score_list);
        })

        map.on('mouseleave', layer, e => {
            map.getCanvas().style.cursor = '';
        })
    }

    /////  Click on pop up function stars from here  /////
                                    // -- Train Station -- //
    map.on('click', 'Train Stations', e =>{
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<span class="description">Station Name: </span>' +
            '<span>' + e.features[0].properties.STATIONNAM + '</span>' + '<br>' + 
            '<span class="description">Trian Type: </span>' +
            '<span>' + e.features[0].properties.STOPMODENA + '</span>' + '<br>' + 
            '<span class="description">Sation Zone: </span>' +
            '<span>' + e.features[0].properties.ZONES + '</span>' + '<br>' 
        )
        .addTo(map);
    })

    // Change the icon to a pointer icon when you mouse over a icon
        map.on('mouseenter', 'Train Stations', e => {
        map.getCanvas().style.cursor = 'pointer';
    })
  
    // Change it back to a pan icon when it leaves.
        map.on('mouseleave', 'Train Stations', e => {
        map.getCanvas().style.cursor = '';
    })
  
                                     // -- Open Space -- //
    map.on('click', 'Open Space', e =>{
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<span class="description">Name: </span>' +
            '<span>' + e.features[0].properties.NAME + '</span>' + '<br>' + 
            '<span class="description">Type: </span>' +
            '<span>' + e.features[0].properties.OS_GROUP+ '</span>' + '<br>' + 
            '<span class="description">Suburb: </span>' +
            '<span>' + e.features[0].properties.DOM_LGA  + '</span>' + '<br>' 
        )
        .addTo(map);
    })

    // Change the icon to a pointer icon when you mouse over a icon
    map.on('mouseenter', 'Open Space', e => {
        map.getCanvas().style.cursor = 'pointer';
    })
  
    // Change it back to a pan icon when it leaves.
        map.on('mouseleave', 'Open Space', e => {
        map.getCanvas().style.cursor = '';
    })

                                    // -- Restaurant -- //
    map.on('click', 'Restaurants', e =>{
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<span class="description">Name: </span>' +
            '<span>' + e.features[0].properties["Trading name"] + '</span>' + '<br>' + 
            '<span class="description">Address: </span>' +
            '<span>' + e.features[0].properties["Street address"]+ '</span>' + '<br>' 
        )
        .addTo(map);
    })

    // Change the icon to a pointer icon when you mouse over a icon
    map.on('mouseenter', 'Restaurants', e => {
        map.getCanvas().style.cursor = 'pointer';
    })
  
    // Change it back to a pan icon when it leaves.
        map.on('mouseleave', 'Restaurants', e => {
        map.getCanvas().style.cursor = '';
    })

                                     // -- Bars -- //
    map.on('click', 'Bars', e =>{
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<span class="description">Name: </span>' +
            '<span>' + e.features[0].properties["Trading name"] + '</span>' + '<br>' + 
            '<span class="description">Address: </span>' +
            '<span>' + e.features[0].properties["Street address"]+ '</span>' + '<br>' 
        )
        .addTo(map);
    })

    // Change the icon to a pointer icon when you mouse over a icon
    map.on('mouseenter', 'Bars', e => {
        map.getCanvas().style.cursor = 'pointer';
    })
  
    // Change it back to a pan icon when it leaves.
        map.on('mouseleave', 'Bars', e => {
        map.getCanvas().style.cursor = '';
    })

                                    // -- Accomadations -- //
    map.on('click', 'Accommodation', e =>{
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<span class="description">Name: </span>' +
            '<span>' + e.features[0].properties["Building name"] + '</span>' + '<br>' + 
            '<span class="description">Address: </span>' +
            '<span>' + e.features[0].properties["Street address"]+ '</span>' + '<br>' 
        )
        .addTo(map);
    })

    // Change the icon to a pointer icon when you mouse over a icon
    map.on('mouseenter', 'Accommodation', e => {
        map.getCanvas().style.cursor = 'pointer';
    })
  
    // Change it back to a pan icon when it leaves.
        map.on('mouseleave', 'Accommodation', e => {
        map.getCanvas().style.cursor = '';
    })


                                    // -- Tram Citycircle -- //
    map.on('click', 'Tram CityCircle', e =>{
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<span class="description">Name: </span>' +
            '<span>' + e.features[0].properties.name + '</span>' + '<br>' 
        )
        .addTo(map);
    })

    // Change the icon to a pointer icon when you mouse over a icon
    map.on('mouseenter', 'Tram CityCircle', e => {
        map.getCanvas().style.cursor = 'pointer';
    })
  
    // Change it back to a pan icon when it leaves.
        map.on('mouseleave', 'Tram CityCircle', e => {
        map.getCanvas().style.cursor = '';
    })


                                    // -- Bus Routes -- //
    map.on('click', 'Bus Routes', e =>{
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<span class="description">Bus Num: </span>' +
            '<span>' + e.features[0].properties.ROUTE_SHORT_NAME + '</span>' + '<br>' +
            '<span class="description">Stop Route: </span>' +
            '<span>' + e.features[0].properties.ROUTE_LONG_NAME + '</span>' + '<br>' 
        )
        .addTo(map);
    })

    // Change the icon to a pointer icon when you mouse over a icon
    map.on('mouseenter', 'Bus Routes', e => {
        map.getCanvas().style.cursor = 'pointer';
    })
  
    // Change it back to a pan icon when it leaves.
        map.on('mouseleave', 'Bus Routes', e => {
        map.getCanvas().style.cursor = '';
    })
   

                                     // -- Streets -- //
    map.on('click', 'Streets', e =>{
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<span class="description">Street Name: </span>' +
            '<span>' + e.features[0].properties.name + '</span>' + '<br>' 
        )
        .addTo(map);
    })

    // Change the icon to a pointer icon when you mouse over a icon
    map.on('mouseenter', 'Streets', e => {
        map.getCanvas().style.cursor = 'pointer';
    })
  
    // Change it back to a pan icon when it leaves.
        map.on('mouseleave', 'Streets', e => {
        map.getCanvas().style.cursor = '';
    })

                                    // -- Point of Interests -- //

    for(let poi_type of poi_icon){
        let id = poi_type.poi_theme
        map.on('click', id, e =>{
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
                '<span class="description">Name: </span>' +
                '<span>' + e.features[0].properties["Feature Name"] + '</span>' + '<br>' +
                '<span class="description">Theme: </span>' +
                '<span>' + e.features[0].properties["Sub Theme"] + '</span>' + '<br>' 
            )
            .addTo(map);
        })
    
        // Change the icon to a pointer icon when you mouse over a icon
        map.on('mouseenter', id, e => {
            map.getCanvas().style.cursor = 'pointer';
        })
      
        // Change it back to a pan icon when it leaves.
            map.on('mouseleave', id, e => {
            map.getCanvas().style.cursor = '';
        })
    }

        ////        End of pop up function       ////       
});




/////  Javascript code for ther layer filter stars from here, Reference:https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/  /////
map.on('idle', () => {
    if (!map.getLayer('City of Melbourne Boundary') || !map.getLayer('Tram CityCircle')
        || !map.getLayer('Bus Routes') || !map.getLayer('Streets')
        || !map.getLayer('Train Stations')) {
        return;
    }


    const LayerIds = ['City of Melbourne Boundary', 'Tram CityCircle', 'Train Stations', 'Bus Routes', 'Streets'];
    const tagLayerIds = ['Accommodation', 'Restaurants', 'Bars', 'Open Space'];
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
            setVisibility(e, clicked, link);
        };

        const layers = document.getElementById('layer_filter');
        layers.appendChild(link);
    }

    const poi_link = document.createElement('a');
    poi_link.id = "Point of Interest";
    poi_link.href = '#';
    poi_link.textContent = "Point of Interest";
    poi_link.className = 'active';

    poi_link.onclick = function (e) {
        for (const poi_theme of poiLayerIds) {
            const clicked = poi_theme;
            setVisibility(e, clicked, poi_link);
        }
    };

    if (!document.getElementById("Point of Interest")) {
        const section = document.createElement('div')
        section.appendChild(poi_link);
        const layers = document.getElementById('tags');
        layers.appendChild(section)

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
            setVisibility(e, clicked, link);
        };
        const section = document.createElement('div')
        section.appendChild(link);
        const layers = document.getElementById('tags');
        layers.appendChild(section)
    }

    const crowd_link = document.createElement('a');
    crowd_link.id = "pop_btn";
    crowd_link.href = '#';
    crowd_link.textContent = "Click to See Crowdedness at Point of Interest";
    crowd_link.className = '';

    crowd_link.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        const visibility = map.getLayoutProperty('pop-circles', 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty('pop-circles', 'visibility', 'none');
            map.setLayoutProperty('pop-labels', 'visibility', 'none');
            crowd_link.textContent = "Click to See Crowdedness at Point of Interest"
            crowd_link.className = '';
        } else {
            crowd_link.className = 'active';
            crowd_link.textContent = "Click to Hide Crowdedness at Point of Interest"
            map.setLayoutProperty('pop-circles', 'visibility', 'visible');
            map.setLayoutProperty('pop-labels', 'visibility', 'visible');
        }
    }

    if (!document.getElementById("pop_btn")) {
        document.getElementById('crowd_filter').appendChild(crowd_link);
    }

    const bar_btn = document.getElementById("bar_btn");
    const pie_btn = document.getElementById("pie_btn");
    const tableau_btn = document.getElementById("tableau_btn");

    const barChart = document.getElementById("barChart");
    const ThemeChart = document.getElementById("ThemeChart");

    bar_btn.onclick = function (e) {
        if (bar_btn.className != 'active') {
            bar_btn.className = 'active';
            pie_btn.className = '';
            tableau_btn.className = '';
            barChart.style.display = '';
            ThemeChart.style.display = 'none';
        }
    }

    pie_btn.onclick = function (e) {
        if (pie_btn.className != 'active') {
            pie_btn.className = 'active';
            bar_btn.className = '';
            tableau_btn.className = '';
            ThemeChart.style.display = '';
            barChart.style.display = 'none';
            let url = "Data/landmarks_pop.json";
            let request = new XMLHttpRequest();
            request.open("get", url);
            request.send(null);
            request.onload = function () {
                if (request.status === 200) {
                    let json = JSON.parse(request.responseText);
                    //console.log(json);
                    let j = 0;
                    let dataSet = new Array();
                    let nameList = new Array();
                    //get all Theme's name
                    for (let i = 0; i < json.length; i++) {
                        if (nameList.indexOf(json[i].Theme) > -1) {
                        } else {
                            nameList[j++] = json[i].Theme;
                        }
                    }
                    //console.log(nameList);
                    for (let k = 0; k < nameList.length; k++) {
                        dataSet[k] = new Array();
                        dataSet[k][0] = nameList[k];
                        for(let i = 0;i < json.length-1; i++) {
                            if (dataSet[k][0] === json[i].Theme) {
                                let month = json[i].month + 1;
                                let score = parseInt(json[i].score);
                                // get the Theme's score by month
                                if (dataSet[k][month] != null) {
                                    dataSet[k][month] = dataSet[k][month] + score;
                                } else {
                                    dataSet[k][month] = score;
                                }
                            }
                        }
                    }
                    //console.log(dataSet);
                    drawPieAndLine(dataSet);
                }
            }
        }
    }

});

const sight_list = ["National Gallery of Victoria", "Queen Victoria Market", "Eureka Skydeck 88", "Royal Botanic Gardens Victoria", "Federation Square"]

for (const each_signt of sight_list) {
    let sight = document.getElementById(each_signt);

    sight.addEventListener("mouseover", function (event) {
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
        // do what you want to do here
        document.querySelector('#infoPanel').style.display = 'none';
    }, false);
}

/////  Javascript code for search bar and zoom button starts from here  /////
// add geocoder search
map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    collapsed: true
}));
// add navigation control
map.addControl(new mapboxgl.NavigationControl());
// add plotting scale
map.addControl(new mapboxgl.ScaleControl());


/////  Sight seeing button starts from here  /////
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

///// Javascript code for the weather panel stars from here, Reference:https://www.youtube.com/watch?v=KqZGuzrY9D4&t=17s /////
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

//add barChart
function drawBar(data) {
    var listData = data;
    var chartDom = document.getElementById('barChart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: 'Weekly Potential Popularity'
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
function drawPieAndLine(datalist) {
    let data = datalist;
    let chartDom = document.getElementById('ThemeChart');
    let myChart = echarts.init(chartDom);
    let option;
    let monthData = ['Month','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    setTimeout(function () {
        option = {
            title: {
                text: "Potential Popularity of POI"
            },
            legend: {
                orient: 'vertical',
                x: 'right'
            },
            tooltip: {
                trigger: 'axis',
                showContent: false
            },
            dataset: {
                source: [
                    monthData,
                    data[0],
                    data[1],
                    data[2],
                    data[3],
                    data[4],
                    data[5],
                    data[6],
                    data[7],
                    data[8],
                    data[9],
                    data[10],
                    data[11]
                ]
            },
            xAxis: { type: 'category' },
            yAxis: { gridIndex: 0 },
            grid: { top: '55%' },
            series: [
                {
                    name: data[0][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[10][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[11][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[1][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[2][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[3][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[4][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[5][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[6][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[7][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[8][0],
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    emphasis: { focus: 'series' }
                },
                {
                    name: data[9][0],
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
                        formatter: '{b}: {@Jan} ({d}%)'
                    },
                    encode: {
                        itemName: 'Month',
                        value: 'Jan',
                        tooltip: 'Jan'
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
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
});
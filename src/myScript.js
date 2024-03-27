import OGCFeatureCollection from 'mapbox-gl-ogc-feature-collection'
import { Map, TerrainControl, NavigationControl, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'
import styleFile from './assets/bm_web_col.json'


function doIt() {
    //const styleFile = styleToUse
   // const styleFile = 'https://demotiles.maplibre.org/style.json';
    const map = new Map({
        container: 'map',
        style: styleFile, // stylesheet location
        center: [50.67, 7.1], // starting position [lng, lat]
        zoom: 2, // starting zoom
        maplibreLogo: true,
    });

    // Add controls (optional)
    map.addControl(
        new NavigationControl({
            visualizePitch: true,
            showZoom: true,
            showCompass: true
        })
    );

    map.addControl(
        new TerrainControl({
            source: 'terrainSource',
            exaggeration: 1
        })
    );

    const ids = ['showTileBoundaries', 'showCollisionBoxes', 'showOverdrawInspector', 'showPadding']
    ids.forEach(function (id) { setEvents('buttons', id) })

    function setEvents(rootName, id) {
        const root = document.getElementById(rootName);
        const group = document.createElement("div");
        root.append(group);

        const label = document.createElement("label");
        label.innerHTML = id
        group.append(label)

        function addButton(name, event, getValue) {

            function getText() {
                return name + ' ' + getValue();
            }

            const newButton = document.createElement("button");
            newButton.innerHTML = getText()
            group.append(newButton)
            const eventWrapper = function () {
                event();
                newButton.innerHTML = getText();
            };
            newButton.addEventListener('click', eventWrapper);
        }

        addButton('toogle', function () { toogleValue(id); }, function () { return getValue(id); });

    }

    function getValue(id) {
        return map[id];
    }

    function toogleValue(id) {
        map[id] = !map[id];
        //map.showCollisionBoxes = value;
        //map['showOverdrawInspector'] = value;
    }

    const marker = new Marker()
        .setLngLat([7.134450017743774, 50.71797656847229])
        .addTo(map);



    const sourceId = 'collection-src'

    new OGCFeatureCollection(sourceId, map, {
        url: 'https://demo.pygeoapi.io/stable',
        collectionId: 'lakes',
        limit: 10000
    })

    map.addLayer({
        'id': 'lyr',
        'source': sourceId,
        'type': 'fill',
        'paint': {
            'fill-color': '#B42222',
            'fill-opacity': 0.7
        }
    })
}

export default doIt

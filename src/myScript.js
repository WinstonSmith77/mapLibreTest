import OGCFeatureCollection from 'mapbox-gl-ogc-feature-collection'
import { Map, TerrainControl, NavigationControl, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'

//import styleFile from './assets/test.json'
//import styleFile from './assets/grp_ags23.json'
//import styleFile from './assets/grp_ags23_neu.json'


import styleFile from './assets/bm_web_col.json'


function doIt() {
    //const styleFile = styleToUse

    //const styleFile = 'https://maps.infas-lt.de/maps/05ca1656-c77f-4f11-ad88-724aefbe79ed/prerelease/styles/grp_de_ags_demo?f=application%2Fvnd.mapbox.style%2Bjson'
    
    const map = new Map({
        container: 'map',
        style: styleFile, // stylesheet location
        center: [10, 53], // starting position [lng, lat]
        zoom: 6, // starting zoom
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
    ids.forEach(function (id) { setEvents('buttons', id, id === ids[0]) })

    function setEvents(rootName, id, isFirst) {
        const root = document.getElementById(rootName);
        const group = document.createElement("div");
        root.append(group);

        const label = document.createElement("label");
        label.innerHTML = id
        group.append(label)

        function addButton(name, eventOnClick, getValue) {

            function getText() {
                return name + ' ' + getValue();
            }

            const newButton = document.createElement("button");
            newButton.innerHTML = getText()
            group.append(newButton)
            const eventWrapper = function () {
                eventOnClick();
                newButton.innerHTML = getText();
            };
            newButton.addEventListener('click', eventWrapper);
        }

        addButton('toogle', function () { toogleValue(id); }, function () { return getValue(id); });
        if(isFirst){
            const zoomInfo = document.createElement("div");
            group.append(zoomInfo);
            updateZoom(zoomInfo)

            map.on('zoom', () => {
                // Your custom logic here
                updateZoom(zoomInfo)
                // You can perform any actions based on the new zoom level
            });
        }
    
    }

    function updateZoom(zoomInfo){
        const zoom =  map.getZoom()
        console.log('Zoom level changed:', zoom);
        zoomInfo.innerText = 'Zoom level =' + zoom;
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



   // const sourceId = 'collection-src'

    // new OGCFeatureCollection(sourceId, map, {
    //     url: 'https://demo.pygeoapi.io/stable',
    //     collectionId: 'lakes',
    //     limit: 10000
    // })

    // map.addLayer({
    //     'id': 'lyr',
    //     'source': sourceId,
    //     'type': 'fill',
    //     'paint': {
    //         'fill-color': '#B42222',
    //         'fill-opacity': 0.7
    //     }
    // })
}

export default doIt

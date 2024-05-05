import mapboxgl = require('mapbox-gl');
import { Point } from 'mapbox-gl';
import InspectControl from '@mapbox-controls/inspect';
import StylesControl from '@mapbox-controls/styles';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox-controls/styles/src/index.css';
import '@mapbox-controls/inspect/src/index.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { propsToTable } from './popup';
import { IDEditorLinkControl } from './controls';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map',
    style: process.env.TILESERVER_BASE_URL + '/styles/cycling-infra-new/style.json',
    center: [19.04571, 47.46287],
    zoom: 13,
    projection: { name: 'globe' },
    hash: true,
});

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

map.on('click', (event) => {
    const selectThreshold = 3;
    const queryBox: [Point, Point] = [
        new Point(event.point.x - selectThreshold, event.point.y + selectThreshold),
        new Point(event.point.x + selectThreshold, event.point.y - selectThreshold), // top right (NE)
    ];
    const cyclingFeatures = map.queryRenderedFeatures(queryBox)
        .filter(f => f.sourceLayer == 'cycling' || f.sourceLayer == 'cycling_poi');

    if (cyclingFeatures.length == 0) {
        return;
    }
    const props = cyclingFeatures[0].properties;
    new mapboxgl.Popup()
        .setLngLat(event.lngLat)
        .setHTML(propsToTable(props).outerHTML)
        .addTo(map);
});

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
}), 'top-left');

map.addControl(new StylesControl({
    styles: [
        {
            label: 'Cycling infra',
            styleName: 'Cycling infra',
            styleUrl: process.env.TILESERVER_BASE_URL + '/styles/cycling-infra-new/style.json',
        },
        {
            label: 'Streets',
            styleName: 'MapTiler Streets',
            styleUrl: process.env.TILESERVER_BASE_URL + '/styles/streets/style.json',
        },
        {
            label: 'OSM Carto',
            styleName: 'OpenStreetMap Carto',
            styleUrl: process.env.TILESERVER_BASE_URL + '/styles/openstreetmap/style.json',
        },
    ],
    onChange: (style) => console.log(style),
}), 'top-left');

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    })
);
map.addControl(
    new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: false,
        visualizePitch: true,
    })
)
map.addControl(new InspectControl({ console: true }), 'bottom-right');
map.addControl(new IDEditorLinkControl(), 'bottom-right');

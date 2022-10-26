import mapboxgl from 'mapbox-gl';
import { InspectControl } from 'mapbox-gl-controls';
import { StylesControl } from 'mapbox-gl-controls';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl-controls/lib/controls.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map',
    style: process.env.TILESERVER_BASE_URL + '/styles/cycling-infra/style.json',
    center: [19.04571, 47.46287],
    zoom: 13,
    projection: 'globe',
    hash: true,
});

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
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
            styleUrl: process.env.TILESERVER_BASE_URL + '/styles/cycling-infra/style.json',
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

map.addControl(new InspectControl(), 'bottom-right');

class IDEditorLinkControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._container.addEventListener('click', (e) => this.onClick(map));

        this._container.innerHTML =
            '<div class="tools-box">' +
            '<button>' +
            '<span class="mapboxgl-ctrl-icon id-editor-button" aria-hidden="true" title="Open iD editor here">iD</span>' +
            '</button>' +
            '</div>';

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    onClick(map) {
        const center = map.getCenter();
        const zoom = map.getZoom();
        const url = `https://www.openstreetmap.org/edit#map=${zoom}/${center.lat}/${center.lng}`;
        window.open(url, "_blank");
    }
}

map.addControl(new IDEditorLinkControl(), 'bottom-right');
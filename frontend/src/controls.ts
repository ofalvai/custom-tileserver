export class IDEditorLinkControl {
    private container = document.createElement('div')

    onAdd(map: mapboxgl.Map) {
        this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this.container.addEventListener('click', (e) => this.onClick(map));

        this.container.innerHTML =
            '<div class="tools-box">' +
            '<button>' +
            '<span class="mapboxgl-ctrl-icon id-editor-button" aria-hidden="true" title="Open iD editor here">iD</span>' +
            '</button>' +
            '</div>';

        return this.container;
    }

    onRemove() {
        this.container.parentNode?.removeChild(this.container);
    }

    onClick(map: mapboxgl.Map) {
        const center = map.getCenter();
        const zoom = map.getZoom();
        const url = `https://www.openstreetmap.org/edit#map=${zoom}/${center.lat}/${center.lng}`;
        window.open(url, "_blank");
    }
}
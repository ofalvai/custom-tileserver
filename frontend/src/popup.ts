import { GeoJsonProperties } from 'geojson'

export function propsToTable(props: GeoJsonProperties): HTMLTableElement {
    const table = document.createElement('table');

    if (props == null) {
        return table;
    }

    Object.entries(props).forEach(entry => {
        const row = document.createElement('tr');
        const keyCell = document.createElement('td');
        const valueCell = document.createElement('td');
        keyCell.textContent = entry[0] + ':';
        valueCell.textContent = entry[1];
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    });

    return table;
}
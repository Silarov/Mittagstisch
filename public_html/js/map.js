$(document).ready(function () {

    const map = L.map('map');
    // Initializes map

    const lat = 47.320360;
    const long = 8.053910;

    map.setView([lat, long], 17);
    // Sets initial coordinates and zoom level

    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    // Sets map data source and associates with map
    
    L.marker([lat, long]).addTo(map);
});
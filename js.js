//Localização em tempo real
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFicmljaW91ZnBpIiwiYSI6ImNsYjJodmQ1NTA0ajQ0MG9qaXMwZHp2bXAifQ.5knMPS6FF-K7P5Qhct2WiQ';
const coordinates = document.getElementById('coordinates');
navigator.geolocation.getCurrentPosition( function(position) {

    var lng = position.coords.longitude;
    var lat = position.coords.latitude;

mapboxgl.accessToken = mapboxgl.accessToken;

    sessionStorage.setItem("lng", lng);
    sessionStorage.setItem("lat", lat);

const map = new mapboxgl.Map({

    style:'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat], //longitude, latitude

    zoom: 15.5,
    container:'map',
    antialias:false,
    attributionControl:false,

});

var today = new Date();
var dy = today.getDate();
var mt = today.getMouth()+1;
var yr = today.getFullYear();
document.getElementById('id_01').value= dy+"/"+mt+"/"+yr;

const marker = new mapboxgl.Marker({
    draggable: true
})
    .setLngLat([lng, lat])
    .addTo(map);

function onDragEnd() {
const lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    info.innerHTML = `${lngLat.lng}`;
    info2.innerHTML = `${lngLat.lat}`;
}

marker.on('dragend', onDragEnd);


const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: {
    color: 'orange',
},
    language: 'pt-BR',
    mapboxgl: mapboxgl
});

map.addControl(geocoder);

map.addControl(new mapboxgl.NavigationControl(),'top-left'); // Ferramenta de zoom
map.addControl(new mapboxgl.FullscreenControl(), 'top-left'); // Ferramenta de expandir a tela
map.addControl( // Add geolocate control to the map.
new mapboxgl.GeolocateControl({
positionOptions: {
    enableHighAccuracy: true
},
trackUserLocation: true, // When active the map will receive updates to the device's location as it changes.
showUserHeading: true // Draw an arrow next to the location dot to indicate which direction the device is heading.
}), 'top-left'

    );
});

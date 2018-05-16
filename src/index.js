const destinations = require('./destinations');

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFucGF6IiwiYSI6ImNqMjVpYmk5czAwN2sycXBjYmd0eGNrdjkifQ.WLg6LD184VYKYQPbW7NY7w';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v10',
    center: [0, 0],
    zoom: 1
});

map.on('load', () => {
  destinations.init(map);

  // wait waht why not css?
  map.on('mouseenter', 'points', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'points', function () {
    map.getCanvas().style.cursor = '';
  });
});

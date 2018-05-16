const points = require('./geojson/destinations.json');
const Dialog = require('./dialog');

function init(map) {
  map.addLayer({
    id: 'points',
    type: 'circle',
    // hide when zoomed in
    maxzoom: 6,
    source: {
      type: 'geojson',
      data: points
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  });

  map.on('click', 'points', function (e) {
    const route = e.features[0].properties.route;
    const routeData = require(`./geojson/routes/${route}.json`);

    if (map.getSource('route')) {
      map.removeLayer('route');
      map.removeSource('route');
    }

    map.addLayer({
      id: 'route',
      type: 'circle',
      // hide when zoomed out
      minzoom: 6,
      source: {
        type: 'geojson',
        data: routeData
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#000'
      }
    });

    const dialog = new Dialog(map, routeData.features);
    // something something back button
    window.location = '#' + e.features[0].geometry.coordinates.join(',');
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 8
    });
    dialog.show();
  });
}

module.exports = {
  init,
};

/* global $ */
var vectorMap = {}
$(document).ready(() => {
  initLocation()
  setInterval(() => {
    refreshLocation()
  }, 20000)
})

function initLocation () {
  $.get('/nodeinfoapi', locations => {
    let markers = []
    locations.forEach(location => {
      markers.push({
        latLng: location.ll,
        name: location.city
      })
    })
    $('#world-map-markers').vectorMap({
      map: 'world_mill_en',
      normalizeFunction: 'polynomial',
      hoverOpacity: 0.7,
      hoverColor: false,
      regionStyle: {
        initial: {
          fill: '#3bafda'
        }
      },
      markerStyle: {
        initial: {
          r: 9,
          'fill': '#a288d5',
          'fill-opacity': 0.9,
          'stroke': '#fff',
          'stroke-width': 7,
          'stroke-opacity': 0.4
        },
        hover: {
          'stroke': '#fff',
          'fill-opacity': 1,
          'stroke-width': 1.5
        }
      },
      backgroundColor: 'transparent',
      markers: markers
    })
    vectorMap = $('#world-map-markers').vectorMap('get', 'mapObject')
  })
}

function refreshLocation () {
  vectorMap.removeAllMarkers()
  $.get('/nodeinfoapi', locations => {
    let markers = []
    locations.forEach(location => {
      markers.push({
        latLng: location.ll,
        name: location.city
      })
    })
    vectorMap.addMarkers(markers)
  })
}

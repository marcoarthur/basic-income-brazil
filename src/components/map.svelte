<script>
  import { onMount } from 'svelte';
  import OSM from '../js/OSM.js';
  export let city = "São Paulo"; // city to search
  export let user_location; // user location

  var options = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    user_location = [crd.latitude , crd.longitude];
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function initMap() { 
    let osm = new OSM();
    let markers;

    // query OSM
    osm.query(city).then( async (response) => {
      let data = await response.json();

      let map_center = user_location || [ -23, -44 ];
      console.log(user_location);

      // build map
      var mymap = L.map('mapid').setView(map_center, 13);
      let accessToken = 'pk.eyJ1IjoibWFyY29hcnRodXIiLCJhIjoiY2p5cTlwemZyMDA0ZzNtbXRveTQ1cWNoeCJ9.6mbwTrP-IMQxK5FSzfIgQQ';
      let mapbox_url = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;

      L.tileLayer( mapbox_url,
        {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: accessToken
      }).addTo(mymap);

      // set markers
      data.elements.map( (w) => {
        L.marker( [ w.center.lat, w.center.lon ] ).addTo(mymap);
      });
    }).catch( (error) => { console.log("Error occured: " + error); }); 
  }

  onMount( () => {
    // set current position.
    navigator.geolocation.getCurrentPosition(success, error, options);
    // initialize the map
    initMap();
  });

</script>

<style>
  #mapid {
    height: 380px;
  }
</style>

<div id="mapid"></div>

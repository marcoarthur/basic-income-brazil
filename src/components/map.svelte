<script>
  import { onMount } from 'svelte';
  import OSM from '../js/OSM.js';
  import * as Sentry from '@sentry/browser';
  export let city; // city name to search
  let user_location; // user location
  let mymap; // map instance

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
    if( ! user_location ) {
      Sentry.captureException( new Error("Cannot find User location") );
    }

    let map_center = user_location || [ -23, -44 ];

    // build map
    mymap = L.map('mapid').setView(map_center, 8);
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
  }

  async function findPlaces() {
    let osm = new OSM();
    const res = await fetch( osm.query(city) );

    if( res.ok ) {
      const data = await res.json();
      data.elements.map( (w) => {
        L.marker( [ w.center.lat, w.center.lon ] )
          .bindPopup(`<b>${w.tags.name}</b>`)
          .addTo(mymap);
      });

      // center map and zoom in at first result
      let el = data.elements[0];
      if( el ) {
        let center = [ el.center.lat, el.center.lon ];
        mymap.setView( center, 11, {animate:true});
      }
      return data;
    } else {
      throw new Error(res);
    }
  }

  onMount( () => {
    // set current position.
    navigator.geolocation.getCurrentPosition(success, error, options);
    // initialize the map
    initMap();
  });

  // start find places as soon as possible
  let p = findPlaces();
</script>

<style>
  #mapid {
    height: 380px;
  }
</style>

{#await p}
  <p> Procurando por pontos de entrega... aguarde </p>
{:then data}
  <div><p>Foram encontrados {data.elements.length} pontos de entrega</p></div>
{:catch error} 
  <p style="color:red">
    Ocorreu um erro na busca dos pontos de entrega {error.message}
  </p>
{/await}

<div id="mapid" class="container">
</div>

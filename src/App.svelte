<script>
  import QuestionList from './components/questionList.svelte';
  import QuestionTable from './components/questionTable.svelte';
  import Questions from './js/Questions.js';
  import Map from './components/map.svelte';
  import * as Sentry from '@sentry/browser';
  import {onMount} from 'svelte';

  let list = Questions.required.questions;
  let city = list.length - 1; // about city question

  let pointer = 0;
  list.map( (e,i) => { e.active = pointer == i })

  onMount( () => {
    Sentry.init({ dsn: 'https://b164952573bc4df0baa32c513ad00eb7@o330779.ingest.sentry.io/1851447' });
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      crossorigin=""/>

  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
    integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
    crossorigin="">
  </script>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">Basic Income Helper</h1>
    {#if pointer < list.length}
      <QuestionList {list} bind:pointer={pointer} />
    {:else}
      <div class="hero-body">
	<h1 class="title"> Completed !</h1>
	<QuestionTable questions={list} />
	<Map city={list[city].answer}/>
      </div>
    {/if}
  </section>

<script>
	import Question from './question.svelte';

  export let list = [];
</script>

<style>
  .qlist {
    list-style-type: none;
  }
</style>

<ul class="qlist">
  {#each list as q, i}
    <li class="item"> <Question {...q} /> </li>
  {/each}
</ul>

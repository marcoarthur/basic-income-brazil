<script>
  import Question from './question.svelte';

  export let list = [];
  export let pointer;

  function next() {
    // get question
    list[pointer].answered = true;

    // go next
    pointer = pointer < list.length ? pointer + 1 : pointer;
    list.map( (e,i) => { e.active = pointer == i })
    // console.log(list[pointer]);
  }
</script>

<style>
  .qlist {
    list-style-type: none;
  }
</style>

<ul class="qlist">
  {#each list as q, i}
    <li class="item">
      <Question {...q} hidden={!q.active} />
      <button on:click={next} hidden={!q.active}>Next</button>
   </li>
  {/each}
</ul>

<hr/>
<h3> Questions Answered </h3>
{#each list as q, i}
  <label>{q.question}</label>
  <input type="checkbox" bind:checked={q.answered}>
{/each }

<script>
  import Question from './question.svelte';

  export let list = [];
  export let pointer;
  let answer;
  let debug = true;

  function next() {
    // save answer
    list[pointer].answer = answer;
    list[pointer].answered = true;

    if ( debug ) {
      console.log(list[pointer]);
    }

    // go next
    pointer = pointer < list.length ? pointer + 1 : pointer;
    list.map( (e,i) => { e.active = pointer == i })

    if ( debug ) {
      console.log(list[pointer]);
    }
  }

  function previous() {
    console.log('previous');
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
      <Question {...q} hidden={!q.active} bind:input={answer}/>
      <button on:click={next} hidden={!q.active}>Next</button>
      <button on:click={previous} hidden={!q.active} disabled={true}>Previous</button>
   </li>
  {/each}
</ul>

<hr/>
<h3> Questions Answered </h3>
{#each list as q, i}
  <label>{q.question}</label>
  <input type="checkbox" bind:checked={q.answered}>
{/each }

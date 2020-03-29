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
    answer = "";

    // update pointer & list
    pointer = pointer < list.length ? pointer + 1 : pointer;
    list.map( (e,i) => { e.active = pointer == i })
  }

  function previous() {
    // set pointer
    pointer--;
    list[pointer].answer = undefined;
    list[pointer].answered = false;

    // update list
    list.map( (e,i) => { e.active = pointer == i })
  }
</script>

<style>
  .qlist {
    list-style-type: none;
  }
</style>

<div>
  <ul class="qlist">
    {#each list as q, i}
      <li class="item">
        <div>
          <Question {...q} hidden={!q.active} bind:input={answer}/>
        </div>
        <div>
          <button on:click={next} hidden={!q.active}>
            {pointer < (list.length - 1) ? 'Next' : 'Finish'}
          </button>
          <button on:click={previous} hidden={!q.active} disabled={pointer == 0}>
            Previous
          </button>
        </div>
     </li>
    {/each}
  </ul>
</div>

<hr/>

<h3> Questions Answered </h3>
<div>
  {#each list as q, i}
    <label>{q.question}</label>
    <input type="checkbox" bind:checked={q.answered} disabled={true}>
  {/each }
</div>

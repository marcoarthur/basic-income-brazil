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
    answer = list[pointer].answer;
    list[pointer].answered = false;

    // update list
    list.map( (e,i) => { e.active = pointer == i })
  }
</script>

<style>
  .question-list {
    list-style-type: none;
  }
</style>

<div class="question-list-panel">
  <ul class="question-list">
    {#each list as q, i}
      <li class="question-list-item">
        <div class="question-item">
          <Question {...q} hidden={!q.active} bind:input={answer}/>
        </div>

        <div class="question-list-controls">
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
<div class="question-flow-indicator">
  <h3> Questions Answered </h3>
  {#each list as q, i}
    <label>{q.question}</label>
    <input type="checkbox" bind:checked={q.answered} disabled={true}>
  {/each }
</div>

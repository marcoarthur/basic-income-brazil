<script>
  import Question from './question.svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut
  });

  export let list = [];
  export let pointer;
  let answer;

  function next() {
    // save answer
    if( answer ) {
      list[pointer].answer = answer;
      list[pointer].answered = true;

      // get the next answer if we have it
      let next_q = pointer + 1;
      if ( list[next_q] ) {
        answer = list[next_q].answer;
      }
    }

    // update pointer & list
    pointer = pointer < list.length ? pointer + 1 : pointer;
    list.map( (e,i) => { e.active = pointer == i })
    progress.set(pointer/list.length);
  }

  function previous() {
    // set pointer
    pointer--;
    answer = list[pointer].answer;
    list[pointer].answered = false;

    // update list
    list.map( (e,i) => { e.active = pointer == i })
    progress.set(pointer/list.length);
  }
</script>

<style>
  .question-list {
    list-style-type: none;
  }
  .inline {
    display: flex;
    align-items: center;
  }
  progress {
    display: block;
    width: 100%;
  }
</style>

<section class="hero">
  <div class="hero-body">
    <h2 class="subtitle"> Questions Map </h2>
    <div class="inline">
      {#each list as q, i}
        <div class:has-text-success={q.answered} class="inline">
          <label>{q.question}</label>
          <input type="checkbox" class="checkbox" bind:checked={q.answered} disabled={true}>
        </div>
      {/each }
    </div>
    <div class="container">
      <progress value={$progress}></progress>
    </div>
  </div>
</section>

<hr/>

<section class="section">
  <div class="container">
    <h2 class="subtitle">Questions</h2>
    <ul class="question-list">
      {#each list as q, i}
        <li class="question-list-item">
          <div class="question-item">
            <Question {...q} hidden={!q.active} bind:input={answer}/>
          </div>

          <div class="question-list-controls">
            <button on:click={next} hidden={!q.active} disabled={!answer}>
              {pointer < (list.length - 1) ? 'Próxima' : 'Finalizar'}
            </button>

            <button on:click={previous} hidden={!q.active} disabled={pointer == 0}>
              Anterior
            </button>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>

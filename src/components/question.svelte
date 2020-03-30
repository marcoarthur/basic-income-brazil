<script>
  import QForm from './forms/input.svelte';
  import { fly } from 'svelte/transition';

  export let question;
  export let text = "default question text";
  export let type = "text";
  export let properties;
  export let active = false;
  export let input;

</script>

{#if active }
  <div class="container" transition:fly={{y:200, duration:1500}}>
    <label class="label" for="{question}">{text}</label>
    <QForm {type} {properties} bind:input={input} />
  </div>
{/if}

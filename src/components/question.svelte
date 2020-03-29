<script>
  import QForm from './forms/input.svelte';

  export let question;
  export let text = "default question text";
  export let type = "text";
  export let properties;
  export let active = false;
  export let input;

</script>

{#if active }
  <h2><label for="{question}">{text}</label></h2>
  <QForm {type} {properties} bind:input={input} />
{/if}

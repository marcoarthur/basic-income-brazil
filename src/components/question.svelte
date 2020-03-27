<script>
  import QForm from './forms/input.svelte';

  export let question;
  export let text = "default question text";
  export let type = "text";
  export let properties;
</script>

<label for="{question}">{text}</label>
<QForm {type} {properties} />

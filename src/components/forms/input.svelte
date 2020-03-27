<script>
  export let type;
  export let properties;
</script>

{#if type == 'text' }
  <input {type} {...properties} />
{:else if type == 'radio' }
  {#each properties.choices() as c } 
    <input {type} name="group" value="{c[0]}" />
    <label>{c[1]}</label>
  {/each}
{:else}
  <span> Should not be here </span>
{/if}

<script>
  export let type;
  export let properties;
</script>

{#if type == 'text' }
  <input {type} {...properties} />
{:else if type == 'radio' }
  {#each properties.choices() as c } 
    <input type="radio" bind:group={properties.group} value="{c[0]}" />
    <label>{c[1]}</label>
  {/each}
{:else}
  <span> So bad! Should not be here </span>
{/if}

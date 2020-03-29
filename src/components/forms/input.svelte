<script>
  export let type;
  export let properties;
  export let input;
</script>

{#if type == 'text' }
  <input type="text" {...properties} bind:value={input}/>
{:else if type == 'radio' }
  {#each properties.choices() as c } 
    <label>{c.label}</label>
    <input type="radio" bind:group={properties.group} value={c.value} on:change={() => input = c.value}/>
  {/each}
{:else}
  <span> So bad! Should not be here </span>
{/if}

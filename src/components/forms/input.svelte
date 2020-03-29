<script>
  export let type;
  export let properties;
  export let input;
</script>

{#if type == 'text' }
  <input type="text" {...properties} bind:value={input}/>
{:else if type == 'radio' }
  {#each properties.choices() as c } 
    <label>{c[1]}</label>
    <input type="radio" bind:group={properties.group} value="{c[0]}" />
  {/each}
{:else}
  <span> So bad! Should not be here </span>
{/if}

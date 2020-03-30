<script>
  export let type;
  export let properties;
  export let input;
</script>

{#if type == 'text' }
  <input type="text" {...properties} bind:value={input}/>
{:else if type == 'radio' }
  <div class="control">
    {#each properties.choices() as c } 
      <input type="radio" 
        bind:group={properties.group}
        value={c.value}
        on:change={() => input = c.value}
      />
      <label class="radio">{c.label}</label>
    {/each}
  </div>
{:else}
  <span> So bad! Should not be here </span>
{/if}

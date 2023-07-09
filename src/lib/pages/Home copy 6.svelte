<script>
  import Button, { getTotalButtons } from "../Button.svelte";
  let showButton = false;
  let total;
</script>

<input type="checkbox" bind:checked={showButton} />

<Button>button</Button>
<Button>button</Button>
{#if showButton}
  <Button>button</Button>
{/if}
{total}
<button on:click={()=>{
  total = getTotalButtons();
}}> Update button count</button>
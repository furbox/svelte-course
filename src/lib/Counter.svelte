<script>
  export let initialCount;
  export let maxCount;

  console.log($$props, $$restProps)

  let count = initialCount;

  function handleClick() {
    if (count == maxCount) return;
    count += 1;
  }
</script>

<button on:click={handleClick}>Clicks {count}</button>

<style>
  button {
    padding: 15px 20px;
  }
</style>

<script>
  import settings from "./stores/settings";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
  />
  {#if $settings.colorScheme === "dark"}
    <style>
      :root {
        --backgroundColor: #1d1d1d;
        --textColor: #fff;
      }
    </style>
  {:else}
    <style>
      :root {
        --backgroundColor: #fff;
        --textColor: #1d1d1d;
      }
    </style>
  {/if}
</svelte:head>

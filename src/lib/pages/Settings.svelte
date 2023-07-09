<script>
  import settings from "../stores/settings";
  import direction from "../stores/direction";
</script>

<h2>Settings</h2>

<button
  on:click={() => {
    settings.toggleColorScheme();
  }}>Toggle Color colorScheme</button
>

<button on:click={() => {
    settings.updateSettings('language', Math.random());
}}>Update Language</button>

<button on:click={()=>{
    settings.reset();
}}>Reset Settings</button>
<br/>
{$direction}
<br/>
{$settings.colorScheme}
<br/>
{$settings.language}

<br/>
<label>
  <input
    type="radio"
    bind:group={$settings.colorScheme}
    name="colorScheme"
    value="dark"
  /> Dark
</label>

<label>
  <input
    type="radio"
    bind:group={$settings.colorScheme}
    name="colorScheme"
    value="light"
  /> light
</label>

<select bind:value={$settings.language}>
  <option value="en">English</option>
  <option value="ar">Arabic</option>
</select>
<script>
  import Button from "../Button.svelte";

  let values = { username: "", password: "", email: "" };
  let errors = {};
  let isSubmitted = false;

  function validate() {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }

    if (values.username && values.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }
    if (values.password && values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    //validate email regex name@domain.com and es
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  }
</script>

<form
  on:submit|preventDefault={() => {
    errors = validate();
    if (Object.keys(errors).length) {
      isSubmitted = true;

      setTimeout(() => {
        isSubmitted = false;
      }, 2000);
    }
  }}
>
  <label for="username">Username:</label><br />
  <input
    id="username"
    name="username"
    type="text"
    bind:value={values.username}
  />
  {#if errors.username}
    <p style="color: red">{errors.username}</p>
  {/if}

  <label for="email">Email:</label><br />
  <input id="email" name="email" type="email" bind:value={values.email} />
  {#if errors.email}
    <p style="color: red">{errors.email}</p>
  {/if}

  <label for="password">Password:</label><br />
  <input
    id="password"
    name="password"
    type="password"
    bind:value={values.password}
  />
  {#if errors.password}
    <p style="color: red">{errors.password}</p>
  {/if}

  <Button type="submit" disabled={isSubmitted}>Submit</Button>
</form>

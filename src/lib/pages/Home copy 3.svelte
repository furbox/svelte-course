<script>
  import Button from "../Button.svelte";
  import { Form, Field } from "../Form";
  import { validateRequiredField, validatedEmail } from "../utils/validation";
</script>

<Form
  on:submit={(e) => {
    console.log(e.detail);
  }}
  initialValues={{ username: "", email: "" }}
  let:hasErrors
  let:values
  let:errors
>

{JSON.stringify(values, null, 2)}
{JSON.stringify(errors, null, 2)}
  <Field
    label="username"
    name="username"
    type="text"
    validate={validateRequiredField}
  >
  <p style:color="green" slot="error" let:error>{error}</p>
</Field>
  <Field
    label="email"
    name="email"
    type="email"
    validate={(value, label) => {
      return (
        validateRequiredField(value, label) || validatedEmail(value, label)
      );
    }}
  />
  <Field
    label="password"
    name="password"
    type="password"
    validate={validateRequiredField}
  />
  <Button type="submit" disabled={hasErrors}>Submit</Button>
</Form>

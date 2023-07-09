<script>
  import { createEventDispatcher, setContext } from "svelte";
  import { writable } from "svelte/store";
  import formkey from "./form-key";

  const dispath = createEventDispatcher();

  export let initialValues = {};
  const formStore = writable({ values: initialValues, errors: {}, showErrors: false });
  setContext(formkey, formStore);
</script>

{JSON.stringify($formStore, null, 2)}
<form on:submit|preventDefault={() => {
    if(Object.keys($formStore.errors).length === 0){
        dispath("submit", $formStore.values);
    }else{
        $formStore.showErrors = true;
    }
}}>
  <slot hasErrors={Object.keys($formStore.errors).length > 0} values={$formStore.values} errors={$formStore.errors} />
</form>

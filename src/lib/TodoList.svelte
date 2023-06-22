<svelte:options immutable={true} />

<script>
  import Button from "./Button.svelte";
  import {
    createEventDispatcher,
    onDestroy,
    onMount,
    beforeUpdate,
    afterUpdate,
  } from "svelte";

  onMount(() => {
    console.log("Mounted");
    return () => {
      console.log("Destroyed 2");
    };
  });

  onDestroy(() => {
    console.log("Destroyed");
  });

  beforeUpdate(() => {
    if (listDiv) {
      console.log(listDiv.offsetHeight);
    }
  });

  afterUpdate(() => {
    if (autoScroll) listDiv.scrollTo(0, listDiv.scrollHeight)
    autoScroll = false;
  });

  export let todos = [];
  let prevTodos = todos;
  $:{
    autoScroll = todos.length > prevTodos.length;
    console.log(prevTodos, todos) 
    prevTodos = todos;
  }
  export function clearInput() {
    inputText = "";
  }
  export function focusInput() {
    input.focus();
  }
  let inputText = "";
  let input, listDiv, autoScroll;

  const dispatch = createEventDispatcher();

  function handleAddTodo() {
    const isNotCancelled = dispatch(
      "addtodo",
      {
        text: inputText,
      },
      { cancelable: true }
    );
    if (isNotCancelled) {
      inputText = "";
    }
  }

  function handleDeleteTodo(id) {
    dispatch("removetodo", {
      id,
    });
  }

  function handleToggleComplete(id, value) {
    dispatch("toggletodo", {
      id,
      value,
    });
  }
</script>

<div class="todo-list-wrapper">
  <div class="todo-list" bind:this={listDiv}>
    <ul>
      {#each todos as { id, text, completed } (id)}
        <li>
          <label>
            <input
              on:input={(event) => {
                event.currentTarget.checked = completed;
                handleToggleComplete(id, !completed);
              }}
              type="checkbox"
              checked={completed}
            />
            {text}
          </label>
          <button on:click={() => handleDeleteTodo(id)}>Delete</button>
        </li>
      {/each}
    </ul>
  </div>
  {inputText}
  <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
    <input bind:this={input} bind:value={inputText} />
    <Button type="submit" disabled={!inputText}>Add</Button>
  </form>
</div>

<style>
  .todo-list{
    max-height: 150px;
    overflow: auto;
  }
</style>
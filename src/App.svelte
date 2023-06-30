<script>
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";
  import { onMount, tick } from "svelte";
  import { fly } from "svelte/transition";
  import fade from "./lib/transitions/fade";

  let todoList;
  let showList = true;

  let todos = null;
  let error = null;
  let isLoading = false;
  let isAdding = false;
  let disabledItems = [];

  onMount(() => {
    loadTodos();
  });

  async function loadTodos() {
    isLoading = true;
    await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10").then(
      async (response) => {
        if (response.ok) {
          todos = await response.json();
        } else {
          error = "An error has occurred";
        }
      }
    );
    isLoading = false;
  }

  async function handleAddTodo(event) {
    event.preventDefault();
    isAdding = true;
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: event.detail.title,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      if (response.ok) {
        const todo = await response.json();
        todos = [{ ...todo, id: uuid() }, ...todos];
        todoList.clearInput();
      } else {
        error = "An error has occurred";
      }
    });
    isAdding = false;
    await tick();
    todoList.focusInput();
  }

  async function handleRemoveTodo(event) {
    const id = event.detail.id;
    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        todos = todos.filter((t) => t.id !== id);
      } else {
        error = "An error has occurred";
      }
    });
    disabledItems = disabledItems.filter((i) => i !== id);
    //todos = todos.filter((t) => t.id !== event.detail.id);
  }

  async function handleToggleTodo(event) {
    const id = event.detail.id;
    const value = event.detail.value;
    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      if (response.ok) {
        const updateTodo = await response.json();
        todos = todos.map((t) => {
          if (t.id === id) {
            return updateTodo;
          }
          return { ...t };
        });
      } else {
        error = "An error has occurred";
      }
    });
    disabledItems = disabledItems.filter((i) => i !== id);
  }
</script>

<label>
  <input type="checkbox" bind:checked={showList} />
  Show/Hide List
</label>
{#if showList}
  <div  style:max-width="800px">
    <TodoList
      {todos}
      {error}
      {isLoading}
      {disabledItems}
      disableAdding={isAdding}
      scrollOnAdd="top"
      bind:this={todoList}
      on:addtodo={handleAddTodo}
      on:removetodo={handleRemoveTodo}
      on:toggletodo={handleToggleTodo}
    />
  </div>
  {#if todos}
    <p>
      Number if todos: {#key todos.length}<span
          style:display="inline-block"
          in:fly|local={{ y: -10 }}>{todos.length}</span
        >{/key}
    </p>
  {/if}
{/if}

<style>
</style>

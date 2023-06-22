<script>
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";
  let todoList;
  let showList = true;
  let todos = [
    { id: uuid(), text: "Learn Svelte", completed: true },
    { id: uuid(), text: "Learn React", completed: false },
    { id: uuid(), text: "Learn Vue", completed: false },
  ];

  function handleAddTodo(event) {
    event.preventDefault();
    todos = [
      ...todos,
      {
        id: uuid(),
        text: event.detail.text,
        completed: false,
      },
    ];
    todoList.clearInput();
  }

  function handleRemoveTodo(event) {
    todos = todos.filter((t) => t.id !== event.detail.id);
  }

  function handleToggleTodo(event) {
    todos = todos.map((t) => {
      if (t.id === event.detail.id) {
        return {
          ...t,
          completed: event.detail.value,
        };
      }
      return t;
    });
  }
</script>

<h3>{todos.length} Todos</h3>
{todoList && todoList.readonly}
<br />
<label>
  <input type="checkbox" bind:checked={showList} />
  Show/Hide List
</label>
{#if showList}
  <div style:max-width="300px">
    <TodoList
      bind:this={todoList}
      {todos}
      on:addtodo={handleAddTodo}
      on:removetodo={handleRemoveTodo}
      on:toggletodo={handleToggleTodo}
    />
  </div>
{/if}

<style>
</style>

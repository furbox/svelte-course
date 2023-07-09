<script>
  import Konva from "konva";
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { layerKey } from "./context-keys";

  const dispatch = createEventDispatcher();

  /*
  export let x = undefined;
  export let y = undefined;
  export let fill = undefined;
  export let width = undefined;
  export let height = undefined;
  export let stroke = undefined;
  export let strokeWidth = undefined;
  */

  const layer = getContext(layerKey);

  const rect = new Konva.Rect($$props);

  layer.add(rect);

  rect.on("click mousedown", (event) => {
    dispatch(event.type, event);
  });

  $: rect.setAttrs($$props);

  onDestroy(() => {
    rect.destroy();
  });
</script>

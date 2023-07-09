<script>
  import Konva from "konva";
  import { createEventDispatcher, getContext, onDestroy, setContext } from "svelte";
  import { stageKey, layerKey } from "./context-keys";

  // export let draggable = undefined;

  const dispatch = createEventDispatcher();

  const { getStage } = getContext(stageKey);
  const stage = getStage();
  const layer = new Konva.Layer($$props);

  layer.on("dragmove click", (event) => {
    dispatch(event.type, event);
  });

  $: layer.setAttrs($$props);

  onDestroy(() => {
    layer.destroy();
  });

  setContext(layerKey, layer);

  stage.add(layer);
</script>

<slot />

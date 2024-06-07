<template>
  <div>
    <div class="btn-container">
      <div class="btn" @click="downloadCanvas">Download</div>
    </div>
    <CanvasCom ref="canvasCom" />
  </div>
</template>

<script>
import { ref } from "vue";
import CanvasCom from "@/components/CanvasCom.vue";

export default {
  name: "CanvasView",
  components: {
    CanvasCom,
  },
  setup() {
    const canvasCom = ref(null);

    const downloadCanvas = () => {
      canvasCom.value.downloadCanvas();
    };

    return {
      canvasCom,
      downloadCanvas,
    };
  },
};
</script>

<style scoped>
.btn-container {
  display: flex;
}

.btn {
  border-radius: 1rem;
  background-color: burlywood;
  padding: 0.25rem;
  cursor: pointer;
}
</style>

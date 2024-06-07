<template>
  <div>
    <div class="btn-container">
      <div class="btn" @click="downloadCanvas">Download</div>
      <div class="btn" @click="clearCanvas">Clear</div>
    </div>
    <div class="crayon-container">
      <div
        v-for="color in colors"
        :key="color"
        class="crayon"
        :style="{ backgroundColor: color }"
        @click="selectColor(color)"
      ></div>
    </div>
    <CanvasCom ref="canvasCom" :selectedColor="selectedColor" />
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
    const selectedColor = ref("rgba(255, 0, 0)");

    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
    ];

    const selectColor = (color) => {
      selectedColor.value = color;
    };

    const downloadCanvas = () => {
      canvasCom.value.downloadCanvas();
    };

    const clearCanvas = () => {
      canvasCom.value.clearCanvas();
    };

    return {
      canvasCom,
      downloadCanvas,
      clearCanvas,
      colors,
      selectColor,
      selectedColor,
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
  margin-right: 1rem;
}

.crayon-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.crayon {
  width: 30px;
  height: 100px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<template>
  <div>
    <div class="btn-container">
      <div class="btn" @click="downloadCanvas">Download</div>
      <div class="btn" @click="clearCanvas">Clear</div>
      <div class="btn" @click="toggleEraser">Toggle Eraser</div>
    </div>
    <div class="crayon-container">
      <div
        v-for="color in colors"
        :key="color"
        class="crayon"
        :style="{
          backgroundColor: color,
          boxShadow:
            selectedColor === color
              ? '0 0 10px 2px rgba(0, 0, 0, 0.5)'
              : 'none',
        }"
        @click="selectColor(color)"
      />
    </div>
    <CanvasCom
      ref="canvasCom"
      :selectedColor="selectedColor"
      :isEraser="isEraser"
    />
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
    const selectedColor = ref("red");
    const isEraser = ref(false);

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

    const toggleEraser = () => {
      isEraser.value = !isEraser.value;
    };

    return {
      canvasCom,
      downloadCanvas,
      clearCanvas,
      toggleEraser,
      colors,
      selectColor,
      selectedColor,
      isEraser,
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
  border: 2px solid transparent;
  transition: box-shadow 0.3s ease;
}
</style>

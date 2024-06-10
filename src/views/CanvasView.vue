<template>
  <div>
    <div class="btn-container">
      <div class="btn-section">
        <div class="btn" @click="clearCanvas">Clear</div>
        <div class="btn" @click="toggleEraser">Eraser</div>
      </div>
      <div>
        <div class="btn" @click="downloadCanvas">Download</div>
      </div>
    </div>
    <div class="crayon-container">
      <div
        v-for="color in COLOR_PALETTE"
        :key="color"
        class="crayon"
        :style="{
          backgroundColor: color,
          boxShadow:
            selectedColor === color
              ? '0 0 10px 2px rgba(0, 0, 0, 0.3)'
              : 'none',
        }"
        @click="selectColor(color)"
      />
    </div>
    <div class="size-container">
      <div
        v-for="size in sizes"
        :key="size"
        class="size"
        :style="{
          width: size + 'px',
          height: size + 'px',
        }"
        :class="{ selected: toolSize === size }"
        @click="selectToolSize(size)"
      >
        <!-- {{ size }} -->
      </div>
    </div>
    <CanvasCom
      ref="canvasCom"
      :selectedColor="selectedColor"
      :isEraser="isEraser"
      :toolSize="toolSize"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import CanvasCom from "@/components/CanvasCom.vue";
import { COLOR_PALETTE } from "@/utils/colorPalette";

export default {
  name: "CanvasView",
  components: {
    CanvasCom,
  },
  setup() {
    const canvasCom = ref(null);
    const selectedColor = ref("red");
    const isEraser = ref(false);
    const toolSize = ref(5);
    const sizes = ref([5, 10, 15, 20]);

    const selectColor = (color) => {
      selectedColor.value = color;
      isEraser.value = false;
    };

    const downloadCanvas = () => {
      canvasCom.value.downloadCanvas();
    };

    const clearCanvas = () => {
      canvasCom.value.clearCanvas();
    };

    const selectToolSize = (size) => {
      toolSize.value = size;
    };

    const toggleEraser = () => {
      isEraser.value = !isEraser.value;
    };

    return {
      canvasCom,
      downloadCanvas,
      clearCanvas,
      selectToolSize,
      selectColor,
      toggleEraser,
      selectedColor,
      isEraser,
      toolSize,
      sizes,
      COLOR_PALETTE,
    };
  },
};
</script>

<style scoped>
.btn-container {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.btn-section {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.btn {
  border-radius: 0.25rem;
  background-color: rgb(195, 195, 195);
  padding: 0.25rem 0.75rem;
  cursor: pointer;
}

.crayon-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 1rem 0;
}

.crayon {
  width: 30px;
  height: 60px;
  margin: 0;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: box-shadow 0.3s ease;
}

.size-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
  align-items: center;
}

.size {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.size.selected {
  background: #eee;
  border-color: #333;
}
</style>

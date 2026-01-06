<template>
  <div class="wrapper">
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="tbtn" @click="clearCanvas">Clear</button>

        <button
          class="tbtn"
          :class="{ active: isEraser }"
          @click="toggleEraser"
        >
          Eraser
        </button>
      </div>

      <button class="tbtn primary" @click="downloadCanvas">Download</button>
    </div>

    <div class="panel">
      <div class="panel-row">
        <div class="panel-title">Colors</div>
        <div class="crayon-container">
          <button
            v-for="color in COLOR_PALETTE"
            :key="color"
            type="button"
            class="crayon"
            :class="{ selected: selectedColor === color && !isEraser }"
            :style="{ backgroundColor: color }"
            @click="selectColor(color)"
            :aria-label="`Select color ${color}`"
          />
        </div>
      </div>

      <div class="panel-row">
        <div class="panel-title">Size</div>
        <div class="size-container">
          <button
            v-for="size in sizes"
            :key="size"
            type="button"
            class="size"
            :class="{ selected: toolSize === size }"
            @click="selectToolSize(size)"
            :aria-label="`Select brush size ${size}`"
          >
            <span
              class="dot"
              :style="{ width: size + 'px', height: size + 'px' }"
            />
          </button>
        </div>
      </div>
    </div>

    <div class="canvas-surface">
      <CanvasCom
        ref="canvasCom"
        :selectedColor="selectedColor"
        :isEraser="isEraser"
        :toolSize="toolSize"
      />
    </div>
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
.wrapper {
  min-height: 100vh;
  padding-top: 40px; /* fixed header 고려 */
  padding-bottom: 60px;
}

/* ===== Toolbar ===== */
.toolbar {
  width: min(1100px, 92%);
  margin: 0 auto 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 12px 12px;
  border-radius: 16px;

  background: rgba(18, 18, 18, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 14px 45px rgba(0, 0, 0, 0.45);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tbtn {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.9);

  padding: 10px 14px;
  border-radius: 999px;

  font-family: "SUITE";
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.2px;

  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease,
    border-color 160ms ease, opacity 160ms ease;
}

.tbtn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.09);
}

.tbtn:active {
  transform: translateY(0px);
}

.tbtn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.3);
  outline-offset: 2px;
}

.tbtn.active {
  border-color: rgba(248, 40, 254, 0.5);
  background: rgba(248, 40, 254, 0.18);
  box-shadow: 0 0 0 3px rgba(248, 40, 254, 0.12);
}

.tbtn.primary {
  border-color: rgba(248, 40, 254, 0.5);
  background: rgba(248, 40, 254, 0.18);
  box-shadow: 0 14px 40px rgba(248, 40, 254, 0.1);
}

.tbtn.primary:hover {
  background: rgba(248, 40, 254, 0.22);
  border-color: rgba(248, 40, 254, 0.65);
}

/* ===== Controls Panel ===== */
.panel {
  width: min(1100px, 92%);
  margin: 0 auto 14px;

  padding: 14px 14px;
  border-radius: 16px;

  background: rgba(18, 18, 18, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.35);
}

.panel-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 6px;
}

.panel-row + .panel-row {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.panel-title {
  width: 64px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

/* ===== Color palette ===== */
.crayon-container {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.crayon {
  width: 28px;
  height: 52px;
  border-radius: 10px;

  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;

  transition: transform 160ms ease, box-shadow 160ms ease,
    border-color 160ms ease, filter 160ms ease;
}

.crayon:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}

.crayon.selected {
  border-color: white;
  box-shadow: 0 0 0 3px rgba(245, 240, 240, 0.14),
    0 12px 26px rgba(248, 247, 247, 0.4);
}

/* ===== Size ===== */
.size-container {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.size {
  width: 38px;
  height: 38px;
  border-radius: 999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;

  transition: transform 160ms ease, background 160ms ease,
    border-color 160ms ease, box-shadow 160ms ease;
}

.size:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.08);
}

.size.selected {
  border-color: rgba(64, 160, 255, 0.55);
  box-shadow: 0 0 0 3px rgba(64, 160, 255, 0.12);
}

.dot {
  display: block;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
}

/* ===== Canvas surface ===== */
.canvas-surface {
  width: min(1200px, 92%);
  margin: 0 auto;

  border-radius: 18px;
  overflow: hidden;

  background: rgba(18, 18, 18, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Mobile */
@media (max-width: 640px) {
  .wrapper {
    padding-top: 72px;
  }
  .panel-title {
    width: 54px;
  }
  .tbtn {
    padding: 9px 12px;
    font-size: 13px;
  }
}
</style>

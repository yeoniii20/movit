<template>
  <div
    class="canvas-container"
    @mousemove="draw"
    @mousedown="startDrawing"
    @mouseup="stopDrawing"
    @mouseleave="stopDrawing"
  >
    <canvas ref="canvas"></canvas>
    <div
      class="cursor"
      :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "CanvasCom",
  setup() {
    const canvas = ref(null);
    const ctx = ref(null);
    const cursorX = ref(0);
    const cursorY = ref(0);
    let drawing = false;

    const startDrawing = (event) => {
      if (event.target.tagName === "CANVAS") {
        drawing = true;
        draw(event);
      }
    };

    const stopDrawing = () => {
      drawing = false;
      ctx.value.beginPath();
    };

    const draw = (event) => {
      if (!canvas.value.contains(event.target)) {
        stopDrawing();
        return;
      }

      cursorX.value = event.clientX - canvas.value.getBoundingClientRect().left;
      cursorY.value = event.clientY - canvas.value.getBoundingClientRect().top;

      if (!drawing) return;

      ctx.value.lineWidth = 5;
      ctx.value.lineCap = "round";
      ctx.value.strokeStyle = "rgba(255, 0, 0, 0.5)";

      ctx.value.lineTo(cursorX.value, cursorY.value);
      ctx.value.stroke();
      ctx.value.beginPath();
      ctx.value.moveTo(cursorX.value, cursorY.value);
    };

    const resizeCanvas = () => {
      const canvasElement = canvas.value;
      canvasElement.width = canvasElement.clientWidth;
      canvasElement.height = canvasElement.clientHeight;
      ctx.value = canvasElement.getContext("2d");
    };

    const downloadCanvas = () => {
      const link = document.createElement("a");
      link.download = "canvas-drawing.png";
      link.href = canvas.value.toDataURL("image/png");
      link.click();
    };

    onMounted(() => {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeCanvas);
    });

    return {
      canvas,
      cursorX,
      cursorY,
      startDrawing,
      stopDrawing,
      draw,
      downloadCanvas,
    };
  },
};
</script>

<style scoped>
.canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  cursor: none;
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.cursor {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 0, 0, 0.5); /* 크레파스 색상 */
  border-radius: 50%;
  pointer-events: none;
}
</style>

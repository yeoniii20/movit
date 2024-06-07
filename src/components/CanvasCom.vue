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
      :style="{
        left: cursorX + 'px',
        top: cursorY + 'px',
        backgroundColor: isEraser ? 'white' : selectedColor,
        width: toolSize + 'px',
        height: toolSize + 'px',
      }"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

export default {
  name: "CanvasCom",
  props: {
    selectedColor: {
      type: String,
      required: true,
    },
    isEraser: {
      type: Boolean,
      required: true,
    },
    toolSize: {
      type: Number,
      required: true,
    },
    isEraser: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const canvas = ref(null);
    const ctx = ref(null);
    const cursorX = ref(0);
    const cursorY = ref(0);
    let drawing = false;

    watch(
      () => props.selectedColor,
      (newColor) => {
        if (!props.isEraser) {
          ctx.value.strokeStyle = newColor;
        }
      }
    );

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

      ctx.value.lineWidth = props.toolSize;
      ctx.value.lineCap = "round";

      if (props.isEraser) {
        ctx.value.globalCompositeOperation = "destination-out";
        ctx.value.strokeStyle = "rgba(0,0,0,1)";
      } else {
        ctx.value.globalCompositeOperation = "source-over";
        ctx.value.strokeStyle = props.selectedColor;
      }

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
      ctx.value.strokeStyle = props.selectedColor;
    };

    const clearCanvas = () => {
      ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
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
      clearCanvas,
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
  border-radius: 50%;
  pointer-events: none;
}
</style>

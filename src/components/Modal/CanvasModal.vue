<template>
  <div class="modal-container">
    <div class="modal-content">
      <h3>Select Tool Size</h3>
      <div class="sizes">
        <div
          v-for="size in sizes"
          :key="size"
          class="size"
          :class="{ selected: selectedSize === size }"
          @click="$emit('select-size', size)"
        >
          {{ size }}
        </div>
      </div>
      <button class="close-btn" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CanvasModal",
  props: {
    sizes: {
      type: Array,
      default: () => [5, 10, 15, 20],
    },
    selectedSize: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #ccc;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sizes {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.size {
  width: 2rem;
  height: 2rem;
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

.close-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>

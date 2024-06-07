<template>
  <div class="scroll-container" @scroll="handleScroll">
    <div class="circle-container" ref="circleContainer">
      <div class="circle" ref="circle"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MainPage",
  setup() {
    const circleContainer = ref(null);
    const circle = ref(null);

    return {
      circleContainer,
      circle,
    };
  },
};
</script>

<style scoped>
.scroll-container {
  /*  height: 100vh; 
  overflow-y: scroll; */
  background-color: black;
}
.circle-container {
  height: 200vh; /* Ensure there's enough scroll space */
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle {
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.5s ease-out;
}
</style>

<template>
  <div class="scroll-container" @scroll="handleScroll">
    <div class="circle-container" ref="circleContainer">
      <div
        v-for="(popcorn, index) in popcorns"
        :key="index"
        class="popcorn"
        :style="popcornStyle(popcorn)"
      >
        🍿
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "MainPage",
  setup() {
    const circleContainer = ref(null);
    const popcorns = ref([]);
    const popcornCount = 30; // 팝콘의 개수

    const createPopcorn = () => {
      return {
        left: Math.random() * window.innerWidth + "px",
        animationDuration: Math.random() * 2 + 3 + "s", // 애니메이션 속도 랜덤 (3초에서 5초 사이)
        animationDelay: Math.random() * 1 + "s", // 애니메이션 딜레이 랜덤 (0초에서 1초 사이)
      };
    };

    const popcornStyle = (popcorn) => {
      return {
        left: popcorn.left,
        animationDuration: popcorn.animationDuration,
        animationDelay: popcorn.animationDelay,
      };
    };

    onMounted(() => {
      for (let i = 0; i < popcornCount; i++) {
        popcorns.value.push(createPopcorn());
      }
    });

    return {
      circleContainer,
      popcorns,
      popcornCount,
      popcornStyle,
    };
  },
};
</script>

<style scoped>
.scroll-container {
  background-color: black;
  overflow: hidden;
  position: relative;
  height: 100vh;
}

.circle-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popcorn {
  font-size: 24px;
  position: absolute;
  top: 0;
  animation-name: fall;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
}

@keyframes fall {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(100vh);
  }
}
</style>

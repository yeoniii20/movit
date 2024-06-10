<template>
  <div class="scroll-container" @scroll="handleScroll">
    <div class="circle-container" ref="circleContainer">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="falling-item"
        :style="itemStyle(item)"
      >
        {{ item.emoji }}
      </div>
    </div>
    <div v-if="showText" class="movit-text">Movit</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "MainPage",
  setup() {
    const circleContainer = ref(null);
    const items = ref([]);
    const itemCount = 30; // 아이템의 개수
    const showText = ref(false);

    const emojis = ["🍿", "🎥", "🥤"]; // 팝콘, 3D 안경, 콜라 이모티콘

    const createItem = () => {
      return {
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * window.innerWidth + "px",
        animationDuration: Math.random() * 2 + 3 + "s", // 애니메이션 속도 랜덤 (3초에서 5초 사이)
        animationDelay: Math.random() * 1 + "s", // 애니메이션 딜레이 랜덤 (0초에서 1초 사이)
      };
    };

    const itemStyle = (item) => {
      return {
        left: item.left,
        animationDuration: item.animationDuration,
        animationDelay: item.animationDelay,
      };
    };

    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 100) {
        // 원하는 스크롤 위치 설정
        showText.value = true;
      } else {
        showText.value = false;
      }
    };

    onMounted(() => {
      for (let i = 0; i < itemCount; i++) {
        items.value.push(createItem());
      }
      window.addEventListener("scroll", handleScroll);
    });

    return {
      circleContainer,
      items,
      itemCount,
      itemStyle,
      showText,
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
  cursor: url("@/assets/image/retro_small.png"), auto;
}

.circle-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.falling-item {
  font-size: 30px;
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

.movit-text {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2em;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
}
</style>

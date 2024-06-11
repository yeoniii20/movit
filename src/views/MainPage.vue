<template>
  <div class="scroll-container" @scroll="handleScroll">
    <div class="counter">
      <div v-for="(count, emoji) in caughtCounts" :key="emoji">
        {{ emoji }}: {{ count }}
      </div>
    </div>
    <div class="circle-container" ref="circleContainer">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="falling-item"
        :style="itemStyle(item)"
        @animationiteration="resetPosition(index)"
      >
        {{ item.emoji }}
      </div>
    </div>
    <div class="movit-text" @click="goHome">Movit</div>
    <div
      class="custom-cursor"
      :style="{ top: cursorY + 'px', left: cursorX + 'px' }"
    ></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "MainPage",
  setup() {
    const router = useRouter();
    const circleContainer = ref(null);
    const items = ref([]);
    const itemCount = 30;
    const showText = ref(false);
    const cursorX = ref(0);
    const cursorY = ref(0);
    const caughtCounts = ref({ "🍿": 0, "🎥": 0, "🥤": 0 });

    const emojis = ["🍿", "🎥", "🥤"];

    const createItem = () => {
      return {
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * window.innerWidth + "px",
        top: -50,
        animationDuration: Math.random() * 2 + 3 + "s",
        animationDelay: Math.random() * 1 + "s",
      };
    };

    const itemStyle = (item) => {
      return {
        left: item.left,
        top: item.top + "px",
        animationDuration: item.animationDuration,
        animationDelay: item.animationDelay,
      };
    };

    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 100) {
        showText.value = true;
      } else {
        showText.value = false;
      }
    };

    const handleMouseMove = (event) => {
      cursorX.value = event.clientX;
      cursorY.value = event.clientY;
      checkForCatch(event.clientX, event.clientY);
    };

    const checkForCatch = (mouseX, mouseY) => {
      items.value.forEach((item, index) => {
        const itemElement = circleContainer.value.children[index];
        const rect = itemElement.getBoundingClientRect();
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          items.value.splice(index, 1);
          items.value.push(createItem());
          caughtCounts.value[item.emoji] += 1;
        }
      });
    };

    const resetPosition = (index) => {
      items.value[index].top = -50;
    };

    const goHome = () => {
      router.push({ path: "/home" });
    };

    onMounted(() => {
      for (let i = 0; i < itemCount; i++) {
        items.value.push(createItem());
      }
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("mousemove", handleMouseMove);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    });

    return {
      circleContainer,
      resetPosition,
      goHome,
      items,
      itemCount,
      itemStyle,
      showText,
      cursorX,
      cursorY,
      caughtCounts,
    };
  },
};
</script>

<style scoped>
.scroll-container {
  background-color: black;
  overflow: hidden;
  position: relative;
  height: 150vh;
  cursor: none;
}

.counter {
  display: flex;
  gap: 30px;
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1.5em;
  z-index: 1000;
}

.circle-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
    transform: translateY(150vh);
  }
}

.movit-text {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2em;
  color: #d4d4d4;
  background-color: rgb(248, 40, 254, 0.3);
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 1000;
}

.custom-cursor {
  width: 50px;
  height: 50px;
  background-image: url("@/assets/image/retro_small.png");
  background-size: cover;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: background-color 0.2s;
  z-index: 1000;
}

.btn {
  color: #fff;
}
</style>

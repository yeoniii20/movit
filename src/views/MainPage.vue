<template>
  <div class="scroll-container" @scroll="handleScroll">
    <div class="hud">
      <div class="hud-inner">
        <div class="hud-title">Catch &amp; Chill</div>

        <div class="chips">
          <div class="chip" v-for="(count, emoji) in caughtCounts" :key="emoji">
            <span class="chip-emoji">{{ emoji }}</span>
            <span class="chip-count">{{ count }}</span>
          </div>
        </div>
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

    <button class="movit-cta" @click="goHome" aria-label="Go to home">
      Movit
      <span class="cta-sub">Go Home</span>
    </button>

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
  overflow: hidden;
  position: relative;
  height: 150vh;
  cursor: none;
}

/* ===== HUD ===== */
.hud {
  position: fixed;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: min(720px, 92%);
}

.hud-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  padding: 12px 14px;
  border-radius: 16px;

  background: rgba(18, 18, 18, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}

.hud-title {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 800;
  letter-spacing: 0.2px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0.95;
}

.chips {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 8px 10px;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chip-emoji {
  font-size: 16px;
  filter: drop-shadow(0 0 10px rgba(248, 40, 254, 0.35));
}

.chip-count {
  color: rgba(255, 255, 255, 0.92);
  font-weight: 800;
  font-size: 13px;
  min-width: 18px;
  text-align: right;
}

/* ===== Falling items ===== */
.circle-container {
  height: 100%;
  position: relative;
}

.falling-item {
  font-size: 25px;
  position: absolute;
  top: 0;

  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.16))
    drop-shadow(0 0 18px rgba(248, 40, 254, 0.18));
  user-select: none;
  will-change: transform;
}

@keyframes fall {
  0% {
    transform: translateY(-120px) rotate(-6deg);
    opacity: 0.95;
  }
  100% {
    transform: translateY(160vh) rotate(10deg);
    opacity: 0.95;
  }
}

/* ===== CTA button ===== */
.movit-cta {
  position: absolute;
  bottom: 56px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  border: 1px solid rgba(248, 40, 254, 0.35);
  background: rgba(248, 40, 254, 0.16);
  color: rgba(255, 255, 255, 0.92);

  padding: 12px 18px;
  border-radius: 16px;

  font-weight: 900;
  font-size: 18px;
  letter-spacing: 0.3px;

  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease,
    border-color 160ms ease;
  box-shadow: 0 14px 40px rgba(248, 40, 254, 0.12);
}

.movit-cta:hover {
  transform: translateX(-50%) translateY(-2px);
  background: rgba(248, 40, 254, 0.22);
  border-color: rgba(248, 40, 254, 0.55);
}

.movit-cta:active {
  transform: translateX(-50%) translateY(0px);
}

.movit-cta:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.3);
  outline-offset: 2px;
}

.cta-sub {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
}

/* ===== Custom cursor ===== */
.custom-cursor {
  width: 52px;
  height: 52px;
  background-image: url("@/assets/image/retro_small.png");
  background-size: cover;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 1000;

  filter: drop-shadow(0 0 12px rgba(248, 40, 254, 0.35));
}

/* Mobile tweak */
@media (max-width: 640px) {
  .hud {
    top: 66px;
  }
  .hud-inner {
    padding: 10px 12px;
  }
  .movit-cta {
    padding: 11px 16px;
    border-radius: 14px;
    font-size: 16px;
  }
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

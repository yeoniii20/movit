<template>
  <header class="header">
    <nav class="header-section" aria-label="Main navigation">
      <div
        class="logo"
        role="button"
        tabindex="0"
        @click="navigateTo('/')"
        @keydown.enter="navigateTo('/')"
      >
        <img
          class="logo-img"
          src="@/assets/image/retro_small.png"
          alt="Movit logo"
        />
        <span class="logo-text">Movit</span>
      </div>

      <ul class="nav">
        <li>
          <button
            class="nav-btn"
            :class="{ active: isActive('/home') }"
            @click="navigateTo('/home')"
          >
            Home
          </button>
        </li>
        <li>
          <button
            class="nav-btn"
            :class="{ active: isActive('/canvas') }"
            @click="navigateTo('/canvas')"
          >
            Canvas
          </button>
        </li>
        <li>
          <button
            class="nav-btn"
            :class="{ active: isActive('/myPage') }"
            @click="navigateTo('/myPage')"
          >
            My Page
          </button>
        </li>
      </ul>
    </nav>
  </header>

  <div class="header-spacer" />
</template>

<script>
import "../assets/styles.css";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "HeaderCom",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navigateTo = (path) => {
      router.push(path);
    };

    const isActive = (path) => route.path === path;

    return {
      navigateTo,
      isActive,
    };
  },
};
</script>

<style scoped>
/* ====== Layout / Shell ====== */
.header {
  background: rgba(8, 8, 10, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* 아주 얇은 네온 라인 */
.header::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
  pointer-events: none;
}

.header-section {
  margin: 0 auto;
  width: min(1200px, 92%);
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-spacer {
  height: 18px;
}

/* ====== Logo ====== */
.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  user-select: none;

  padding: 8px 10px;
  border-radius: 12px;
  transition: background 160ms ease, transform 160ms ease;
}

.logo:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-1px);
}

.logo:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.35);
  outline-offset: 2px;
}

.logo-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  display: block;
}

.logo-text {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.92);
}

/* ====== Nav ====== */
.nav {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
}

.nav-btn {
  appearance: none;
  border: 1px solid transparent;
  background: transparent;

  color: rgba(255, 255, 255, 0.86);
  font: inherit;

  padding: 10px 12px;
  border-radius: 999px;

  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease,
    transform 160ms ease, color 160ms ease;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.96);
  transform: translateY(-1px);
}

.nav-btn:active {
  transform: translateY(0px);
}

.nav-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.35);
  outline-offset: 2px;
}

/* Active pill */
.nav-btn.active {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.98);
}

/* ====== Responsive ====== */
@media (max-width: 640px) {
  .header-section {
    height: 56px;
  }
  .header-spacer {
    height: 56px;
  }
  .logo-text {
    font-size: 16px;
  }
  .nav-btn {
    padding: 8px 10px;
  }
}
</style>

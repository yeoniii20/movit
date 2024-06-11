<template>
  <header class="header">
    <nav>
      <div class="logo" @click="navigateTo('/')">
        <img src="@/assets/image/retro_small.png" />Movit
      </div>
      <ul>
        <!-- <li><button @click="navigateTo('/')">Main</button></li> -->
        <li><button @click="navigateTo('/home')">Home</button></li>
        <li><button @click="navigateTo('/canvas')">Canvas</button></li>
        <!-- <li><button @click="navigateTo('/about')">About</button></li> -->
        <!-- <li><button @click="navigateTo('/detail')">Detail</button></li> -->
        <li><button @click="navigateTo('/myPage')">My Page</button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import "../assets/styles.css";
import { useRouter } from "vue-router";

export default {
  name: "HeaderCom",
  setup() {
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path);
    };

    return {
      navigateTo,
    };
  },
};
</script>

<style scoped>
.header {
  background-color: #292929;
  color: white;
  padding: 1em 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 0 1em;
}

.logo {
  display: flex;
  gap: 0.5em;
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
}

ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

li {
  margin-left: 1em;
}

button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font: inherit;
  text-decoration: none;
}

button:hover {
  color: #ddd; /* Optional: Change the color on hover instead of underlining */
}
</style>

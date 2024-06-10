<template>
  <header class="header">
    <nav>
      <div class="logo"><img src="@/assets/image/retro_small.png" />Movit</div>
      <ul>
        <li><a :href="router.resolve('/').href">Main</a></li>
        <li><a :href="router.resolve('/home').href">Home</a></li>
        <li><a :href="router.resolve('/canvas').href">Canvas</a></li>
        <li><a :href="router.resolve('/about').href">About</a></li>
        <li><a :href="router.resolve('/detail').href">Detail</a></li>
        <li><a :href="router.resolve('/myPage').href">My Page</a></li>
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
    return {
      router,
    };
  },
};
</script>

<style scoped>
.header {
  background-color: #333;
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

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>

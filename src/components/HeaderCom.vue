<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <nav>
      <div class="logo">MovieSearch</div>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/detail">Detail</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import "../assets/styles.css";

export default {
  name: "HeaderCom",
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1em;
}

.logo {
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

router-link {
  color: white;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>

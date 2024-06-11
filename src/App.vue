<template>
  <div id="app">
    <div class="header-container">
      <HeaderCom />
    </div>
    <main>
      <RouterView></RouterView>
    </main>
    <FooterCom />
  </div>
</template>

<script setup>
import HeaderCom from "./components/HeaderCom.vue";
import FooterCom from "./components/FooterCom.vue";
</script>

<style>
body {
  margin: 0;
  font-family: "SUITE", sans-serif;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.header-container {
  margin-bottom: 60px;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 1em 0;
  z-index: 1000;
}

main {
  flex: 1;
  overflow-y: auto;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1em 0;
}
</style>

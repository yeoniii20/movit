<template>
  <div id="app">
    <HeaderCom />
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
  overflow: hidden; /* 전체 스크롤을 없앰 */
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
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
  overflow-y: auto; /* main 영역에만 스크롤이 생기도록 함 */
  margin-top: 60px;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1em 0;
}
</style>

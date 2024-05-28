<script setup></script>

<template>
  <!-- <nav>
    <Routerlink to="/">Home</Routerlink>
    <span> | </span>
    <RouterLink to="/about">About</RouterLink>
  </nav> -->
  <main>
    <HeaderCom />
    <RouterView></RouterView>
    <FooterCom />
  </main>
</template>

<script>
import HeaderCom from "./components/HeaderCom.vue";
import FooterCom from "./components/FooterCom.vue";

export default {
  name: "App",
  components: {
    HeaderCom,
    FooterCom,
  },
};
</script>
<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  margin-top: 60px; /* 헤더의 높이만큼 마진 */
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1em 0;
}
</style>

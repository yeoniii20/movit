<template>
  <div class="sidebar">
    <h3>[진행] 미술학원 학습 소모임</h3>
    <ul>
      <li>state_option_01</li>
      <li>state_option_02</li>
      <li>state_option_03</li>
    </ul>
    <button>지원하기</button>
  </div>
</template>

<script>
export default {
  name: "SidebarCom",
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f5f5f5;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
.sidebar h3 {
  font-size: 1.2em;
  margin-bottom: 1em;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin-bottom: 0.5em;
}
.sidebar button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
}
.sidebar button:hover {
  background-color: #555;
}
</style>

<template>
  <div class="content">
    <div class="header">
      <div>
        <h1>title_01</h1>
        <h2>sub_title_01</h2>
      </div>
      <div class="user-info">
        <span class="user-icon">👤</span>
        <span>user_name</span>
      </div>
    </div>
    <div class="image-section">
      <div class="image-placeholder">content_img</div>
      <div class="actions">
        <button>⬆️</button>
        <button>⭐️</button>
        <button>🔁</button>
        <button>💬</button>
      </div>
    </div>
    <div class="description">
      <p>**생각하면서 읽는 책, 자유롭게 표현까지 💬**</p>
      <p>안녕하세요, 토독토독입니다. ...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentCom",
};
</script>

<style scoped>
.content {
  flex: 1;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1 {
  margin: 0;
  font-size: 2em;
}
.header h2 {
  margin: 0;
  font-size: 1.5em;
  color: #666;
}
.user-info {
  display: flex;
  align-items: center;
}
.user-icon {
  font-size: 2em;
  margin-right: 0.5em;
}
.image-section {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.image-placeholder {
  width: 300px;
  height: 400px;
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}
.actions {
  display: flex;
  flex-direction: column;
}
.actions button {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  margin: 5px 0;
}
.description {
  margin-top: 20px;
}
</style>

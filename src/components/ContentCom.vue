<template>
  <div class="content">
    <div class="header">
      <div>
        <h1>{{ movie.title }}</h1>
        <h2>{{ movie.subTitle }}</h2>
      </div>
      <div class="user-info">
        <span class="user-icon">👤</span>
        <span>{{ movie.user }}</span>
      </div>
    </div>
    <div class="image-section">
      <img :src="movie.image" alt="Movie Image" class="image-placeholder" />
      <div class="actions">
        <button @click="$emit('share')">⬆️</button>
        <button @click="$emit('bookmark')">⭐️</button>
        <button @click="$emit('refresh')">🔁</button>
        <button @click="toggleComments">💬</button>
      </div>
    </div>
    <div class="description">
      <p>{{ movie.description }}</p>
    </div>
    <CommentCom v-if="showComments" />
  </div>
</template>

<script>
import CommentCom from "@/components/CommentCom.vue";

export default {
  name: "ContentCom",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showComments: false,
    };
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
      this.$emit("toggleComments");
    },
  },
  components: {
    CommentCom,
  },
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

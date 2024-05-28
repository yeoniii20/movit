<!-- src/components/Card.vue -->
<template>
  <div class="card">
    <img :src="image" alt="Movie Image" class="card-image" />
    <div class="card-content">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCom",
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 1em;
}

.card-image {
  width: 100%;
  height: auto;
}

.card-content {
  padding: 1em;
}

.card-title {
  font-size: 1.5em;
  margin: 0.5em 0;
}

.card-description {
  color: #555;
}
</style>

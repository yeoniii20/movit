<template>
  <div class="card" @click="navigateToDetail">
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
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    navigateToDetail() {
      this.$router.push({ name: "detail", params: { id: this.id } });
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
  cursor: pointer;
}
.card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.card:active {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.card-image {
  width: 100%;
  height: 30rem;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1.5em;
  margin: 0.5em 0;
}

.card-description {
  color: #555;
  max-width: 100%;
  height: 3.75rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

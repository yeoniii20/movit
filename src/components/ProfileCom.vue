<template>
  <div class="profile-selector">
    <div class="icon-list">
      <span
        v-for="icon in icons"
        :key="icon"
        class="icon"
        @click="selectIcon(icon)"
      >
        {{ icon }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCom",
  data() {
    return {
      icons: [
        "👤",
        "👥",
        "🧑",
        "🧑🏻",
        "🧑🏼",
        "🧑🏽",
        "🧑🏾",
        "🧑🏿",
        "👨",
        "👨🏻",
        "👨🏼",
        "👨🏽",
        "👨🏾",
        "👨🏿",
        "👩",
        "👩🏻",
        "👩🏼",
        "👩🏽",
        "👩🏾",
        "👩🏿",
      ],
    };
  },
  methods: {
    selectIcon(icon) {
      this.$emit("updateProfile", icon);
    },
  },
};
</script>

<style scoped>
.icon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.icon {
  cursor: pointer;
  font-size: 2em;
  transition: transform 0.2s;
}

.icon:hover {
  transform: scale(1.2);
}
</style>

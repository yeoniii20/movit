<template>
  <div class="profile-selector">
    <div class="nickname-section">
      <input
        type="text"
        v-model="nickname"
        placeholder="Enter your nickname"
        class="nickname-input"
      />
      <button class="nickname-btn" @click="saveNickname">Save Nickname</button>
    </div>
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
      nickname: "",
    };
  },
  methods: {
    selectIcon(icon) {
      this.$emit("updateProfile", { icon });
    },
    saveNickname() {
      this.$emit("updateProfile", { nickname: this.nickname });
    },
  },
};
</script>

<style scoped>
.profile-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  margin-bottom: 3em;
}

.nickname-section {
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nickname-input {
  font-size: 1em;
  padding: 0.5em;
  border-color: rgb(195, 195, 195);
  border-style: solid;
  border-width: 0.1em;
  font-family: "SUITE";
}

.nickname-input::placeholder {
  font-family: "SUITE";
  color: grey;
}

.nickname-btn {
  border-radius: 0.25rem;
  background-color: rgb(195, 195, 195);
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  font-family: "SUITE";
}

.nickname-btn:active {
  background-color: rgb(185, 185, 185);
  transform: scale(0.98);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.icon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 600px;
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

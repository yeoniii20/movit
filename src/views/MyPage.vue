<template>
  <div class="my-page">
    <h1>My Page</h1>
    <div class="profile-section">
      <h2>Select Your Profile Icon</h2>
      <ProfileCom @updateProfile="updateProfileIcon" />
    </div>
    <div class="current-profile">
      <h2>Your Current Profile Icon</h2>
      <span class="selected-icon">{{ selectedIcon }}</span>
    </div>
  </div>
</template>

<script>
import ProfileCom from "@/components/ProfileCom.vue";

export default {
  name: "MyPage",
  components: {
    ProfileCom,
  },
  data() {
    return {
      selectedIcon: "👤", // 기본 아이콘
    };
  },
  methods: {
    updateProfileIcon(newIcon) {
      this.selectedIcon = newIcon;
    },
  },
};
</script>

<style scoped>
.my-page {
  padding: 20px;
  text-align: center;
}

.profile-section,
.current-profile {
  margin-top: 20px;
}

.selected-icon {
  font-size: 2em;
}
</style>

<template>
  <div class="my-page">
    <h1>My Page</h1>
    <div class="profile-section">
      <h2 class="des">Select Your Profile Icon and Nickname</h2>
      <ProfileCom @updateProfile="updateProfile" />
    </div>
    <div class="current-profile">
      <h2 class="current">Your Current Profile</h2>
      <span class="selected-icon">{{ selectedIcon }}</span>
      <div class="nickname">{{ nickname }}</div>
    </div>
  </div>
</template>

<script>
import ProfileCom from "@/components/ProfileCom.vue";
import { getProfile, saveProfile } from "@/utils/db";

export default {
  name: "MyPage",
  components: {
    ProfileCom,
  },
  data() {
    return {
      selectedIcon: "👤",
      nickname: "",
    };
  },
  async created() {
    const profile = await getProfile();
    if (profile) {
      this.selectedIcon = profile.icon || "👤";
      this.nickname = profile.nickname || "";
    }
  },
  methods: {
    async updateProfile(data) {
      if (data.icon) {
        this.selectedIcon = data.icon;
      }
      if (data.nickname) {
        this.nickname = data.nickname;
      }
      await saveProfile({ icon: this.selectedIcon, nickname: this.nickname });
    },
  },
};
</script>

<style scoped>
h1 {
  color: white;
}

h2 {
  color: white;
}

.my-page {
  padding: 16px;
  text-align: center;
}

.des {
  margin-bottom: 2em;
}

.current {
  margin-top: 2em;
}

.profile-section,
.current-profile {
  margin-top: 20px;
}

.selected-icon {
  font-size: 2em;
}

.nickname {
  font-size: 1.5em;
  margin-top: 10px;
  color: white;
}
</style>

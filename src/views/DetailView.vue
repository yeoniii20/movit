<template>
  <div class="detail-view">
    <SidebarCom />
    <ContentCom />
  </div>
</template>

<script>
// import SidebarCom from "@/components/SidebarCom.vue";
import ContentCom from "@/components/ContentCom.vue";

export default {
  name: "DetailView",
  components: {
    // SidebarCom,
    ContentCom,
  },
};
</script>

<style scoped>
.detail-view {
  display: flex;
  min-height: 100vh;
}
</style>

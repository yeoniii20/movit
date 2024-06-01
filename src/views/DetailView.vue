<template>
  <div class="detail-view">
    <SidebarCom />
    <ContentCom :movie="movie" />
  </div>
</template>

<script>
import axios from "axios";
import SidebarCom from "@/components/SidebarCom.vue";
import ContentCom from "@/components/ContentCom.vue";

export default {
  name: "DetailView",
  components: {
    SidebarCom,
    ContentCom,
  },
  props: ["id"],
  data() {
    return {
      movie: {},
    };
  },
  created() {
    this.fetchMovieData(this.id);
  },
  methods: {
    async fetchMovieData(id) {
      const apiKey = process.env.VUE_APP_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;
      try {
        const response = await axios.get(url);
        this.movie = {
          id: response.data.id,
          title: response.data.title,
          subTitle: response.data.tagline,
          image: `https://image.tmdb.org/t/p/w300${response.data.poster_path}`,
          user: response.data.production_companies[0]?.name || "Unknown",
          description: response.data.overview,
        };
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    },
  },
};
</script>

<style scoped>
.detail-view {
  display: flex;
  min-height: 100vh;
}
</style>

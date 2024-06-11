<template>
  <div class="detail-view">
    <SidebarCom />
    <ContentCom
      :movie="movie"
      @share="shareMovie"
      @bookmark="bookmarkMovie"
      @refresh="refreshPage"
      @toggleComments="toggleComments"
    />
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
      showComments: false,
    };
  },
  created() {
    this.fetchMovieData(this.id);
  },
  methods: {
    async fetchMovieData(id) {
      const apiKey = process.env.VUE_APP_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR&append_to_response=credits,videos,similar,reviews`;
      try {
        const response = await axios.get(url);
        const movieData = response.data;
        this.movie = {
          id: movieData.id,
          title: movieData.title,
          subTitle: movieData.tagline,
          image: `https://image.tmdb.org/t/p/w300${movieData.poster_path}`,
          user: movieData.production_companies[0]?.name || "Unknown",
          description: movieData.overview,
          releaseDate: movieData.release_date,
          genres: movieData.genres.map((genre) => genre.name).join(", "),
          runtime: movieData.runtime,
          director: movieData.credits.crew.find(
            (member) => member.job === "Director"
          )?.name,
          cast: movieData.credits.cast
            .slice(0, 5)
            .map((actor) => actor.name)
            .join(", "),
          rating: movieData.vote_average,
          votes: movieData.vote_count,
          trailer: movieData.videos.results.find(
            (video) => video.type === "Trailer"
          )?.key,
          budget: movieData.budget,
          revenue: movieData.revenue,
          similarMovies: movieData.similar.results,
          reviews: movieData.reviews.results,
        };
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    },
    shareMovie() {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    },
    bookmarkMovie() {
      alert("Movie bookmarked!");
    },
    refreshPage() {
      window.location.reload();
    },
    toggleComments() {
      this.showComments = !this.showComments;
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

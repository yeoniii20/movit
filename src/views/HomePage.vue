<template>
  <div>
    <h1>Welcome to MovieSearch</h1>
    <p>Search for your favorite movies and more.</p>
    <div class="card-container">
      <CardCom
        v-for="(movie, index) in movies"
        :key="index"
        :image="movie.image"
        :title="movie.title"
        :description="movie.description"
        :id="movie.id"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardCom from "@/components/CardCom.vue";

export default {
  name: "HomePage",
  components: {
    CardCom,
  },
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    async fetchMovies() {
      const apiKey = process.env.VUE_APP_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&region=KR&page=1`; // Add region parameter to fetch only Korean movies
      try {
        const response = await axios.get(url);
        this.movies = response.data.results.map((movie) => ({
          id: movie.id,
          image: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
          title: movie.title,
          description: movie.overview,
        }));
        console.log("Fetched movies:", this.movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 2em;
}

p {
  text-align: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
  margin-top: 2em;
}
</style>

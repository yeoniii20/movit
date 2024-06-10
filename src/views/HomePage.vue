<template>
  <div>
    <h1>Welcome to Movit</h1>
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
    <div class="load-more-container">
      <button class="load-more-btn" @click="loadMoreMovies">더보기</button>
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
      page: 1,
    };
  },
  methods: {
    async fetchMovies() {
      const apiKey = process.env.VUE_APP_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&region=KR&page=${this.page}`;
      try {
        const response = await axios.get(url);
        const newMovies = response.data.results.map((movie) => ({
          id: movie.id,
          image: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
          title: movie.title,
          description: movie.overview,
        }));
        this.movies = [...this.movies, ...newMovies];
        console.log("Fetched movies:", this.movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    loadMoreMovies() {
      this.page += 1;
      this.fetchMovies();
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
  margin-bottom: 2em;
}

.load-more-container {
  text-align: center;
  margin-top: 2em;
  margin-bottom: 4em;
}

.load-more-btn {
  border-radius: 0.25rem;
  background-color: rgb(195, 195, 195);
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  border-color: transparent;
}
</style>

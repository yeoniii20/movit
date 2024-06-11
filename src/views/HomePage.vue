<template>
  <div class="wrapper">
    <h1 class="title">Welcome to Movit</h1>
    <p class="description">Search for your favorite movies and more.</p>
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
.wrapper {
  background-color: #0f0f0f; /* Primary */
  padding-top: 60px;
  padding-bottom: 60px;
}

h1 {
  text-align: center;
  margin-top: 0.5em;
  color: #d4d4d4; /* Secondary */
}

p {
  text-align: center;
  color: #969696; /* Tertiary */
  margin-bottom: 5em;
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
  /* background-color: #292929; */
  background-color: rgb(248, 40, 254, 0.3);
  color: #ffffff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 2px solid transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  font-family: "SUITE";
  font-size: 16px;
}

.load-more-btn:hover {
  /*  background-color: #383838;
  border-color: #f828fe; */
  background-color: rgb(248, 40, 254, 0.4);
}

.load-more-btn:active {
  background-color: rgb(248, 40, 254, 0.5);
}

.load-more-btn .accent {
  color: #f828fe;
}
</style>

<!-- <template>
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
      />
    </div>
  </div>
</template>

<script>
import CardCom from "@/components/CardCom.vue";

export default {
  name: "HomePage",
  components: {
    CardCom,
  },
  data() {
    return {
      movies: [
        {
          image: "https://via.placeholder.com/300x400",
          title: "Movie 1",
          description: "This is the first movie description.",
        },
        {
          image: "https://via.placeholder.com/300x400",
          title: "Movie 2",
          description: "This is the second movie description.",
        },
        {
          image: "https://via.placeholder.com/300x400",
          title: "Movie 3",
          description: "This is the third movie description.",
        },
      ],
    };
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
</style> -->

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
      const apiKey = process.env.VUE_APP_TMDB_API_KEY; // 환경 변수에서 API 키 읽기
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&region=KR&page=1`; // 한국 영화만 가져오기 위해 region 파라미터 추가
      try {
        const response = await axios.get(url);
        this.movies = response.data.results.map((movie) => ({
          image: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
          title: movie.title,
          description: movie.overview,
        }));
        console.log("Fetched movies:", this.movies); // movies 배열 로그 찍기
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

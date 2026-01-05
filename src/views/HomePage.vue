<template>
  <div class="wrapper">
    <section class="hero">
      <h1 class="title">Welcome to <span class="accent">Movit</span></h1>
      <p class="subtitle">
        지금 상영 중인 영화들을 빠르게 둘러보고, 마음에 드는 작품을
        저장해보세요.
      </p>
    </section>

    <section class="content">
      <div v-if="error" class="state error">
        데이터를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
      </div>

      <div v-else-if="loading && movies.length === 0" class="state loading">
        불러오는 중…
      </div>

      <div class="grid">
        <CardCom
          v-for="(movie, index) in movies"
          :key="movie.id ?? index"
          :image="movie.image"
          :title="movie.title"
          :description="movie.description"
          :id="movie.id"
        />
      </div>

      <div class="load-more-container">
        <button
          class="load-more-btn"
          :disabled="loading"
          @click="loadMoreMovies"
        >
          <span v-if="loading">불러오는 중…</span>
          <span v-else>더보기</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import CardCom from "@/components/CardCom.vue";

export default {
  name: "HomePage",
  components: { CardCom },
  data() {
    return {
      movies: [],
      page: 1,
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchMovies() {
      this.loading = true;
      this.error = null;

      const apiKey = process.env.VUE_APP_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&region=KR&page=${this.page}`;

      try {
        const response = await axios.get(url);
        const newMovies = (response.data?.results ?? []).map((movie) => ({
          id: movie.id,
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "", // 포스터 없을 때 대비
          title: movie.title,
          description: movie.overview,
        }));
        this.movies = [...this.movies, ...newMovies];
      } catch (e) {
        this.error = e;
        console.error("Error fetching movies:", e);
      } finally {
        this.loading = false;
      }
    },
    loadMoreMovies() {
      if (this.loading) return;
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
  min-height: 100vh;
  padding-bottom: 80px;
}

/* Hero */
.hero {
  padding-top: 88px; /* 헤더 fixed 고려 */
  padding-bottom: 28px;
}

.title {
  margin: 0;
  color: rgba(255, 255, 255, 0.92);
  font-weight: 900;
  letter-spacing: 0.2px;
  font-size: 34px;
  text-align: center;
}

.accent {
  color: rgba(248, 40, 254, 0.95);
  text-shadow: 0 0 18px rgba(248, 40, 254, 0.25);
}

.subtitle {
  margin: 10px 0 0 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.65);
  font-size: 15px;
  line-height: 1.6;
}

/* Content wrapper */
.content {
  width: min(1200px, 92%);
  margin: 18px auto 0;
}

/* States */
.state {
  margin: 18px 0;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(18, 18, 18, 0.45);
  color: rgba(255, 255, 255, 0.75);
}

.state.error {
  border-color: rgba(255, 80, 80, 0.25);
  color: rgba(255, 190, 190, 0.95);
}

.state.loading {
  color: rgba(255, 255, 255, 0.75);
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

/* 반응형 */
@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
@media (max-width: 920px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .title {
    font-size: 26px;
  }
  .hero-inner {
    padding: 20px 14px;
  }
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
}

/* Load more */
.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 26px;
}

.load-more-btn {
  border-radius: 999px;
  background: rgba(248, 40, 254, 0.16);
  color: rgba(255, 255, 255, 0.92);

  padding: 12px 18px;
  cursor: pointer;
  border: 1px solid rgba(248, 40, 254, 0.35);

  transition: transform 160ms ease, background 160ms ease,
    border-color 160ms ease, opacity 160ms ease;
  font-family: "SUITE";
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.2px;

  box-shadow: 0 14px 40px rgba(248, 40, 254, 0.1);
}

.load-more-btn:hover {
  transform: translateY(-2px);
  background: rgba(248, 40, 254, 0.22);
  border-color: rgba(248, 40, 254, 0.55);
}

.load-more-btn:active {
  transform: translateY(0px);
}

.load-more-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

.load-more-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.3);
  outline-offset: 2px;
}
</style>

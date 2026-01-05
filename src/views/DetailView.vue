<template>
  <div class="detail-page">
    <div class="detail-shell">
      <div v-if="loading" class="state loading">불러오는 중…</div>
      <div v-else-if="error" class="state error">
        상세 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        <button class="retry" @click="fetchMovieData(id)">다시 시도</button>
      </div>

      <div v-else class="content-surface">
        <ContentCom
          :movie="movie"
          @share="shareMovie"
          @bookmark="bookmarkMovie"
          @refresh="refreshPage"
          @toggleComments="toggleComments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ContentCom from "@/components/ContentCom.vue";

export default {
  name: "DetailView",
  components: { ContentCom },
  props: ["id"],
  data() {
    return {
      movie: null,
      showComments: false,
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchMovieData(this.id);
  },
  watch: {
    // 같은 컴포넌트에서 id만 바뀌는 라우팅(예: /detail/1 -> /detail/2) 대응
    id(newId) {
      this.fetchMovieData(newId);
    },
  },
  methods: {
    async fetchMovieData(id) {
      this.loading = true;
      this.error = null;

      const apiKey = process.env.VUE_APP_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR&append_to_response=credits,videos,similar,reviews`;

      try {
        const response = await axios.get(url);
        const movieData = response.data;

        this.movie = {
          id: movieData.id,
          title: movieData.title,
          subTitle: movieData.tagline,
          image: movieData.poster_path
            ? `https://image.tmdb.org/t/p/w300${movieData.poster_path}`
            : "",
          user: movieData.production_companies?.[0]?.name || "Unknown",
          description: movieData.overview,
          releaseDate: movieData.release_date,
          genres: (movieData.genres || []).map((g) => g.name).join(", "),
          runtime: movieData.runtime,
          director: movieData.credits?.crew?.find((m) => m.job === "Director")
            ?.name,
          cast: (movieData.credits?.cast || [])
            .slice(0, 5)
            .map((a) => a.name)
            .join(", "),
          rating: movieData.vote_average,
          votes: movieData.vote_count,
          trailer: movieData.videos?.results?.find((v) => v.type === "Trailer")
            ?.key,
          budget: movieData.budget,
          revenue: movieData.revenue,
          similarMovies: movieData.similar?.results || [],
          reviews: movieData.reviews?.results || [],
        };
      } catch (error) {
        this.error = error;
        console.error("Error fetching movie data:", error);
      } finally {
        this.loading = false;
      }
    },

    shareMovie() {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => alert("URL copied to clipboard!"))
        .catch((err) => console.error("Could not copy text: ", err));
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
.detail-page {
  min-height: 100vh;

  /* 홈/캔버스랑 톤 맞춘 다크 네온 배경 */
  background: linear-gradient(180deg, #0b0b0e 0%, #0a0a0a 55%, #0b0b0e 100%);

  /* fixed header 고려 */
  padding-top: 84px;
  padding-bottom: 60px;
}

.detail-shell {
  width: min(1100px, 92%);
  margin: 0 auto;
}

.content-surface {
  border-radius: 18px;
  padding: 18px;

  background: rgba(18, 18, 18, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 14px 45px rgba(0, 0, 0, 0.45);
}

/* 로딩/에러 상태 */
.state {
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(18, 18, 18, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.75);
}

.state.error {
  border-color: rgba(255, 80, 80, 0.25);
  color: rgba(255, 190, 190, 0.95);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.retry {
  border-radius: 999px;
  padding: 10px 14px;
  cursor: pointer;

  background: rgba(248, 40, 254, 0.16);
  border: 1px solid rgba(248, 40, 254, 0.35);
  color: rgba(255, 255, 255, 0.9);

  font-family: "SUITE";
  font-weight: 800;
  transition: transform 160ms ease, background 160ms ease;
}

.retry:hover {
  transform: translateY(-1px);
  background: rgba(248, 40, 254, 0.22);
}

@media (max-width: 640px) {
  .detail-page {
    padding-top: 72px;
  }
  .content-surface {
    padding: 14px;
    border-radius: 16px;
  }
}
</style>

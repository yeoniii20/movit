<template>
  <div class="content">
    <div class="header">
      <div>
        <h1>{{ movie.title }}</h1>
        <h2>{{ movie.subTitle }}</h2>
      </div>
      <div class="user-info" @click="profileClick">
        <span class="user-icon">{{ selectedIcon }}</span>
        <span>{{ nickname }}</span>
      </div>
    </div>
    <div class="image-section">
      <div class="image-box">
        <img :src="movie.image" alt="Movie Image" class="image-placeholder" />
        <div>
          <p class="movie-info">
            <strong class="movie-info-title">개봉일 🎬 : </strong
            >{{ movie.releaseDate }}
          </p>
          <p class="movie-info">
            <strong class="movie-info-title">장르 🎭 : </strong>
            {{ movie.genres }}
          </p>
          <p class="movie-info">
            <strong class="movie-info-title">상영 시간 ⏱️ :</strong>
            {{ movie.runtime }} minutes
          </p>
          <p class="movie-info">
            <strong class="movie-info-title">감독 👨‍💼 :</strong>
            {{ movie.director }}
          </p>
          <p class="movie-info">
            <strong class="movie-info-title">출연진 👥 :</strong>
            {{ movie.cast }}
          </p>
          <p class="movie-info">
            <strong class="movie-info-title">평점 ⭐️ :</strong>
            {{ movie.rating }} ({{ movie.votes }}
            votes)
          </p>
          <p class="movie-info">
            <strong class="movie-info-title">예산 💰 :</strong> ${{
              movie.budget
            }}
          </p>
          <p class="movie-info">
            <strong class="movie-info-title">수익 💸 :</strong> ${{
              movie.revenue
            }}
          </p>
        </div>
      </div>
      <div class="action-container">
        <div class="actions">
          <button @click="$emit('share')">⬆️</button>
          <button @click="$emit('bookmark')">⭐️</button>
          <button @click="$emit('refresh')">🔁</button>
          <button @click="toggleComments">💬</button>
        </div>
      </div>
    </div>
    <div class="description">
      <p>{{ movie.description }}</p>
      <div v-if="movie.trailer">
        <button class="play-trailer-btn" @click="openTrailer">
          🎬 Watch Trailer
        </button>
      </div>
      <CommentCom v-if="showComments" />
      <div
        v-if="movie.similarMovies && movie.similarMovies.length"
        class="similar-movies"
      >
        <h3>Similar Movies:</h3>
        <div class="similar-movies-container">
          <div
            v-for="similar in movie.similarMovies"
            :key="similar.id"
            class="similar-movie"
          >
            <img
              :src="'https://image.tmdb.org/t/p/w200/' + similar.poster_path"
              alt="Similar Movie Poster"
            />
            <p>{{ similar.title }}</p>
          </div>
        </div>
      </div>
      <div v-if="movie.reviews && movie.reviews.length">
        <h3>User Reviews:</h3>
        <ul>
          <li v-for="review in movie.reviews" :key="review.id">
            <p>
              <strong>{{ review.author }}</strong
              >: {{ review.content }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CommentCom from "@/components/CommentCom.vue";
import { useRouter } from "vue-router";
import { getProfile } from "@/utils/db";

export default {
  name: "ContentCom",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showComments: false,
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  async created() {
    const profile = await getProfile();
    if (profile) {
      this.selectedIcon = profile.icon || "👤";
      this.nickname = profile.nickname || "닉네임을 설정해주세요.";
    }
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
      this.$emit("toggleComments");
    },
    profileClick() {
      this.router.push({ path: "/myPage" });
    },
  },
  components: {
    CommentCom,
  },
};
</script>

<style scoped>
.content {
  flex: 1;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3em;
  color: #eaeaea;
}
.header h1 {
  margin: 0;
  font-size: 2em;
}
.header h2 {
  margin: 0;
  font-size: 1.5em;
  color: #aaaaaa;
}
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #eaeaea;
}
.user-icon {
  font-size: 2em;
  margin-right: 0.5em;
}
.image-section {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3em;
}
.image-box {
  display: flex;
}
.image-placeholder {
  width: 300px;
  height: 400px;
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}
.action-container {
  align-self: flex-end;
  margin-bottom: 1em;
}
.actions {
  display: flex;
  flex-direction: column;
}
.actions button {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  margin: 5px 0;
}
.description {
  margin-top: 20px;
  color: #eaeaea;
}
.similar-movies {
  margin-top: 5em;
}
.similar-movies-container {
  display: flex;
  overflow-x: scroll;
  margin-bottom: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-width: 1200px;
}
.similar-movie {
  flex: 0 0 auto;
  margin-right: 20px;
}
.similar-movie img {
  width: 150px;
  height: 225px;
  margin-bottom: 5px;
}
.similar-movie p {
  margin: 0;
  text-align: center;
}
.play-trailer-btn {
  border: none;
  background: none;
  font-size: 1.2em;
  cursor: pointer;
  margin-top: 1em;
  margin-bottom: 1em;
  color: #eaeaea;
}
.play-trailer-btn:focus {
  outline: none;
}
.play-trailer-btn:active {
  text-decoration: underline;
  color: #fff;
}
.movie-info-title {
  font-size: 20px;
  font-weight: bold;
  color: #eaeaea;
}
.movie-info {
  font-size: 18px;
  color: #eaeaea;
}
</style>

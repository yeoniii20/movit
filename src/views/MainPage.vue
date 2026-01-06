<template>
  <div class="scroll-container" @scroll="handleScroll">
    <!-- HUD -->
    <div class="hud">
      <div class="hud-inner">
        <div class="hud-left">
          <div class="hud-title">Catch &amp; Chill</div>

          <div class="mode">
            <button
              class="mbtn"
              :class="{ active: gameState === 'practice' }"
              @click="startPractice"
            >
              연습하기
            </button>

            <button
              class="mbtn primary"
              :class="{ active: gameState === 'challenge' }"
              :disabled="!canChallenge || gameState === 'success'"
              @click="onChallengeClick"
            >
              {{ challengeButtonText }}
            </button>
          </div>

          <div v-if="!canChallenge" class="cooldown">
            {{ cooldownText }}
          </div>
        </div>

        <div class="hud-right">
          <div class="chips">
            <div
              class="chip"
              v-for="(count, emoji) in caughtCounts"
              :key="emoji"
            >
              <span class="chip-emoji">{{ emoji }}</span>
              <span class="chip-count">{{ count }}</span>
            </div>

            <div class="chip total">
              <span class="chip-emoji">🏁</span>
              <span class="chip-count">{{ totalCaught }}</span>
            </div>
          </div>

          <div class="challenge" v-if="gameState === 'challenge'">
            <div class="challenge-item">
              <span class="label">남은 시간</span>
              <span class="value">{{ timeLeft }}s</span>
            </div>
            <div class="challenge-item">
              <span class="label">목표</span>
              <span class="value">{{ totalCaught }}/100</span>
            </div>
          </div>

          <div class="challenge" v-else-if="gameState === 'fail'">
            <div class="challenge-item">
              <span class="label">이번 기록</span>
              <span class="value">{{ totalCaught }}/100</span>
            </div>
          </div>

          <div class="challenge" v-else-if="gameState === 'success'">
            <div class="challenge-item success">
              <span class="label">성공!</span>
              <span class="value">100/100</span>
            </div>
            <div class="challenge-item">
              <span class="label">재도전</span>
              <span class="value">{{ cooldownText || "대기" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Falling items -->
    <div class="circle-container" ref="circleContainer">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="falling-item"
        :class="{ paused: isFrozen }"
        :style="itemStyle(item)"
        @animationiteration="resetPosition(index)"
      >
        {{ item.emoji }}
      </div>
    </div>

    <button class="movit-cta" @click="goHome" aria-label="Go to home">
      Movit
      <span class="cta-sub">Go Home</span>
    </button>

    <div
      class="custom-cursor"
      :style="{ top: cursorY + 'px', left: cursorX + 'px' }"
    ></div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="modal-backdrop"
      @click.self="closeSuccessModal"
    >
      <div class="modal">
        <div class="modal-title">🎉 축하합니다!</div>
        <div class="modal-desc">
          30초 안에 <b>100개</b>를 성공했어요!<br />
          성공 화면을 <b>캡처</b>해서 아래 주소로 이메일을 보내면<br />
          <b>무료 영화 쿠폰</b>을 드립니다.
        </div>

        <div class="modal-box">
          <div class="mail">
            <span class="mail-label">이메일</span>
            <span class="mail-value">commetoi_yeoni@naver.com</span>
          </div>
          <div class="mail-hint">
            ※ 캡처 이미지는 메일에 직접 첨부해 주세요.
          </div>
        </div>

        <div class="modal-actions">
          <a
            class="btn primary"
            :href="mailtoHref"
            target="_blank"
            rel="noreferrer"
          >
            무료 영화 쿠폰 받기
          </a>
          <button class="btn" @click="closeSuccessModal">닫기</button>
        </div>
      </div>
    </div>

    <!-- Fail Modal -->
    <div
      v-if="showFailModal"
      class="modal-backdrop"
      @click.self="closeFailModal"
    >
      <div class="modal">
        <div class="modal-title">😵 실패했습니다</div>
        <div class="modal-desc">
          제한 시간 30초 안에 <b>100개</b>를 먹어야 해요.<br />
          이번 기록: <b>{{ totalCaught }}</b
          >/100
        </div>

        <div class="modal-actions">
          <button class="btn primary" @click="retryChallenge">다시 도전</button>
          <button class="btn" @click="closeFailModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

export default {
  name: "MainPage",
  setup() {
    const router = useRouter();
    const circleContainer = ref(null);

    const items = ref([]);
    const itemCount = 30;

    const cursorX = ref(0);
    const cursorY = ref(0);

    const caughtCounts = ref({ "🍿": 0, "🎥": 0, "🥤": 0 });
    const totalCaught = computed(
      () =>
        (caughtCounts.value["🍿"] || 0) +
        (caughtCounts.value["🎥"] || 0) +
        (caughtCounts.value["🥤"] || 0)
    );

    const emojis = ["🍿", "🎥", "🥤"];

    // gameState: practice | challenge | success | fail
    const gameState = ref("practice");

    // 성공 시 화면 멈추기(낙하/잡기 stop)
    const isFrozen = ref(false);

    // challenge timer
    const timeLeft = ref(30);
    const timerId = ref(null);

    // modals
    const showSuccessModal = ref(false);
    const showFailModal = ref(false);

    // 24h cooldown persistence
    const nextChallengeAt = ref(
      Number(localStorage.getItem("movit_next_challenge_at") || 0)
    );
    const nowTick = ref(Date.now());
    let clockId = null;

    const canChallenge = computed(() => Date.now() >= nextChallengeAt.value);

    const challengeCooldownMs = computed(() =>
      Math.max(0, nextChallengeAt.value - nowTick.value)
    );

    const cooldownText = computed(() => {
      const ms = challengeCooldownMs.value;
      if (ms <= 0) return "";
      const totalSec = Math.ceil(ms / 1000);
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      return `${h}시간 ${m}분 ${s}초 후`;
    });

    const challengeButtonText = computed(() => {
      if (!canChallenge.value) return "내일 또 도전하기";
      if (gameState.value === "fail") return "다시 도전하기";
      if (gameState.value === "challenge") return "도전 중…";
      if (gameState.value === "success") return "내일 또 도전하기";
      return "도전하기";
    });

    const createItem = () => ({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * window.innerWidth + "px",
      top: -50,
      animationDuration: Math.random() * 2 + 3 + "s",
      animationDelay: Math.random() * 1 + "s",
    });

    const itemStyle = (item) => ({
      left: item.left,
      top: item.top + "px",
      animationDuration: item.animationDuration,
      animationDelay: item.animationDelay,
    });

    const resetPosition = (index) => {
      if (!items.value[index]) return;
      items.value[index].top = -50;
    };

    const resetCounts = () => {
      caughtCounts.value = { "🍿": 0, "🎥": 0, "🥤": 0 };
    };

    const stopTimer = () => {
      if (timerId.value) {
        clearInterval(timerId.value);
        timerId.value = null;
      }
    };

    const startPractice = () => {
      stopTimer();
      showSuccessModal.value = false;
      showFailModal.value = false;

      gameState.value = "practice";
      isFrozen.value = false;

      // 연습 시작 시 기록 초기화(원하면 유지로 바꿔도 됨)
      resetCounts();
    };

    const startChallenge = () => {
      if (!canChallenge.value) return;

      stopTimer();
      showSuccessModal.value = false;
      showFailModal.value = false;

      gameState.value = "challenge";
      isFrozen.value = false;

      timeLeft.value = 30;

      // 새 도전 시작: 기록 초기화
      resetCounts();

      timerId.value = setInterval(() => {
        timeLeft.value -= 1;

        // 시간 종료: 실패
        if (timeLeft.value <= 0) {
          timeLeft.value = 0;
          stopTimer();

          gameState.value = "fail"; // 기록 유지
          showFailModal.value = true;
        }
      }, 1000);
    };

    const onChallengeClick = () => {
      if (!canChallenge.value) return;

      if (gameState.value === "challenge") return;
      if (gameState.value === "success") return; // 24h 락 (버튼 비활성화 상태)

      // fail이면 "다시 도전하기"로 새 도전 시작
      startChallenge();
    };

    const handleMouseMove = (event) => {
      cursorX.value = event.clientX;
      cursorY.value = event.clientY;
      checkForCatch(event.clientX, event.clientY);
    };

    const checkForCatch = (mouseX, mouseY) => {
      if (isFrozen.value) return; // 성공 시 화면 멈춤(잡기 금지)
      if (!circleContainer.value) return;

      for (let i = items.value.length - 1; i >= 0; i--) {
        const item = items.value[i];
        const el = circleContainer.value.children?.[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const hit =
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom;

        if (hit) {
          items.value.splice(i, 1);
          items.value.push(createItem());
          caughtCounts.value[item.emoji] =
            (caughtCounts.value[item.emoji] || 0) + 1;

          // challenge success condition
          if (gameState.value === "challenge" && totalCaught.value >= 100) {
            stopTimer();

            // 성공: 화면 멈춤 + 기록 유지 + 24h 락
            gameState.value = "success";
            isFrozen.value = true;
            showSuccessModal.value = true;

            const next = Date.now() + 24 * 60 * 60 * 1000;
            nextChallengeAt.value = next;
            localStorage.setItem("movit_next_challenge_at", String(next));
          }

          break; // 한 번에 하나만 잡히게
        }
      }
    };

    const goHome = () => router.push({ path: "/home" });

    const closeSuccessModal = () => {
      showSuccessModal.value = false;
      // 성공 시 화면 멈춤 유지(캡처를 위해)
      // isFrozen.value = true; (이미 true)
    };

    const closeFailModal = () => {
      showFailModal.value = false;
      // 실패는 화면 멈출 필요 없으므로 그대로 둠
    };

    const retryChallenge = () => {
      showFailModal.value = false;
      startChallenge();
    };

    const mailtoHref = computed(() => {
      const to = "commetoi_yeoni@naver.com";
      const subject = encodeURIComponent(
        "[Movit] 도전 성공! 무료 영화 쿠폰 신청"
      );
      const body = encodeURIComponent(
        "안녕하세요!\n\nMovit 도전하기(30초 100개) 성공 화면을 캡처하여 첨부드립니다.\n무료 영화 쿠폰 부탁드립니다. 감사합니다!\n\n(※ 캡처 이미지는 첨부파일로 넣어주세요)"
      );
      return `mailto:${to}?subject=${subject}&body=${body}`;
    });

    const handleScroll = () => {};

    onMounted(() => {
      for (let i = 0; i < itemCount; i++) items.value.push(createItem());

      window.addEventListener("mousemove", handleMouseMove);

      // cooldown 표시 갱신용 tick
      clockId = setInterval(() => (nowTick.value = Date.now()), 1000);

      // 새로고침했는데 cooldown 중이면 UX 상 'practice' 상태로 유지
      // (성공 상태 복원까지 원하면 localStorage에 success flag 저장해서 복원하면 됨)
    });

    onBeforeUnmount(() => {
      stopTimer();
      window.removeEventListener("mousemove", handleMouseMove);
      if (clockId) clearInterval(clockId);
    });

    return {
      circleContainer,
      items,
      itemStyle,
      resetPosition,

      cursorX,
      cursorY,

      caughtCounts,
      totalCaught,

      gameState,
      isFrozen,

      timeLeft,
      canChallenge,
      cooldownText,
      challengeButtonText,

      startPractice,
      onChallengeClick,

      showSuccessModal,
      closeSuccessModal,

      showFailModal,
      closeFailModal,
      retryChallenge,

      mailtoHref,

      goHome,
      handleScroll,
    };
  },
};
</script>

<style scoped>
.scroll-container {
  overflow: hidden;
  position: relative;
  height: 150vh;
  cursor: none;
}

/* ===== HUD ===== */
.hud {
  position: fixed;
  top: 64px; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: min(1040px, 92%);
}

.hud-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  padding: 12px 14px;
  border-radius: 16px;

  background: rgba(18, 18, 18, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}

.hud-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hud-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.hud-title {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 900;
  letter-spacing: 0.2px;
  font-size: 14px;
  white-space: nowrap;
}

.mode {
  display: flex;
  gap: 8px;
}

.mbtn {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.9);

  padding: 9px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 900;
  font-size: 13px;
  transition: transform 160ms ease, background 160ms ease,
    border-color 160ms ease, opacity 160ms ease;
}

.mbtn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.09);
}

.mbtn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}

.mbtn.active {
  border-color: rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.12);
}

.mbtn.primary {
  border-color: rgba(248, 40, 254, 0.45);
  background: rgba(248, 40, 254, 0.18);
}

.mbtn.primary:hover {
  background: rgba(248, 40, 254, 0.22);
  border-color: rgba(248, 40, 254, 0.65);
}

.cooldown {
  font-size: 12px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.62);
  padding-left: 6px;
}

/* chips */
.chips {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 8px 10px;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chip.total {
  border-color: rgba(64, 160, 255, 0.22);
}

.chip-emoji {
  font-size: 16px;
  filter: drop-shadow(0 0 10px rgba(248, 40, 254, 0.35));
}

.chip-count {
  color: rgba(255, 255, 255, 0.92);
  font-weight: 900;
  font-size: 13px;
  min-width: 18px;
  text-align: right;
}

.challenge {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.challenge-item {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.challenge-item.success {
  border-color: rgba(80, 220, 140, 0.28);
}

.label {
  font-size: 12px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.65);
}

.value {
  font-size: 13px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.92);
}

/* ===== Falling items ===== */
.circle-container {
  height: 100%;
  position: relative;
}

.falling-item {
  font-size: 25px;
  position: absolute;
  top: 0;

  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.16))
    drop-shadow(0 0 18px rgba(248, 40, 254, 0.18));
  user-select: none;
  will-change: transform;
}

.falling-item.paused {
  animation-play-state: paused;
}

@keyframes fall {
  0% {
    transform: translateY(-120px) rotate(-6deg);
    opacity: 0.95;
  }
  100% {
    transform: translateY(160vh) rotate(10deg);
    opacity: 0.95;
  }
}

/* CTA */
.movit-cta {
  position: absolute;
  bottom: 56px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  border: 1px solid rgba(248, 40, 254, 0.35);
  background: rgba(248, 40, 254, 0.16);
  color: rgba(255, 255, 255, 0.92);

  padding: 12px 18px;
  border-radius: 16px;

  font-weight: 900;
  font-size: 18px;
  letter-spacing: 0.3px;

  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease,
    border-color 160ms ease;
  box-shadow: 0 14px 40px rgba(248, 40, 254, 0.12);
}

.movit-cta:hover {
  transform: translateX(-50%) translateY(-2px);
  background: rgba(248, 40, 254, 0.22);
  border-color: rgba(248, 40, 254, 0.55);
}

.cta-sub {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.7);
}

/* cursor */
.custom-cursor {
  width: 52px;
  height: 52px;
  background-image: url("@/assets/image/retro_small.png");
  background-size: cover;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 1000;

  filter: drop-shadow(0 0 12px rgba(248, 40, 254, 0.35));
}

/* ===== Modal ===== */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
}

.modal {
  width: min(520px, 96%);
  border-radius: 18px;
  padding: 18px 18px 16px;

  background: rgba(18, 18, 18, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.6);
  color: rgba(255, 255, 255, 0.92);
}

.modal-title {
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 8px;
}

.modal-desc {
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.6;
  font-size: 14px;
}

.modal-box {
  margin-top: 14px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mail {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.mail-label {
  font-size: 12px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.65);
}

.mail-value {
  font-size: 13px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.92);
}

.mail-hint {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.modal-actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.btn {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.92);
  padding: 10px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 900;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn.primary {
  border-color: rgba(248, 40, 254, 0.45);
  background: rgba(248, 40, 254, 0.18);
}

@media (max-width: 640px) {
  .hud {
    top: 66px;
  }
  .hud-inner {
    padding: 10px 12px;
  }
}
</style>

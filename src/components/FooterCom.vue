<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="brand">
        <span class="brand-name">Movit</span>
        <span class="brand-dot" aria-hidden="true">•</span>
        <span class="brand-desc">Move your ideas, neatly.</span>
      </div>

      <div class="meta">
        <p class="copyright">
          © {{ new Date().getFullYear() }} Movit. All rights reserved.
        </p>

        <div class="links" aria-label="Footer links">
          <a class="link" href="#" @click.prevent>Privacy</a>
          <span class="sep" aria-hidden="true">·</span>
          <a class="link" href="#" @click.prevent>Terms</a>
          <span class="sep" aria-hidden="true">·</span>
          <a class="link" href="#" @click.prevent>Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterCom",
};
</script>

<style scoped>
.footer {
  background: rgba(8, 8, 10, 0.92);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.35);
}

.footer::before {
  content: "";
  position: absolute;
  left: 0;
  top: -1px;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(64, 160, 255, 0.25),
    rgba(248, 40, 254, 0.45),
    transparent
  );
  pointer-events: none;
}

.footer-inner {
  width: min(1200px, 92%);
  margin: 0 auto;
  padding: 4px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
}

.brand-name {
  font-weight: 800;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.92);
}

.brand-dot {
  color: rgba(255, 255, 255, 0.35);
}

.brand-desc {
  color: rgba(255, 255, 255, 0.62);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
  text-align: right;
}

.copyright {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.62);
}

.links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.link {
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  font-size: 13px;
  padding: 6px 8px;
  border-radius: 10px;
  transition: background 160ms ease, color 160ms ease, transform 160ms ease;
}

.link:hover {
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.92);
  transform: translateY(-1px);
}

.link:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.35);
  outline-offset: 2px;
}

.sep {
  color: rgba(255, 255, 255, 0.28);
}

/* Mobile */
@media (max-width: 640px) {
  .footer-inner {
    padding: 16px 0;
    flex-direction: column;
    align-items: flex-start;
  }

  .meta {
    justify-content: flex-start;
    text-align: left;
  }

  .brand-desc {
    white-space: normal;
  }
}
</style>

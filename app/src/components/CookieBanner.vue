<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'

const STORAGE_KEY = 'fak_tuan_cookie_consent'
const visible = ref(false)
const bannerRef = ref<HTMLElement | null>(null)

function dismiss(choice: 'accepted' | 'declined') {
  localStorage.setItem(STORAGE_KEY, choice)
  gsap.to(bannerRef.value, {
    y: '100%',
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: () => { visible.value = false },
  })
}

onMounted(() => {
  if (localStorage.getItem(STORAGE_KEY)) return
  visible.value = true
  gsap.fromTo(
    bannerRef.value,
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out', delay: 1.2 },
  )
})
</script>

<template>
  <Transition name="cookie">
    <div v-if="visible" ref="bannerRef" class="cookie-banner" role="dialog" aria-label="คุกกี้">
      <div class="cookie-banner__inner">
        <div class="cookie-banner__text">
          <span class="cookie-banner__icon">🍪</span>
          <div>
            <p class="cookie-banner__title">เราใช้คุกกี้</p>
            <p class="cookie-banner__desc">
              เว็บไซต์นี้ใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งานและวิเคราะห์การเข้าชม
              อ่านเพิ่มเติมใน
              <RouterLink to="/privacy" class="cookie-banner__link">นโยบายความเป็นส่วนตัว</RouterLink>
            </p>
          </div>
        </div>
        <div class="cookie-banner__actions">
          <button class="cookie-btn cookie-btn--decline" @click="dismiss('declined')">ปฏิเสธ</button>
          <button class="cookie-btn cookie-btn--accept" @click="dismiss('accepted')">ยอมรับทั้งหมด</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: var(--brand-dark);
  color: rgba(255, 255, 255, 0.88);
  box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.18);
  will-change: transform, opacity;
}

.cookie-banner__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.cookie-banner__text {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex: 1;
  min-width: 240px;
}

.cookie-banner__icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.cookie-banner__title {
  font-weight: 700;
  font-size: 0.92rem;
  color: #fff;
  margin-bottom: 3px;
}

.cookie-banner__desc {
  font-size: 0.82rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.7);
}

.cookie-banner__link {
  color: var(--brand-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.cookie-banner__actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.cookie-btn {
  font-family: var(--font-base);
  font-size: 0.88rem;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: transform 0.15s, opacity 0.15s;
  white-space: nowrap;
}

.cookie-btn:hover { transform: translateY(-1px); opacity: 0.88; }

.cookie-btn--decline {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cookie-btn--accept {
  background: var(--brand-primary);
  color: #fff;
}

@media (max-width: 520px) {
  .cookie-banner__inner { flex-direction: column; gap: 14px; padding: 16px 18px; }
  .cookie-banner__actions { width: 100%; }
  .cookie-btn { flex: 1; text-align: center; }
}
</style>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="footer__logo">🔔 ฝากเตือนที</span>
        <p class="footer__tagline">ระบบแจ้งเตือนอัตโนมัติสำหรับ Line กลุ่ม</p>
      </div>
      <div class="footer__links">
        <a href="#features">ฟีเจอร์</a>
        <a href="#how">วิธีใช้</a>
        <a href="#pricing">ราคา</a>
        <RouterLink to="/privacy">นโยบายความเป็นส่วนตัว</RouterLink>
        <RouterLink to="/contact">ติดต่อเรา</RouterLink>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© {{ new Date().getFullYear() }} ฝากเตือนที · สงวนลิขสิทธิ์</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--brand-dark);
  color: rgba(255, 255, 255, 0.7);
  padding: 48px 0 0;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  flex-wrap: wrap;
  padding-bottom: 40px;
}

.footer__logo {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--white);
  display: block;
  margin-bottom: 8px;
}

.footer__tagline {
  font-size: 0.85rem;
  line-height: 1.5;
  max-width: 240px;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  align-items: center;
}

.footer__links a {
  font-size: 0.88rem;
  transition: color 0.15s;
}

.footer__links a:hover {
  color: var(--white);
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 18px 24px;
  text-align: center;
  font-size: 0.8rem;
}

@media (max-width: 600px) {
  .footer__inner {
    flex-direction: column;
  }
}
</style>

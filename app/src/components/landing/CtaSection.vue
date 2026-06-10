<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'

const section = ref<HTMLElement | null>(null)
useReveal(section, { preset: 'fadeIn', duration: 0.8 })
</script>

<template>
  <section class="cta-section" ref="section">
    <div class="container cta-section__inner">
      <h2 class="cta-section__heading">
        อย่าให้ความ<span class="cta-highlight">ลืม</span><br />
        เป็นปัญหาอีกต่อไป
      </h2>
      <p class="cta-section__sub">เริ่มใช้ฝากเตือนวันนี้ ทดลองใช้ฟรี 7 วัน ไม่ต้องใช้บัตรเครดิต</p>
      <a href="#pricing" class="btn-cta">เริ่มใช้งานฟรีเลย →</a>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  background: linear-gradient(135deg, var(--brand-primary) 0%, #7c6af0 100%);
  padding: 96px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 300px; height: 300px;
  background: rgba(255,255,255,0.06);
  border-radius: 50%;
}

.cta-section::after {
  content: '';
  position: absolute;
  bottom: -80px; left: -40px;
  width: 240px; height: 240px;
  background: rgba(255,255,255,0.04);
  border-radius: 50%;
}

.cta-section__inner { position: relative; z-index: 1; }

.cta-section__heading {
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  font-weight: 700;
  color: var(--white);
  line-height: 1.25;
  margin-bottom: 20px;
}

.cta-highlight { color: var(--brand-accent); }

.cta-section__sub {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.85);
  margin-bottom: 36px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--white);
  color: var(--brand-primary);
  font-family: var(--font-base);
  font-size: 1.05rem;
  font-weight: 700;
  padding: 16px 40px;
  border-radius: 50px;
  transition: transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
}

.btn-cta:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }

@media (max-width: 520px) {
  .cta-section { padding: 64px 20px; }
  .cta-section__sub { font-size: 0.95rem; }
  .btn-cta { width: 100%; justify-content: center; padding: 14px 24px; }
}
</style>

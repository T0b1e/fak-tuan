<script setup lang="ts">
import { ref } from 'vue'
import { useReveal, useStaggerReveal } from '@/composables/useReveal'

const section = ref<HTMLElement | null>(null)
const head = ref<HTMLElement | null>(null)
useReveal(head, { preset: 'fadeUp' })
useStaggerReveal(section, '.feature-card', { preset: 'fadeUp', stagger: 0.1, start: 'top 85%' })

const features = [
  { icon: '🔔', title: 'ตั้งเตือนล่วงหน้าได้',   desc: 'กำหนดให้แจ้งเตือนก่อน deadline กี่นาที กี่ชั่วโมง หรือกี่วันก็ได้ตามต้องการ', bell: true },
  { img: '/img/line-svgrepo-com.svg',              title: 'ส่งตรงเข้า Line กลุ่ม',  desc: 'ข้อความเตือนจะถูกส่งเข้ากลุ่มโดยอัตโนมัติ ไม่ต้องนั่งรอส่งเอง' },
  { img: '/img/google-calendar-svgrepo-com.svg',   title: 'เชื่อม Google Calendar', desc: 'นำเข้ากำหนดการจาก Google Calendar ได้เลย ไม่ต้องกรอกซ้ำ' },
  { icon: '🏷️', title: 'จัดการด้วยแท็กและลำดับ', desc: 'ติดแท็ก กำหนดลำดับความสำคัญ และช่วงเวลาของแต่ละรายการได้ตามสะดวก' },
  { icon: '👥', title: 'ใช้ได้หลายกลุ่ม',         desc: 'จัดการได้หลาย Line กลุ่มพร้อมกัน เหมาะสำหรับทั้ง ครู นักเรียน และทีมงาน' },
  { icon: '⚡', title: 'ตั้งค่าง่าย ใช้เร็ว',      desc: 'ไม่ต้องโหลดแอป ใช้ผ่านเว็บได้เลย จัดการทุกอย่างในที่เดียว' },
  { icon: '🔒', title: 'ปลอดภัยไว้ใจได้',         desc: 'ข้อมูลของคุณถูกเข้ารหัสและเก็บอย่างปลอดภัย ไม่มีการแชร์ข้อมูลกับบุคคลที่สาม' },
]
</script>

<template>
  <section id="features" class="features" ref="section">
    <div class="container">
      <div class="features__head" ref="head">
        <div class="section-label">ฟีเจอร์</div>
        <h2 class="section-title">ครบ จบ ในที่เดียว</h2>
        <p class="section-desc">ทุกฟีเจอร์ออกแบบมาให้ใช้ง่ายที่สุด เพื่อให้คุณเอาเวลาไปทำสิ่งสำคัญกว่านี้</p>
      </div>
      <div class="features__grid">
        <div v-for="f in features" :key="f.title" class="feature-card">
          <div class="feature-card__icon">
            <img v-if="f.img" :src="f.img" :alt="f.title" class="feature-icon-img" />
            <span v-else :class="{ 'bell-icon': f.bell }">{{ f.icon }}</span>
          </div>
          <div>
            <h3 class="feature-card__title">{{ f.title }}</h3>
            <p class="feature-card__desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: 80px 0;
  background: var(--white);
  position: relative;
  overflow: hidden;
}

.features::before {
  content: '';
  position: absolute;
  top: -60px; left: -100px;
  width: 400px; height: 400px;
  background: rgba(124, 106, 240, 0.06);
  border-radius: 50%;
  pointer-events: none;
}

.features::after {
  content: '';
  position: absolute;
  bottom: -80px; right: -60px;
  width: 300px; height: 300px;
  background: rgba(91, 106, 240, 0.06);
  border-radius: 50%;
  pointer-events: none;
}

.features .container { position: relative; z-index: 1; }

.features__head { text-align: center; margin-bottom: 52px; }
.features__head .section-desc { margin: 0 auto; }

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.feature-card {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  padding: 28px 24px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--brand-gray);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.feature-card:hover { border-color: var(--brand-primary); box-shadow: var(--shadow-sm); }

.feature-card__icon {
  font-size: 1.8rem;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 2px;
}

.feature-icon-img {
  width: 1.8rem;
  height: 1.8rem;
  object-fit: contain;
  display: block;
}

/* ── shaking bell ── */
.bell-icon {
  display: inline-block;
  transform-origin: top center;
  animation: bell-ring 3.2s ease-in-out infinite;
}

@keyframes bell-ring {
  /* long pause before each ring */
  0%, 55%    { transform: rotate(0deg); }
  58%        { transform: rotate(18deg); }
  61%        { transform: rotate(-15deg); }
  64%        { transform: rotate(12deg); }
  67%        { transform: rotate(-9deg); }
  70%        { transform: rotate(6deg); }
  73%        { transform: rotate(-3deg); }
  76%, 100%  { transform: rotate(0deg); }
}

.feature-card__title { font-size: 1rem; font-weight: 700; color: var(--brand-dark); margin-bottom: 6px; }

.feature-card__desc { font-size: 0.9rem; color: var(--brand-mid); line-height: 1.6; }

@media (max-width: 600px) {
  .features { padding: 60px 0; }
  .features__head { margin-bottom: 36px; }
  .features__grid { grid-template-columns: 1fr; gap: 16px; }
  .feature-card { padding: 20px 18px; gap: 14px; }
}
</style>

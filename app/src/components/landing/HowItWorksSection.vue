<script setup lang="ts">
import { ref } from 'vue'
import { useStaggerReveal } from '@/composables/useReveal'

const section = ref<HTMLElement | null>(null)
useStaggerReveal(section, '.step', { preset: 'fadeLeft', stagger: 0.18 })

const steps = [
  {
    num: '01',
    icon: '📝',
    title: 'ลงทะเบียน',
    desc: 'สมัครบัญชีด้วยอีเมล ใช้เวลาไม่ถึง 1 นาที ไม่ต้องโหลดแอปเพิ่ม',
  },
  {
    num: '02',
    img: '/img/google-calendar-svgrepo-com.svg',
    title: 'ผูกกับ Google Calendar',
    desc: 'เชื่อมต่อบัญชี Google เพื่อดึงกำหนดการเข้ามาอัตโนมัติ ไม่ต้องกรอกซ้ำ',
  },
  {
    num: '03',
    img: '/img/line-svgrepo-com.svg',
    title: 'เลือกกลุ่มและเชิญบอต',
    desc: 'เลือก Line กลุ่มที่ต้องการ แล้วเชิญน้องบอตฝากเตือนเข้ากลุ่ม บอกให้ทราบว่าน้องจะคอยช่วยเตือน',
  },
  {
    num: '04',
    icon: '🚀',
    title: 'เริ่มเล่นเลย!',
    desc: 'ระบบพร้อมส่งการแจ้งเตือนเข้ากลุ่มทันที ตั้งค่าเพิ่มเติมได้ตามใจ',
  },
]
</script>

<template>
  <section id="how" class="how" ref="section">
    <div class="container">
      <div class="how__head">
        <div class="section-label">วิธีใช้</div>
        <h2 class="section-title">เริ่มใช้งานได้ใน 4 ขั้นตอน</h2>
        <p class="section-desc">ง่ายมาก ไม่ต้องมีความรู้ด้านเทคนิคเลย</p>
      </div>

      <div class="timeline">
        <!-- the vertical connecting line -->
        <div class="timeline__line" aria-hidden="true" />

        <div v-for="(step, i) in steps" :key="step.num" class="step">
          <!-- dot + number on the line -->
          <div class="step__dot">
            <span class="step__num">{{ step.num }}</span>
          </div>

          <!-- card content -->
          <div class="step__card">
            <div class="step__icon">
              <img v-if="step.img" :src="step.img" :alt="step.title" class="step-icon-img" />
              <template v-else>{{ step.icon }}</template>
            </div>
            <div class="step__body">
              <h3 class="step__title">{{ step.title }}</h3>
              <p class="step__desc">{{ step.desc }}</p>
            </div>
            <!-- connector arrow pointing left toward the line -->
            <div class="step__arrow" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how {
  padding: 80px 0;
  background: var(--brand-light);
  position: relative;
  overflow: hidden;
}

.how::before {
  content: '';
  position: absolute;
  top: 50%; left: -120px;
  transform: translateY(-50%);
  width: 360px; height: 360px;
  background: rgba(245, 166, 35, 0.08);
  border-radius: 50%;
  pointer-events: none;
}

.how::after {
  content: '';
  position: absolute;
  top: -60px; right: -80px;
  width: 260px; height: 260px;
  background: rgba(91, 106, 240, 0.07);
  border-radius: 50%;
  pointer-events: none;
}

.how .container { position: relative; z-index: 1; }

.how__head {
  text-align: center;
  margin-bottom: 56px;
}
.how__head .section-desc { margin: 0 auto; }

/* ── timeline shell ── */
.timeline {
  position: relative;
  max-width: 640px;
  margin: 0 auto;
}

/* the vertical line */
.timeline__line {
  position: absolute;
  left: 28px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--brand-primary) 8%,
    var(--brand-primary) 92%,
    transparent 100%
  );
  opacity: 0.25;
}

/* ── each step ── */
.step {
  display: flex;
  align-items: flex-start;
  gap: 28px;
  padding-bottom: 36px;
  position: relative;
}

.step:last-child { padding-bottom: 0; }

/* dot */
.step__dot {
  flex-shrink: 0;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(91, 106, 240, 0.35);
  position: relative;
  z-index: 1;
}

/* ── beam rings ── */
.step__dot::before,
.step__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(91, 106, 240, 0.45);
  animation: beam-ring 2.4s ease-out infinite;
  pointer-events: none;
  z-index: -1;
}

.step__dot::after {
  animation-delay: 1.2s;
}

/* last step dot (amber) */
.step:last-child .step__dot::before,
.step:last-child .step__dot::after {
  background: rgba(245, 166, 35, 0.5);
}

@keyframes beam-ring {
  0%   { transform: scale(1);   opacity: 0.55; }
  100% { transform: scale(2.6); opacity: 0; }
}

.step__num {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.04em;
  position: relative;
  z-index: 1;
}

/* card */
.step__card {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 20px 22px;
  box-shadow: var(--shadow-sm);
  position: relative;
  margin-top: 8px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.step__card:hover {
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

/* small left arrow pointing at the dot */
.step__arrow {
  position: absolute;
  left: -8px;
  top: 18px;
  width: 0; height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid var(--white);
  filter: drop-shadow(-2px 0 2px rgba(91,106,240,0.06));
}

.step__icon {
  font-size: 1.6rem;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 2px;
}

.step-icon-img {
  width: 1.6rem;
  height: 1.6rem;
  object-fit: contain;
  display: block;
}

.step__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--brand-dark);
  margin-bottom: 6px;
}

.step__desc {
  font-size: 0.9rem;
  color: var(--brand-mid);
  line-height: 1.65;
}

/* last step accent — make it pop */
.step:last-child .step__dot {
  background: linear-gradient(135deg, var(--brand-accent), #e8901a);
  box-shadow: 0 4px 20px rgba(245, 166, 35, 0.4);
}

@media (max-width: 560px) {
  .timeline__line { left: 24px; }
  .step__dot { width: 50px; height: 50px; }
  .step__card { padding: 16px; }
}
</style>

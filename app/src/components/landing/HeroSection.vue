<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import AnimatedChatPhone from './AnimatedChatPhone.vue'

const heroRef = ref<HTMLElement | null>(null)
let floatCtx: gsap.Context

interface Word { text: string; weight: number; color: string }

const words: Word[] = [
  { text: 'ส่งงาน',        weight: 5, color: '#5b6af0' },
  { text: 'สอบกลางภาค',    weight: 5, color: '#e05678' },
  { text: 'ครูลา',         weight: 4, color: '#f5a623' },
  { text: 'การบ้าน',       weight: 5, color: '#5b6af0' },
  { text: 'ใส่ชุดพละ',     weight: 4, color: '#06c755' },
  { text: 'Deadline',      weight: 5, color: '#e05678' },
  { text: 'ประชุม',        weight: 4, color: '#7c6af0' },
  { text: 'ทัศนศึกษา',    weight: 3, color: '#f5a623' },
  { text: 'ส่งรายงาน',    weight: 4, color: '#06c755' },
  { text: 'ลงทะเบียน',    weight: 4, color: '#e05678' },
  { text: 'จ่ายค่าเทอม',  weight: 3, color: '#5b6af0' },
  { text: 'สอบปลายภาค',   weight: 5, color: '#7c6af0' },
  { text: 'Quiz',          weight: 2, color: '#e05678' },
  { text: 'อบรม',          weight: 2, color: '#f5a623' },
  { text: 'นัดหมอ',        weight: 3, color: '#7c6af0' },
]

const shuffled = [...words].sort(() => Math.random() - 0.5)

const sizeMap: Record<number, string> = {
  5: '1.2rem',
  4: '0.95rem',
  3: '0.8rem',
  2: '0.7rem',
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.hero__label',   { opacity: 0, y: 24,  duration: 0.6 })
    .from('.hero__heading',  { opacity: 0, y: 40,  duration: 0.8 }, '-=0.3')
    .from('.hero__sub',      { opacity: 0, y: 24,  duration: 0.7 }, '-=0.5')
    .from('.hero-word-chip', {
      opacity: 0,
      scale: 0.3,
      y: () => gsap.utils.random(-24, 24),
      x: () => gsap.utils.random(-20, 20),
      duration: 0.5,
      stagger: { each: 0.04, from: 'random' },
      ease: 'back.out(1.6)',
    }, '-=0.3')
    .from('.hero__actions',  { opacity: 0, y: 20,  duration: 0.6 }, '-=0.2')
    .from('.hero__note',     { opacity: 0,          duration: 0.5 }, '-=0.3')
    .from('.phone-frame',    { opacity: 0, x: 60, scale: 0.9, duration: 0.9, ease: 'back.out(1.2)' }, '-=1.2')
    .from('.chat-bubble',    { opacity: 0, x: 24, stagger: 0.15, duration: 0.5 }, '-=0.5')

  // start slow random drift on each word chip after they have appeared
  tl.call(() => {
    floatCtx = gsap.context(() => {
      document.querySelectorAll('.hero-word-chip').forEach((chip) => {
        gsap.to(chip, {
          x: () => gsap.utils.random(-9, 9),
          y: () => gsap.utils.random(-9, 9),
          rotation: () => gsap.utils.random(-4, 4),
          duration: () => gsap.utils.random(3, 6),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 2.5),
        })
      })
    })
  })
})

onUnmounted(() => floatCtx?.revert())
</script>

<template>
  <section class="hero" ref="heroRef">
    <div class="container hero__inner">
      <div class="hero__text">
        <div class="section-label hero__label">Line Group Reminder</div>
        <h1 class="hero__heading">
          เหนื่อยมั้ย<br />
          กับการ<span class="highlight">ลืม</span>?
        </h1>
        <p class="hero__sub">
          ครูลา วันนี้ใส่เสื้ออะไร ส่งงานวันไหน — ทุกอย่างอยู่ใน Line กลุ่ม<br />
          แต่ใครจะไปจำได้ทุกอย่าง? <strong>ฝากเตือนที</strong> จัดการให้คุณแทน
        </p>

        <!-- mini word cloud -->
        <div class="hero-cloud">
          <span
            v-for="w in shuffled"
            :key="w.text"
            class="hero-word-chip"
            :style="{
              fontSize: sizeMap[w.weight],
              color: w.color,
              fontWeight: w.weight >= 4 ? '700' : w.weight === 3 ? '600' : '500',
            }"
          >{{ w.text }}</span>
        </div>

        <div class="hero__actions">
          <a href="#pricing" class="btn-primary">
            ทดลองใช้ฟรี 7 วัน
            <span>→</span>
          </a>
          <a href="#how" class="btn-outline">ดูวิธีใช้</a>
        </div>
        <p class="hero__note">ไม่ต้องใช้บัตรเครดิต · ยกเลิกได้ทุกเมื่อ</p>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <AnimatedChatPhone class="hero__back-phone" />
        <div class="phone-frame">
          <div class="phone-status">Line Group: ห้อง ม.5/3</div>
          <div class="chat-bubble bot">
            🔔 <strong>แจ้งเตือน</strong><br />
            พรุ่งนี้ครูลา — ครูสมชายเข้าแทน<br />
            <span class="bubble-time">08:00 น.</span>
          </div>
          <div class="chat-bubble bot">
            📚 <strong>ส่งการบ้านวิทย์</strong><br />
            ภายในวันนี้ 17:00 น.<br />
            <span class="bubble-time">07:00 น.</span>
          </div>
          <div class="chat-bubble bot">
            👕 <strong>วันนี้ใส่ชุดพละ</strong><br />
            อย่าลืมเปลี่ยนเสื้อนะ!<br />
            <span class="bubble-time">06:30 น.</span>
          </div>
          <div class="ping-badge">3 เตือนวันนี้</div>
        </div>
      </div>
    </div>

    <div class="hero__wave" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f8f9ff" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #eef0fd 0%, #fef9f0 100%);
  display: flex;
  flex-direction: column;
  padding-top: 90px;
  position: relative;
  overflow: hidden;
}

/* decorative bubbles */
.hero::before {
  content: '';
  position: absolute;
  top: -120px; left: -80px;
  width: 480px; height: 480px;
  background: rgba(91, 106, 240, 0.09);
  border-radius: 50%;
  pointer-events: none;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 60px; right: -100px;
  width: 360px; height: 360px;
  background: rgba(245, 166, 35, 0.1);
  border-radius: 50%;
  pointer-events: none;
}

.hero__inner {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 64px;
  padding-top: 40px;
  padding-bottom: 60px;
  position: relative;
  z-index: 1;
}

.hero__text { flex: 1; min-width: 0; }

.hero__heading {
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--brand-dark);
  margin-bottom: 20px;
  margin-top: 8px;
}

.highlight {
  color: var(--brand-primary);
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--brand-accent);
  opacity: 0.5;
  border-radius: 3px;
}

.hero__sub {
  font-size: 1.1rem;
  color: var(--brand-mid);
  line-height: 1.75;
  margin-bottom: 20px;
  max-width: 480px;
}

/* ── mini word cloud ── */
.hero-cloud {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin-bottom: 28px;
  max-width: 480px;
}

.hero-word-chip {
  display: inline-block;
  line-height: 1.3;
  cursor: default;
  user-select: none;
  will-change: transform;
}

/* ── actions ── */
.hero__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.hero__note { margin-top: 14px; font-size: 0.82rem; color: #999; }

/* ── phone mockup ── */
.hero__visual {
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  position: relative;
}

.hero__back-phone {
  position: absolute;
  top: 24px;
  right: -220px;
  transform: rotate(7deg) scale(0.88);
  transform-origin: top center;
  z-index: 0;
  opacity: 0.72;
  pointer-events: none;
}

.phone-frame {
  width: 260px;
  background: #fff;
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
  padding: 16px 12px;
  position: relative;
  z-index: 1;
  border: 6px solid #e8eaf0;
}

.phone-status {
  font-size: 0.72rem;
  font-weight: 600;
  color: #06c755;
  text-align: center;
  padding: 6px 0 10px;
  border-bottom: 1px solid var(--brand-gray);
  margin-bottom: 12px;
}

.chat-bubble {
  background: var(--brand-light);
  border-radius: 12px 12px 12px 4px;
  padding: 10px 12px;
  font-size: 0.78rem;
  line-height: 1.5;
  margin-bottom: 10px;
  color: var(--brand-dark);
}

.bubble-time { font-size: 0.68rem; color: #aaa; display: block; margin-top: 4px; }

.ping-badge {
  position: absolute;
  top: -12px;
  right: -12px;
  background: var(--brand-accent);
  color: var(--white);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(245, 166, 35, 0.4);
}

.hero__wave { line-height: 0; }
.hero__wave svg { display: block; width: 100%; height: 80px; }

@media (max-width: 780px) {
  .hero__inner { flex-direction: column; gap: 40px; padding-top: 24px; text-align: center; }
  .hero__sub { margin: 0 auto 20px; }
  .hero-cloud { justify-content: center; margin: 0 auto 28px; }
  .hero__actions { justify-content: center; }
  .hero__note { text-align: center; }
  .hero__back-phone { display: none; }
}

@media (max-width: 480px) {
  .phone-frame { width: 220px; }
  .hero__actions { flex-direction: column; align-items: stretch; }
  .hero__actions a { text-align: center; justify-content: center; }
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import NavBar from '@/components/landing/NavBar.vue'
import FooterSection from '@/components/landing/FooterSection.vue'

const formRef = ref<HTMLElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)

const form = ref({ name: '', email: '', subject: '', message: '' })
const submitted = ref(false)
const loading = ref(false)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.contact-hero__label', { opacity: 0, y: 20, duration: 0.5 })
      .from('.contact-hero__title', { opacity: 0, y: 36, duration: 0.7 }, '-=0.3')
      .from('.contact-hero__sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')

    gsap.from('.contact-card', {
      opacity: 0,
      y: 48,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.3,
    })

    gsap.from('.info-item', {
      opacity: 0,
      x: -32,
      stagger: 0.12,
      duration: 0.55,
      ease: 'power3.out',
      delay: 0.5,
    })

    gsap.from('.form-group', {
      opacity: 0,
      y: 24,
      stagger: 0.08,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.5,
    })
  })
})

onUnmounted(() => ctx?.revert())

function handleSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    submitted.value = true
    gsap.from('.success-msg', { opacity: 0, scale: 0.85, duration: 0.5, ease: 'back.out(1.5)' })
  }, 1200)
}
</script>

<template>
  <NavBar />
  <main class="contact-page">
    <!-- Hero -->
    <section class="contact-hero" ref="heroRef">
      <div class="container contact-hero__inner">
        <div class="section-label contact-hero__label">ติดต่อเรา</div>
        <h1 class="contact-hero__title">มีคำถาม? ยินดีตอบทุกข้อ</h1>
        <p class="contact-hero__sub">
          ทีมงานฝากเตือนพร้อมช่วยเหลือคุณ ไม่ว่าจะเป็นปัญหาการใช้งาน ข้อเสนอแนะ หรืออยากร่วมงานกัน
        </p>
      </div>
      <div class="contact-hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8f9ff" />
        </svg>
      </div>
    </section>

    <!-- Body -->
    <section class="contact-body">
      <div class="container contact-body__inner">
        <!-- Info sidebar -->
        <aside class="contact-info">
          <div class="info-item">
            <div class="info-item__icon">📧</div>
            <div>
              <div class="info-item__label">อีเมล</div>
              <div class="info-item__value">hello@faktuan.app</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item__icon">💬</div>
            <div>
              <div class="info-item__label">Line Official</div>
              <div class="info-item__value">@faktuan</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item__icon">⏱️</div>
            <div>
              <div class="info-item__label">เวลาทำการ</div>
              <div class="info-item__value">จันทร์–ศุกร์ 9:00–18:00 น.</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item__icon">⚡</div>
            <div>
              <div class="info-item__label">เวลาตอบกลับ</div>
              <div class="info-item__value">ภายใน 1 วันทำการ</div>
            </div>
          </div>
          <div class="info-callout">
            <span class="callout-icon">🎓</span>
            <p>ทีมหรือโรงเรียนที่ต้องการแพ็กเกจพิเศษ ติดต่อเราได้โดยตรง</p>
          </div>
        </aside>

        <!-- Form -->
        <div class="contact-card" ref="formRef">
          <div v-if="!submitted">
            <h2 class="contact-card__title">ส่งข้อความหาเรา</h2>
            <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
              <div class="form-row">
                <div class="form-group">
                  <label for="name">ชื่อ–นามสกุล</label>
                  <input id="name" v-model="form.name" type="text" placeholder="คุณชื่ออะไร?" required />
                </div>
                <div class="form-group">
                  <label for="email">อีเมล</label>
                  <input id="email" v-model="form.email" type="email" placeholder="example@email.com" required />
                </div>
              </div>
              <div class="form-group">
                <label for="subject">หัวข้อ</label>
                <select id="subject" v-model="form.subject" required>
                  <option value="" disabled>เลือกหัวข้อ</option>
                  <option>สอบถามการใช้งาน</option>
                  <option>รายงานปัญหา</option>
                  <option>ข้อเสนอแนะฟีเจอร์</option>
                  <option>แพ็กเกจองค์กร / โรงเรียน</option>
                  <option>อื่นๆ</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message">ข้อความ</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  placeholder="เขียนรายละเอียดมาได้เลย..."
                  required
                />
              </div>
              <button type="submit" class="btn-primary submit-btn" :disabled="loading">
                <span v-if="loading" class="loader" />
                <span v-else>ส่งข้อความ →</span>
              </button>
            </form>
          </div>

          <div v-else class="success-msg">
            <div class="success-msg__icon">🎉</div>
            <h3>ส่งสำเร็จแล้ว!</h3>
            <p>ขอบคุณที่ติดต่อมานะ เราจะรีบตอบกลับภายใน 1 วันทำการ</p>
            <button class="btn-outline" style="margin-top:16px" @click="submitted = false; form = { name: '', email: '', subject: '', message: '' }">
              ส่งข้อความอีกครั้ง
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
  <FooterSection />
</template>

<style scoped>
.contact-page { background: var(--brand-light); min-height: 100vh; }

/* Hero */
.contact-hero {
  background: linear-gradient(135deg, #eef0fd 0%, #fef9f0 100%);
  padding: 120px 0 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.contact-hero::before {
  content: '';
  position: absolute;
  top: -80px; left: -80px;
  width: 380px; height: 380px;
  background: rgba(91, 106, 240, 0.09);
  border-radius: 50%;
  pointer-events: none;
}

.contact-hero::after {
  content: '';
  position: absolute;
  top: 20px; right: -60px;
  width: 260px; height: 260px;
  background: rgba(245, 166, 35, 0.09);
  border-radius: 50%;
  pointer-events: none;
}

.contact-hero__inner { position: relative; z-index: 1; }

.contact-hero__inner { padding-bottom: 48px; }

.contact-hero__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--brand-dark);
  margin: 12px 0 16px;
  line-height: 1.25;
}

.contact-hero__sub {
  font-size: 1.05rem;
  color: var(--brand-mid);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.7;
}

.contact-hero__wave { line-height: 0; }
.contact-hero__wave svg { display: block; width: 100%; height: 60px; }

/* Body */
.contact-body { padding: 64px 0 96px; }

.contact-body__inner {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 48px;
  align-items: start;
}

/* Info */
.contact-info { display: flex; flex-direction: column; gap: 20px; }

.info-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--white);
  padding: 18px 20px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.info-item__icon { font-size: 1.4rem; flex-shrink: 0; }
.info-item__label { font-size: 0.78rem; color: var(--brand-mid); font-weight: 500; margin-bottom: 2px; }
.info-item__value { font-size: 0.92rem; font-weight: 600; color: var(--brand-dark); }

.info-callout {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: var(--brand-primary-light);
  border: 1.5px solid var(--brand-primary);
  border-radius: var(--radius-md);
  padding: 16px 18px;
}

.callout-icon { font-size: 1.3rem; flex-shrink: 0; }

.info-callout p { font-size: 0.88rem; color: var(--brand-primary); font-weight: 500; line-height: 1.5; }

/* Card */
.contact-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 48px 40px;
  box-shadow: var(--shadow-md);
}

.contact-card__title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--brand-dark);
  margin-bottom: 28px;
}

/* Form */
.contact-form { display: flex; flex-direction: column; gap: 20px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.form-group { display: flex; flex-direction: column; gap: 7px; }

.form-group label { font-size: 0.88rem; font-weight: 600; color: var(--brand-dark); }

.form-group input,
.form-group select,
.form-group textarea {
  font-family: var(--font-base);
  font-size: 0.95rem;
  color: var(--brand-dark);
  background: var(--brand-light);
  border: 1.5px solid var(--brand-gray);
  border-radius: var(--radius-sm);
  padding: 11px 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(91, 106, 240, 0.12);
  background: var(--white);
}

.form-group input::placeholder,
.form-group textarea::placeholder { color: #bbb; }

.submit-btn { align-self: flex-start; position: relative; min-width: 160px; justify-content: center; }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }

.loader {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Success */
.success-msg { text-align: center; padding: 40px 0; }
.success-msg__icon { font-size: 3.5rem; margin-bottom: 16px; }
.success-msg h3 { font-size: 1.4rem; font-weight: 700; color: var(--brand-dark); margin-bottom: 10px; }
.success-msg p { color: var(--brand-mid); font-size: 0.95rem; }

@media (max-width: 860px) {
  .contact-body__inner { grid-template-columns: 1fr; }
  .contact-info { flex-direction: row; flex-wrap: wrap; }
  .info-item { flex: 1; min-width: 200px; }
}

@media (max-width: 560px) {
  .contact-card { padding: 28px 20px; }
  .form-row { grid-template-columns: 1fr; }
}
</style>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import gsap from 'gsap'

type Panel = 'login' | 'signup' | 'forgot' | 'otp'

const panel = ref<Panel>('login')
const cardRef = ref<HTMLElement | null>(null)

// keep otp destination for display
const otpTarget = ref('')

function animateTransition(to: Panel) {
  if (!cardRef.value) { panel.value = to; return }
  gsap.to(cardRef.value, {
    opacity: 0, y: 12, duration: 0.18, ease: 'power2.in',
    onComplete: () => {
      panel.value = to
      nextTick(() => {
        gsap.fromTo(cardRef.value, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power3.out' })
      })
    },
  })
}

function goTo(to: Panel, email = '') {
  if (to === 'otp') otpTarget.value = email
  animateTransition(to)
}

// form state
const loginEmail    = ref('')
const loginPass     = ref('')
const signupName    = ref('')
const signupEmail   = ref('')
const signupPass    = ref('')
const signupConfirm = ref('')
const forgotEmail   = ref('')
const otp           = ref(['', '', '', '', '', ''])
const showPass      = ref(false)

function otpInput(i: number, e: Event) {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(-1)
  otp.value[i] = val
  if (val && i < 5) {
    const next = document.querySelector<HTMLInputElement>(`.otp-box:nth-child(${i + 2})`)
    next?.focus()
  }
}

function otpKeydown(i: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !otp.value[i] && i > 0) {
    const prev = document.querySelector<HTMLInputElement>(`.otp-box:nth-child(${i})`)
    prev?.focus()
  }
}

// initial mount animation
import { onMounted } from 'vue'
onMounted(() => {
  gsap.fromTo(cardRef.value,
    { opacity: 0, y: 28, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
  )
})
</script>

<template>
  <div class="auth-page">
    <!-- background blobs -->
    <div class="auth-blob auth-blob--1" />
    <div class="auth-blob auth-blob--2" />

    <!-- logo -->
    <a href="/" class="auth-logo">🔔 ฝากเตือนที</a>

    <!-- card -->
    <div ref="cardRef" class="auth-card">

      <!-- ── LOGIN ── -->
      <template v-if="panel === 'login'">
        <div class="auth-card__head">
          <h1 class="auth-card__title">เข้าสู่ระบบ</h1>
          <p class="auth-card__sub">ยินดีต้อนรับกลับ! เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
        </div>

        <form class="auth-form" @submit.prevent>
          <div class="field">
            <label>อีเมล</label>
            <input v-model="loginEmail" type="email" placeholder="you@example.com" autocomplete="email" />
          </div>
          <div class="field">
            <label>
              รหัสผ่าน
              <button type="button" class="toggle-pass" @click="showPass = !showPass">
                {{ showPass ? 'ซ่อน' : 'แสดง' }}
              </button>
            </label>
            <input v-model="loginPass" :type="showPass ? 'text' : 'password'" placeholder="••••••••" autocomplete="current-password" />
          </div>
          <div class="field-row">
            <label class="checkbox-label">
              <input type="checkbox" /> จดจำฉัน
            </label>
            <button type="button" class="text-btn" @click="goTo('forgot')">ลืมรหัสผ่าน?</button>
          </div>
          <button type="submit" class="auth-submit">เข้าสู่ระบบ</button>
        </form>

        <div class="auth-divider"><span>หรือ</span></div>

        <button class="social-btn" type="button">
          <img src="/img/google-calendar-svgrepo-com.svg" alt="Google" width="20" height="20" />
          เข้าสู่ระบบด้วย Google
        </button>

        <p class="auth-card__footer">
          ยังไม่มีบัญชี?
          <button type="button" class="text-btn" @click="goTo('signup')">สมัครสมาชิก</button>
        </p>
      </template>

      <!-- ── SIGNUP ── -->
      <template v-else-if="panel === 'signup'">
        <div class="auth-card__head">
          <h1 class="auth-card__title">สมัครสมาชิก</h1>
          <p class="auth-card__sub">สร้างบัญชีเพื่อเริ่มใช้งานฟรี 7 วัน ไม่ต้องใช้บัตรเครดิต</p>
        </div>

        <form class="auth-form" @submit.prevent>
          <div class="field">
            <label>ชื่อ-นามสกุล</label>
            <input v-model="signupName" type="text" placeholder="สมชาย ใจดี" autocomplete="name" />
          </div>
          <div class="field">
            <label>อีเมล</label>
            <input v-model="signupEmail" type="email" placeholder="you@example.com" autocomplete="email" />
          </div>
          <div class="field">
            <label>
              รหัสผ่าน
              <button type="button" class="toggle-pass" @click="showPass = !showPass">
                {{ showPass ? 'ซ่อน' : 'แสดง' }}
              </button>
            </label>
            <input v-model="signupPass" :type="showPass ? 'text' : 'password'" placeholder="อย่างน้อย 8 ตัวอักษร" autocomplete="new-password" />
            <div class="pass-strength">
              <span
                v-for="n in 4" :key="n"
                class="strength-bar"
                :class="{ active: signupPass.length >= n * 2 }"
              />
            </div>
          </div>
          <div class="field">
            <label>ยืนยันรหัสผ่าน</label>
            <input v-model="signupConfirm" :type="showPass ? 'text' : 'password'" placeholder="••••••••" autocomplete="new-password" />
          </div>
          <label class="checkbox-label terms">
            <input type="checkbox" />
            ฉันยอมรับ <a href="/privacy" target="_blank" class="text-link">นโยบายความเป็นส่วนตัว</a> และข้อกำหนดการใช้งาน
          </label>
          <button type="submit" class="auth-submit" @click="goTo('otp', signupEmail)">สมัครสมาชิก</button>
        </form>

        <p class="auth-card__footer">
          มีบัญชีแล้ว?
          <button type="button" class="text-btn" @click="goTo('login')">เข้าสู่ระบบ</button>
        </p>
      </template>

      <!-- ── FORGOT PASSWORD ── -->
      <template v-else-if="panel === 'forgot'">
        <div class="auth-card__head">
          <h1 class="auth-card__title">ลืมรหัสผ่าน?</h1>
          <p class="auth-card__sub">กรอกอีเมลที่ลงทะเบียนไว้ เราจะส่งลิงก์รีเซ็ตให้คุณ</p>
        </div>

        <form class="auth-form" @submit.prevent>
          <div class="field">
            <label>อีเมล</label>
            <input v-model="forgotEmail" type="email" placeholder="you@example.com" autocomplete="email" />
          </div>
          <button type="submit" class="auth-submit" @click="goTo('otp', forgotEmail)">ส่งลิงก์รีเซ็ต</button>
        </form>

        <p class="auth-card__footer">
          จำรหัสผ่านได้แล้ว?
          <button type="button" class="text-btn" @click="goTo('login')">กลับเข้าสู่ระบบ</button>
        </p>
      </template>

      <!-- ── OTP ── -->
      <template v-else-if="panel === 'otp'">
        <div class="auth-card__head">
          <div class="otp-icon">📩</div>
          <h1 class="auth-card__title">ยืนยัน OTP</h1>
          <p class="auth-card__sub">
            เราส่งรหัส 6 หลักไปที่<br />
            <strong>{{ otpTarget || 'อีเมลของคุณ' }}</strong>
          </p>
        </div>

        <form class="auth-form" @submit.prevent>
          <div class="otp-row">
            <input
              v-for="(_, i) in otp" :key="i"
              class="otp-box"
              type="text"
              inputmode="numeric"
              maxlength="1"
              :value="otp[i]"
              @input="otpInput(i, $event)"
              @keydown="otpKeydown(i, $event)"
            />
          </div>

          <p class="otp-timer">รหัสหมดอายุใน <strong>04:59</strong></p>

          <button type="submit" class="auth-submit">ยืนยัน</button>

          <div class="otp-resend">
            ไม่ได้รับรหัส?
            <button type="button" class="text-btn">ส่งอีกครั้ง</button>
          </div>
        </form>

        <p class="auth-card__footer">
          <button type="button" class="text-btn" @click="goTo('login')">← กลับ</button>
        </p>
      </template>

    </div>

    <!-- bottom note -->
    <p class="auth-page__note">
      © {{ new Date().getFullYear() }} ฝากเตือนที ·
      <a href="/privacy" class="text-link">นโยบายความเป็นส่วนตัว</a>
    </p>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px 48px;
  background: linear-gradient(135deg, #eef0fd 0%, #fef9f0 100%);
  position: relative;
  overflow: hidden;
  font-family: var(--font-base);
}

/* background blobs */
.auth-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.auth-blob--1 {
  width: 480px; height: 480px;
  top: -160px; left: -120px;
  background: rgba(91, 106, 240, 0.08);
}
.auth-blob--2 {
  width: 360px; height: 360px;
  bottom: -80px; right: -100px;
  background: rgba(245, 166, 35, 0.09);
}

/* logo */
.auth-logo {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--brand-primary);
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
  text-decoration: none;
}

/* card */
.auth-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 40px 40px 32px;
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 1;
}

.auth-card__head { text-align: center; margin-bottom: 28px; }

.auth-card__title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--brand-dark);
  margin-bottom: 8px;
}

.auth-card__sub {
  font-size: 0.9rem;
  color: var(--brand-mid);
  line-height: 1.6;
}

/* form */
.auth-form { display: flex; flex-direction: column; gap: 18px; }

.field { display: flex; flex-direction: column; gap: 6px; }

.field label {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--brand-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field input {
  font-family: var(--font-base);
  font-size: 0.95rem;
  padding: 11px 14px;
  border: 1.5px solid var(--brand-gray);
  border-radius: var(--radius-sm);
  outline: none;
  color: var(--brand-dark);
  transition: border-color 0.15s, box-shadow 0.15s;
  background: var(--white);
  width: 100%;
}
.field input:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(91, 106, 240, 0.1);
}
.field input::placeholder { color: #bbb; }

/* password strength */
.pass-strength { display: flex; gap: 4px; margin-top: 4px; }
.strength-bar {
  flex: 1; height: 3px; border-radius: 2px;
  background: var(--brand-gray);
  transition: background 0.2s;
}
.strength-bar.active { background: var(--brand-primary); }

/* field row */
.field-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -6px;
}

/* checkbox */
.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--brand-mid);
  line-height: 1.5;
  cursor: pointer;
}
.checkbox-label input[type="checkbox"] { margin-top: 2px; accent-color: var(--brand-primary); flex-shrink: 0; }
.terms { margin-top: -4px; }

/* buttons */
.toggle-pass {
  font-family: var(--font-base);
  font-size: 0.78rem;
  color: var(--brand-primary);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-weight: 600;
}

.text-btn {
  font-family: var(--font-base);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--brand-primary);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s;
}
.text-btn:hover { opacity: 0.75; }

.text-link { color: var(--brand-primary); text-decoration: underline; text-underline-offset: 2px; }

.auth-submit {
  font-family: var(--font-base);
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  background: var(--brand-primary);
  border: none;
  border-radius: 50px;
  padding: 13px;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  margin-top: 4px;
}
.auth-submit:hover { background: var(--brand-primary-dark); transform: translateY(-1px); }

/* divider */
.auth-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 4px 0;
  color: #bbb;
  font-size: 0.82rem;
}
.auth-divider::before, .auth-divider::after {
  content: ''; flex: 1; height: 1px; background: var(--brand-gray);
}

/* social */
.social-btn {
  font-family: var(--font-base);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 11px;
  border: 1.5px solid var(--brand-gray);
  border-radius: 50px;
  background: var(--white);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--brand-dark);
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.social-btn:hover { border-color: var(--brand-primary); box-shadow: var(--shadow-sm); }

/* footer */
.auth-card__footer {
  text-align: center;
  margin-top: 20px;
  font-size: 0.88rem;
  color: var(--brand-mid);
}

/* OTP */
.otp-icon { font-size: 2.4rem; margin-bottom: 8px; }

.otp-row {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.otp-box {
  font-family: var(--font-base);
  width: 48px;
  height: 56px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--brand-dark);
  border: 2px solid var(--brand-gray);
  border-radius: var(--radius-sm);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.otp-box:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(91, 106, 240, 0.12);
}

.otp-timer {
  text-align: center;
  font-size: 0.85rem;
  color: var(--brand-mid);
}

.otp-resend {
  text-align: center;
  font-size: 0.85rem;
  color: var(--brand-mid);
  margin-top: -6px;
}

/* page note */
.auth-page__note {
  margin-top: 28px;
  font-size: 0.78rem;
  color: var(--brand-mid);
  position: relative;
  z-index: 1;
}

@media (max-width: 480px) {
  .auth-card { padding: 28px 20px 24px; }
  .otp-box { width: 40px; height: 48px; font-size: 1.2rem; }
  .otp-row { gap: 6px; }
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { useStaggerReveal } from '@/composables/useReveal'

// ── section reveal ──────────────────────────────────────
const section = ref<HTMLElement | null>(null)
useStaggerReveal(section, '.pain-card', { preset: 'fadeUp', stagger: 0.13 })

const pains = [
  { emoji: '👕', title: 'ใส่เสื้อผิดวัน',       desc: 'นี้เรื่องใหญ่เลย บางวันที่ทางองค์กร โรงเรียน มหาลัยนัดว่าให้ใส่เสื้อผ้าตามวันหรือตามงานกิจกรรม' },
  { emoji: '😵', title: 'ข้อความเยอะเกิ้นนนน', desc: 'ไม่เห็นแจ้งเตือนกัน ลืมจดบันทึกไว้ หรือโดนแชทกลุ่มบังหมด' },
  { emoji: '⏰', title: 'รู้แต่ลืมเตือนคนอื่น', desc: 'คือรู้นะ แต่เตือนไม่ทัน' },
  { emoji: '🤯', title: 'ปั่นมือหงิก',           desc: 'พึ่งมารู้ข่าวเอาตอนก่อนส่ง มีเวลาไม่กี่วัน ไม่กี่ชั่วโมง หรือไม่กี่นาทีก่อนเริ่มคาบ' },
  { emoji: '🏃', title: 'ครูบอกลา',             desc: 'ครูบอกไม่มา แต่มารู้อีกทีตอนตัวมาถึงห้องแล้ว ใจมันว่างเปล่า' },
  { emoji: '🔄', title: 'สลับคาบ',              desc: 'จู่ๆ ก็สลับคาบ ลืมหยิบหนังสือ เครื่องเขียนมา' },
]

// ── mini calendar ────────────────────────────────────────
interface CalEvent { icon: string; text: string; time: string; color: string }

const today = new Date()
const calYear = ref(today.getFullYear())
const calMonth = ref(today.getMonth())   // 0-based

const thMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
const thDays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

// events keyed by "YYYY-M-D"
function key(y: number, m: number, d: number) { return `${y}-${m}-${d}` }

const d = today.getDate()
const mo = today.getMonth()
const yr = today.getFullYear()

const eventMap: Record<string, CalEvent[]> = {
  [key(yr, mo, d)]:      [{ icon: '👕', text: 'วันนี้ใส่ชุดพละ',         time: 'ทั้งวัน',      color: '#06c755' }],
  [key(yr, mo, d+1)]:    [{ icon: '📚', text: 'ส่งการบ้านวิทย์',        time: '17:00 น.',     color: '#5b6af0' },
                           { icon: '🔔', text: 'ครูสมชายเข้าสอนแทน',    time: '08:00 น.',     color: '#f5a623' }],
  [key(yr, mo, d+2)]:    [{ icon: '🔄', text: 'สลับคาบ — คณิตเป็นศิลป์', time: '10:00 น.',   color: '#7c6af0' }],
  [key(yr, mo, d+3)]:    [{ icon: '📝', text: 'สอบกลางภาคคณิต',         time: '09:00 น.',     color: '#e05678' }],
  [key(yr, mo, d+4)]:    [{ icon: '🏃', text: 'ครูวิทย์ลา — ไม่มีคาบ',  time: 'ทั้งวัน',     color: '#f5a623' }],
  [key(yr, mo, d+5)]:    [{ icon: '💰', text: 'จ่ายค่าเทอม',            time: 'ก่อน 16:00',   color: '#7c6af0' }],
  [key(yr, mo, d+6)]:    [{ icon: '👕', text: 'ใส่ชุดนักศึกษา',         time: 'ทั้งวัน',      color: '#06c755' },
                           { icon: '📋', text: 'ส่งรายงานกลุ่มภาษาไทย', time: '23:59 น.',     color: '#5b6af0' }],
  [key(yr, mo, d+7)]:    [{ icon: '🎨', text: 'ใส่ชุดกีฬาสี',           time: 'ทั้งวัน',      color: '#e05678' }],
  [key(yr, mo, d+9)]:    [{ icon: '🤯', text: 'ส่งโปรเจกต์คอม',         time: '18:00 น.',     color: '#5b6af0' }],
  [key(yr, mo, d+10)]:   [{ icon: '🎓', text: 'อบรมครูนอกสถานที่',      time: 'ทั้งวัน',      color: '#f5a623' }],
  [key(yr, mo, d+11)]:   [{ icon: '📝', text: 'สอบปลายภาคอังกฤษ',       time: '13:00 น.',     color: '#e05678' },
                           { icon: '🔔', text: 'ประชุมผู้ปกครอง',        time: '15:00 น.',     color: '#7c6af0' }],
  [key(yr, mo, d+13)]:   [{ icon: '🏖️', text: 'วันหยุดราชการ',          time: 'ทั้งวัน',      color: '#06c755' }],
  [key(yr, mo, d+14)]:   [{ icon: '📚', text: 'ส่งการบ้านสังคม',         time: '08:00 น.',     color: '#5b6af0' }],
  [key(yr, mo, d+16)]:   [{ icon: '👕', text: 'ใส่ชุดพละ',              time: 'ทั้งวัน',      color: '#06c755' },
                           { icon: '💰', text: 'ชำระค่ากิจกรรม',         time: 'ก่อน 12:00',   color: '#7c6af0' }],
  [key(yr, mo, d+18)]:   [{ icon: '🚌', text: 'ทัศนศึกษา',              time: '06:30 น.',     color: '#f5a623' }],
  [key(yr, mo, d+20)]:   [{ icon: '🔄', text: 'สลับห้องสอบ',            time: '09:00 น.',     color: '#e05678' }],
  [key(yr, mo, d+21)]:   [{ icon: '📋', text: 'ลงทะเบียนวิชาเลือก',     time: 'ก่อน 17:00',   color: '#5b6af0' }],
}

const daysInMonth = computed(() => new Date(calYear.value, calMonth.value + 1, 0).getDate())
const firstDow = computed(() => new Date(calYear.value, calMonth.value, 1).getDay())

async function prevMonth() {
  await animateClose()
  if (calMonth.value === 0) { calMonth.value = 11; calYear.value-- }
  else calMonth.value--
  await nextTick()
  const day = nextEventDay()
  if (day !== null) setTimeout(() => openDetail(day), 80)
}
async function nextMonth() {
  await animateClose()
  if (calMonth.value === 11) { calMonth.value = 0; calYear.value++ }
  else calMonth.value++
  await nextTick()
  const day = nextEventDay()
  if (day !== null) setTimeout(() => openDetail(day), 80)
}

function dayEvents(d: number) {
  return eventMap[key(calYear.value, calMonth.value, d)] ?? []
}

function isToday(d: number) {
  return d === today.getDate() && calMonth.value === today.getMonth() && calYear.value === today.getFullYear()
}

// ── modal / detail ───────────────────────────────────────
const detailRef = ref<HTMLElement | null>(null)
const activeDay = ref<number | null>(null)
const activeEvents = ref<CalEvent[]>([])
let closeCtx: gsap.Context | null = null

async function openDetail(day: number) {
  const evs = dayEvents(day)
  if (!evs.length) return
  if (activeDay.value === day) { closeDetail(); return }

  // if already open, collapse first then re-open
  if (activeDay.value !== null) {
    await animateClose()
  }

  activeDay.value = day
  activeEvents.value = evs

  await nextTick()
  if (!detailRef.value) return

  closeCtx?.revert()
  closeCtx = gsap.context(() => {
    gsap.fromTo(
      detailRef.value!,
      { opacity: 0, y: 28, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power3.out' },
    )
    gsap.from('.detail-event', {
      opacity: 0, x: -16, stagger: 0.08, duration: 0.3, ease: 'power2.out', delay: 0.12,
    })
  })
}

function animateClose(): Promise<void> {
  return new Promise((resolve) => {
    if (!detailRef.value) { activeDay.value = null; resolve(); return }
    gsap.to(detailRef.value, {
      opacity: 0, y: 24, scale: 0.95, duration: 0.28, ease: 'power3.in',
      onComplete: () => { activeDay.value = null; resolve() },
    })
  })
}

function closeDetail() { animateClose() }

// find the nearest future day (≥ today) that has events in the displayed month
function nextEventDay(): number | null {
  const base = calYear.value === yr && calMonth.value === mo ? d : 1
  const total = new Date(calYear.value, calMonth.value + 1, 0).getDate()
  for (let i = base; i <= total; i++) {
    if (dayEvents(i).length > 0) return i
  }
  return null
}

onMounted(async () => {
  await nextTick()
  const day = nextEventDay()
  if (day !== null) {
    // slight delay so the section reveal animation doesn't fight the modal entrance
    setTimeout(() => openDetail(day), 620)
  }
})

onUnmounted(() => { closeCtx?.revert() })
</script>

<template>
  <section class="pain" ref="section">
    <div class="container">
      <div class="pain__head">
        <div class="section-label">ปัญหาที่คุ้นเคย</div>
        <h2 class="section-title">ทำไมถึงลืมทั้งที่รู้?</h2>
        <p class="section-desc">ไม่ใช่เพราะคุณขี้ลืม แต่เพราะไม่มีระบบที่คอยเตือนแทนคุณ</p>
      </div>

      <div class="pain__body">
        <!-- pain cards -->
        <div class="pain__grid">
          <div v-for="p in pains" :key="p.title" class="pain-card">
            <div class="pain-card__emoji">{{ p.emoji }}</div>
            <h3 class="pain-card__title">{{ p.title }}</h3>
            <p class="pain-card__desc">{{ p.desc }}</p>
          </div>
        </div>

        <!-- mini calendar -->
        <div class="cal-wrap">
          <div class="cal">
            <!-- header -->
            <div class="cal__header">
              <button class="cal__nav" @click="prevMonth" aria-label="เดือนก่อน">‹</button>
              <span class="cal__month-label">{{ thMonths[calMonth] }} {{ calYear + 543 }}</span>
              <button class="cal__nav" @click="nextMonth" aria-label="เดือนถัดไป">›</button>
            </div>

            <!-- day-of-week headers -->
            <div class="cal__dow-row">
              <span v-for="d in thDays" :key="d" class="cal__dow">{{ d }}</span>
            </div>

            <!-- day cells -->
            <div class="cal__grid">
              <!-- empty leading cells -->
              <span v-for="n in firstDow" :key="'e' + n" class="cal__cell cal__cell--empty" />

              <!-- actual days -->
              <button v-for="d in daysInMonth" :key="d" class="cal__cell" :class="{
                'is-today': isToday(d),
                'has-event': dayEvents(d).length > 0,
                'is-active': activeDay === d,
              }" @click="openDetail(d)">
                <span class="cal__day-num">{{ d }}</span>
                <span v-if="dayEvents(d).length" class="cal__dots">
                  <span v-for="ev in dayEvents(d).slice(0, 3)" :key="ev.text" class="cal__dot"
                    :style="{ background: ev.color }" />
                </span>
              </button>
            </div>

            <!-- legend -->
            <p class="cal__hint">แตะวันที่มีจุดสีเพื่อดูการเตือน</p>
          </div>

          <!-- detail modal (fade-up) -->
          <div v-if="activeDay !== null" ref="detailRef" class="cal-detail">
            <div class="cal-detail__header">
              <span class="cal-detail__date">{{ activeDay }} {{ thMonths[calMonth] }}</span>
              <button class="cal-detail__close" @click="closeDetail">✕</button>
            </div>
            <ul class="cal-detail__list">
              <li v-for="ev in activeEvents" :key="ev.text" class="detail-event">
                <span class="detail-event__bar" :style="{ background: ev.color }" />
                <span class="detail-event__icon">{{ ev.icon }}</span>
                <div>
                  <div class="detail-event__text">{{ ev.text }}</div>
                  <div class="detail-event__time">{{ ev.time }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── section shell ── */
.pain {
  background: var(--brand-light);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.pain::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -60px;
  width: 320px;
  height: 320px;
  background: rgba(91, 106, 240, 0.07);
  border-radius: 50%;
  pointer-events: none;
}

.pain::after {
  content: '';
  position: absolute;
  bottom: -100px;
  left: -80px;
  width: 280px;
  height: 280px;
  background: rgba(245, 166, 35, 0.07);
  border-radius: 50%;
  pointer-events: none;
}

.pain .container {
  position: relative;
  z-index: 1;
}

.pain__head {
  text-align: center;
  margin-bottom: 48px;
}

.pain__head .section-desc {
  margin: 0 auto;
}

/* ── two-column body ── */
.pain__body {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
  align-items: start;
}

/* ── pain cards (stack vertically in the left column) ── */
.pain__grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pain-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 28px 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: flex-start;
  gap: 18px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.pain-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.pain-card__emoji {
  font-size: 2rem;
  flex-shrink: 0;
}

.pain-card__title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--brand-dark);
  margin-bottom: 6px;
}

.pain-card__desc {
  font-size: 0.9rem;
  color: var(--brand-mid);
  line-height: 1.6;
}

/* ── calendar wrapper ── */
.cal-wrap {
  position: sticky;
  top: 88px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ── calendar card ── */
.cal {
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: 18px 16px 14px;
  user-select: none;
}

.cal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.cal__month-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--brand-dark);
}

.cal__nav {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--brand-primary-light);
  color: var(--brand-primary);
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  line-height: 1;
}

.cal__nav:hover {
  background: var(--brand-primary);
  color: var(--white);
}

.cal__dow-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 6px;
}

.cal__dow {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--brand-mid);
  text-align: center;
  padding: 2px 0;
}

.cal__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.cal__cell {
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: 0.78rem;
  color: var(--brand-dark);
  background: transparent;
  transition: background 0.15s;
  cursor: default;
  padding: 0;
}

.cal__cell.has-event {
  cursor: pointer;
}

.cal__cell.has-event:hover {
  background: var(--brand-primary-light);
}

.cal__cell.is-today .cal__day-num {
  background: var(--brand-primary);
  color: var(--white);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.cal__cell.is-active {
  background: var(--brand-primary-light);
}

.cal__cell--empty {
  pointer-events: none;
}

.cal__day-num {
  font-size: 0.75rem;
  line-height: 1;
}

.cal__dots {
  display: flex;
  gap: 2px;
}

.cal__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  display: block;
}

.cal__hint {
  font-size: 0.68rem;
  color: #bbb;
  text-align: center;
  margin-top: 10px;
}

/* ── detail modal ── */
.cal-detail {
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border: 1.5px solid var(--brand-primary-light);
  padding: 16px;
  transform-origin: top center;
}

.cal-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.cal-detail__date {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--brand-primary);
}

.cal-detail__close {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--brand-gray);
  color: var(--brand-mid);
  font-size: 0.65rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.cal-detail__close:hover {
  background: #ddd;
}

.cal-detail__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-event {
  display: flex;
  align-items: center;
  gap: 10px;
}

.detail-event__bar {
  width: 3px;
  height: 36px;
  border-radius: 3px;
  flex-shrink: 0;
}

.detail-event__icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.detail-event__text {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--brand-dark);
  line-height: 1.3;
}

.detail-event__time {
  font-size: 0.72rem;
  color: var(--brand-mid);
  margin-top: 2px;
}

/* ── responsive ── */
@media (max-width: 860px) {
  .pain__body {
    grid-template-columns: 1fr;
  }

  .cal-wrap {
    position: static;
    max-width: 360px;
    margin: 0 auto;
  }

  .pain__grid {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .pain-card {
    flex: 1;
    min-width: 240px;
  }
}

@media (max-width: 560px) {
  .pain__grid {
    flex-direction: column;
  }

  .pain-card {
    min-width: unset;
  }
}

@media (max-width: 400px) {
  .cal-wrap { max-width: 100%; }
  .cal__card { padding: 14px 10px; }
  .cal-head { padding: 0 4px 10px; font-size: 0.78rem; }
  .cal__day-header, .cal__day { font-size: 0.65rem; }
  .cal__day { min-height: 30px; }
  .detail-panel { padding: 14px; }
}
</style>

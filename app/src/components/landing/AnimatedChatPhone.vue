<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'

interface Msg {
  id: number
  kind: 'bot' | 'user' | 'typing' | 'summary'
  emoji?: string
  bold?: string
  body?: string
  time?: string
}

const msgs = ref<Msg[]>([])
const inputVal = ref('')
const showBar = ref(false)
const chatBodyRef = ref<HTMLElement | null>(null)
const timers: ReturnType<typeof setTimeout>[] = []

function wait(ms: number) {
  return new Promise<void>(r => timers.push(setTimeout(r, ms)))
}

function scrollDown() {
  nextTick(() => {
    if (chatBodyRef.value) chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
  })
}

async function animIn(id: number) {
  await nextTick()
  const el = document.querySelector(`.acp [data-mid="${id}"]`)
  if (!el) return
  gsap.from(el, { opacity: 0, y: 14, duration: 0.35, ease: 'power2.out' })
}

const INITIAL: Msg[] = [
  { id: 1, kind: 'bot', emoji: '👕', bold: 'วันนี้ใส่ชุดพละ', body: 'อย่าลืมเปลี่ยนเสื้อนะ!', time: '06:30' },
  { id: 2, kind: 'bot', emoji: '📚', bold: 'ส่งการบ้านวิทย์', body: 'ส่งภายใน 17:00 น. วันนี้', time: '07:00' },
  { id: 3, kind: 'bot', emoji: '🔔', bold: 'แจ้งเตือน', body: 'พรุ่งนี้ครูลา — ครูสมชายเข้าแทน', time: '08:00' },
]

const CMD = '/check อาทิตย์นี้'

async function run() {
  msgs.value = []
  inputVal.value = ''
  showBar.value = false

  await wait(700)

  for (const m of INITIAL) {
    msgs.value.push(m)
    await animIn(m.id)
    scrollDown()
    await wait(750)
  }

  await wait(900)
  showBar.value = true
  await wait(300)

  // typewriter effect
  for (let i = 1; i <= CMD.length; i++) {
    inputVal.value = CMD.slice(0, i)
    await wait(52)
  }

  await wait(480)

  // user sends
  msgs.value.push({ id: 10, kind: 'user', body: CMD })
  inputVal.value = ''
  await animIn(10)
  scrollDown()

  await wait(280)

  // typing indicator
  msgs.value.push({ id: 11, kind: 'typing' })
  await animIn(11)
  scrollDown()

  await wait(1500)

  // swap typing → summary
  msgs.value = msgs.value.filter(m => m.id !== 11)
  msgs.value.push({
    id: 12, kind: 'summary',
    emoji: '📋', bold: 'สรุปอาทิตย์นี้',
    body: '✅ 3 งานรอส่ง · 📝 1 สอบ · 📅 2 นัดหมาย',
    time: 'ตอนนี้',
  })
  await animIn(12)
  scrollDown()

  await wait(3800)
  run()
}

onMounted(run)
onUnmounted(() => timers.forEach(clearTimeout))
</script>

<template>
  <div class="acp">
    <div class="acp__status">
      <span class="acp__dot" />
      Line Group: ห้อง ม.5/3
    </div>

    <div class="acp__body" ref="chatBodyRef">
      <template v-for="m in msgs" :key="m.id">
        <div v-if="m.kind === 'bot'" class="acp__bubble bot" :data-mid="m.id">
          <span class="bubble-emoji">{{ m.emoji }}</span>
          <div class="bubble-text">
            <strong>{{ m.bold }}</strong><br />
            {{ m.body }}
            <span class="acp__time">{{ m.time }} น.</span>
          </div>
        </div>

        <div v-else-if="m.kind === 'user'" class="acp__bubble user" :data-mid="m.id">
          {{ m.body }}
        </div>

        <div v-else-if="m.kind === 'typing'" class="acp__bubble bot acp__typing" :data-mid="m.id">
          <span /><span /><span />
        </div>

        <div v-else-if="m.kind === 'summary'" class="acp__bubble acp__summary" :data-mid="m.id">
          <div class="sum-head">{{ m.emoji }} <strong>{{ m.bold }}</strong></div>
          <div class="sum-body">{{ m.body }}</div>
          <span class="acp__time">{{ m.time }}</span>
        </div>
      </template>
    </div>

    <Transition name="bar">
      <div v-if="showBar" class="acp__input-bar">
        <div class="acp__field">
          <span class="acp__field-text">{{ inputVal }}</span>
          <span class="acp__cursor" />
        </div>
        <div class="acp__send">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.acp {
  width: 230px;
  background: #fff;
  border-radius: 20px;
  border: 5px solid #e8eaf0;
  box-shadow: 0 12px 40px rgba(91, 106, 240, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 0.72rem;
  line-height: 1.45;
  font-family: var(--font-base);
}

/* status bar */
.acp__status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 0.68rem;
  font-weight: 600;
  color: #06c755;
  border-bottom: 1px solid #f0f0f4;
}

.acp__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #06c755;
  animation: pulse-dot 1.8s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* chat body */
.acp__body {
  flex: 1;
  overflow-y: auto;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-height: 200px;
  max-height: 240px;
  scrollbar-width: none;
}
.acp__body::-webkit-scrollbar { display: none; }

/* bubbles */
.acp__bubble {
  max-width: 88%;
  border-radius: 10px;
  padding: 7px 9px;
  font-size: 0.7rem;
  line-height: 1.5;
}

.acp__bubble.bot {
  background: #f8f9ff;
  border-radius: 10px 10px 10px 3px;
  align-self: flex-start;
  display: flex;
  gap: 6px;
  color: var(--brand-dark);
}

.acp__bubble.user {
  background: #dcf8c6;
  border-radius: 10px 10px 3px 10px;
  align-self: flex-end;
  color: #2d2d2d;
  font-weight: 500;
}

.bubble-emoji { font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
.bubble-text { display: flex; flex-direction: column; }

.acp__time {
  display: block;
  font-size: 0.6rem;
  color: #aaa;
  margin-top: 3px;
}

/* typing dots */
.acp__typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 12px;
}

.acp__typing span {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #b0b4c8;
  animation: bounce-dot 1.2s ease-in-out infinite;
}
.acp__typing span:nth-child(2) { animation-delay: 0.2s; }
.acp__typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce-dot {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
}

/* summary card */
.acp__bubble.acp__summary {
  background: linear-gradient(135deg, #eef0fd, #e8f8ee);
  border-radius: 10px 10px 10px 3px;
  align-self: flex-start;
  border-left: 3px solid #5b6af0;
  max-width: 94%;
}

.sum-head {
  font-weight: 700;
  color: var(--brand-primary);
  margin-bottom: 4px;
  font-size: 0.72rem;
}

.sum-body {
  color: var(--brand-dark);
  font-size: 0.67rem;
  line-height: 1.6;
}

/* input bar */
.acp__input-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 8px;
  border-top: 1px solid #f0f0f4;
}

.acp__field {
  flex: 1;
  background: #f4f5fb;
  border-radius: 14px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  min-height: 28px;
  gap: 1px;
}

.acp__field-text { font-size: 0.68rem; color: var(--brand-dark); }

.acp__cursor {
  display: inline-block;
  width: 1px;
  height: 12px;
  background: var(--brand-primary);
  animation: blink 1s step-end infinite;
  vertical-align: middle;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.acp__send {
  width: 26px;
  height: 26px;
  background: #06c755;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

/* transition */
.bar-enter-active { transition: opacity 0.3s, transform 0.3s; }
.bar-enter-from { opacity: 0; transform: translateY(6px); }
</style>

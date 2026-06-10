<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const section = ref<HTMLElement | null>(null)
const cloudRef = ref<HTMLElement | null>(null)

interface Word {
  text: string
  weight: number   // 1–5, controls font-size tier
  color: string
}

const words: Word[] = [
  { text: 'ส่งงาน', weight: 5, color: '#5b6af0' },
  { text: 'สอบกลางภาค', weight: 5, color: '#e05678' },
  { text: 'ครูลา', weight: 4, color: '#f5a623' },
  { text: 'การบ้าน', weight: 5, color: '#5b6af0' },
  { text: 'ใส่ชุดพละ', weight: 4, color: '#06c755' },
  { text: 'ประชุม', weight: 4, color: '#7c6af0' },
  { text: 'ทัศนศึกษา', weight: 3, color: '#f5a623' },
  { text: 'Deadline', weight: 5, color: '#e05678' },
  { text: 'เข้าแถว', weight: 3, color: '#5b6af0' },
  { text: 'ส่งรายงาน', weight: 4, color: '#06c755' },
  { text: 'นัดหมอ', weight: 3, color: '#7c6af0' },
  { text: 'สอบปลายภาค', weight: 5, color: '#e05678' },
  { text: 'ฝึกงาน', weight: 3, color: '#f5a623' },
  { text: 'จ่ายค่าเทอม', weight: 4, color: '#5b6af0' },
  { text: 'วันหยุดราชการ', weight: 3, color: '#7c6af0' },
  { text: 'ชุดกีฬาสี', weight: 3, color: '#06c755' },
  { text: 'ลงทะเบียน', weight: 4, color: '#e05678' },
  { text: 'แจ้งเตือน', weight: 5, color: '#5b6af0' },
  { text: 'ประกาศผล', weight: 3, color: '#f5a623' },
  { text: 'อบรม', weight: 2, color: '#7c6af0' },
  { text: 'กิจกรรม', weight: 3, color: '#06c755' },
  { text: 'เปลี่ยนเสื้อ', weight: 2, color: '#5b6af0' },
  { text: 'Quiz', weight: 2, color: '#e05678' },
  { text: 'Zoom', weight: 2, color: '#7c6af0' },
]

// shuffle for natural cloud feel
const shuffled = [...words].sort(() => Math.random() - 0.5)

const sizeMap: Record<number, string> = {
  5: '2.4rem',
  4: '1.75rem',
  3: '1.25rem',
  2: '0.95rem',
  1: '0.8rem',
}

let ctx: gsap.Context

onMounted(() => {
  if (!cloudRef.value) return
  ctx = gsap.context(() => {
    gsap.from('.word-chip', {
      opacity: 0,
      scale: 0.4,
      y: () => gsap.utils.random(-40, 40),
      x: () => gsap.utils.random(-30, 30),
      duration: 0.6,
      stagger: {
        each: 0.04,
        from: 'random',
      },
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: cloudRef.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, cloudRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section class="word-cloud-section" ref="section">
    <div class="container">
      <div class="word-cloud-section__head">
        <div class="section-label">สิ่งที่คนใช้บ่อย</div>
        <h2 class="section-title">คุณฝากเตือนเรื่องอะไรบ้าง?</h2>
        <p class="section-desc">
          เรื่องเหล่านี้แหละที่ผู้ใช้งานฝากให้ฝากเตือนส่งไปในกลุ่มมากที่สุด
        </p>
      </div>

      <div class="word-cloud" ref="cloudRef">
        <span
          v-for="w in shuffled"
          :key="w.text"
          class="word-chip"
          :style="{
            fontSize: sizeMap[w.weight],
            color: w.color,
            fontWeight: w.weight >= 4 ? '700' : w.weight === 3 ? '600' : '500',
          }"
        >
          {{ w.text }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.word-cloud-section {
  padding: 80px 0;
  background: var(--white);
}

.word-cloud-section__head {
  text-align: center;
  margin-bottom: 52px;
}

.word-cloud-section__head .section-desc {
  margin: 0 auto;
}

.word-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 14px 20px;
  max-width: 860px;
  margin: 0 auto;
  padding: 32px 24px;
  background: var(--brand-light);
  border-radius: var(--radius-lg);
  min-height: 260px;
}

.word-chip {
  display: inline-block;
  line-height: 1.2;
  cursor: default;
  transition: transform 0.2s;
  user-select: none;
}

.word-chip:hover {
  transform: scale(1.18);
  opacity: 0.85;
}
</style>

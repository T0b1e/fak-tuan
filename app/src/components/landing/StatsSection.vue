<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Stat { label: string; sub: string; target: number; suffix: string; color: string }

const stats: Stat[] = [
  { label: 'กลุ่มแชท',    sub: 'ที่ใช้งานอยู่ตอนนี้',  target: 20,  suffix: '+', color: '#5b6af0' },
  { label: 'ผู้ใช้งาน',   sub: 'ที่ไว้วางใจเรา',        target: 20,  suffix: '+', color: '#e05678' },
  { label: '% อัตโนมัติ', sub: 'ส่งเตือนโดยไม่ต้องแตะ', target: 100, suffix: '',  color: '#06c755' },
]

const displayed = ref(stats.map(() => 0))
const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  if (!sectionRef.value) return
  ctx = gsap.context(() => {
    // fade-up the whole section
    gsap.from('.stats-card', {
      opacity: 0, y: 40, stagger: 0.14, duration: 0.65, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 85%', toggleActions: 'play none none none' },
    })

    // count-up each number
    stats.forEach((stat, i) => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: stat.target,
        duration: 2,
        ease: 'power2.out',
        snap: { val: 1 },
        onUpdate() { displayed.value[i] = Math.round(obj.val) },
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', toggleActions: 'play none none none' },
      })
    })
  }, sectionRef.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section class="stats" ref="sectionRef">
    <div class="container">
      <div class="stats__grid">
        <div v-for="(stat, i) in stats" :key="stat.label" class="stats-card">
          <div class="stats-card__num" :style="{ color: stat.color }">
            {{ displayed[i] }}<span class="stats-card__suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stats-card__label">{{ stat.label }}</div>
          <div class="stats-card__sub">{{ stat.sub }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  padding: 56px 0;
  background: var(--white);
  border-top: 1px solid var(--brand-gray);
  border-bottom: 1px solid var(--brand-gray);
}

.stats__grid {
  display: flex;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
}

.stats-card {
  flex: 1;
  min-width: 180px;
  max-width: 280px;
  text-align: center;
  padding: 24px 32px;
  position: relative;
}

.stats-card + .stats-card::before {
  content: '';
  position: absolute;
  left: 0; top: 20%; bottom: 20%;
  width: 1px;
  background: var(--brand-gray);
}

.stats-card__num {
  font-size: clamp(2.8rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
  font-variant-numeric: tabular-nums;
}

.stats-card__suffix {
  font-size: 0.55em;
  vertical-align: super;
  font-weight: 700;
}

.stats-card__label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--brand-dark);
  margin-bottom: 4px;
}

.stats-card__sub {
  font-size: 0.78rem;
  color: var(--brand-mid);
}

@media (max-width: 560px) {
  .stats-card + .stats-card::before { display: none; }
  .stats-card { border-top: 1px solid var(--brand-gray); }
  .stats-card:first-child { border-top: none; }
}
</style>

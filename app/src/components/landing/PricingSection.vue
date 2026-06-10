<script setup lang="ts">
import { ref } from 'vue'
import { useStaggerReveal } from '@/composables/useReveal'

const section = ref<HTMLElement | null>(null)
useStaggerReveal(section, '.pricing-card', { preset: 'scaleUp', stagger: 0.15 })

const tiers = [
  {
    name: 'Starter',
    price: '99',
    unit: 'บาท/เดือน',
    desc: 'สำหรับการใช้งานส่วนตัวหรือกลุ่มเล็ก',
    features: [
      '1 Line กลุ่ม',
      'เตือนได้สูงสุด 20 รายการ/เดือน',
      'แจ้งเตือนล่วงหน้าได้ 1 ครั้ง/รายการ',
      'รองรับแท็กพื้นฐาน',
    ],
    cta: 'เริ่มต้นใช้งาน',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '249',
    unit: 'บาท/เดือน',
    desc: 'สำหรับห้องเรียนหรือทีมที่ต้องการความครบถ้วน',
    features: [
      'ไม่จำกัดจำนวนกลุ่ม',
      'เตือนได้ไม่จำกัดรายการ',
      'แจ้งเตือนล่วงหน้าได้หลายครั้ง',
      'เชื่อม Google Calendar',
      'แท็กและลำดับความสำคัญแบบกำหนดเอง',
      'ทดลองใช้ฟรี 7 วัน',
    ],
    cta: 'ทดลองใช้ฟรี 7 วัน',
    highlight: true,
  },
]
</script>

<template>
  <section id="pricing" class="pricing" ref="section">
    <div class="container">
      <div class="pricing__head">
        <div class="section-label">ราคา</div>
        <h2 class="section-title">ราคาที่คุ้มค่า ไม่มีค่าใช้จ่ายแอบแฝง</h2>
        <p class="section-desc">เลือกแพ็กเกจที่เหมาะกับคุณ ยกเลิกได้ทุกเมื่อ</p>
      </div>
      <div class="pricing__grid">
        <div
          v-for="tier in tiers"
          :key="tier.name"
          :class="['pricing-card', { highlight: tier.highlight }]"
        >
          <div v-if="tier.highlight" class="pricing-card__badge">แนะนำ</div>
          <div class="pricing-card__name">{{ tier.name }}</div>
          <div class="pricing-card__price">
            <span class="price-amount">฿{{ tier.price }}</span>
            <span class="price-unit">{{ tier.unit }}</span>
          </div>
          <p class="pricing-card__desc">{{ tier.desc }}</p>
          <ul class="pricing-card__features">
            <li v-for="f in tier.features" :key="f"><span class="check">✓</span> {{ f }}</li>
          </ul>
          <a href="#" :class="tier.highlight ? 'btn-primary' : 'btn-outline'" class="pricing-card__cta">
            {{ tier.cta }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing {
  padding: 80px 0;
  background: var(--white);
  position: relative;
  overflow: hidden;
}

.pricing::before {
  content: '';
  position: absolute;
  bottom: -100px; left: -80px;
  width: 420px; height: 420px;
  background: rgba(91, 106, 240, 0.06);
  border-radius: 50%;
  pointer-events: none;
}

.pricing::after {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 280px; height: 280px;
  background: rgba(245, 166, 35, 0.07);
  border-radius: 50%;
  pointer-events: none;
}

.pricing .container { position: relative; z-index: 1; }

.pricing__head { text-align: center; margin-bottom: 52px; }
.pricing__head .section-desc { margin: 0 auto; }

.pricing__grid { display: flex; gap: 28px; justify-content: center; flex-wrap: wrap; align-items: stretch; }

.pricing-card {
  position: relative;
  background: var(--white);
  border: 2px solid var(--brand-gray);
  border-radius: var(--radius-lg);
  padding: 40px 36px;
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: box-shadow 0.2s;
}

.pricing-card.highlight { border-color: var(--brand-primary); box-shadow: var(--shadow-lg); }

.pricing-card__badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--brand-accent);
  color: var(--white);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 18px;
  border-radius: 50px;
  white-space: nowrap;
}

.pricing-card__name { font-size: 1rem; font-weight: 600; color: var(--brand-mid); text-transform: uppercase; letter-spacing: 0.08em; }

.pricing-card__price { display: flex; align-items: baseline; gap: 6px; }

.price-amount { font-size: 2.8rem; font-weight: 700; color: var(--brand-dark); line-height: 1; }

.price-unit { font-size: 0.9rem; color: var(--brand-mid); }

.pricing-card__desc { font-size: 0.9rem; color: var(--brand-mid); }

.pricing-card__features { list-style: none; display: flex; flex-direction: column; gap: 10px; flex: 1; }

.pricing-card__features li { font-size: 0.92rem; color: var(--brand-dark); display: flex; gap: 8px; }

.check { color: var(--brand-primary); font-weight: 700; flex-shrink: 0; }

.pricing-card__cta { display: block; text-align: center; margin-top: 8px; }

@media (max-width: 520px) {
  .pricing { padding: 60px 0; }
  .pricing__head { margin-bottom: 36px; }
  .pricing__grid { flex-direction: column; align-items: stretch; gap: 20px; }
  .pricing-card { max-width: none; padding: 32px 24px; }
}
</style>

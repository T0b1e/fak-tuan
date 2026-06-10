<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const readPct = ref(0)

function onScroll() {
  const el = document.documentElement
  const scrolled = el.scrollTop || document.body.scrollTop
  const total = el.scrollHeight - el.clientHeight
  readPct.value = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  gsap.from('.privacy-hero__title', { opacity: 0, y: 32, duration: 0.7, ease: 'power3.out' })
  gsap.from('.privacy-hero__meta',  { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out', delay: 0.2 })
  gsap.from('.privacy-section',     { opacity: 0, y: 24, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.35 })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="privacy-page">
    <!-- reading progress bar -->
    <div class="read-bar" :style="{ width: readPct + '%' }" />

    <!-- navbar spacer -->
    <nav class="privacy-nav">
      <div class="container privacy-nav__inner">
        <a href="/" class="privacy-nav__logo">🔔 ฝากเตือนที</a>
        <a href="/" class="privacy-nav__back">← กลับหน้าหลัก</a>
      </div>
    </nav>

    <!-- hero -->
    <header class="privacy-hero">
      <div class="container">
        <h1 class="privacy-hero__title">นโยบายความเป็นส่วนตัว</h1>
        <p class="privacy-hero__meta">อัปเดตล่าสุด: 9 มิถุนายน 2568 · บังคับใช้: 9 มิถุนายน 2568</p>
      </div>
    </header>

    <main class="container privacy-body">

      <section class="privacy-section">
        <h2>1. บทนำ</h2>
        <p>
          ฝากเตือนที ("บริการ", "เรา") ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งานทุกท่านเป็นอย่างสูง
          นโยบายนี้อธิบายว่าเราเก็บรวบรวม ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณอย่างไร
          เมื่อคุณใช้บริการฝากเตือนที รวมถึงเว็บไซต์ fak-tuan.pwigroups.com และแอปพลิเคชันที่เกี่ยวข้อง
        </p>
        <p>
          การใช้บริการของเราถือว่าคุณยอมรับนโยบายความเป็นส่วนตัวนี้
          หากคุณไม่เห็นด้วยกับข้อใด กรุณาหยุดใช้บริการและติดต่อเราเพื่อลบข้อมูลของคุณ
        </p>
      </section>

      <section class="privacy-section">
        <h2>2. ข้อมูลที่เราเก็บรวบรวม</h2>

        <h3>2.1 ข้อมูลที่คุณให้โดยตรง</h3>
        <ul>
          <li><strong>ข้อมูลบัญชี</strong> — ชื่อ, อีเมล, รหัสผ่าน (เข้ารหัสด้วย bcrypt)</li>
          <li><strong>ข้อมูล Google Calendar</strong> — โทเค็นการเข้าถึงที่คุณอนุญาตผ่าน OAuth 2.0 เพื่ออ่านกิจกรรมในปฏิทิน</li>
          <li><strong>ข้อมูล Line</strong> — User ID ของกลุ่ม Line ที่คุณเชิญบอทเข้าร่วม</li>
          <li><strong>เนื้อหาการเตือน</strong> — ข้อความ, วันเวลา, แท็ก ที่คุณตั้งค่าในระบบ</li>
        </ul>

        <h3>2.2 ข้อมูลที่เก็บโดยอัตโนมัติ</h3>
        <ul>
          <li><strong>ข้อมูลการใช้งาน</strong> — หน้าที่เข้าชม, เวลาที่ใช้, ฟีเจอร์ที่คลิก</li>
          <li><strong>ข้อมูลอุปกรณ์</strong> — เบราว์เซอร์, ระบบปฏิบัติการ, ความละเอียดหน้าจอ</li>
          <li><strong>IP Address</strong> — เพื่อการรักษาความปลอดภัยและป้องกันการละเมิด</li>
          <li><strong>คุกกี้และ Local Storage</strong> — เก็บสถานะเซสชันและการตั้งค่าของผู้ใช้</li>
        </ul>
      </section>

      <section class="privacy-section">
        <h2>3. วัตถุประสงค์ในการใช้ข้อมูล</h2>
        <div class="purpose-grid">
          <div class="purpose-card">
            <span class="purpose-icon">⚙️</span>
            <div>
              <strong>ให้บริการ</strong>
              <p>ส่งข้อความเตือนเข้า Line กลุ่มตามกำหนดการที่คุณตั้งไว้</p>
            </div>
          </div>
          <div class="purpose-card">
            <span class="purpose-icon">🔒</span>
            <div>
              <strong>ความปลอดภัย</strong>
              <p>ยืนยันตัวตน ตรวจจับการใช้งานผิดปกติ และปกป้องบัญชีของคุณ</p>
            </div>
          </div>
          <div class="purpose-card">
            <span class="purpose-icon">📊</span>
            <div>
              <strong>ปรับปรุงบริการ</strong>
              <p>วิเคราะห์การใช้งานเพื่อพัฒนาฟีเจอร์และประสบการณ์ผู้ใช้</p>
            </div>
          </div>
          <div class="purpose-card">
            <span class="purpose-icon">📧</span>
            <div>
              <strong>การสื่อสาร</strong>
              <p>ส่งอีเมลแจ้งเตือนการชำระเงิน, อัปเดตบริการ, และข้อมูลสำคัญ</p>
            </div>
          </div>
        </div>
      </section>

      <section class="privacy-section">
        <h2>4. การแบ่งปันข้อมูล</h2>
        <p>เราไม่ขายข้อมูลส่วนบุคคลของคุณให้แก่บุคคลภายนอก เราอาจแบ่งปันข้อมูลในกรณีต่อไปนี้เท่านั้น:</p>
        <ul>
          <li><strong>ผู้ให้บริการที่เชื่อถือได้</strong> — เช่น Cloudflare (CDN), Google (OAuth), Line (Messaging API) ซึ่งทำงานภายใต้ข้อตกลงการประมวลผลข้อมูล</li>
          <li><strong>ข้อกำหนดทางกฎหมาย</strong> — เมื่อมีคำสั่งศาลหรือหน่วยงานรัฐที่มีอำนาจตามกฎหมาย</li>
          <li><strong>การป้องกันความเสียหาย</strong> — เพื่อปกป้องสิทธิ์ ทรัพย์สิน หรือความปลอดภัยของผู้ใช้และบริการ</li>
        </ul>
      </section>

      <section class="privacy-section">
        <h2>5. การรักษาความปลอดภัย</h2>
        <p>เราใช้มาตรการรักษาความปลอดภัยดังนี้:</p>
        <ul>
          <li>เข้ารหัสข้อมูลระหว่างรับส่งด้วย HTTPS / TLS 1.3</li>
          <li>รหัสผ่านถูกเข้ารหัสด้วย bcrypt ก่อนจัดเก็บ — เราไม่รู้รหัสผ่านจริงของคุณ</li>
          <li>โทเค็น Google OAuth ถูกจัดเก็บในรูปแบบเข้ารหัสและจำกัดขอบเขตการเข้าถึง</li>
          <li>ระบบตรวจสอบสิทธิ์สองขั้นตอน (2FA) พร้อมให้เปิดใช้</li>
          <li>ตรวจสอบความปลอดภัยและอัปเดตระบบเป็นประจำ</li>
        </ul>
        <div class="privacy-note">
          <span>⚠️</span>
          <p>แม้เราจะใช้มาตรการรักษาความปลอดภัยสูงสุด แต่ไม่มีระบบใดที่ปลอดภัย 100% กรุณาใช้รหัสผ่านที่แข็งแกร่งและไม่แบ่งปันข้อมูลบัญชีแก่ผู้อื่น</p>
        </div>
      </section>

      <section class="privacy-section">
        <h2>6. คุกกี้และการติดตาม</h2>
        <p>เราใช้คุกกี้ประเภทต่อไปนี้:</p>
        <table class="cookie-table">
          <thead>
            <tr>
              <th>ประเภท</th>
              <th>ชื่อ</th>
              <th>วัตถุประสงค์</th>
              <th>อายุ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="badge badge--required">จำเป็น</span></td>
              <td>session_id</td>
              <td>รักษาสถานะการเข้าสู่ระบบ</td>
              <td>7 วัน</td>
            </tr>
            <tr>
              <td><span class="badge badge--required">จำเป็น</span></td>
              <td>csrf_token</td>
              <td>ป้องกัน CSRF Attack</td>
              <td>เซสชัน</td>
            </tr>
            <tr>
              <td><span class="badge badge--analytics">วิเคราะห์</span></td>
              <td>_analytics</td>
              <td>นับจำนวนผู้เข้าชมและพฤติกรรมการใช้งาน</td>
              <td>30 วัน</td>
            </tr>
            <tr>
              <td><span class="badge badge--pref">ค่ากำหนด</span></td>
              <td>fak_tuan_cookie_consent</td>
              <td>จำการตัดสินใจเรื่องคุกกี้ของคุณ</td>
              <td>365 วัน</td>
            </tr>
          </tbody>
        </table>
        <p>คุณสามารถปฏิเสธคุกกี้ที่ไม่จำเป็นได้ผ่านแบนเนอร์คุกกี้ หรือลบคุกกี้ผ่านการตั้งค่าเบราว์เซอร์</p>
      </section>

      <section class="privacy-section">
        <h2>7. การเก็บรักษาและการลบข้อมูล</h2>
        <ul>
          <li><strong>บัญชีที่ใช้งานอยู่</strong> — เก็บข้อมูลตลอดอายุการใช้บริการ</li>
          <li><strong>บัญชีที่ยกเลิก</strong> — ลบข้อมูลทั้งหมดภายใน 30 วันหลังยกเลิก</li>
          <li><strong>บันทึกการเตือน</strong> — เก็บ 90 วันหลังส่ง เพื่อการตรวจสอบย้อนหลัง</li>
          <li><strong>Log ความปลอดภัย</strong> — เก็บ 1 ปีตามข้อกำหนดด้านความปลอดภัย</li>
        </ul>
      </section>

      <section class="privacy-section">
        <h2>8. สิทธิ์ของคุณ</h2>
        <p>ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) คุณมีสิทธิ์:</p>
        <div class="rights-grid">
          <div class="right-item"><span>👁️</span> <span><strong>เข้าถึง</strong> — ขอดูข้อมูลที่เราเก็บ</span></div>
          <div class="right-item"><span>✏️</span> <span><strong>แก้ไข</strong> — แก้ไขข้อมูลที่ไม่ถูกต้อง</span></div>
          <div class="right-item"><span>🗑️</span> <span><strong>ลบ</strong> — ขอลบข้อมูลส่วนบุคคล</span></div>
          <div class="right-item"><span>📦</span> <span><strong>โอนย้าย</strong> — ขอรับข้อมูลในรูปแบบที่ใช้ได้</span></div>
          <div class="right-item"><span>🚫</span> <span><strong>คัดค้าน</strong> — ปฏิเสธการประมวลผลบางประเภท</span></div>
          <div class="right-item"><span>⏸️</span> <span><strong>จำกัด</strong> — ขอจำกัดการประมวลผล</span></div>
        </div>
        <p>ส่งคำขอใช้สิทธิ์ได้ที่ <a href="mailto:narongkorn.tob@gmail.com" class="privacy-link">narongkorn.tob@gmail.com</a> เราจะตอบกลับภายใน 30 วัน</p>
      </section>

      <section class="privacy-section">
        <h2>9. การแก้ไขนโยบาย</h2>
        <p>
          เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว หากมีการเปลี่ยนแปลงสำคัญ
          เราจะแจ้งให้คุณทราบผ่านอีเมลหรือแบนเนอร์บนเว็บไซต์ก่อนวันมีผลบังคับใช้อย่างน้อย 7 วัน
          การใช้บริการต่อไปหลังจากวันดังกล่าวถือว่าคุณยอมรับนโยบายที่แก้ไขแล้ว
        </p>
      </section>

      <section class="privacy-section">
        <h2>10. ติดต่อเรา</h2>
        <div class="contact-box">
          <p><strong>ฝากเตือนที</strong> — ผู้ควบคุมข้อมูลส่วนบุคคล</p>
          <p>📧 <a href="mailto:narongkorn.tob@gmail.com" class="privacy-link">narongkorn.tob@gmail.com</a></p>
          <p>🌐 <a href="https://fak-tuan.pwigroups.com" class="privacy-link">fak-tuan.pwigroups.com</a></p>
          <p>⏱️ เวลาทำการ: จันทร์–ศุกร์ 09:00–18:00 น.</p>
        </div>
      </section>

    </main>

    <footer class="privacy-footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} ฝากเตือนที · สงวนลิขสิทธิ์ · <a href="/" class="privacy-link">กลับหน้าหลัก</a></p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.privacy-page {
  min-height: 100vh;
  background: var(--white);
  color: var(--brand-dark);
}

/* reading bar */
.read-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--brand-primary), #7c6af0);
  z-index: 200;
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
  pointer-events: none;
}

/* nav */
.privacy-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--brand-gray);
  padding: 14px 0;
}

.privacy-nav__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.privacy-nav__logo {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--brand-primary);
}

.privacy-nav__back {
  font-size: 0.88rem;
  color: var(--brand-mid);
  transition: color 0.15s;
}
.privacy-nav__back:hover { color: var(--brand-primary); }

/* hero */
.privacy-hero {
  background: linear-gradient(135deg, #eef0fd 0%, #f8f9ff 100%);
  padding: 56px 0 40px;
  border-bottom: 1px solid var(--brand-gray);
}

.privacy-hero__title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--brand-dark);
  margin-bottom: 10px;
}

.privacy-hero__meta {
  font-size: 0.88rem;
  color: var(--brand-mid);
}

/* body */
.privacy-body {
  padding: 56px 24px 80px;
  max-width: 860px;
}

/* sections */
.privacy-section {
  margin-bottom: 48px;
}

.privacy-section h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--brand-dark);
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--brand-primary-light);
}

.privacy-section h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--brand-dark);
  margin: 18px 0 10px;
}

.privacy-section p {
  font-size: 0.95rem;
  color: var(--brand-mid);
  line-height: 1.8;
  margin-bottom: 12px;
}

.privacy-section ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.privacy-section ul li {
  font-size: 0.93rem;
  color: var(--brand-mid);
  line-height: 1.7;
}

/* purpose grid */
.purpose-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.purpose-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--brand-light);
  border-radius: var(--radius-md);
  padding: 18px;
  border: 1px solid var(--brand-gray);
}

.purpose-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 1px; }
.purpose-card strong { display: block; font-size: 0.92rem; color: var(--brand-dark); margin-bottom: 4px; }
.purpose-card p { font-size: 0.83rem; color: var(--brand-mid); margin: 0; line-height: 1.5; }

/* privacy note */
.privacy-note {
  display: flex;
  gap: 12px;
  background: #fff8ec;
  border: 1px solid #f5a62344;
  border-left: 4px solid var(--brand-accent);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  margin-top: 14px;
  font-size: 0.88rem;
}
.privacy-note p { color: var(--brand-mid); margin: 0; font-size: 0.88rem; }

/* cookie table */
.cookie-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  margin: 14px 0;
}
.cookie-table th, .cookie-table td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid var(--brand-gray);
}
.cookie-table th {
  font-weight: 600;
  color: var(--brand-dark);
  background: var(--brand-light);
}
.cookie-table td { color: var(--brand-mid); }

.badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 50px;
  white-space: nowrap;
}
.badge--required  { background: #e8f8ee; color: #06a745; }
.badge--analytics { background: #eef0fd; color: var(--brand-primary); }
.badge--pref      { background: #fff8ec; color: #c47d00; }

/* rights */
.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin: 14px 0;
}
.right-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 0.9rem;
  color: var(--brand-mid);
  background: var(--brand-light);
  padding: 12px 14px;
  border-radius: var(--radius-sm);
}

/* contact box */
.contact-box {
  background: var(--brand-light);
  border: 1px solid var(--brand-gray);
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.92rem;
  color: var(--brand-mid);
}
.contact-box strong { color: var(--brand-dark); }

.privacy-link { color: var(--brand-primary); text-decoration: underline; text-underline-offset: 2px; }

/* footer */
.privacy-footer {
  background: var(--brand-dark);
  color: rgba(255,255,255,0.6);
  padding: 20px 0;
  font-size: 0.82rem;
  text-align: center;
}

@media (max-width: 600px) {
  .privacy-hero { padding: 40px 0 28px; }
  .privacy-body { padding: 36px 0 60px; }
  .cookie-table { font-size: 0.78rem; }
  .cookie-table th, .cookie-table td { padding: 8px 8px; }
  .purpose-grid, .rights-grid { grid-template-columns: 1fr; }
}
</style>

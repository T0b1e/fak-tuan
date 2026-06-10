# 🔔 ฝากเตือนที

> เหนื่อยมั้ย กับการลืม? — ระบบแจ้งเตือนอัตโนมัติสำหรับ Line กลุ่ม

![หน้าหลักฝากเตือนที](./docs/img/home.png)

---

## ฝากเตือนที คืออะไร?

ครูลา วันนี้ใส่เสื้ออะไร ส่งงานวันไหน — ทุกอย่างอยู่ใน Line กลุ่ม  
แต่ใครจะไปจำได้ทุกอย่าง? **ฝากเตือนที** จัดการให้คุณแทน

ฝากเตือนทีทำหน้าที่เป็นตัวกลางระหว่าง Google Calendar กับ Line กลุ่มของคุณ  
เมื่อเชื่อมต่อแล้ว ระบบจะส่งข้อความเตือนเข้ากลุ่มโดยอัตโนมัติ — ไม่ต้องส่งต่อเอง ไม่ต้องจำเอง

---

## ฟีเจอร์หลัก

| ฟีเจอร์ | รายละเอียด |
|---|---|
| 🔔 ตั้งเตือนล่วงหน้าได้ | กำหนดเวลาแจ้งเตือนก่อนกิจกรรมได้ตามต้องการ |
| 💬 ส่งตรงเข้า Line กลุ่ม | ข้อความเตือนถูกส่งผ่าน Line Messaging API โดยตรง |
| 📅 เชื่อม Google Calendar | ดึงกิจกรรมจากปฏิทินที่คุณมีสิทธิ์เข้าถึง |
| 👥 รองรับหลายกลุ่มพร้อมกัน | จัดการหลาย Line กลุ่มได้จากบัญชีเดียว |
| ⚡ แจ้งเตือนอัตโนมัติ 100% | ตั้งค่าครั้งเดียว ระบบทำงานเองโดยไม่ต้องแตะ |
| 🔒 ปลอดภัยไว้ใจได้ | ข้อมูลเข้ารหัส รหัสผ่าน bcrypt OAuth 2.0 |

---

## สถิติปัจจุบัน

- **20+** กลุ่มแชทที่ใช้งานอยู่ตอนนี้
- **20+** ผู้ใช้งานที่ไว้วางใจเรา
- **100%** ส่งเตือนโดยไม่ต้องแตะ

---

## Tech Stack

| ส่วน | เทคโนโลยี |
|---|---|
| Frontend | Vue 3 + TypeScript + Vite |
| Animation | GSAP 3 + ScrollTrigger |
| Routing | Vue Router 4 |
| Styling | Scoped CSS + CSS Variables (Kanit font) |
| Tunnel (dev) | Cloudflare Tunnel → `fak-tuan.pwigroups.com` |

---

## โครงสร้างโปรเจกต์

```
app/
├── src/
│   ├── views/
│   │   ├── LandingView.vue       # หน้า Landing page
│   │   ├── AuthView.vue          # เข้าสู่ระบบ / สมัคร / ลืมรหัส / OTP
│   │   ├── ContactView.vue       # ติดต่อเรา
│   │   └── PrivacyView.vue       # นโยบายความเป็นส่วนตัว (PDPA)
│   ├── components/
│   │   ├── landing/
│   │   │   ├── NavBar.vue
│   │   │   ├── HeroSection.vue
│   │   │   ├── AnimatedChatPhone.vue
│   │   │   ├── StatsSection.vue
│   │   │   ├── PainSection.vue
│   │   │   ├── FeaturesSection.vue
│   │   │   ├── HowItWorksSection.vue
│   │   │   ├── PricingSection.vue
│   │   │   ├── CtaSection.vue
│   │   │   └── FooterSection.vue
│   │   └── CookieBanner.vue
│   ├── composables/
│   │   └── useReveal.ts          # GSAP ScrollTrigger composables
│   ├── router/index.ts
│   └── assets/main.css
├── public/
│   └── img/
│       ├── line-svgrepo-com.svg
│       └── google-calendar-svgrepo-com.svg
docs/
└── img/
    └── home.png
```

---

## เริ่มต้นใช้งาน

### ติดตั้ง dependencies

```sh
cd app
npm install
```

### รัน development server

```sh
npm run dev
```

### เปิด tunnel ผ่าน Cloudflare (สำหรับ dev)

```sh
# Terminal 1 — dev server
npm run dev

# Terminal 2 — tunnel
cloudflared tunnel --config C:\Users\tob\.cloudflared\fak-tuan.yml run
```

เข้าใช้งานได้ที่: **https://fak-tuan.pwigroups.com**

### Build สำหรับ production

```sh
npm run build
```

### รัน unit tests

```sh
npm run test:unit
```

---

## หน้าและเส้นทาง (Routes)

| URL | หน้า |
|---|---|
| `/` | หน้าหลัก (Landing page) |
| `/auth` | เข้าสู่ระบบ / สมัครสมาชิก / ลืมรหัสผ่าน / OTP |
| `/contact` | ติดต่อเรา |
| `/privacy` | นโยบายความเป็นส่วนตัว |

---

## แนะนำ IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

ปิด Vetur ก่อนถ้าเคยติดตั้งไว้ เพราะขัดแย้งกับ Volar

---

© 2568 ฝากเตือนที · สงวนลิขสิทธิ์

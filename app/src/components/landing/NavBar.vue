<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header :class="['navbar', { scrolled }]">
    <div class="container navbar__inner">
      <a href="#" class="navbar__logo">
        <span class="logo-bell">🔔</span>
        <span>ฝากเตือนที</span>
      </a>

      <nav :class="['navbar__links', { open: menuOpen }]">
        <a href="#features" @click="menuOpen = false">ฟีเจอร์</a>
        <a href="#how" @click="menuOpen = false">วิธีใช้</a>
        <a href="#pricing" @click="menuOpen = false">ราคา</a>
        <RouterLink to="/contact" @click="menuOpen = false">ติดต่อเรา</RouterLink>
      </nav>

      <div class="navbar__actions">
        <RouterLink to="/auth" class="navbar__login">เข้าสู่ระบบ</RouterLink>
        <a href="#pricing" class="btn-primary navbar__cta">เริ่มใช้งาน</a>
        <button class="hamburger" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
          <span /><span /><span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 18px 0;
  transition:
    background 0.25s,
    box-shadow 0.25s,
    padding 0.25s;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
  padding: 12px 0;
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--brand-primary);
}

.logo-bell {
  font-size: 1.4rem;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.navbar__links a {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--brand-mid);
  transition: color 0.15s;
}

.navbar__links a:hover {
  color: var(--brand-primary);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navbar__login {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--brand-primary);
  transition: opacity 0.15s;
}
.navbar__login:hover { opacity: 0.7; }

.navbar__cta {
  font-size: 0.9rem;
  padding: 10px 22px;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--brand-dark);
  border-radius: 2px;
}

@media (max-width: 680px) {
  .hamburger {
    display: flex;
  }

  .navbar__links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--white);
    flex-direction: column;
    gap: 0;
    padding: 8px 0 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .navbar__links.open {
    display: flex;
  }

  .navbar__links a {
    padding: 12px 24px;
    width: 100%;
  }
}
</style>

<script setup lang="ts">
import NavBar from '@/components/landing/NavBar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import StatsSection from '@/components/landing/StatsSection.vue'
import PainSection from '@/components/landing/PainSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import HowItWorksSection from '@/components/landing/HowItWorksSection.vue'
import PricingSection from '@/components/landing/PricingSection.vue'
import CtaSection from '@/components/landing/CtaSection.vue'
import FooterSection from '@/components/landing/FooterSection.vue'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <StatsSection />
    <PainSection />
    <FeaturesSection />
    <HowItWorksSection />
    <PricingSection />
    <CtaSection />
  </main>
  <FooterSection />
</template>

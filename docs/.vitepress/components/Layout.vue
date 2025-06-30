<script setup lang="ts">
import { inBrowser, useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HeroSection from '../components/oldHeroSection.vue'
import SpotlightBackground from '../components/SpotlightBackground.vue'
import { watchEffect, onMounted } from 'vue'
import { Analytics } from '@vercel/analytics/vue'
import { SpeedInsights } from '@vercel/speed-insights/vue';

const route = useRoute()
const { lang, page } = useData()

// Detecta se está na home de qualquer idioma
const isHome = page.value.relativePath.endsWith('index.md')

// Define cookie de idioma
watchEffect(() => {
  if (!inBrowser) return

  try {
    const cookies = Object.fromEntries(
      document.cookie.split('; ').map((c) => c.split('='))
    )
    const cookieLang = cookies['nf_lang']
    if (cookieLang !== lang.value) {
      document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2030 00:00:00 UTC; path=/`
    }
  } catch (error) {
    console.warn('Erro ao manipular cookies:', error)
  }
})

// Otimizações mobile-first
onMounted(() => {
  if (!inBrowser) return

  // Detectar se é mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Adicionar classe para detecção de mobile
  if (isMobile) {
    document.documentElement.classList.add('is-mobile')
  }

  // Otimização de viewport para mobile
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  setViewportHeight()
  window.addEventListener('resize', setViewportHeight)
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100)
  })

  // Cleanup
  return () => {
    window.removeEventListener('resize', setViewportHeight)
    window.removeEventListener('orientationchange', setViewportHeight)
  }
})
</script>

<template>
  <Analytics />
  <SpeedInsights />
  <DefaultTheme.Layout>
    <template #home-hero-before>
      <SpotlightBackground v-show="isHome">
        <div class="hero">
          <HeroSection />
        </div>
      </SpotlightBackground>
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.hero {
  padding-top: 48px;
  padding-bottom: 32px;
}

/* Mobile-first optimizations */
@media (max-width: 768px) {
  .hero {
    padding-top: 24px;
    padding-bottom: 16px;
  }
}

/* Optimizations for mobile devices */
:global(.is-mobile) {
  /* Better touch scrolling */
  -webkit-overflow-scrolling: touch;
  /* Disable text size adjust on orientation change */
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

/* Viewport height fix for mobile browsers */
:global(:root) {
  --vh: 1vh;
}

/* Better mobile UX */
@media (hover: none) and (pointer: coarse) {
  /* Remove hover effects on touch devices */
  :deep(.VPDoc a:hover),
  :deep(.api-card:hover),
  :deep(.custom-block:hover) {
    transform: none !important;
  }
}

/* Safe area for mobile devices with notches */
@supports (padding: max(0px)) {
  :deep(.VPNav) {
    padding-left: max(16px, env(safe-area-inset-left));
    padding-right: max(16px, env(safe-area-inset-right));
  }

  :deep(.VPDoc .content) {
    padding-left: max(16px, env(safe-area-inset-left));
    padding-right: max(16px, env(safe-area-inset-right));
  }
}
</style>

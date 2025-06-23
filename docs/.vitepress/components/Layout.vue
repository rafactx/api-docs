<script setup lang="ts">
import { inBrowser, useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HeroSection from '../components/oldHeroSection.vue'
import SpotlightBackground from '../components/SpotlightBackground.vue'
import { watchEffect } from 'vue'

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
</script>

<template>
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
</style>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withBase, useData } from 'vitepress'
import SpotlightBackground from './SpotlightBackground.vue'

// 1. O hook useData() nos dá acesso aos dados da página, incluindo o idioma atual.
const { lang } = useData()

// 2. Criamos um "dicionário" com todas as traduções.
const translations = {
  pt: {
    headline: 'Involves Stage API',
    subtitle: 'Transformamos a documentação da API em uma experiência mais fluida e acessível.\nCom linguagem clara e exemplos úteis, você entende rápido o que precisa fazer e ganha agilidade no processo de integração.',
    primaryButtonText: 'Conheça a API',
    primaryButtonLink: '/pt/intro',
    secondaryButtonText: 'Central de Ajuda',
    secondaryButtonLink: 'https://help.involves.com/hc/pt-br',
    imageAltText: 'Preview da documentação da API Involves Stage'
  },
  en: {
    headline: 'Involves Stage API',
    subtitle: 'We turn API documentation into a more fluid and accessible experience.\nWith clear language and helpful examples, you can quickly understand what you need to do and streamline the integration process.',
    primaryButtonText: 'Explore the API',
    primaryButtonLink: '/en/intro',
    secondaryButtonText: 'Help Center',
    secondaryButtonLink: 'https://help.involves.com/hc/en-us',
    imageAltText: 'Preview of the Involves Stage API documentation'
  },
  es: {
    headline: 'API de Involves Stage',
    subtitle: 'Transformamos la documentación de la API en una experiencia más fluida y accesible.\nCon un lenguaje claro y ejemplos útiles, entiendes rápidamente lo que necesitas y ganas agilidad en el proceso de integración.',
    primaryButtonText: 'Explora la API',
    primaryButtonLink: '/es/intro',
    secondaryButtonText: 'Centro de Ayuda',
    secondaryButtonLink: 'https://help.involves.com/hc/es',
    imageAltText: 'Vista previa de la documentación de la API de Involves Stage'
  },
  fr: {
    headline: 'API Involves Stage',
    subtitle: "Nous transformons la documentation de l'API en une expérience plus fluide et accessible.\nAvec un langage clair et des exemples utiles, vous comprenez rapidement ce que vous devez faire et gagnez en agilité.",
    primaryButtonText: "Découvrez l'API",
    primaryButtonLink: '/fr/intro',
    secondaryButtonText: "Centre d'Aide",
    secondaryButtonLink: 'https://help.involves.com/hc/fr',
    imageAltText: "Aperçu de la documentation de l'API Involves Stage"
  }
}

// 3. Criamos uma propriedade computada que seleciona o conjunto de textos correto com base no idioma.
// Se o idioma não for encontrado, ele usa 'pt' como padrão.
const t = computed(() => translations[lang.value] || translations.pt)

// 4. Props que não mudam com o idioma podem permanecer.
const props = defineProps({
  imageSrc: {
    type: String,
    default: '/1440.png'
  },
  animationDelay: {
    type: Number,
    default: 100
  }
})

const isImageLoading = ref(true)
const animationStarted = ref(false)

// O headline agora vem do nosso objeto de tradução 't'.
const headlineWords = computed(() =>
  t.value.headline.trim().split(' ').filter(Boolean)
)

const onImageLoad = () => (isImageLoading.value = false)
const onImageError = (e: Event) => {
  isImageLoading.value = false
  console.error('Falha ao carregar a imagem:', e)
}

onMounted(() => {
  requestAnimationFrame(() => (animationStarted.value = true))
  const img = document.querySelector('.preview-image') as HTMLImageElement | null
  if (img?.complete) isImageLoading.value = false
})
</script>

<template>
  <SpotlightBackground>
    <div class="hero-container">
      <main class="main-content">
        <h1 class="headline" role="banner">
          <span
            v-for="(word, idx) in headlineWords"
            :key="idx"
            class="word-span"
            :class="{ 'is-visible': animationStarted }"
            :style="{ transitionDelay: `${idx * animationDelay}ms` }"
          >
            {{ word }}
          </span>
        </h1>

        <p class="subtitle" :class="{ 'is-visible': animationStarted }">
          {{ t.subtitle }}
        </p>

        <div class="buttons-container" :class="{ 'is-visible': animationStarted }">
          <a
            :href="withBase(t.primaryButtonLink)"
            class="button button--primary"
            :aria-label="`${t.primaryButtonText} - Acessar documentação da API`"
          >
            <span class="button__text">{{ t.primaryButtonText }}</span>
            <span class="button__icon" aria-hidden="true">→</span>
          </a>
          <a
            :href="t.secondaryButtonLink"
            class="button button--secondary"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${t.secondaryButtonText} - Obter suporte técnico`"
          >
            <span class="button__text">{{ t.secondaryButtonText }}</span>
          </a>
        </div>

        <div class="image-preview" :class="{ 'is-visible': animationStarted }">
          <div class="image-container">
            <img
              class="preview-image"
              :src="withBase(imageSrc)"
              :alt="t.imageAltText"
              loading="eager"
              decoding="async"
              @load="onImageLoad"
              @error="onImageError"
            />
            <div v-if="isImageLoading" class="image-skeleton" aria-hidden="true" />
          </div>
        </div>
      </main>
    </div>
  </SpotlightBackground>
</template>

<style scoped>
/* Os estilos permanecem os mesmos */
:host {
  --primary-color: #3b82f6;
  --border-color: var(--vp-c-divider);
  --shadow-soft: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --border-radius: 0.5rem;
}

.hero-container {
  margin: 2.5rem auto;
  padding: 0 1rem;
  display: flex;
  max-width: 1280px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main-content {
  padding: 2.5rem 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
  width: 100%;
}

.headline {
  margin: 0 auto 1rem;
  max-width: 56rem;
  font-size: clamp(2rem, 4vw, 4.5rem);
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.1;
}

.word-span {
  display: inline-block;
  margin-right: 0.5rem;
  opacity: 0;
  transform: translateY(10px);
  filter: blur(4px);
  transition:
    transform 0.35s cubic-bezier(.42,0,.58,1),
    filter 0.35s cubic-bezier(.42,0,.58,1),
    opacity 0.35s cubic-bezier(.42,0,.58,1);
  will-change: transform, opacity, filter;
}
.word-span.is-visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.subtitle {
  margin: 0 auto;
  padding: 1.25rem 0;
  max-width: 44rem;
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  font-weight: 400;
  line-height: 1.75;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  white-space: normal;
  opacity: 0;
  transition: opacity 0.4s ease-in-out 0.8s;
  will-change: opacity;
}

.buttons-container {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.4s ease-in-out 1s;
  will-change: opacity;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.3rem;
  font-weight: 500;
  font-size: 1.05rem;
  text-decoration: none;
  border-radius: 1.7rem;
  transition: all 0.21s cubic-bezier(.42,0,.58,1);
}
.button--primary {
  background: var(--vp-hero-primary-color);
  color: #fff;
  box-shadow: 0 6px 32px 0 rgba(70, 147, 248, 0.09);
  border: none;
}
.button--primary:focus-visible {
  outline: 2.5px solid var(--vp-hero-primary-color);
  outline-offset: 3px;
}
.button--primary .button__icon {
  transition: transform 0.2s cubic-bezier(.42,0,.58,1);
}
.button--primary:hover .button__icon {
  transform: translateX(6px);
}
.button--primary:hover {
  background: var(--vp-c-brand-dark);
  box-shadow: 0 12px 28px 0 rgba(70, 147, 248, 0.15);
}
.button--secondary {
  border: 1.5px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.button--secondary:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-hero-primary-color);
}

.image-preview {
  margin-top: 5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease-in-out 1.2s, transform 0.4s ease-in-out 1.2s;
  will-change: opacity, transform;
}

.image-container {
  position: relative;
  overflow: visible;
  border-radius: 0.75rem;
  box-shadow: var(--shadow-soft);
}

.preview-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  transition: transform 0.3s ease;
}
.image-preview:hover .preview-image {
  transform: scale(1.02);
}

.image-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
    var(--vp-c-bg-soft) 25%,
    var(--vp-c-bg-mute) 50%,
    var(--vp-c-bg-soft) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.is-visible {
  opacity: 1;
  transform: translateY(0) blur(0);
}

@keyframes pulse-gradient {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 768px) {
  .hero-container { margin: 1rem auto; }
  .main-content { padding: 1rem; }
  .buttons-container {
    flex-direction: column;
    width: 100%;
  }
  .button { width: 100%; }
  .image-preview { margin-top: 3rem; }
}
@media (max-width: 480px) {
  .headline { font-size: 1.8rem; }
  .subtitle { font-size: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .word-span,
  .subtitle,
  .buttons-container,
  .image-preview,
  .button,
  .preview-image,
  .gradient-pulse,
  .gradient-pulse--horizontal {
    transition: none !important;
    animation: none !important;
  }
}
@media (prefers-contrast: high) {
  .button--primary, .button--secondary {
    border: 2px solid currentColor;
  }
}
</style>

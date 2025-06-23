<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import SpotlightBackground from './SpotlightBackground.vue'

interface Props {
  headline?: string
  subtitle?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  imageSrc?: string
  imageAltText?: string
  animationDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Involves Stage API',
  subtitle: 'Transformamos a documentação da API em uma experiência mais fluida e acessível.\nCom linguagem clara e exemplos úteis, você entende rápido o que precisa fazer e ganha agilidade no processo de integração.',
  primaryButtonText: 'Conheça a API',
  primaryButtonLink: '/pt/intro',
  secondaryButtonText: 'Central de Ajuda',
  secondaryButtonLink: 'https://help.involves.com/hc/pt-br',
  imageSrc: '/1440.png',
  imageAltText: 'Preview da documentação da API Involves Stage',
  animationDelay: 100
})

const isImageLoading = ref(true)
const animationStarted = ref(false)

const headlineWords = computed(() =>
  props.headline.trim().split(' ').filter(Boolean)
)

const onImageLoad = () => (isImageLoading.value = false)
const onImageError = (e: Event) => {
  isImageLoading.value = false
  console.error('Falha ao carregar a imagem:', e)
}

onMounted(() => {
  // dispara animação
  requestAnimationFrame(() => (animationStarted.value = true))
  // se a imagem já carregou antes da hidratação, remove skeleton
  const img = document.querySelector('.preview-image') as HTMLImageElement | null
  if (img?.complete) isImageLoading.value = false
})
</script>

<template>
  <SpotlightBackground>
    <div class="hero-container">
      <!-- decoradores omitidos para brevidade -->

      <main class="main-content">
        <!-- Headline -->
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

        <!-- Sub-título -->
        <p class="subtitle" :class="{ 'is-visible': animationStarted }">
          {{ subtitle }}
        </p>

        <!-- Botões -->
        <div class="buttons-container" :class="{ 'is-visible': animationStarted }">
          <a
            :href="primaryButtonLink"
            class="button button--primary"
            :aria-label="`${primaryButtonText} - Acessar documentação da API`"
          >
            <span class="button__text">{{ primaryButtonText }}</span>
            <span class="button__icon" aria-hidden="true">→</span>
          </a>
          <a
            :href="secondaryButtonLink"
            class="button button--secondary"
            :aria-label="`${secondaryButtonText} - Obter suporte técnico`"
          >
            <span class="button__text">{{ secondaryButtonText }}</span>
          </a>
        </div>

        <!-- Imagem -->
        <div class="image-preview" :class="{ 'is-visible': animationStarted }">
          <div class="image-container">
            <img
              class="preview-image"
              :src="withBase(imageSrc)"
              :alt="imageAltText"
              loading="eager"
              decoding="async"
              @load="onImageLoad"
              @error="onImageError"
            />
            <!-- overlay apenas enquanto carregando -->
            <div v-if="isImageLoading" class="image-skeleton" aria-hidden="true" />
          </div>
        </div>
      </main>
    </div>
  </SpotlightBackground>
</template>

<style scoped>
/* CSS Variables for theming */
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



/* --- Main Content --- */
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

/* Animação das palavras */
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

/* --- Buttons --- */
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

/* --- Image Preview --- */
.image-preview {
  margin-top: 5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease-in-out 1.2s, transform 0.4s ease-in-out 1.2s;
  will-change: opacity, transform;
}

/* AJUSTE: Aplicando cantos arredondados e sombra diretamente no container da imagem */
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

/* --- Visibility & Animations --- */
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

/* --- Responsive Design --- */
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

/* --- Accessibility --- */
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

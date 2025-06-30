---
layout: page
sidebar: false
aside: false
---


<HeroSection />

<script setup>
const userLang = navigator.language || navigator.userLanguage
if (userLang.startsWith('pt')) {
  window.location.replace('/pt/')
} else if (userLang.startsWith('es')) {
  window.location.replace('/es/')
} else if (userLang.startsWith('fr')) {
  window.location.replace('/fr/')
} else {
  window.location.replace('/en/')
}
</script>

Se não for redirecionado automaticamente, escolha o idioma:
- [Português](/pt/)
- [English](/en/)
- [Español](/es/)
- [Français](/fr/)

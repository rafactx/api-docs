---
layout: home
titleTemplate: false
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Redirecionar para /pt/ se estiver na raiz
  if (window.location.pathname === '/') {
    window.location.href = '/pt/'
  }
})
</script>

<HeroSection />

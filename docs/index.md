---
layout: page
title: Redirecionando…
---

<script>
  (function () {
    const SUPPORTED = ['pt', 'en', 'es', 'fr']
    const FALLBACK  = 'pt'

    const browserLang = (navigator.language || '')
      .split['-'](0)
      .toLowerCase()

    const lang = SUPPORTED.includes(browserLang) ? browserLang : FALLBACK

    if (!location.pathname.startsWith('/' + lang + '/')) {
      location.replace('/' + lang + '/')
    }
  })();
</script>

Redirecionando…

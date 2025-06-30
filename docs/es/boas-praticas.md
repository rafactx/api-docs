---
title: Límites y buenas prácticas
---

## 🚦 Límites y buenas prácticas

La API no impone un límite rígido de peticiones por minuto, pero implementa mecanismos automáticos de protección contra uso abusivo.

Para garantizar estabilidad y rendimiento, recomendamos las siguientes prácticas:

- Evita múltiples peticiones simultáneas innecesarias.

- Mantén un volumen medio de hasta **60 peticiones por minuto por entorno**.

- Siempre implementa control de retry con backoff exponencial en integraciones continuas.

::: tip Consejo
Implementa caché para datos que no cambian frecuentemente y monitorea el uso de tu integración.
:::

## 💰 Facturación

Actualmente, la API es totalmente gratuita.
Si esto cambia en el futuro, serás informado con anticipación.

## ⚙️ Métodos HTTP utilizados

La API sigue los métodos HTTP estándar para indicar el tipo de operación deseada:

<script setup>

const methodsTable = [
  { key: 'GET', description: 'Consultar datos', color: 'blue' },
  { key: 'POST', description: 'Crear nuevos datos o ejecutar acciones', color: 'green' },
  { key: 'PUT', description: 'Actualizar integralmente datos existentes', color: 'purple' },
  { key: 'PATCH', description: 'Actualizar parcialmente datos existentes', color: 'yellow' },
  { key: 'DELETE', description: 'Eliminar datos existentes', color: 'red' }
]
</script>

<ApiCard
  title="Métodos HTTP"
  :items="methodsTable"
/>

::: tip Referencia
Para más detalles sobre los métodos HTTP, consulta la [RFC 7231 - HTTP/1.1 Semantics and Content](https://datatracker.ietf.org/doc/html/rfc7231){target="_blank" rel="noopener"}.
:::

---
title: Limites et bonnes pratiques
---

## 🚦 Limites et bonnes pratiques

L'API n'impose pas de limite strict de requêtes par minute, mais implémente des mécanismes automatiques de protection contre l'usage abusif.

Pour garantir stabilité et performance, nous recommandons les pratiques suivantes :

- Évitez les requêtes simultanées multiples inutiles.

- Maintenez un volume moyen de jusqu'à **60 requêtes par minute par environnement**.

- Implémentez toujours un contrôle de retry avec backoff exponentiel dans les intégrations continues.

::: tip Conseil
Implémentez un cache pour les données qui ne changent pas fréquemment et surveillez l'utilisation de votre intégration.
:::

## 💰 Facturation

Actuellement, l'API est entièrement gratuite.
Si cela change à l'avenir, vous en serez informé à l'avance.

## ⚙️ Méthodes HTTP utilisées

L'API suit les méthodes HTTP standard pour indiquer le type d'opération souhaitée :

<script setup>

const methodsTable = [
  { key: 'GET', description: 'Consulter des données', color: 'blue' },
  { key: 'POST', description: 'Créer de nouvelles données ou exécuter des actions', color: 'green' },
  { key: 'PUT', description: 'Mettre à jour intégralement des données existantes', color: 'purple' },
  { key: 'PATCH', description: 'Mettre à jour partiellement des données existantes', color: 'yellow' },
  { key: 'DELETE', description: 'Supprimer des données existantes', color: 'red' }
]
</script>

<ApiCard
  title="Méthodes HTTP"
  :items="methodsTable"
/>

::: tip Référence
Pour plus de détails sur les méthodes HTTP, consultez la [RFC 7231 - HTTP/1.1 Semantics and Content](https://datatracker.ietf.org/doc/html/rfc7231){target="_blank" rel="noopener"}.
:::

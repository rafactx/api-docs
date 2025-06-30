---
title: Navigation des données
---

## 🔗 HATEOAS

Nous utilisons le standard HATEOAS pour indiquer les actions ou ressources liées dans les réponses JSON :

Exemple pratique :

```json
{
  "id": 123,
  "_link": "https://exemplo.involves.com/webservices/api/v3/chain/123"
}
```

- Utilisez toujours l'URL indiquée dans `_link` pour accéder aux ressources liées.
- Les URLs peuvent changer à l'avenir, mais nous garantissons toujours la rétrocompatibilité de la ressource retournée.

---

## 📑 Pagination

Les résultats volumineux sont paginés. Envoyez des paramètres comme `page` (page actuelle) et `size` (taille de la page).

Exemple d'URL avec pagination :

```json
https://exemplo.involves.com/webservices/api/v3/environments/{environmentId}/resource?page=2&size=20
```

---

## 🔄 Synchronisation des bases

::: warning
L'API n'est pas recommandée pour les synchronisations en temps réel ou à grande échelle. Pour ce type d'opération, utilisez le service dédié **Data Integration**.

En cas de doute ou pour souscrire, [ouvrez un ticket avec le Support](https://help.involves.com/hc/pt-br/requests/new){target="_blank" rel="noopener"}.
:::

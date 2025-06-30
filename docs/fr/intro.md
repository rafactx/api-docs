---
title: Vue d'ensemble
description: Bonnes pratiques pour se connecter en toute sécurité à l'API d'Involves Stage.
---

## 🚀 Introduction

L'API d'**Involves Stage** permet d'intégrer facilement des systèmes externes, d'automatiser les processus et de simplifier vos opérations.
Développée en suivant les principes REST, notre API est intuitive, facile à utiliser et entièrement compatible avec les clients HTTP courants, sans nécessiter de développement spécial.

---

L'URL de base pour toutes les requêtes est :

::: code-group

```bash [URL de base]
https://exemplo.involves.com/webservices/api/v3
```

```javascript [Exemple de base]
const baseUrl = 'https://exemplo.involves.com/webservices/api/v3';
const headers = {
  'Authorization': 'Basic ' + btoa('usuario:senha'),
  'X-AGILE-CLIENT': 'EXTERNAL_APP',
  'Accept-Version': '2020-02-26'
};

fetch(baseUrl, { headers })
  .then(response => response.json())
  .then(data => console.log(data));
```

```python [Exemple de base]
import requests

base_url = 'https://exemplo.involves.com/webservices/api/v3'
headers = {
    'Authorization': 'Basic ' + base64.b64encode('usuario:senha'.encode()).decode(),
    'X-AGILE-CLIENT': 'EXTERNAL_APP',
    'Accept-Version': '2020-02-26'
}

response = requests.get(base_url, headers=headers)
data = response.json()
print(data)
```

:::

::: tip Conseil
Ne testez jamais directement en environnement de production.

Créez un environnement spécifique (sandbox) avec des utilisateurs exclusifs pour les tests.

Si vous avez besoin d'aide pour configurer, [ouvrez un ticket avec le Support](https://help.involves.com/hc/pt-br/requests/new){target="_blank" rel="noopener"}.
:::

## 📚 À propos de cette documentation

Cette documentation est maintenue en synchronisation avec la version la plus récente de l'API d'Involves Stage.<br />
Cependant, de petites différences peuvent survenir si votre instance est sur une version antérieure.
Dans la mesure du possible, vérifiez l'en-tête de version (Accept-Version) ou consultez le support en cas de doute.

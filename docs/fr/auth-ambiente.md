---
title: 'Authentification et En-têtes'
---

## 🔧 En-têtes HTTP obligatoires

Toutes les requêtes vers l'API doivent inclure les en-têtes suivants :

<ApiCard
  title="request.headers"
  :items="[
    {
      key: 'Authorization',
      description: 'Basic base64(usuario:senha) — authentification de l\'utilisateur.',
      color: 'blue'
    },
    {
      key: 'X-AGILE-CLIENT',
      description: '<code>EXTERNAL_APP</code> — indique que la requête est externe.',
      color: 'purple'
    },
    {
      key: 'Accept-Version',
      description: '<code>2020-02-26</code> — définit la version de l\'API v3 à utiliser.',
      color: 'pink'
    }
  ]"
/>

## 📅 Versioning via en-tête

L'API v3 utilise le **versioning par date** via l'en-tête `Accept-Version`. Cela signifie que vous choisissez explicitement quelle version de l'API utiliser, garantissant que votre intégration ne se casse jamais de manière inattendue.

### Comment ça fonctionne

<ApiCard
  title="Accept-Version header"
  :items="[
    {
      key: 'Version actuelle :',
      description: '<code>2020-02-26</code>',
      color: 'green'
    },
    {
      key: 'Format :',
      description: '<code>YYYY-MM-DD</code> (date de lancement)',
      color: 'blue'
    },
    {
      key: 'Obligatoire :',
      description: 'Oui, dans toutes les requêtes v3',
      color: 'purple'
    }
  ]"
/>

### Pourquoi utiliser le versioning ?

**Exemple pratique du quotidien :**

```bash
# Votre intégration actuelle (fonctionne parfaitement) :
Accept-Version: 2020-02-26

# Si l'API lance une nouvelle version avec des changements :
Accept-Version: 2021-05-14  # Nouvelle version avec de nouveaux champs

# Votre ancienne intégration continue de fonctionner :
Accept-Version: 2020-02-26  # Fonctionne toujours !
```

### Migration entre versions

Quand vous voulez utiliser de nouvelles fonctionnalités :

::: code-group

```js [JavaScript]
const stage = require('@involves/stage-sdk');

stage.configure({
  apiVersion: '2020-02-26',
  credentials: {
    username: 'usuario',
    password: 'senha'
  }
});
```

```python [Python]
from involves import stage

stage.configure(
    api_version='2020-02-26',
    credentials={
        'username': 'usuario',
        'password': 'senha'
    }
)
```

```shell [cURL]
curl -H "Accept-Version: 2020-02-26" \
     -H "X-AGILE-CLIENT: EXTERNAL_APP" \
     -u usuario:senha \
     https://api.involves.com/webservices/api/v3/...
```

:::

::: tip Avantages du versioning

- **Zéro temps d'arrêt :** Votre intégration ne se casse jamais
- **Migration progressive :** Testez de nouvelles versions sans affecter la production
- **Contrôle total :** Vous décidez quand mettre à jour
- **Compatibilité :** Les anciennes versions fonctionnent toujours
:::

::: warning ⚠️ Important

- **v1 et v2 :** N'ont pas besoin de l'en-tête `Accept-Version`
- **v3+ :** L'en-tête est **obligatoire** dans toutes les requêtes
- **Version par défaut :** Utilisez toujours `2020-02-26` sauf si vous avez besoin de fonctionnalités spécifiques
:::

## 🔐 Authentification

L'API offre **deux formes** d'authentification. Vous pouvez choisir celle que vous préférez :

### Option 1 : Identifiants directs (Recommandé pour le développement)

Utilisez votre **nom d'utilisateur et mot de passe** d'Involves Stage directement :

<ApiCard
  title="Authorization header - Identifiants directs"
  :items="[
    {
      key: 'Utilisateur :',
      description: '<code>seuUsuarioDoInvolvesStage</code>',
      color: 'blue'
    },
    {
      key: 'Mot de passe :',
      description: '<code>suaSenhaDoInvolvesStage</code>',
      color: 'purple'
    },
    {
      key: 'En-tête complet :',
      description: '<code>Authorization: Basic base64(usuario:senha)</code>',
      color: 'pink'
    }
  ]"
/>

**Exemple pratique :**

```bash
# Votre utilisateur : "joao.silva"
# Votre mot de passe : "minhaSenha123"

# Dans le terminal :
echo -n "joao.silva:minhaSenha123" | base64
# Résultat : am9hby5zaWx2YTptaW5oYVNlbmhhMTIz

# En-tête final :
Authorization: Basic am9hby5zaWx2YTptaW5oYVNlbmhhMTIz
```

### Option 2 : Identifiants pré-codés

Utilisez des identifiants déjà codés en Base64 (utile pour les environnements de production) :

<ApiCard
  title="Authorization header - Identifiants pré-codés"
  :items="[
    {
      key: 'En-tête complet :',
      description: '<code>Authorization: Basic YWdpbGl0bzppbnZvbHZlcw==</code>',
      color: 'pink'
    }
  ]"
/>

::: tip 💡 Conseils pour les développeurs

- **Pour les tests :** Utilisez l'Option 1 avec vos identifiants réels
- **Pour la production :** Utilisez l'Option 2 avec des identifiants spécifiques à l'environnement
- **En JavaScript :** `btoa('usuario:senha')` génère le Base64 automatiquement
- **En Python :** `base64.b64encode('usuario:senha'.encode()).decode()`
- **En cURL :** Utilisez `-u usuario:senha` et cURL fait le Base64 automatiquement
:::

::: warning ⚠️ Sécurité

- Ne committez jamais d'identifiants dans le code
- Utilisez des variables d'environnement pour stocker les mots de passe
- En production, considérez l'utilisation de tokens d'API quand disponibles
:::

## 🌍 Identification de l'Environnement (Environment ID)

La plupart des endpoints exigent l'`environmentId`. L'URL complète ressemble à ceci :

```json
https://exemplo.involves.com/webservices/api/v3/environments/{environmentId}
```

Pour obtenir l'ID correct :

1. Allez dans **Administration des Environnements** dans Involves Stage.
2. Sélectionnez l'environnement souhaité et cliquez sur **Modifier**.
3. Copiez l'ID de l'environnement affiché dans l'URL du navigateur.

::: tip 💡 Conseil Pro

- Utilisez le raccourci **Ctrl + K → Administration des Environnements** pour trouver l'écran rapidement.
:::

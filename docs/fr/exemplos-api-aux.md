---
title: Exemples & APIs Auxiliaires
description: Exemples pratiques d'utilisation de l'API d'Involves Stage dans différents langages de programmation.
---

## 💡 Exemples pratiques

Voici des exemples de comment faire des requêtes vers l'API d'Involves Stage en utilisant différents langages de programmation :

::: code-group

```javascript [JavaScript (axios)]
import axios from 'axios';

const token = btoa('seuUsuario:suaSenha');

const response = await axios.get('https://exemplo.involves.com/webservices/api/v3', {
  headers: {
    Authorization: `Basic ${token}`,
    'X-AGILE-CLIENT': 'EXTERNAL_APP',
    'Accept-Version': '2020-02-26'
  }
});

console.log(response.data);
```

```python [Python (requests)]
import requests
from requests.auth import HTTPBasicAuth

response = requests.get(
  'https://exemplo.involves.com/webservices/api/v3',
  auth=HTTPBasicAuth('seuUsuario', 'suaSenha'),
  headers={
    'X-AGILE-CLIENT': 'EXTERNAL_APP',
    'Accept-Version': '2020-02-26'
  }
)

print(response.json())
```

```bash [cURL]
curl -X GET "https://exemplo.involves.com/webservices/api/v3" \
  -H "Authorization: Basic $(echo -n 'seuUsuario:suaSenha' | base64)" \
  -H "X-AGILE-CLIENT: EXTERNAL_APP" \
  -H "Accept-Version: 2020-02-26"
```

```php [PHP]
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://exemplo.involves.com/webservices/api/v3");
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Authorization: Basic " . base64_encode("seuUsuario:suaSenha"),
  "X-AGILE-CLIENT: EXTERNAL_APP",
  "Accept-Version: 2020-02-26"
));

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```

:::

## 📸 API de Photos de Recherche

L'extraction de photos via API n'est disponible que sur autorisation spécifique.

Pour accéder aux endpoints de photos de recherche, il est nécessaire de demander une autorisation à notre équipe de Support.

::: tip Information importante
Cette fonctionnalité n'est pas disponible publiquement dans la documentation par défaut.

Pour demander l'accès, [ouvrez un ticket avec le Support](https://help.involves.com/hc/pt-br/requests/new){target="_blank" rel="noopener"} en indiquant l'environnement souhaité pour validation.
:::

## 🔧 Exemples d'Authentification

### Authentification Basique

::: code-group

```javascript [JavaScript]
// Utilisant fetch natif
const credentials = btoa('usuario:senha');
const response = await fetch('https://exemplo.involves.com/webservices/api/v3', {
  headers: {
    'Authorization': `Basic ${credentials}`,
    'X-AGILE-CLIENT': 'EXTERNAL_APP',
    'Accept-Version': '2020-02-26'
  }
});
```

```python [Python]
import requests
import base64

credentials = base64.b64encode('usuario:senha'.encode()).decode()
headers = {
    'Authorization': f'Basic {credentials}',
    'X-AGILE-CLIENT': 'EXTERNAL_APP',
    'Accept-Version': '2020-02-26'
}

response = requests.get('https://exemplo.involves.com/webservices/api/v3', headers=headers)
```

:::

### En-têtes Obligatoires

<script setup>

const headersTable = [
  {
    key: 'Authorization',
    description: '<code>Basic &lt;token&gt;</code> — Token d\'authentification en Base64',
    color: 'blue'
  },
  {
    key: 'X-AGILE-CLIENT',
    description: '<code>EXTERNAL_APP</code> — Identifiant du client',
    color: 'purple'
  },
  {
    key: 'Accept-Version',
    description: '<code>2020-02-26</code> — Version de l\'API',
    color: 'red'
  }
]
</script>

### Tous les endpoints de l'API requièrent les en-têtes suivants

<ApiCard
  title="request.headers"
  :items="headersTable"
/>

::: warning Attention
Ne partagez jamais vos identifiants d'accès ou ne les incluez pas dans du code qui sera versionné.
Utilisez toujours des variables d'environnement pour stocker les informations sensibles.
:::

## 📊 Exemples de Réponse

### Réponse de Succès

```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Exemple de données",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "message": "Opération réalisée avec succès"
}
```

### Réponse d'Erreur

```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_FAILED",
    "message": "Identifiants invalides",
    "details": "Nom d'utilisateur ou mot de passe incorrects"
  }
}
```

::: tip Conseil
Vérifiez toujours le champ `success` dans la réponse avant de traiter les données.
En cas d'erreur, le champ `error` contiendra des informations détaillées sur le problème.
:::

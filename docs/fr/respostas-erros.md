---
title: Réponses & Erreurs
description: "Codes de statut HTTP, formats de réponse et traitement des erreurs de l'API d'Involves Stage."
---

## 📜 Réponses HTTP

L'API retourne toujours un statut HTTP et, généralement, un objet JSON avec des détails spécifiques.

<script setup>

const statusTable = [
  {
    key: '200',
    description: '<code>OK</code> — Requête réussie',
    color: 'green'
  },
  {
    key: '400',
    description: '<code>Bad Request</code> — Erreur dans la requête (vérifiez le format et les paramètres)',
    color: 'red'
  },
  {
    key: '401',
    description: '<code>Unauthorized</code> — Erreur d\'authentification',
    color: 'red'
  },
  {
    key: '403',
    description: '<code>Forbidden</code> — Permissions insuffisantes',
    color: 'red'
  },
  {
    key: '404',
    description: '<code>Not Found</code> — Ressource ou URL inexistante',
    color: 'purple'
  },
  {
    key: '406',
    description: '<code>Not Acceptable</code> — Version du endpoint invalide ou en-tête incorrect',
    color: 'yellow'
  },
  {
    key: '412',
    description: '<code>Precondition Failed</code> — En-têtes obligatoires manquants ou incorrects',
    color: 'yellow'
  },
  {
    key: '500',
    description: '<code>Internal Server Error</code> — Erreur interne du serveur (contactez le support technique)',
    color: 'pink'
  }
]
</script>

<ApiCard
  title="HTTP Status"
  :items="statusTable"
/>

::: tip Vérification du statut
Pour vérifier le statut d'une requête :

```bash
curl -I https://api.involves.com/v3/endpoint | grep HTTP
```

:::

## ⚠️ Traitement des erreurs

En cas d'erreur, nous retournons un objet détaillé avec des informations utiles :

### Exemple d'erreur (API v3)

```json
{
  "status": 400,
  "term": "ID_INVALIDO",
  "message": "L'ID fourni est invalide.",
  "details": [
    {
      "field": "id",
      "message": "L'ID doit être un nombre entier valide."
    }
  ]
}
```

### Structure de l'objet d'erreur

| Champ | Type | Description |
|-------|------|-------------|
| `status` | number | Code de statut HTTP |
| `term` | string | Identifiant unique de l'erreur |
| `message` | string | Message descriptif de l'erreur |
| `details` | array | Liste des détails spécifiques de l'erreur |

### Codes d'erreur courants

| Terme | Statut | Description |
|-------|--------|-------------|
| `AUTHENTICATION_FAILED` | 401 | Identifiants invalides |
| `INSUFFICIENT_PERMISSIONS` | 403 | Permissions insuffisantes |
| `RESOURCE_NOT_FOUND` | 404 | Ressource non trouvée |
| `INVALID_REQUEST` | 400 | Requête malformée |
| `MISSING_HEADERS` | 412 | En-têtes obligatoires manquants |

::: warning Attention
Pour les erreurs de code **404**, vérifiez si la ressource existe ou si l'adresse est correcte (y compris HTTPS et environmentId, le cas échéant).
:::

## 📊 Exemples de réponse

### Réponse de succès

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

### Réponse avec pagination

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Item 1"
    },
    {
      "id": 2,
      "name": "Item 2"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

::: tip Conseil
Vérifiez toujours le champ `success` dans la réponse avant de traiter les données.
En cas d'erreur, le champ `error` contiendra des informations détaillées sur le problème.
:::

## 🔧 Traitement des erreurs dans différents langages

::: code-group

```javascript [JavaScript]
try {
  const response = await fetch('https://api.involves.com/v3/endpoint', {
    headers: {
      'Authorization': `Basic ${token}`,
      'X-AGILE-CLIENT': 'EXTERNAL_APP',
      'Accept-Version': '2020-02-26'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(`Erreur ${errorData.status}: ${errorData.message}`);
    return;
  }

  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('Erreur dans la requête:', error);
}
```

```python [Python]
import requests

try:
    response = requests.get('https://api.involves.com/v3/endpoint', headers={
        'Authorization': f'Basic {token}',
        'X-AGILE-CLIENT': 'EXTERNAL_APP',
        'Accept-Version': '2020-02-26'
    })

    response.raise_for_status()
    data = response.json()
    print(data)

except requests.exceptions.HTTPError as e:
    error_data = e.response.json()
    print(f"Erreur {error_data['status']}: {error_data['message']}")
except Exception as e:
    print(f"Erreur dans la requête: {e}")
```

```php [PHP]
<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.involves.com/v3/endpoint");
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization: Basic " . $token,
    "X-AGILE-CLIENT: EXTERNAL_APP",
    "Accept-Version: 2020-02-26"
));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 400) {
    $errorData = json_decode($response, true);
    echo "Erreur {$errorData['status']}: {$errorData['message']}";
} else {
    $data = json_decode($response, true);
    print_r($data);
}
?>
```

:::

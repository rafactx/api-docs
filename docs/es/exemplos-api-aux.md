---
title: Ejemplos & APIs Auxiliares
description: Ejemplos prácticos de uso de la API de Involves Stage en diferentes lenguajes de programación.
---

## 💡 Ejemplos prácticos

Aquí tienes ejemplos de cómo hacer peticiones a la API de Involves Stage usando diferentes lenguajes de programación:

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

## 📸 API de Fotos de Investigación

La extracción de fotos vía API está disponible únicamente mediante liberación específica.

Para acceder a los endpoints de fotos de investigación, es necesario solicitar autorización a nuestro equipo de Soporte.

::: tip Información importante
Este recurso no está disponible públicamente en la documentación por defecto.

Para solicitar acceso, [abre un ticket con el Soporte](https://help.involves.com/hc/pt-br/requests/new){target="_blank" rel="noopener"} informando el entorno deseado para validación.
:::

## 🔧 Ejemplos de Autenticación

### Autenticación Básica

::: code-group

```javascript [JavaScript]
// Usando fetch nativo
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

### Headers Obligatorios

<script setup>

const headersTable = [
  {
    key: 'Authorization',
    description: '<code>Basic &lt;token&gt;</code> — Token de autenticación en Base64',
    color: 'blue'
  },
  {
    key: 'X-AGILE-CLIENT',
    description: '<code>EXTERNAL_APP</code> — Identificador del cliente',
    color: 'purple'
  },
  {
    key: 'Accept-Version',
    description: '<code>2020-02-26</code> — Versión de la API',
    color: 'red'
  }
]
</script>

### Todos los endpoints de la API requieren los siguientes headers

<ApiCard
  title="request.headers"
  :items="headersTable"
/>

::: warning Atención
Nunca compartas tus credenciales de acceso o las incluyas en código que será versionado.
Siempre usa variables de entorno para almacenar información sensible.
:::

## 📊 Ejemplos de Respuesta

### Respuesta de Éxito

```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Ejemplo de datos",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "message": "Operación realizada con éxito"
}
```

### Respuesta de Error

```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_FAILED",
    "message": "Credenciales inválidas",
    "details": "Usuario o contraseña incorrectos"
  }
}
```

::: tip Consejo
Siempre verifica el campo `success` en la respuesta antes de procesar los datos.
En caso de error, el campo `error` contendrá información detallada sobre el problema.
:::

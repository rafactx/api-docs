---
title: Respuestas & Errores
description: 'Códigos de estado HTTP, formatos de respuesta y tratamiento de errores de la API de Involves Stage.'
---

## 📜 Respuestas HTTP

La API retorna siempre un estado HTTP y, generalmente, un objeto JSON con detalles específicos.

<script setup>

const statusTable = [
  {
    key: '200',
    description: '<code>OK</code> — Petición exitosa',
    color: 'green'
  },
  {
    key: '400',
    description: '<code>Bad Request</code> — Error en la petición (verifica formato y parámetros)',
    color: 'red'
  },
  {
    key: '401',
    description: '<code>Unauthorized</code> — Error de autenticación',
    color: 'red'
  },
  {
    key: '403',
    description: '<code>Forbidden</code> — Permisos insuficientes',
    color: 'red'
  },
  {
    key: '404',
    description: '<code>Not Found</code> — Recurso o URL inexistente',
    color: 'purple'
  },
  {
    key: '406',
    description: '<code>Not Acceptable</code> — Versión del endpoint inválida o encabezado incorrecto',
    color: 'yellow'
  },
  {
    key: '412',
    description: '<code>Precondition Failed</code> — Encabezados obligatorios ausentes o incorrectos',
    color: 'yellow'
  },
  {
    key: '500',
    description: '<code>Internal Server Error</code> — Error interno del servidor (contacta al soporte técnico)',
    color: 'pink'
  }
]
</script>

<ApiCard
  title="HTTP Status"
  :items="statusTable"
/>

::: tip Verificación de Estado
Para verificar el estado de una petición:

```bash
curl -I https://api.involves.com/v3/endpoint | grep HTTP
```

:::

## ⚠️ Tratamiento de errores

En caso de error, retornamos un objeto detallado con información útil:

### Ejemplo de error (API v3)

```json
{
  "status": 400,
  "term": "ID_INVALIDO",
  "message": "El ID proporcionado es inválido.",
  "details": [
    {
      "field": "id",
      "message": "El ID debe ser un número entero válido."
    }
  ]
}
```

### Estructura del objeto de error

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `status` | number | Código de estado HTTP |
| `term` | string | Identificador único del error |
| `message` | string | Mensaje descriptivo del error |
| `details` | array | Lista de detalles específicos del error |

### Códigos de error comunes

| Término | Estado | Descripción |
|---------|--------|-------------|
| `AUTHENTICATION_FAILED` | 401 | Credenciales inválidas |
| `INSUFFICIENT_PERMISSIONS` | 403 | Permisos insuficientes |
| `RESOURCE_NOT_FOUND` | 404 | Recurso no encontrado |
| `INVALID_REQUEST` | 400 | Petición malformada |
| `MISSING_HEADERS` | 412 | Encabezados obligatorios ausentes |

::: warning Atención
Para errores de código **404**, verifica si el recurso existe o si la dirección es correcta (incluyendo HTTPS y environmentId, cuando sea aplicable).
:::

## 📊 Ejemplos de respuesta

### Respuesta de éxito

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

### Respuesta con paginación

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

::: tip Consejo
Siempre verifica el campo `success` en la respuesta antes de procesar los datos.
En caso de error, el campo `error` contendrá información detallada sobre el problema.
:::

## 🔧 Tratamiento de errores en diferentes lenguajes

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
    console.error(`Error ${errorData.status}: ${errorData.message}`);
    return;
  }

  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('Error en la petición:', error);
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
    print(f"Error {error_data['status']}: {error_data['message']}")
except Exception as e:
    print(f"Error en la petición: {e}")
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
    echo "Error {$errorData['status']}: {$errorData['message']}";
} else {
    $data = json_decode($response, true);
    print_r($data);
}
?>
```

:::

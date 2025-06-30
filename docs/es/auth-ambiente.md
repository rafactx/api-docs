---
title: 'Autenticación y Cabeceras'
---

## 🔧 Cabeceras HTTP obligatorias

Todas las peticiones a la API deben incluir las siguientes cabeceras:

<ApiCard
  title="request.headers"
  :items="[
    {
      key: 'Authorization',
      description: 'Basic base64(usuario:senha) — autenticación del usuario.',
      color: 'blue'
    },
    {
      key: 'X-AGILE-CLIENT',
      description: '<code>EXTERNAL_APP</code> — indica que la petición es externa.',
      color: 'purple'
    },
    {
      key: 'Accept-Version',
      description: '<code>2020-02-26</code> — define la versión de la API v3 a usar.',
      color: 'pink'
    }
  ]"
/>

## 📅 Versionado vía cabecera

La API v3 usa **versionado por fecha** a través de la cabecera `Accept-Version`. Esto significa que eliges explícitamente qué versión de la API usar, garantizando que tu integración nunca se rompa inesperadamente.

### Cómo funciona

<ApiCard
  title="Accept-Version header"
  :items="[
    {
      key: 'Versión actual:',
      description: '<code>2020-02-26</code>',
      color: 'green'
    },
    {
      key: 'Formato:',
      description: '<code>YYYY-MM-DD</code> (fecha de lanzamiento)',
      color: 'blue'
    },
    {
      key: 'Obligatorio:',
      description: 'Sí, en todas las peticiones v3',
      color: 'purple'
    }
  ]"
/>

### ¿Por qué usar versionado?

**Ejemplo práctico del día a día:**

```bash
# Tu integración actual (funcionando perfectamente):
Accept-Version: 2020-02-26

# Si la API lanza una nueva versión con cambios:
Accept-Version: 2021-05-14  # Nueva versión con nuevos campos

# Tu integración antigua sigue funcionando:
Accept-Version: 2020-02-26  # ¡Siempre funciona!
```

### Migrando entre versiones

Cuando quieras usar nuevos recursos:

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

::: tip Beneficios del versionado

- **Cero tiempo de inactividad:** Tu integración nunca se rompe
- **Migración gradual:** Prueba nuevas versiones sin afectar producción
- **Control total:** Tú decides cuándo actualizar
- **Compatibilidad:** Las versiones antiguas siempre funcionan
:::

::: warning ⚠️ Importante

- **v1 y v2:** No necesitan el header `Accept-Version`
- **v3+:** El header es **obligatorio** en todas las peticiones
- **Versión por defecto:** Siempre usa `2020-02-26` a menos que necesites recursos específicos
:::

## 🔐 Autenticación

La API ofrece **dos formas** de autenticación. Puedes elegir la que prefieras:

### Opción 1: Credenciales directas (Recomendado para desarrollo)

Usa tu **usuario y contraseña** de Involves Stage directamente:

<ApiCard
  title="Authorization header - Credenciales directas"
  :items="[
    {
      key: 'Usuario:',
      description: '<code>seuUsuarioDoInvolvesStage</code>',
      color: 'blue'
    },
    {
      key: 'Contraseña:',
      description: '<code>suaSenhaDoInvolvesStage</code>',
      color: 'purple'
    },
    {
      key: 'Header completo:',
      description: '<code>Authorization: Basic base64(usuario:senha)</code>',
      color: 'pink'
    }
  ]"
/>

**Ejemplo práctico:**

```bash
# Tu usuario: "joao.silva"
# Tu contraseña: "minhaSenha123"

# En el terminal:
echo -n "joao.silva:minhaSenha123" | base64
# Resultado: am9hby5zaWx2YTptaW5oYVNlbmhhMTIz

# Header final:
Authorization: Basic am9hby5zaWx2YTptaW5oYVNlbmhhMTIz
```

### Opción 2: Credenciales pre-codificadas

Usa credenciales ya codificadas en Base64 (útil para entornos de producción):

<ApiCard
  title="Authorization header - Credenciales pre-codificadas"
  :items="[
    {
      key: 'Header completo:',
      description: '<code>Authorization: Basic YWdpbGl0bzppbnZvbHZlcw==</code>',
      color: 'pink'
    }
  ]"
/>

::: tip 💡 Consejos para desarrolladores

- **Para pruebas:** Usa la Opción 1 con tus credenciales reales
- **Para producción:** Usa la Opción 2 con credenciales específicas del entorno
- **En JavaScript:** `btoa('usuario:senha')` genera el Base64 automáticamente
- **En Python:** `base64.b64encode('usuario:senha'.encode()).decode()`
- **En cURL:** Usa `-u usuario:senha` y cURL hace el Base64 automáticamente
:::

::: warning ⚠️ Seguridad

- Nunca hagas commit de credenciales en el código
- Usa variables de entorno para almacenar contraseñas
- En producción, considera usar tokens de API cuando estén disponibles
:::

## 🌍 Identificación del Entorno (Environment ID)

La mayoría de los endpoints exigen el `environmentId`. La URL completa queda así:

```json
https://exemplo.involves.com/webservices/api/v3/environments/{environmentId}
```

Para obtener el ID correcto:

1. Ve a **Administración de Entornos** en Involves Stage.
2. Selecciona el entorno deseado y haz clic en **Editar**.
3. Copia el ID del entorno mostrado en la URL del navegador.

::: tip 💡 Consejo Pro

- Usa el atajo **Ctrl + K → Administración de Entornos** para encontrar la pantalla rápidamente.
:::

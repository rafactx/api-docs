---
title: 'Authentication and Headers'
---

## 🔧 Required HTTP Headers

All API requests must include the following headers:

<ApiCard
  title="request.headers"
  :items="[
    {
      key: 'Authorization',
      description: 'Basic base64(usuario:senha) — user authentication.',
      color: 'blue'
    },
    {
      key: 'X-AGILE-CLIENT',
      description: '<code>EXTERNAL_APP</code> — indicates that the request is external.',
      color: 'purple'
    },
    {
      key: 'Accept-Version',
      description: '<code>2020-02-26</code> — defines the API v3 version to be used.',
      color: 'pink'
    }
  ]"
/>

## 📅 Versioning via header

The v3 API uses **date-based versioning** through the `Accept-Version` header. This means you explicitly choose which API version to use, ensuring your integration never breaks unexpectedly.

### How it works

<ApiCard
  title="Accept-Version header"
  :items="[
    {
      key: 'Current version:',
      description: '<code>2020-02-26</code>',
      color: 'green'
    },
    {
      key: 'Format:',
      description: '<code>YYYY-MM-DD</code> (release date)',
      color: 'blue'
    },
    {
      key: 'Required:',
      description: 'Yes, in all v3 requests',
      color: 'purple'
    }
  ]"
/>

### Why use versioning?

**Practical daily example:**

```bash
# Your current integration (working perfectly):
Accept-Version: 2020-02-26

# If the API releases a new version with changes:
Accept-Version: 2021-05-14  # New version with new fields

# Your old integration continues working:
Accept-Version: 2020-02-26  # Always works!
```

### Migrating between versions

When you want to use new features:

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

::: tip Versioning benefits

- **Zero downtime:** Your integration never breaks
- **Gradual migration:** Test new versions without affecting production
- **Total control:** You decide when to update
- **Compatibility:** Old versions always work
:::

::: warning ⚠️ Important

- **v1 and v2:** Don't need the `Accept-Version` header
- **v3+:** The header is **required** in all requests
- **Default version:** Always use `2020-02-26` unless you need specific features
:::

## 🔐 Authentication

The API offers **two forms** of authentication. You can choose the one you prefer:

### Option 1: Direct credentials (Recommended for development)

Use your **username and password** from Involves Stage directly:

<ApiCard
  title="Authorization header - Direct credentials"
  :items="[
    {
      key: 'Username:',
      description: '<code>seuUsuarioDoInvolvesStage</code>',
      color: 'blue'
    },
    {
      key: 'Password:',
      description: '<code>suaSenhaDoInvolvesStage</code>',
      color: 'purple'
    },
    {
      key: 'Complete header:',
      description: '<code>Authorization: Basic base64(usuario:senha)</code>',
      color: 'pink'
    }
  ]"
/>

**Practical example:**

```bash
# Your username: "joao.silva"
# Your password: "minhaSenha123"

# In terminal:
echo -n "joao.silva:minhaSenha123" | base64
# Result: am9hby5zaWx2YTptaW5oYVNlbmhhMTIz

# Final header:
Authorization: Basic am9hby5zaWx2YTptaW5oYVNlbmhhMTIz
```

### Option 2: Pre-encoded credentials

Use credentials already encoded in Base64 (useful for production environments):

<ApiCard
  title="Authorization header - Pre-encoded credentials"
  :items="[
    {
      key: 'Complete header:',
      description: '<code>Authorization: Basic YWdpbGl0bzppbnZvbHZlcw==</code>',
      color: 'pink'
    }
  ]"
/>

::: tip 💡 Tips for developers

- **For testing:** Use Option 1 with your real credentials
- **For production:** Use Option 2 with environment-specific credentials
- **In JavaScript:** `btoa('usuario:senha')` generates Base64 automatically
- **In Python:** `base64.b64encode('usuario:senha'.encode()).decode()`
- **In cURL:** Use `-u usuario:senha` and cURL does Base64 automatically
:::

::: warning ⚠️ Security

- Never commit credentials in code
- Use environment variables to store passwords
- In production, consider using API tokens when available
:::

## 🌍 Environment Identification (Environment ID)

Most endpoints require the `environmentId`. The complete URL looks like this:

```json
https://exemplo.involves.com/webservices/api/v3/environments/{environmentId}
```

To get the correct ID:

1. Go to **Environment Administration** in Involves Stage.
2. Select the desired environment and click **Edit**.
3. Copy the environment ID displayed in the browser URL.

::: tip 💡 Pro Tip

- Use the shortcut **Ctrl + K → Environment Administration** to find the screen quickly.
:::

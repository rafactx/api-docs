---
title: Examples & Auxiliary APIs
description: Practical examples of using the Involves Stage API in different programming languages.
---

## 💡 Practical examples

Here are examples of how to make requests to the Involves Stage API using different programming languages:

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

## 📸 Research Photos API

Photo extraction via API is only available through specific release.

To access research photo endpoints, it's necessary to request authorization from our Support team.

::: tip Important information
This feature is not publicly available in the documentation by default.

To request access, [open a ticket with Support](https://help.involves.com/hc/pt-br/requests/new){target="_blank" rel="noopener"} informing the desired environment for validation.
:::

## 🔧 Authentication Examples

### Basic Authentication

::: code-group

```javascript [JavaScript]
// Using native fetch
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

### Required Headers

<script setup>

const headersTable = [
  {
    key: 'Authorization',
    description: '<code>Basic &lt;token&gt;</code> — Authentication token in Base64',
    color: 'blue'
  },
  {
    key: 'X-AGILE-CLIENT',
    description: '<code>EXTERNAL_APP</code> — Client identifier',
    color: 'purple'
  },
  {
    key: 'Accept-Version',
    description: '<code>2020-02-26</code> — API version',
    color: 'red'
  }
]
</script>

### All API endpoints require the following headers

<ApiCard
  title="request.headers"
  :items="headersTable"
/>

::: warning Attention
Never share your access credentials or include them in code that will be versioned.
Always use environment variables to store sensitive information.
:::

## 📊 Response Examples

### Success Response

```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Example data",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "message": "Operation completed successfully"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_FAILED",
    "message": "Invalid credentials",
    "details": "Incorrect username or password"
  }
}
```

::: tip Tip
Always check the `success` field in the response before processing the data.
In case of error, the `error` field will contain detailed information about the problem.
:::

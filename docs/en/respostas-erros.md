---
title: Responses & Errors
description: 'HTTP status codes, response formats and error handling for the Involves Stage API.'
---

## 📜 HTTP Responses

The API always returns an HTTP status and, usually, a JSON object with specific details.

<script setup>

const statusTable = [
  {
    key: '200',
    description: '<code>OK</code> — Successful request',
    color: 'green'
  },
  {
    key: '400',
    description: '<code>Bad Request</code> — Error in request (check format and parameters)',
    color: 'red'
  },
  {
    key: '401',
    description: '<code>Unauthorized</code> — Authentication error',
    color: 'red'
  },
  {
    key: '403',
    description: '<code>Forbidden</code> — Insufficient permissions',
    color: 'red'
  },
  {
    key: '404',
    description: '<code>Not Found</code> — Resource or URL does not exist',
    color: 'purple'
  },
  {
    key: '406',
    description: '<code>Not Acceptable</code> — Invalid endpoint version or incorrect header',
    color: 'yellow'
  },
  {
    key: '412',
    description: '<code>Precondition Failed</code> — Missing or incorrect required headers',
    color: 'yellow'
  },
  {
    key: '500',
    description: '<code>Internal Server Error</code> — Internal server error (contact technical support)',
    color: 'pink'
  }
]
</script>

<ApiCard
  title="HTTP Status"
  :items="statusTable"
/>

::: tip Status Verification
To verify the status of a request:

```bash
curl -I https://api.involves.com/v3/endpoint | grep HTTP
```

:::

## ⚠️ Error handling

If an error occurs, we return a detailed object with useful information:

### Error example (API v3)

```json
{
  "status": 400,
  "term": "ID_INVALIDO",
  "message": "The provided ID is invalid.",
  "details": [
    {
      "field": "id",
      "message": "The ID must be a valid integer."
    }
  ]
}
```

### Error object structure

| Field | Type | Description |
|-------|------|-------------|
| `status` | number | HTTP status code |
| `term` | string | Unique error identifier |
| `message` | string | Descriptive error message |
| `details` | array | List of specific error details |

### Common error codes

| Term | Status | Description |
|------|--------|-------------|
| `AUTHENTICATION_FAILED` | 401 | Invalid credentials |
| `INSUFFICIENT_PERMISSIONS` | 403 | Insufficient permissions |
| `RESOURCE_NOT_FOUND` | 404 | Resource not found |
| `INVALID_REQUEST` | 400 | Malformed request |
| `MISSING_HEADERS` | 412 | Missing required headers |

::: warning Attention
For **404** error codes, verify if the resource exists or if the address is correct (including HTTPS and environmentId, when applicable).
:::

## 📊 Response examples

### Success response

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

### Response with pagination

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

::: tip Tip
Always check the `success` field in the response before processing the data.
In case of error, the `error` field will contain detailed information about the problem.
:::

## 🔧 Error handling in different languages

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
  console.error('Error in request:', error);
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
    print(f"Error in request: {e}")
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

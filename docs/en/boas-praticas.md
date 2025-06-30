---
title: Limits and best practices
---

## 🚦 Limits and best practices

The API doesn't impose a strict limit on requests per minute, but implements automatic protection mechanisms against abusive use.

To ensure stability and performance, we recommend the following practices:

- Avoid unnecessary simultaneous multiple requests.

- Maintain an average volume of up to **60 requests per minute per environment**.

- Always implement retry control with exponential backoff in continuous integrations.

::: tip Tip
Implement cache for data that doesn't change frequently and monitor your integration usage.
:::

## 💰 Billing

Currently, the API is completely free.
If this changes in the future, you will be informed in advance.

## ⚙️ HTTP methods used

The API follows standard HTTP methods to indicate the desired operation type:

<script setup>

const methodsTable = [
  { key: 'GET', description: 'Query data', color: 'blue' },
  { key: 'POST', description: 'Create new data or execute actions', color: 'green' },
  { key: 'PUT', description: 'Update existing data completely', color: 'purple' },
  { key: 'PATCH', description: 'Update existing data partially', color: 'yellow' },
  { key: 'DELETE', description: 'Delete existing data', color: 'red' }
]
</script>

<ApiCard
  title="HTTP Methods"
  :items="methodsTable"
/>

::: tip Reference
For more details about HTTP methods, consult the [RFC 7231 - HTTP/1.1 Semantics and Content](https://datatracker.ietf.org/doc/html/rfc7231){target="_blank" rel="noopener"}.
:::

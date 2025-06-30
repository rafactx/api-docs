---
title: Data Navigation
---

## 🔗 HATEOAS

We use the HATEOAS pattern to indicate related actions or resources in JSON responses:

Practical example:

```json
{
  "id": 123,
  "_link": "https://exemplo.involves.com/webservices/api/v3/chain/123"
}
```

- Always use the URL indicated in `_link` to access related resources.
- URLs may change in the future, but we always guarantee backward compatibility of the returned resource.

---

## 📑 Pagination

Large results are paginated. Send parameters such as `page` (current page) and `size` (page size).

Example URL with pagination:

```json
https://exemplo.involves.com/webservices/api/v3/environments/{environmentId}/resource?page=2&size=20
```

---

## 🔄 Database synchronization

::: warning
The API is not recommended for real-time or large-scale synchronizations. For this type of
operation, use the dedicated **Data Integration** service.

If you have questions or want to hire, [open a ticket with Support](https://help.involves.com/hc/pt-br/requests/new){target="_blank" rel="noopener"}.
:::

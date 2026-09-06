---
title: API-Referenz
description: Diese Seite bietet die API-Referenzdokumentation der Produkte.
---

# API-Referenz

Diese Seite bietet die API-Referenzdokumentation der Produkte.

## Basis-URL

```
https://api.juxi-tech.com/v1
```

## Authentifizierung

Authentifizierung mit API-Key:

```http
Authorization: Bearer YOUR_API_KEY
```

## Schnittstellen-Liste

### Geräteinformationen abrufen

```http
GET /device/info
```

Beispielantwort:

```json
{
  "id": "device-001",
  "name": "Juxi Device",
  "status": "online"
}
```

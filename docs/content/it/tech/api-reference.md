---
title: Riferimento API
description: Questa pagina fornisce la documentazione di riferimento delle API dei prodotti.
---

# Riferimento API

Questa pagina fornisce la documentazione di riferimento delle API dei prodotti.

## URL di base

```
https://api.juxi-tech.com/v1
```

## Autenticazione

Autenticazione con API Key:

```http
Authorization: Bearer YOUR_API_KEY
```

## Elenco delle interfacce

### Ottenere le informazioni del dispositivo

```http
GET /device/info
```

Esempio di risposta:

```json
{
  "id": "device-001",
  "name": "Juxi Device",
  "status": "online"
}
```

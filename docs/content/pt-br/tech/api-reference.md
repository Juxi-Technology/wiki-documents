---
title: Referência de API
description: Esta página fornece a documentação de referência de API dos produtos.
---


# Referência de API

Esta página fornece a documentação de referência de API dos produtos.

## URL Base

```
https://api.juxi-tech.com/v1
```

## Autenticação

Use chave de API (API Key) para autenticação:

```http
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Obter Informações do Dispositivo

```http
GET /device/info
```

Exemplo de resposta:

```json
{
  "id": "device-001",
  "name": "Juxi Device",
  "status": "online"
}
```

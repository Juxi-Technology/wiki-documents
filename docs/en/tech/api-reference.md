
# API Reference

This page provides product API reference documentation.

## Base URL

```
https://api.juxi-tech.com/v1
```

## Authentication

Use API Key for authentication:

```http
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Get Device Info

```http
GET /device/info
```

Response example:

```json
{
  "id": "device-001",
  "name": "Juxi Device",
  "status": "online"
}
```

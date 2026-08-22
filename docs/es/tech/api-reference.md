# Referencia de API

Esta página proporciona la documentación de referencia de la API de los productos.

## URL base

```
https://api.juxi-tech.com/v1
```

## Autenticación

Autenticación con clave API:

```http
Authorization: Bearer YOUR_API_KEY
```

## Lista de interfaces

### Obtener información del dispositivo

```http
GET /device/info
```

Ejemplo de respuesta:

```json
{
  "id": "device-001",
  "name": "Juxi Device",
  "status": "online"
}
```

# Référence API

Cette page fournit la documentation de référence des API produits.

## URL de base

```
https://api.juxi-tech.com/v1
```

## Authentification

Authentification par clé API :

```http
Authorization: Bearer YOUR_API_KEY
```

## Liste des interfaces

### Obtenir les informations du périphérique

```http
GET /device/info
```

Exemple de réponse :

```json
{
  "id": "device-001",
  "name": "Juxi Device",
  "status": "online"
}
```

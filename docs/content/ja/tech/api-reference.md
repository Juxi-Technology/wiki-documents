---
title: API リファレンス
description: 本ページは製品の API インターフェースリファレンスドキュメントを提供します。
---

# API リファレンス

本ページは製品の API インターフェースリファレンスドキュメントを提供します。

## ベース URL

```
https://api.juxi-tech.com/v1
```

## 認証

API Key で認証します：

```http
Authorization: Bearer YOUR_API_KEY
```

## インターフェース一覧

### デバイス情報の取得

```http
GET /device/info
```

レスポンス例：

```json
{
  "id": "device-001",
  "name": "Juxi Device",
  "status": "online"
}
```

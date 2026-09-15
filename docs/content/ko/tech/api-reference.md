---
title: API 참조
description: "Juxi 제품 API 참조 — 기본 URL과 API Key 인증, 장치 정보 조회 등 REST 인터페이스 명세를 정리한 기술 문서입니다."
---

# API 참조

이 페이지는 제품의 API 인터페이스 참조 문서를 제공합니다.

## 기본 URL

```
https://api.juxi-tech.com/v1
```

## 인증

API Key로 인증합니다:

```http
Authorization: Bearer YOUR_API_KEY
```

## 인터페이스 목록

### 장치 정보 가져오기

```http
GET /device/info
```

응답 예시:

```json
{
  "id": "device-001",
  "name": "Juxi Device",
  "status": "online"
}
```

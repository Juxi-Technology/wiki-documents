---
title: 개발 가이드
description: 이 가이드는 JUXI 제품을 기반으로 2차 개발하는 방법을 소개합니다.
---

# 개발 가이드

이 가이드는 JUXI 제품을 기반으로 2차 개발하는 방법을 소개합니다.

## 개발 환경 구축

### 개발 도구 설치

```bash
# CLI 도구 설치
npm install -g @juxi/cli
# 프로젝트 초기화
juxi init my-project
```

## 프로젝트 구조

```
my-project/
├── src/
│   ├── main.js
│   └── components/
├── docs/
└── package.json
```

## 코드 예제

```javascript
import { Device } from '@juxi/sdk'
const device = new Device()
device.connect()
```

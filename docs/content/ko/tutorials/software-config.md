---
title: 소프트웨어 설정
description: "Juxi Technology 소프트웨어 설정 페이지 — LeRobot 저장소 클론과 Feetech 서보 의존성 설치, 설정 파일 구성 절차를 안내합니다."
---

# 소프트웨어 설정

제품의 소프트웨어 설정 방법을 설명합니다.

## 시스템 요구사항

- Node.js 18+
- Python 3.10+
- Git

## 설치 절차

```bash
# 저장소 클론
git clone https://github.com/Juxi-Technology/lerobot.git

# 디렉토리 이동
cd lerobot

# 의존성 설치
pip install -e ".[feetech]"
```

## 설정 파일

필요에 따라 `config.json`을 편집합니다:

```json
{
  "port": 3000,
  "language": "ko"
}
```
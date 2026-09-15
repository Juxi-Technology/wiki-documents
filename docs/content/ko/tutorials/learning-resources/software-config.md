---
title: 소프트웨어 설정
description: "Juxi Technology 학습 리소스의 소프트웨어 구성 페이지 — 개발 환경 요구사항 확인, 의존성 설치와 설정 파일 편집 절차를 안내합니다."
---

# 소프트웨어 설정

본 장에서는 제품의 소프트웨어 설정 방법을 소개합니다.

## 시스템 요구사항

- Node.js 18+
- Python 3.10+
- Git

## 설치 절차

```bash
# 저장소 클론
git clone https://github.com/Juxi-Technology/your-repo.git
# 디렉터리 이동
cd your-repo
# 의존성 설치
npm install
```

## 설정 파일

`config.json`을 편집하여 사이트 설정을 변경합니다:

```json
{
  "port": 3000,
  "language": "zh-CN"
}
```

# <img src="docs/public/images/logos/logo-black.png" width="80" align="left" style="margin-right: 16px;"> Juxi Technology Wiki

[![Deploy](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml/badge.svg)](https://github.com/Juxi-Technology/wiki-documents/actions/workflows/deploy.yml)
[![9 Languages](https://img.shields.io/badge/languages-11%20locales-10b981)](https://wiki.juxitech.com/)
[![llms.txt](https://img.shields.io/badge/LLM%20ready-llms.txt-634b8f)](https://wiki.juxitech.com/llms.txt)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff)](https://vitepress.dev/)

Juxi Technology 로봇 및 AI 하드웨어 제품을 위한 오픈 문서 플랫폼입니다. 로봇 암, 센서, 액세서리, 개발자 가이드를 아우릅니다.

🌐 **[wiki.juxitech.com](https://wiki.juxitech.com/)**

**11개 언어 지원**:English(기본, 접두사 없음)、简体中文(`/zh-hans/`)、繁體中文(`/zh-hant/`)、日本語(`/ja/`)、한국어(`/ko/`)、Deutsch(`/de/`)、Français(`/fr/`)、Español(`/es/`)、Italiano(`/it/`), Português (Brasil)(`/pt-br/`), Português (Portugal)(`/pt-pt/`).

## 저장소 구조

```
docs/
├── content/                  # 콘텐츠 소스(빌드 시 검증)
│   ├── tutorials/  topics/  tech/  cases/  community/   # 영어(root, 접두사 없음)
│   ├── products/  downloads/  about/
│   ├── zh-hans/  zh-hant/    # 중국어 로케일, 영어와 동일 구조
│   └── ja/  ko/  de/  fr/  es/  it/                     # 나머지 6개 언어
├── .vitepress/
│   ├── config.ts             # 전체 언어 설정:nav / sidebar / SEO(hreflang, JSON-LD)
│   ├── search.data.ts        # 사이트 내 검색 인덱스(제목 + 본문)
│   └── theme/                # 커스텀 테마(레이아웃, 검색, 언어 전환, 푸터 등)
└── public/                   # 정적 자산(이미지, llms.txt, robots.txt)
```

## 로컬 개발

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## 빌드 및 검사

```bash
npm run check:links   # sidebar/본문 내부 링크 검증(CI에서도 실행)
npm run docs:build    # 프로덕션 빌드 → docs/.vitepress/dist
npm run docs:preview  # 프로덕션 빌드 미리보기
npm run gen:llms     # llms-full.txt 재생성(CI 빌드 시 자동 실행)
```

## 배포

`.github/workflows/deploy.yml`을 통해 **GitHub Pages**의 `wiki.juxitech.com`에 게시:

- **트리거**: `main`에 푸시(또는 수동 `workflow_dispatch`);OIDC 빌드+배포(`actions/deploy-pages`)
- **도메인**: 사용자 지정 도메인은 `docs/public/CNAME`으로 선언;**DNS**: `wiki.juxitech.com` CNAME → `<user>.github.io` → 저장소에서 GitHub Pages 활성화
- **CI 검사**: 빌드 전에 `check:links`(깨진 링크 방지)와 `gen:llms`(`llms-full.txt` 재생성) 실행
- **전체 git 이력 필요**: workflow는 `fetch-depth: 0`을 사용. 홈 "마지막 업데이트" 날짜는 실제 커밋 날짜

## 기여

[기여 가이드](https://wiki.juxitech.com/ko/community/contributing)와 [Pull Request 템플릿](.github/PULL_REQUEST_TEMPLATE.md)을 참조하세요.

## 기술 스택

- [VitePress](https://vitepress.dev/) — 정적 사이트 생성기
- [GitHub Pages](https://pages.github.com/) — 호스팅
- [GitHub Actions](https://github.com/features/actions) — CI/CD

## 문의

- 🌐 [juxitech.com](https://www.juxitech.com/ko)
- 🐙 [GitHub 조직](https://github.com/Juxi-Technology/)
- 🧠 [Hugging Face](https://huggingface.co/Juxi-Technology)
- 🛒 [JuxiTech Taobao](https://juxitechnology.taobao.com/)
- 📧 [support@juxitech.com](mailto:support@juxitech.com)
- 📧 [sales@juxitech.com](mailto:sales@juxitech.com)

[English](README.md) | [简体中文](README_zh.md) | [繁體中文](README_zh-HK.md) | [日本語](README_ja.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Español](README_es.md) | [Italiano](README_it.md) | [Português (Brasil)](README_pt-BR.md) | [Português (Portugal)](README_pt-PT.md)
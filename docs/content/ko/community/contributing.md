---
title: 기여 가이드
description: JUXI Wiki에 콘텐츠를 기여하는 방법
---

# 기여 가이드

JUXI Wiki에 기여해 주셔서 감사합니다! 본 문서가 기여 절차를 안내합니다.

## 준비

1. [wiki-documents 저장소](https://github.com/Juxi-Technology/wiki-documents) **Fork**
2. Fork를 로컬에 클론
3. 의존성 설치:

```bash
cd wiki-documents
npm ci
```

4. 로컬 개발 서버 실행으로 미리보기:

```bash
npm run docs:dev
```

브라우저에서 `http://localhost:5173`에 접속하여 변경 사항을 미리 볼 수 있습니다.

## 기여 방법

### 문서 오류 수정

오타, 잘못된 링크, 오래된 정보를 발견했나요? `main` 브랜치로 바로 Pull Request를 보내세요.

### 새 튜토리얼 추가

JUXI 제품 튜토리얼을 공유하고 싶다면:

1. 먼저 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)에 튜토리얼 주제와 개요를 담은 Proposal 제출
2. 관리자 확인 후 기존 튜토리얼 구조에 따라 작성
3. PR 제출

### 번역 기여

프로젝트는 11개 언어를 지원합니다. 번역은 다음 규칙을 따릅니다:

- 각 `.md` 파일은 각 언어 디렉터리에 대응 파일이 있어야 함
- 이미지는 `docs/public/images/` 리소스를 공용
- 각 언어 버전의 링크는 해당 언어 경로를 가리켜야 함

## 콘텐츠 규범

### 이미지

- 저장 경로: `docs/public/images/tutorials/{제품명}/{튜토리얼명}/`
- 명명 규칙: 번호 또는 설명적 이름(예: `1.png`, `wiring-diagram.png`)
- 튜토리얼에서 상대 경로로 참조:

```markdown
![설명](../../../public/images/tutorials/xxx/xxx.png)
```

### 파일 명명

- 튜토리얼 파일은 영어 kebab-case로 명명
- 각 `.md` 파일에 `title` 및 `description` frontmatter 필요

### 코드 블록

- 언어 유형 반드시 표기
- 명령이 올바르게 실행되는지 확인

## PR 절차

1. 로컬 빌드 성공 확인: `npm run docs:build`
2. Pull Request 템플릿의 모든 항목 작성
3. CI 빌드 성공 후 최소 1명의 관리자 승인 시 병합
4. PR 병합 후 GitHub Actions가 자동 배포

## 행동 강령

- 모든 기여자와 사용자를 존중
- 객관적이고 정확한 기술 콘텐츠 제공
- 테스트되지 않은 코드나 명령을 제출하지 않음

기여해 주셔서 감사합니다! 🎉

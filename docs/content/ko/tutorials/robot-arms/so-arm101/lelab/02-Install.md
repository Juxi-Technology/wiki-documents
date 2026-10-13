---
title: "2 · 설치 및 실행"
description: "LeLab 설치와 실행: uv 한 줄 명령 또는 소스 설치(둘 다 LeRobot을 함께 설치). 브라우저에서 localhost:8000을 엽니다."
---

# 2 · 설치 및 실행

> **이전:** [01 개요](01-Overview.md)
> **다음:** [03 연결 및 캘리브레이션](03-Calibration.md)

두 방법 모두 LeRobot도 함께 설치합니다 — LeLab에 필요합니다.

---

## 방법 A · 한 줄 명령

[uv](https://docs.astral.sh/uv/)가 필요합니다. 격리된 환경에 설치합니다:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git && lelab
```

브라우저가 `http://localhost:8000/`에서 열립니다.

## 방법 B · 소스에서 설치

```bash
git clone https://github.com/Juxi-Technology/leLab.git
cd leLab
pip install -e .
```

`pip install -e .`은 React 프런트 엔드를 빌드해 Python 패키지에 번들하므로, 하나의 프로세스가 API와 UI를 모두 제공합니다. 첫 설치에는 몇 분이 걸립니다.

빌드가 Node.js를 찾지 못하면 **Node.js 22**를 설치하고 다시 시도하십시오. Node는 설치 시점과 개발 모드에서만 필요하며, 이후 LeLab을 실행하는 데는 필요하지 않습니다.

> **업스트림 코드를 원하십니까?** 이 저장소는 사본입니다. Hugging Face의 LeRobot 팀이 유지 관리하는 원본은 <https://github.com/huggingface/leLab>입니다. 이 페이지의 모든 내용은 원본에도 그대로 적용됩니다.

---

## 실행

```bash
lelab
```

**<http://localhost:8000/>**에서 UI를 제공하고 브라우저를 엽니다.

| 플래그 | 하는 일 |
|---|---|
| `lelab` | 프로덕션 모드. 하나의 프로세스가 `:8000`에서 API와 빌드된 UI를 제공 |
| `lelab --dev` | `:8080`의 Vite 핫 리로드에 더해 `:8000`의 uvicorn `--reload`. Node.js 22 필요 |
| `lelab --rebuild` | 로컬 소스에서 프런트 엔드를 다시 빌드한 뒤 프로덕션 모드로 시작 |
| `lelab --no-open` | 브라우저를 열지 않고 시작 |
| `lelab --stop` | 실행 중인 LeLab을 중지하고 포트 8000과 8080을 해제 |

`Ctrl+C`로 중지하거나, 다른 터미널에서:

```bash
lelab --stop
```

페이지가 로드를 멈추면 `--stop`을 사용하십시오. 포트 8000이나 8080을 점유한 오래된 프로세스가 흔한 원인입니다.

---

## 제대로 되었는지 확인

<http://localhost:8000/>를 엽니다. 랜딩 페이지에는 **Calibration**, **Teleoperation**, **Recording**, **Datasets**, **Training**, **Inference** 탭이 있습니다.

터미널에서:

```bash
curl http://localhost:8000/health
```

JSON 상태를 반환합니다.

---

## 개발 모드

```bash
lelab --dev
```

`:8080`의 Vite, `:8000`의 자동 리로드 API. `frontend/src/` 아래를 수정하면 재시작 없이 페이지가 갱신되고, `lelab/` 아래를 수정하면 서버가 리로드됩니다.

**`--dev` 모드에서는 `:8000`이 아니라 `:8080`을 열어야 합니다.** 포트 8000은 UI 없는 API를 제공합니다.

---

## 업데이트

LeLab은 설치한 브랜치가 이동했는지 확인하고 UI에서 업데이트를 제안합니다. 수동으로 업데이트하려면:

```bash
uv tool install --with-executables-from huggingface_hub git+https://github.com/Juxi-Technology/leLab.git --force
```

편집 가능 설치(`pip install -e .`)는 이 검사에서 제외됩니다. `git pull`로 업데이트하십시오.

---

> **다음:** [03 연결 및 캘리브레이션](03-Calibration.md)

<RelatedProducts slugs="so-arm101" />

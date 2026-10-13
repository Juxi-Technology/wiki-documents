---
title: "1 · 개요"
description: "LeLab은 LeRobot 워크플로(캘리브레이션, 텔레오퍼레이션, 녹화, 학습, 재생)를 브라우저 한 화면에 모았습니다: 기능, 요구 사항, 파일 저장 위치."
---

# 1 · 개요

> **다음:** [02 설치 및 실행](02-Install.md)

LeLab은 LeRobot 워크플로우 — 캘리브레이션, 텔레오퍼레이션, 녹화, 학습, 재생 — 을 하나의 브라우저 창에 담은 웹 앱입니다.

## 할 수 있는 일

| 페이지 | 하는 일 |
|---|---|
| **Calibration** | 두 팔을 가이드 방식으로 캘리브레이션 |
| **Teleoperation** | 리더 팔을 움직이면 팔로워가 이를 따라하며, 관절 위치를 실시간 스트리밍 |
| **Recording** | 카메라와 함께 에피소드를 LeRobotDataset으로 캡처 |
| **Datasets** | 디스크의 에피소드를 프레임 단위로 탐색하고 관절 움직임 추적 그래프를 함께 표시 |
| **Training** | LeRobot 학습 작업을 시작하고 로그를 확인 |
| **Inference** | 팔로워 팔에서 학습된 정책을 실행 |
| **Upload** | 데이터셋을 Hugging Face Hub에 푸시 |

## LeLab과 LeRobot

LeRobot은 라이브러리입니다 — 로봇 드라이버, 데이터셋 형식, 학습 코드. LeLab은 이를 호출하는 FastAPI 서버이며, 여기에 HTTP와 WebSocket으로 그 서버와 통신하는 React 프런트 엔드가 더해집니다.

- LeLab이 노출하지 않는 기능도 `lerobot-*` 명령줄을 통해 사용할 수 있습니다.
- LeLab은 LeRobot을 함께 번들하지 않습니다. LeLab을 설치하면 LeRobot이 설치됩니다.

## 요구 사항

| | |
|---|---|
| Robot | **SO-101 leader + follower arms** — 유일하게 지원되는 구성 |
| Computer | Linux, macOS 또는 Windows |
| Python | **3.12 이상** |
| Node.js | 22 — `lelab --dev` 전용 |
| USB | 빈 포트 2개, 팔마다 하나씩 |

캘리브레이션, 텔레오퍼레이션, 녹화는 노트북에서 실행됩니다. 학습은 무거운 단계이며, LeLab은 이를 대신 Hugging Face Hub에서 실행할 수 있습니다 — [6장](06-Train-and-Inference.md)을 참조하십시오.

## 파일이 저장되는 위치

`~/.cache/huggingface/lerobot/` 아래:

| 경로 | 내용 |
|---|---|
| `calibration/teleoperators/so101_leader/*.json` | 리더 캘리브레이션 파일 |
| `calibration/robots/so101_follower/*.json` | 팔로워 캘리브레이션 파일 |
| `ports/leader_port.txt` · `ports/follower_port.txt` | 마지막으로 사용한 시리얼 포트 |
| `saved_configs/*.txt` | 마지막으로 선택한 캘리브레이션 프로필 |

데이터셋은 LeRobot이 저장하는 위치에 들어갑니다 — 기본적으로 동일한 트리입니다.

이 캐시를 지우거나 재설치하면 두 팔을 모두 다시 캘리브레이션해야 합니다. [문제 해결](07-Troubleshooting.md)을 참조하십시오.

## 용어

LeRobot은 팔을 역할로 부르고, LeLab의 API는 같은 두 팔에 두 번째 이름 집합을 사용합니다:

| 사용자가 부르는 이름 | LeRobot / LeLab에서 부르는 이름 |
|---|---|
| 손으로 움직이는 팔 | **leader** · **teleop** |
| 따라오는 팔 | **follower** · **robot** |

---

> **다음:** [02 설치 및 실행](02-Install.md)

<RelatedProducts slugs="so-arm101" />

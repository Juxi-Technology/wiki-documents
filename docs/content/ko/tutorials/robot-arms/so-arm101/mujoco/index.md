---
title: "SO-ARM101 × MuJoCo 전체 워크플로 튜토리얼(인덱스)"
---

# SO-ARM101 × MuJoCo 전체 워크플로 튜토리얼(인덱스)


> 이 튜토리얼은 SO-ARM101의 **시뮬레이션 + 실기 전체 워크플로**를 기록하고 재현합니다: 환경 구축, 모델 검증, 실기 캘리브레이션부터
> 키보드/리더 암 텔레오퍼레이션, 데이터 녹화와 리플레이까지. 모든 명령은 2026-10-15의 실기 + 시뮬레이션 세션에서 실측 통과했습니다.
>
> 대상: Juxi SO-ARM101 키트 사용자 및 내부 엔지니어. MuJoCo나 LeRobot에 대한 사전 지식은 필요하지 않습니다.

## 전체 워크플로 지도(두 트랙, 하나의 공통 컴포넌트 세트)

```
                         ┌──────────────── 共用组件 ────────────────┐
                         │  数据集格式(LeRobotDataset) · 回放 · 未来训练  │
                         └──────────────────────────────────────────┘
                                      ▲                    ▲
        ┌── 真机轨 ──────────────────┘                    └──────────── 仿真轨 ──┐
        │  操控: 主动臂(实体) / 键盘                                      操控: 键盘 / 主动臂(实体) │
        │  被控: 真机从动臂 (COM 串口)                                    被控: MuJoCo 仿真从动臂   │
        │  命令: --robot.type=so101_follower                            命令: --robot.type=so101_mujoco │
        └───────────────────────────────────────────────────────────────────────┘
```

| 장 | 내용 | 얻게 되는 것 |
| --- | --- | --- |
| [01 환경 준비](/ko/tutorials/robot-arms/so-arm101/mujoco/01-Environment) | uv 환경, 의존성 extras, Windows 주의 사항 | 실행 가능한 환경 |
| [02 시뮬레이션 모델 검증](/ko/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification) | 세 가지 MJCF 모델 로드/비교/구동 렌더링 | 모델과 시뮬레이션 동작에 대한 확신 |
| [03 실기 연결과 캘리브레이션](/ko/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) | 시리얼 포트 식별, 읽기 전용 초기 점검, 팔로워/리더 암 캘리브레이션 | 소프트웨어가 인식할 수 있는 두 대의 암 |
| [04 키보드 텔레오퍼레이션](/ko/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop) | 키보드로 실기/시뮬레이션 구동, 속도 튜닝, 안전 속도 제한 | 가장 빠른 수동 제어 방식 |
| [05 리더 암 디지털 트윈](/ko/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin) | 실물 리더 암으로 시뮬레이션 팔로워 암 구동, 영점 미세 조정 | 디지털 트윈 데모와 데이터 수집 |
| [06 데이터 녹화와 리플레이](/ko/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) | 실기 녹화/시뮬레이션 녹화/에피소드 제어/리플레이/점검 스크립트 | 학습 가능한 데이터셋 |
| [07 자주 발생하는 문제와 경험](/ko/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) | 이 워크플로에서 겪은 모든 함정과 해결법 | 트러블슈팅 매뉴얼 |
| [08 이후 로드맵](/ko/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap) | 카메라, 물체 장면, 자동 데이터 생성, 학습 | 다음 단계 계획 |
| [09 전체 사용 튜토리얼](/ko/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) | 암 준비 → 녹화 → 점검 → 영상 확인 → 학습 → 시뮬레이션 배포까지 원스톱; conda 환경 대안 포함 | 처음부터 양질의 데이터셋, 그리고 정책 투입까지 |

**처음 사용 시 권장 순서**: 01(환경) → 03(실기 연결 시에만 필요) → [09 전체 사용 튜토리얼](/ko/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)의
메인 라인(녹화 → 점검 → 영상 확인 → 학습 → 배포)을 따르세요; 02와 04–08은 참고 매뉴얼이므로 필요할 때 찾아보면 됩니다.
09의 모든 명령은 그대로 복사해 실행할 수 있으며, 중간에 다른 장으로 돌아가 환경을 추가 설치할 필요가 없습니다.

## 반드시 기억해야 할 세 가지 약속

1. **단위 체계**(삼자 정렬): 다섯 개의 신체 관절은 **−100에서 100까지**(스트로크 비율, 0 = 스트로크 중간점), 그리퍼는
   **0에서 100까지**(0 = 닫힘)를 사용합니다. 실기(`use_degrees=false`), 시뮬레이션, 리더 암이 모두 이 약속에 정렬되어 있으며, 녹화된 데이터셋은 공식
   `lerobot/svla_so101_pickplace` 등 실기 데이터셋과 구조가 동일합니다(6차원 벡터 + 관절 이름).
2. **역할 대응**: 제어 대상(실기 또는 시뮬레이션)에는 항상 `--robot.*`를, 조작 장치(키보드/리더 암)에는 항상 `--teleop.*`를 지정합니다.
3. **이 머신의 명령 접두사**: 이 개발 머신에서는 모든 `uv` 명령 전에 캐시 디렉터리를 먼저 설정해야 합니다(이유는 [07](/ko/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) 참조):

   ```bash
   export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
   ```

## 실측 환경

| 항목 | 버전 |
| --- | --- |
| 시스템 | Windows 11 |
| Python / uv | 3.12.9 / 0.12.5 |
| lerobot | 0.6.2(이 저장소, 프로젝트 `.venv` 격리, conda에 영향 없음) |
| MuJoCo | 3.16.0 |
| PyTorch | 2.11.0(CPU 버전) |
| 하드웨어 | SO-ARM101 리더 암(COM124) + 팔로워 암(COM172), CH343 시리얼 칩 |

<RelatedProducts slugs="so-arm101" />

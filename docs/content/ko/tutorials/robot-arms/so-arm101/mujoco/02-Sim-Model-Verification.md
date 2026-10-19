---
title: "02 · 시뮬레이션 모델 검증(MJCF 로드와 구동)"
description: "SO-ARM101의 공개 MJCF 모델 세 가지를 이 프로젝트에서 모두 검증하여 사용 가능함을 확인했습니다:"
---

# 02 · 시뮬레이션 모델 검증(MJCF 로드와 구동)

> 사전 조건: [01 환경 준비](/ko/tutorials/robot-arms/so-arm101/mujoco/01-Environment)를 완료하세요. 이 장은 전부 시뮬레이션 검증이며 하드웨어 연결이 필요 없습니다.

## 모델 출처

SO-ARM101의 공개 MJCF 모델 세 가지를 이 프로젝트에서 모두 검증하여 사용 가능함을 확인했습니다:

| 약칭 | 파일 | 출처 |
| --- | --- | --- |
| 공식-신규 캘리브레이션 | `SO101/so101_new_calib.xml` | TheRobotStudio/SO-ARM100 공식 저장소(이 튜토리얼의 비교 검증은 이곳에서 수행; 이 저장소에는 원본 zip을 포함하지 않음) |
| 공식-구 캘리브레이션 | `SO101/so101_old_calib.xml` | 같은 저장소(zip에는 없으므로 다운로드 필요) |
| ROS2 설명 패키지 | `so_arm101_description/mjcf/so_arm101.xml` | 이 저장소 튜토리얼 첨부 `SO-ARM101_ROS2.zip` |

참고: zip 추출 흐름은 초기 버전의 `so101_assets.py`가 제공하며 조회 가능하게 유지되어 있습니다; 2026-10-16부터 시뮬레이션 로봇은
**mujoco_menagerie의 SO-ARM100 모델**로 이전되었습니다(`assets/menagerie_so_arm100/`에 vendored,
이전 이유와 요점은 [07](/ko/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) 설계 설명 참조).

## 구동과 렌더링 검증

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 仓库自带、可直接运行的是 menagerie 模型（仿真机器人默认也用它）
uv run --frozen --with mujoco python examples/so101_mujoco/load_and_drive.py \
    --model examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml \
    --out-dir examples/so101_mujoco/outputs/renders/model_check
```

| 매개변수 | 설명 |
| --- | --- |
| `--model` | MJCF 모델 경로. 저장소에 포함되어 바로 사용할 수 있는 것은 `examples/so101_mujoco/assets/menagerie_so_arm100/so_arm100.xml`입니다(위 표의 세 가지 과거 모델을 다시 검증하려면 먼저 "출처" 열의 해당 저장소에서 받은 뒤 경로를 바꾸세요) |
| `--out-dir` | 산출물 디렉터리: 검증 영상, 정지 프레임, 구조 요약 txt가 모두 여기에 기록됩니다(기본값 `out`) |
| `--tag` | 산출물 파일 이름 접두사, 기본값은 모델 파일 이름 |
| `--settle` / `--fps` / `--width` / `--height` | 각 자세의 안정화 시간(초), 영상 프레임 레이트, 렌더링 해상도; 기본 25 fps, 960×720이며 일반적으로 수정할 필요 없음 |

스크립트는 구조 요약(관절/액추에이터/게인/범위)을 출력하고, "육관절 순차 스윕 + 협조 사인" 검증 영상과 정지 프레임을 렌더링합니다.
구조 요약 예시는 `reports/`에 있습니다(저장소에 포함); 비교 영상(`media/`)은 용량이 커서 저장소에 배포하지 않습니다——위 명령으로 언제든 다시 생성할 수 있습니다.

## 세 모델의 핵심 차이(실측)

| 항목 | 공식-신규 캘리브레이션 | 공식-구 캘리브레이션 | ROS2 설명 패키지 |
| --- | --- | --- | --- |
| 영점 의미 | 관절 **스트로크 중간점** | 수평 **완전 신전** 자세 | 스트로크 중간점 |
| 관절 이름 | `shoulder_pan` | 왼쪽과 동일 | `shoulder_pan_joint`(접미사) |
| 위치 게인 | kp=998.22, kv=2.731 | **kp=17.8, kv=0** | kp=998.22 |
| 그리퍼 단위 | 라디안 hinge | 라디안 hinge | **0–1 정규화** |
| 자기 충돌 제외 | 없음 | 없음 | 있음(6쌍) |

**추적 오차 실측**: 신규 캘리브레이션과 설명 패키지는 정지 유지 오차가 0.0005 rad, 구 캘리브레이션은 0.03 rad입니다(약 1.7° 처짐, kp가 56배 약함).
시뮬레이션에서 동일한 정책을 평가할 때 모델을 바꾸면 다른 동역학을 얻게 되므로, 어느 모델을 사용했는지 기록해 두세요.

## 반드시 기억해야 할 모델 동작

1. **`shoulder_lift`의 양의 방향은 아래쪽**: 구동 토크에서 "하방 스윙"은 양의 각도를 사용하므로, 텔레오퍼레이션 매핑이나 데이터 변환 시 부호를 먼저 확인하세요.
2. **지면에 닿으면 정지**: 하방 스윙 한계에서 손끝이 지면에 접촉해 멈춥니다(스크립트에 내장된 8cm 지면 이탈 보호가 자동으로 진폭을 자름).
3. 공식 모델에는 카메라와 keyframe이 없습니다; 카메라가 포함된 변형 `so101_new_calib_camera.xml`이 존재하며, 이후 시각 데이터 녹화에 사용할 수 있습니다.

<RelatedProducts slugs="so-arm101" />

---
title: 3D RealSense 깊이 카메라
description: 鉅犀科技 3D RealSense 깊이 카메라 — D435i/D405/D405CB 3개 모델, 고정밀 깊이 인식, XLeRobot 및 SO-ARM101 지원
keywords: [realsense, depth camera, 깊이 카메라, 3d vision, 깊이 인식, 로봇 비전]
---

# 3D RealSense 깊이 카메라

> **[스토어에서 구매](https://www.juxitech.com/ko/products/3d-realsense-depth-camera)**

## 제품 개요

3D RealSense 깊이 카메라는 고성능 시각 인식 장치로 **D435i, D405, D405CB** 세 가지 모델을 제공합니다. 얼굴 분석, 증강 현실, 물체 추적, 3D 스캔 등 응용을 지원하며 임베디드 지능 개발 시나리오에 특화되어 최적화되었습니다.

**주요 특징**:

- 3가지 모델 선택, 원거리·근거리와 정밀도 요구를 모두 커버
- 고정밀 깊이 맵, RGB 이미지, 적외선 이미지 출력(D435i는 IMU 데이터 포함)
- 임베디드 지능 최적화: 자율 주행, 물체 인식, 상호작용 조작
- **XLeRobot** 및 **SO-ARM101** 로봇 플랫폼 지원(옵션), 플러그 앤 플레이

## 모델 비교

| 모델 | 적용 거리 | 적용 시나리오 |
|------|---------|---------|
| **D435i** | 중장거리 | 이동 로봇 내비게이션, 환경 3D 재구성 |
| **D405** | 근거리 고정밀 | 로봇 팔 파지, 근거리 물체 인식 |
| **D405CB** | 근거리(D405 강화판) | 복잡한 환경, 저조도 조건, 더 높은 정밀도 |

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 선택 모델 | D435i / D405 / D405CB |
| 핵심 기능 | 얼굴 분석, 증강 현실, 물체 추적, 3D 스캔, 임베디드 지능 시각 인식 |
| 지원 플랫폼 | XLeRobot / SO-ARM101(옵션) |
| 출력 데이터 | 깊이 맵, RGB 이미지, 적외선 이미지, IMU 데이터(D435i) |
| 응용 시나리오 | 로봇 개발, AI 연구, 3D 재구성, 산업 검사, AR/VR, 임베디드 지능 |

## 빠른 시작

### 1. 드라이버 설치
```bash
# Ubuntu 22.04 (X86 / Jetson)
pip install pyrealsense2
```
### 2. 장치 확인
```bash
rs-enumerate-devices
```
연결된 RealSense 카메라와 모델이 표시되어야 합니다.

### 3. 기본 예제
```python
import pyrealsense2 as rs
import numpy as np
import cv2

# 创建管道
pipeline = rs.pipeline()
config = rs.config()
config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)
config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 30)

# 开始
pipeline.start(config)

try:
    while True:
        frames = pipeline.wait_for_frames()
        depth = frames.get_depth_frame()
        color = frames.get_color_frame()
        if not depth or not color:
            continue
        depth_image = np.asanyarray(depth.get_data())
        color_image = np.asanyarray(color.get_data())
        cv2.imshow('Color', color_image)
        cv2.imshow('Depth', depth_image * 80)  # 深度可视化
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
finally:
    pipeline.stop()
    cv2.destroyAllWindows()
```
### 4. LeRobot 환경 통합

SO-ARM101 / XLeRobot 프로젝트에서 사용:
```bash
# 查找相机 ID
python -m lerobot.find_cameras realsense

# 遥操作时启用 RealSense
lerobot-teleoperate \
  --robot.cameras='{ front: {type: realsense} }' \
  ...
```
## 응용 시나리오

| 시나리오 | 설명 |
|------|------|
| **얼굴 분석** | 얼굴 인식, 표정 인식, 얼굴 속성 분석 |
| **증강 현실** | AR 오버레이, 공간 위치 결정, 3D 등록 |
| **물체 추적** | 물체 감지, 추적, 카운트 |
| **3D 스캔** | 3D 모델 재구성, 부피 측정, 치수 검사 |
| **임베디드 지능** | 환경 인식, 장애물 회피, 상호작용 조작 |

## 자주 묻는 질문

**Q: 모델은 어떻게 선택하나요?**
- 이동 로봇 내비게이션/환경 재구성 → D435i(중장거리, IMU 포함)
- 로봇 팔 파지/근거리 인식 → D405(초소형 고정밀)
- 저조도/복잡한 환경 → D405CB(D405 강화판)

**Q: Jetson을 지원하나요?**
네. pyrealsense2를 Jetson 플랫폼에 직접 설치할 수 있으며 SO-ARM101 튜토리얼의 LeRobot 흐름과 호환됩니다.

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
- 💬 [문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)

---
title: SO-ARM101 개발 키트
category: robot
description: "SO-ARM101 개발 키트: 각 6 DOF 양팔 로봇으로 LeRobot 생태계에서 원격 조작과 모방 학습을 지원하는 오픈소스 로봇 팔 제품 페이지."
keywords: [so-arm101, 로봇 팔, leRobot, 원격 조작, 양팔 로봇]
---

# SO-ARM101 개발 키트

> **[스토어에서 구매](https://www.juxitech.com/ko/products/so-arm101-developers-kit)**

## 제품 개요

SO-ARM101은 Juxi Technology가 오픈소스로 제공하는 6-DOF 양팔 로봇 개발 키트입니다. **LeRobot** 생태계에 깊이 통합되어 리더-팔로워 원격 조작, 모방 학습 데이터 수집, 정책 훈련을 지원합니다. 검은색 리더 암 + 흰색 팔로워 암, 개봉 즉시 사용 가능합니다.

**주요 특징**:

- 양팔 각 6 DOF, 버스 서보 구동
- LeRobot(HuggingFace) 심층 호환, ACT/Diffusion/Pi0 등 정책 지원
- Jetson / PC(Linux) 플랫폼 지원
- 하드웨어 완전 오픈소스(회로도/CAD/펌웨어)

## 1. 하드웨어 설계: 고성능 모듈화, 조립이 쉽고 커스터마이징 가능

- **구조 재질**: 핵심 구조는 3D 프린팅 부품과 보강 하중 지지 부품을 결합한 방식으로, 배선과 관절 설계를 최적화하여 운동 간섭을 방지하고 경량성과 내구성을 모두 확보했으며, 사용자가 직접 출력하여 구조 부품을 교체하거나 확장할 수 있습니다.

- **구동 구성**: 팔로워 암에는 **6개의 12V 30KG 대토크 자기 인코더 서보**가 탑재되어 360° 자기 인코더 피드백과 PID 제어 알고리즘을 결합해 운동이 부드럽고 떨림이 없으며 반복 위치 정밀도가 높고 출력이 강력하면서 동작이 정확합니다; 리더 암은 **6개의 7.4V 서보**를 채택하여 관절 부하에 따라 서로 다른 감속비를 배분하므로 수동 드래그 교시에 편리합니다.

- **비전 시스템**: 듀얼 카메라 지능형 비전 시스템을 지원하며, 말단 카메라는 근거리 파지 디테일을 포착하고 전체 카메라는 작업 환경을 커버하며, 두 카메라의 데이터를 융합하여 입체 모델을 구축함으로써 모방 학습에 풍부한 데이터를 제공합니다.

- **제어 연결**: 서보 드라이버 보드가 제공되며, USB-C 인터페이스로 컴퓨터나 Raspberry Pi에 직결되어 플러그 앤 플레이를 지원하므로 하드웨어 연결 절차를 단순화하고 제어 환경을 빠르게 구축할 수 있습니다.

## 2. 소프트웨어 생태계: LeRobot 심층 통합, AI 개발 진입 장벽 제로

- **핵심 프레임워크 호환**: Hugging Face **LeRobot 오픈소스 로봇 ML 프레임워크**에 깊이 최적화되어 있으며, PyTorch 기반으로 구축되고 사전 학습 모델, 다양한 시나리오의 데이터셋 및 시뮬레이션 환경을 내장하고 있어 Stanford ALOHA 등 유명 오픈소스 데이터셋과 호환됩니다.

- **저지연 통신**: **DORA 분산 데이터 흐름 엔진**을 채택하여 하드웨어와 알고리즘의 저지연 상호작용을 구현했으며, Python 실행 성능이 ROS2보다 17배 빠르고 코드 핫 리로드를 지원하므로 재시작 없이 실시간으로 정책을 조정할 수 있습니다.

- **풀스택 오픈소스**: 하드웨어 3D 프린팅 파일, 소프트웨어 제어 코드, AI 학습 스크립트 및 전체 튜토리얼이 **완전 오픈소스**이며, 사용자가 자유롭게 수정하고 2차 개발하여 개인화된 기능 확장을 빠르게 구현할 수 있습니다.

## 3. 핵심 응용 시나리오: 입문부터 실전 적용까지, 전 시나리오 대응

1. **로봇 교육 입문**: 로봇암 조립, 기초 프로그래밍부터 AI 정책 배포까지의 전 과정 튜토리얼을 제공하고 시각화 조작 인터페이스와 예제 코드를 함께 제공하므로, 기초가 없는 사용자도 로봇 제어와 AI 응용 기술을 빠르게 습득할 수 있습니다.

2. **과학 연구 알고리즘 검증**: **모방 학습, 강화 학습** 연구에 집중하며, VR로 사람의 조작 데이터를 기록하여 로봇을 학습시키는 것을 지원합니다; 대표 사례: 15초 분량의 조작 영상 50개를 기반으로 2시간 학습만으로 옷 개기, 열쇠 꽂기, 자재 분류 등의 작업을 습득할 수 있습니다.

3. **경량 산업 프로토타입**: 저비용으로 자동화 방안을 검증하며, **자재 운반, 정밀 조립, 부품 분류** 등의 시나리오에 적합하고, 천 위안 수준의 비용으로 산업용 로봇암의 핵심 기능을 구현하여 프로토타입 검증을 빠르게 실현합니다.

## 사양

| 카테고리 | 사양 |
|------|------|
| 유형 | 양팔 원격 조작 로봇 |
| 자유도 | 각 팔 6 DOF |
| 구동 | Feetech 버스 서보 |
| 호스트 | PC (Linux) / Jetson |
| 생태계 | LeRobot, ROS 2, ROS 1 |
| 전원 | 리더 5V6A / 팔로워 12V5A |
| 페이로드 | 500g |
| 반복 정밀도 | ±0.1mm |
| 작업 반경 | 520mm |
| 통신 방식 | USB-C |
| 재질 | Bambu Lab PLA+ |
| 크기(리더 / 팔로워) | 111×239×525 mm / 111×173×532 mm |

![리더·팔로워 암 치수도](../../../public/images/products/so-arm101/dimensions.jpg)

## 빠른 시작

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot && pip install -e ".[feetech]"

lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0

lerobot-teleoperate --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1
```

## 관련 튜토리얼

- [SO-ARM101 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [SO-ARM101 조립 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [로봇 팔 선택 가이드](/ko/tutorials/robot-arms/select-guide)
- [구현 지능 입문(LeRobot)](/ko/topics/embodied-ai-intro)

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)

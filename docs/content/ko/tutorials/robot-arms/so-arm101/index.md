---
title: "SO-ARM101 로봇 암 튜토리얼"
description: "SO-ARM101 튜토리얼 홈: 구현 지능과 LeRobot 소개, 로봇 암 구성, 필요한 컴퓨터 사양, 모방 학습(VLA)의 의미와 전체 코스 내비게이션을 제공합니다."
---

# SO-ARM101 로봇 암 튜토리얼

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/so-arm101-index/d02-03.png)

## 체화 지능이란 무엇인가?

몸을 가진 지능입니다. AI를 다음과 같은 다양한 물리적 하드웨어 개체와 연결합니다.

사족보행 로봇견, 이족보행 휴머노이드 로봇, 바퀴-다리 로봇, 드론, 자율주행차

## LeRobot이란 무엇인가?

LeRobot은 HuggingFace의 오픈소스 `embodied intelligent robot software framework`입니다.

GitHub 주소: https://github.com/huggingface/lerobot

강화학습과 **모방학습(VLA)** 을 위한 **데이터 수집, 알고리즘 학습 및 추론 배포**의 장벽을 낮추며, **모방학습(VLA)** 을 주된 초점으로 삼습니다.

- LeRobot으로 어떤 로봇을 개발할 수 있습니까?

천 위안대의 SO-ARM 101 로봇 팔과 LeKiwi 카트부터, 수만 위안대의 AgileX piper 암, Huaxinjing StarAI 암과 Hope-JR 덱스트러스 핸드, 그리고 수십만 위안대의 Unitree G1 휴머노이드 로봇에 이르기까지 다양합니다. LeRobot은 체화 지능 산업에서 데이터 수집과 알고리즘 학습의 표준이 되었습니다.

자체 로봇을 LeRobot 프레임워크에 맞게 적용할 수도 있습니다.

- LeRobot 데이터셋과 모델

LeRobot은 자체적인 모방학습 데이터셋 형식을 정의합니다. HuggingFace의 모든 공개 데이터셋과 모델을 열람, 사용, 다운로드 및 학습할 수 있으며, 자체 데이터셋을 HuggingFace에 업로드할 수도 있습니다.

## SO-ARM 101 로봇 팔이란 무엇인가?

이 튜토리얼은 SO-ARM 101 로봇 팔을 예로 들어 설명합니다. 이 로봇 팔은 3D 프린팅 구조 부품과 Feetech 서보를 사용하며 비용이 매우 낮습니다.

이는 가난한 학생도 감당할 수 있는 체화 지능의 신체이며, LeRobot이 공식적으로 권장하는 신체 중 하나입니다.

이 팔은 두 개의 팔, 즉 Leader 암과 Follower 암으로 구성됩니다. 각 팔은 5개의 자유도에 그리퍼 1자유도를 더해 총 6자유도를 가집니다.

## 어떤 컴퓨터 사양이 필요합니까?

일반적인 Windows 노트북이면 학습 단계까지 모두 처리할 수 있습니다.

일반적인 Mac이면 모든 것을 처리할 수 있습니다.

NVIDIA GPU가 탑재된 Ubuntu 머신이면 모든 것을 처리할 수 있습니다.

이 튜토리얼에서는 [클라우드 GPU 플랫폼](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1)을 사용해 모델을 학습하므로, 여러분의 컴퓨터에 고사양 구성이 필요하지 않습니다.

## **모방학습과 VLA**란 무엇인가?

사람이 로봇을 끌어 조작하며 시연하여 데이터셋을 수집합니다. 그런 다음 이 데이터셋으로 모방학습 알고리즘을 학습시키고, 최종적으로 로봇에 배포하여 사람의 동작을 스스로 모방하고 실제 환경으로 일반화하도록 합니다. 원격조작이나 원격 제어가 필요하지 않습니다.

예를 들어 위 동영상에서는 사람이 SO-ARM 로봇 팔을 끌어 가재를 집고, 양념에 찍고, 뜨거운 기름에 넣습니다. 그리고 최종적으로 이 팔은 이 동작을 스스로 수행합니다. 새로운 가재가 주어져도 언제든 반응하여 동작을 완료할 수 있습니다.

모방학습에는 최첨단의 세련된 이름이 하나 더 있습니다. 바로 VLA(Vision-Language-Action 대형 모델)입니다. 이는 현재 가장 빠르게 발전하고, 가장 뜨거운 투자를 받고, 중미 경쟁이 가장 치열하며, 가장 번성한 오픈소스 생태계를 누리고, 미디어의 뜨거운 주목을 받으며, 수많은 석·박사 학생을 끌어들이는 체화 지능 연구 분야이기도 합니다.

LeRobot이 주로 적용하는 알고리즘은 ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS 등과 같은 모방학습 알고리즘입니다.

이 튜토리얼의 모방학습은 오로지 VLA입니다.


## 튜토리얼 내비게이션

### 전체 코스

- [LeRobot 코스 개요](/ko/tutorials/robot-arms/so-arm101/lerobot/)
- [SO-ARM101 로봇 암 7축 튜토리얼](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/)

### 조립 및 확장 튜토리얼

- [LeRobot 로봇팔 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Lerobot 로봇 암 조립 가이드](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly)
- [SO-ARM100&101 암 장착 브래킷 및 환경 카메라 키트 설치 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation)
- [오버헤드 카메라 마운트 설치 가이드](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation)
- [평행 핑거 그리퍼 설치 튜토리얼](/ko/tutorials/robot-arms/so-arm101/Parallel-Finger-Gripper-Installation)
- [SO-ARM101 양팔(듀얼 팔로워 암) 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Bi-Arm-Tutorial)
- [SO-ARM101 무선 텔레오퍼레이션(ESP32-NanoCam 버전)](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Wireless-Teleop)
- [원격조작 문제 해결](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-NanoCam-Troubleshooting)
- [SoARM 시리즈 서보 캘리브레이션 도구 사용 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Servo-Calibration-Tool)
- [ROS2 시뮬레이션 제어](/ko/tutorials/robot-arms/so-arm101/ROS2-Simulation-Control)
- [Jetson Orin에서 PyTorch 비호환 문제](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility)

### 기초 지식

- [LeRobot 알아보기](/ko/tutorials/robot-arms/so-arm101/basics/Understanding-LeRobot)
- [HuggingFace의 LeRobot 데이터셋](/ko/tutorials/robot-arms/so-arm101/basics/HF-Datasets)
- [모델 학습 자료](/ko/tutorials/robot-arms/so-arm101/basics/Training-Resources)
- [SO-ARM 100 로봇 암 공식 3D 프린팅 파일](/ko/tutorials/robot-arms/so-arm101/basics/Official-3D-Print-Files)
- [URDF 파일 및 자료 참고](/ko/tutorials/robot-arms/so-arm101/basics/URDF-Reference)
- [권장 카메라 브래킷 및 마운트](/ko/tutorials/robot-arms/so-arm101/basics/Camera-Mounts-Recommended)

### LeLab 튜토리얼

- [1 · 개요](/ko/tutorials/robot-arms/so-arm101/lelab/01-Overview)
- [2 · 설치 및 실행](/ko/tutorials/robot-arms/so-arm101/lelab/02-Install)
- [3 · 연결 및 캘리브레이션](/ko/tutorials/robot-arms/so-arm101/lelab/03-Calibration)
- [4 · 텔레오퍼레이션](/ko/tutorials/robot-arms/so-arm101/lelab/04-Teleoperation)
- [5 · 데이터셋 녹화](/ko/tutorials/robot-arms/so-arm101/lelab/05-Record-Dataset)
- [6 · 학습과 추론](/ko/tutorials/robot-arms/so-arm101/lelab/06-Train-and-Inference)
- [7 · 문제 해결](/ko/tutorials/robot-arms/so-arm101/lelab/07-Troubleshooting)

### XLeRobot Docker 이미지 튜토리얼

- [XLeRobot Docker 튜토리얼 — Jetson AGX Orin](/ko/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [XLeRobot Docker 튜토리얼 — Jetson Orin Nano](/ko/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

<RelatedProducts slugs="so-arm101" />

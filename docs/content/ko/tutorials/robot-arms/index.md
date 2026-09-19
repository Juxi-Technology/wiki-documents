---
title: 로봇 팔 시리즈
description: "Juxi Technology 로봇 팔 시리즈 튜토리얼 홈——SO-ARM101, AmazingHand, Lekiwi, XLeRobot"
---

# 로봇 팔 시리즈

로봇 팔 시리즈 튜토리얼에 오신 것을 환영합니다! 다양한 오픈소스 로봇 팔과 정교 손의 완전한 사용 가이드를 담고 있습니다.

---

## 제품 목록

- [선택 가이드](./select-guide.md)

### SO-ARM101

6축 데스크톱 오픈소스 로봇 팔. LeRobot 등 AI 프레임워크 지원.

- [SO-ARM101 튜토리얼](./so-arm101/SO-ARM101-Tutorial.md)
- [SO-ARM101 조립 가이드](./so-arm101/SO-ARM101-Assembly.md)
- [SO-ARM101 Jetson Orin PyTorch 호환성](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [SO-ARM101 무선 텔레오퍼레이션(ESP32-NanoCam 버전)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [SO-ARM101 양팔(듀얼 팔로워 암) 튜토리얼](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [SO-ARM101 7-DOF 개조와 LeRobot 사용](./so-arm101/SO-ARM101-7DOF-LeRobot.md)
- [SoARM 시리즈 서보 캘리브레이션 도구](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)

#### SO-ARM101 시리즈
- [SO-ARM100&101 암 장착 브래킷 및 환경 카메라 키트 설치 튜토리얼](./so-arm101/SO-ARM101-100-Arm-Mount-Camera-Kit-Installation.md)
- [오버헤드 카메라 마운트 설치 가이드](./so-arm101/SO-ARM101-Overhead-Camera-Mount-Installation.md)

#### 1. LeRobot 환경 설치
- [1단계: LeRobot 환경 설치 (Ubuntu)](./so-arm101/lerobot/01-Environment-Setup/Ubuntu.md)
- [1단계: LeRobot 환경 설치 (Windows)](./so-arm101/lerobot/01-Environment-Setup/Windows.md)
- [1단계: LeRobot 환경 설치 (macOS)](./so-arm101/lerobot/01-Environment-Setup/MacOS.md)

#### 2. 시리얼 포트 확인
- [2단계: 시리얼 장치 포트 번호 확인 (Ubuntu)](./so-arm101/lerobot/02-Serial-Port/Ubuntu.md)
- [2단계: 시리얼 장치 포트 번호 확인 (Windows)](./so-arm101/lerobot/02-Serial-Port/Windows.md)
- [2단계: 시리얼 장치 포트 번호 확인 (macOS)](./so-arm101/lerobot/02-Serial-Port/MacOS.md)

#### 3. 로봇 암 캘리브레이션
- [3단계: 로봇 암 캘리브레이션 (Ubuntu)](./so-arm101/lerobot/03-Calibration/Ubuntu.md)
- [3단계: 로봇 암 캘리브레이션 (Windows)](./so-arm101/lerobot/03-Calibration/Windows.md)
- [3단계: 로봇 암 캘리브레이션 (macOS)](./so-arm101/lerobot/03-Calibration/MacOS.md)

#### 4. 원격조작
- [4단계: 원격조작 (Ubuntu)](./so-arm101/lerobot/04-Teleoperation/Ubuntu.md)
- [4단계: 원격조작 (Windows)](./so-arm101/lerobot/04-Teleoperation/Windows.md)
- [4단계: 원격조작 (macOS)](./so-arm101/lerobot/04-Teleoperation/MacOS.md)

#### 5. 카메라 원격조작
- [5단계: 카메라 연결 원격조작 (Ubuntu)](./so-arm101/lerobot/05-Camera-Teleoperation/Ubuntu.md)
- [5단계: 카메라 연결 원격조작 (Windows)](./so-arm101/lerobot/05-Camera-Teleoperation/Windows.md)
- [5단계: 카메라 연결 원격조작 (macOS)](./so-arm101/lerobot/05-Camera-Teleoperation/MacOS.md)

#### 6. 데이터셋 수집
- [6단계: 시연 데이터셋 수집](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording.md)
- [6단계: 데이터셋 수집 주의 사항](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [6단계: Hugging Face 계정 등록(선택 사항)](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [6단계: HuggingFace에 데이터셋 업로드(선택 사항)](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)

#### 7. 모델 학습
- [7단계: 로컬 Ubuntu 학습](./so-arm101/lerobot/07-Training/Local-Ubuntu.md)
- [7단계: 클라우드 GPU 학습 환경 설정](./so-arm101/lerobot/07-Training/Cloud-GPU.md)
- [7단계: wandb 실시간 학습 곡선 확인](./so-arm101/lerobot/07-Training/WandB-Curves.md)
- [7단계: HuggingFace에 모델 업로드(선택 사항)](./so-arm101/lerobot/07-Training/HF-Model-Upload.md)
- [7단계: 모델 가중치 파일 얻기](./so-arm101/lerobot/07-Training/Model-Weights.md)
- [7단계: ACT 학습 커맨드라인](./so-arm101/lerobot/07-Training/Command-ACT.md)
- [7단계: pi0 학습 커맨드라인](./so-arm101/lerobot/07-Training/Command-pi0.md)
- [7단계: pi0.5 학습 커맨드라인](./so-arm101/lerobot/07-Training/Command-pi0.5.md)
- [7단계: pi0fast 학습 커맨드라인](./so-arm101/lerobot/07-Training/Command-pi0fast.md)
- [7단계: smolvla 학습 커맨드라인](./so-arm101/lerobot/07-Training/Command-smolvla.md)

#### 8. 모델 배포
- [8단계: 커맨드라인 설명](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [8단계: 자주 발생하는 Bug 및 해결](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [8단계: ACT 배포 커맨드라인](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [8단계: pi0 배포 커맨드라인](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [8단계: pi0.5 배포 커맨드라인](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [8단계: smolvla 배포 커맨드라인](./so-arm101/lerobot/08-Inference/Command-smolvla.md)

#### 기초 지식
- [LeRobot 알아보기](./so-arm101/basics/Understanding-LeRobot.md)
- [HuggingFace의 LeRobot 데이터셋](./so-arm101/basics/HF-Datasets.md)
- [모델 학습 자료](./so-arm101/basics/Training-Resources.md)
- [SO-ARM 100 로봇 암 공식 3D 프린팅 파일](./so-arm101/basics/Official-3D-Print-Files.md)
- [URDF 파일 및 자료 참고](./so-arm101/basics/URDF-Reference.md)

#### 기타 및 심화
- [ROS2 시뮬레이션 제어](./so-arm101/ROS2-Simulation-Control.md)
- [평행 핑거 그리퍼 설치 튜토리얼](./so-arm101/Parallel-Finger-Gripper-Installation.md)

### AmazingHand

오픈소스 바이오닉 정교 손. 고정밀 다중 손가락 조작 제공.

- [AmazingHand 인터페이스 제어](./amazing-hand/AmazingHand-Interface-Control.md)
- [AmazingHand 공식 예제](./amazing-hand/AmazingHand-Official-Example.md)
- [AmazingHand TTL 디버깅](./amazing-hand/AmazingHand-TTL-Debugging.md)

#### AmazingHand
- [AmazingHand 로봇 손 제품 자료](./amazing-hand/product-info.md)

#### PWM 서보 디버깅
- [01-GUI 시각화 제어](./amazing-hand/pwm-debugging/01-GUI-Visual-Control.md)
- [02-제스처 추적 튜토리얼](./amazing-hand/pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM 서보 버전-사용 매뉴얼](./amazing-hand/pwm-debugging/03-PWM-Servo-Manual.md)
- [04-시리얼 서보 버전-사용 설명](./amazing-hand/pwm-debugging/04-Serial-Servo-Guide.md)

#### 제스처 트래킹
- [Linux(Ubuntu) 원클릭 배포 실행](./amazing-hand/gesture-tracking/01-Ubuntu.md)
- [Windows 원클릭 배포 실행](./amazing-hand/gesture-tracking/02-Windows.md)
- [Mac 원클릭 배포 실행](./amazing-hand/gesture-tracking/03-macOS.md)

### Lekiwi

완전 오픈소스 모바일 로봇 카. LeRobot 모방 학습 프레임워크 호환, SO101 팔 지원.

- [Lekiwi 튜토리얼](./lekiwi/Lekiwi-Tutorial.md)
- [Lekiwi 조립 튜토리얼](./lekiwi/Lekiwi-Assembly.md)

### SO-ARM101 + AmazingHand 튜토리얼

SO-ARM101 팔로워 암 + AmazingHand 전체 워크플로: 환경 구축, 캘리브레이션, 원격 조작, 데이터 수집, 모델 학습 및 배포(Windows / Linux 별도).

- [코스 개요](./so-arm-amazinghand/index.md)

#### Linux

- [1단계: 환경 구축 (Linux)](./so-arm-amazinghand/01-Environment-Setup-Linux.md)
- [2단계: 핸드·양팔 캘리브레이션 (Linux)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Linux.md)
- [3단계: 원격 조작 (Linux)](./so-arm-amazinghand/03-Teleoperation-Linux.md)
- [4단계: 데이터 수집 (Linux)](./so-arm-amazinghand/04-Data-Collection-Linux.md)
- [5단계: 모델 학습 (Linux)](./so-arm-amazinghand/05-Model-Training-Linux.md)
- [6단계: 모델 배포 (Linux)](./so-arm-amazinghand/06-Model-Deployment-Linux.md)

#### Windows

- [1단계: 환경 구축 (Windows)](./so-arm-amazinghand/01-Environment-Setup-Windows.md)
- [2단계: 핸드·양팔 캘리브레이션 (Windows)](./so-arm-amazinghand/02-Hand-Arm-Calibration-Windows.md)
- [3단계: 원격 조작 (Windows)](./so-arm-amazinghand/03-Teleoperation-Windows.md)
- [4단계: 데이터 수집 (Windows)](./so-arm-amazinghand/04-Data-Collection-Windows.md)
- [5단계: 모델 학습 (Windows)](./so-arm-amazinghand/05-Model-Training-Windows.md)
- [6단계: 모델 배포 (Windows)](./so-arm-amazinghand/06-Model-Deployment-Windows.md)

### XLeRobot 튜토리얼

XLeRobot 양팔 이동 로봇 튜토리얼: 환경 구축, 파일 배치, 완제품/부품 키트 조립.

- [튜토리얼 개요](./xlerobot/index.md)
- [환경 구축(macOS)](./xlerobot/01-Environment-Setup-macOS.md)
- [환경 구축(Ubuntu)](./xlerobot/01-Environment-Setup-Ubuntu.md)
- [환경 구축(Windows)](./xlerobot/01-Environment-Setup-Windows.md)
- [XLeRobot 파일 이동](./xlerobot/02-Move-Xlerobot-Files.md)
- [완제품 조립](./xlerobot/03-Assembly-Assembled-Kit.md)
- [부품 키트 조립](./xlerobot/04-Assembly-Parts-Kit.md)

---

## 지원

문제가 있으면 연락해 주세요：

- 📧 이메일：support@juxitech.com
- 💬 GitHub Issues：[문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)

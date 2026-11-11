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

- [SO-ARM101 로봇 암 튜토리얼](./so-arm101/index.md)
- [SO-ARM101 튜토리얼](./so-arm101/SO-ARM101-Tutorial.md)
- [SO-ARM101 조립 가이드](./so-arm101/SO-ARM101-Assembly.md)
- [SO-ARM101 Jetson Orin PyTorch 호환성](./so-arm101/SO-ARM101-Jetson-Orin-PyTorch-Compatibility.md)
- [SO-ARM101 무선 텔레오퍼레이션(ESP32-NanoCam 버전)](./so-arm101/SO-ARM101-NanoCam-Wireless-Teleop.md)
- [SO-ARM101 양팔(듀얼 팔로워 암) 튜토리얼](./so-arm101/SO-ARM101-Bi-Arm-Tutorial.md)
- [SoARM 시리즈 서보 캘리브레이션 도구](./so-arm101/SO-ARM101-Servo-Calibration-Tool.md)
- [So-ARM 시리즈 STS3215 서보 캘리브레이션 – 웹 버전](./so-arm101/SO-ARM101-Web-Calibration.md)

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
- [6단계: 시연 데이터셋 수집 — Handshake 200](./so-arm101/lerobot/06-Data-Collection/Teaching-and-Recording-Handshake-200.md)
- [6단계: 데이터셋 보기 및 재생](./so-arm101/lerobot/06-Data-Collection/Browse-and-Replay.md)
- [6단계: 데이터셋 수집 주의 사항](./so-arm101/lerobot/06-Data-Collection/Collection-Notes.md)
- [6단계: Hugging Face 계정 등록(선택 사항)](./so-arm101/lerobot/06-Data-Collection/HF-Account.md)
- [6단계: HuggingFace에 데이터셋 업로드(선택 사항)](./so-arm101/lerobot/06-Data-Collection/HF-Dataset-Upload.md)
- [7단계(시뮬레이션): 데이터셋 수집 — Lightwheel LeIsaac 시뮬레이션 원격조작](./so-arm101/lerobot/06-Data-Collection/LeIsaac-Sim.md)

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
- [7단계: Diffusion 학습 커맨드라인](./so-arm101/lerobot/07-Training/Command-Diffusion.md)
- [7단계: WALL-OSS 학습 커맨드라인](./so-arm101/lerobot/07-Training/Command-Wall-OSS.md)
- [7단계: 학습 커맨드라인](./so-arm101/lerobot/07-Training/Train-CLI.md)
- [7단계: 학습 파라미터 권장 사항](./so-arm101/lerobot/07-Training/Training-Parameters.md)
- [7단계: LeRobot가 지원하는 모방 학습 알고리즘](./so-arm101/lerobot/07-Training/Imitation-Learning-Algorithms.md)

#### 8. 모델 배포
- [8단계: 커맨드라인 설명](./so-arm101/lerobot/08-Inference/CLI-Reference.md)
- [8단계: 자주 발생하는 Bug 및 해결](./so-arm101/lerobot/08-Inference/Common-Bugs.md)
- [8단계: ACT 배포 커맨드라인](./so-arm101/lerobot/08-Inference/Command-ACT.md)
- [8단계: pi0 배포 커맨드라인](./so-arm101/lerobot/08-Inference/Command-pi0.md)
- [8단계: pi0.5 배포 커맨드라인](./so-arm101/lerobot/08-Inference/Command-pi0.5.md)
- [8단계: smolvla 배포 커맨드라인](./so-arm101/lerobot/08-Inference/Command-smolvla.md)
- [8단계: Diffusion 배포 커맨드라인](./so-arm101/lerobot/08-Inference/Command-Diffusion.md)
- [8단계: WALL-OSS 배포 커맨드라인](./so-arm101/lerobot/08-Inference/Command-Wall-OSS.md)
- [8단계: NVIDIA DGX Spark 추론](./so-arm101/lerobot/08-Inference/DGX-Spark.md)
- [8단계: D-Robotics RDK S100 추론](./so-arm101/lerobot/08-Inference/RDK-S100.md)

#### 기초 지식
- [LeRobot 알아보기](./so-arm101/basics/Understanding-LeRobot.md)
- [HuggingFace의 LeRobot 데이터셋](./so-arm101/basics/HF-Datasets.md)
- [모델 학습 자료](./so-arm101/basics/Training-Resources.md)
- [SO-ARM 100 로봇 암 공식 3D 프린팅 파일](./so-arm101/basics/Official-3D-Print-Files.md)
- [URDF 파일 및 자료 참고](./so-arm101/basics/URDF-Reference.md)
- [권장 카메라 브래킷 및 마운트](./so-arm101/basics/Camera-Mounts-Recommended.md)

#### 기타 및 심화
- [ROS2 시뮬레이션 제어](./so-arm101/ROS2-Simulation-Control.md)
- [평행 핑거 그리퍼 설치 튜토리얼](./so-arm101/Parallel-Finger-Gripper-Installation.md)

#### LeLab 튜토리얼
- [1 · 개요](./so-arm101/lelab/01-Overview.md)
- [2 · 설치 및 실행](./so-arm101/lelab/02-Install.md)
- [3 · 연결 및 캘리브레이션](./so-arm101/lelab/03-Calibration.md)
- [4 · 텔레오퍼레이션](./so-arm101/lelab/04-Teleoperation.md)
- [5 · 데이터셋 녹화](./so-arm101/lelab/05-Record-Dataset.md)
- [6 · 학습과 추론](./so-arm101/lelab/06-Train-and-Inference.md)
- [7 · 문제 해결](./so-arm101/lelab/07-Troubleshooting.md)
,#### MuJoCo 시뮬레이션 튜토리얼,- [SO-ARM101 × MuJoCo 전체 워크플로 튜토리얼(인덱스)](./so-arm101/mujoco/index.md),- [01 · 환경 준비](./so-arm101/mujoco/01-Environment.md),- [02 · 시뮬레이션 모델 검증(MJCF 로드와 구동)](./so-arm101/mujoco/02-Sim-Model-Verification.md),- [03 · 실기 연결과 캘리브레이션](./so-arm101/mujoco/03-Hardware-Calibration.md),- [04 · 키보드 텔레오퍼레이션](./so-arm101/mujoco/04-Keyboard-Teleop.md),- [05 · 리더 암 디지털 트윈(실물 암으로 시뮬레이션 암 구동)](./so-arm101/mujoco/05-Leader-Digital-Twin.md),- [06 · 데이터 녹화와 리플레이](./so-arm101/mujoco/06-Record-and-Replay.md),- [07 · 자주 발생하는 문제와 경험](./so-arm101/mujoco/07-Troubleshooting.md),- [08 · 이후 로드맵](./so-arm101/mujoco/08-Roadmap.md),- [09 · 전체 사용 튜토리얼(암 준비 → 데이터셋 → 영상 확인 → 학습 → 배포)](./so-arm101/mujoco/09-Usage-Tutorial.md)


### SO-ARM101 로봇 암 7축 튜토리얼

- [SO-ARM101 로봇 암 7축 튜토리얼](/tutorials/robot-arms/so-arm101/lerobot-7dof/)
- **1. LeRobot 환경 설치**
  - [Ubuntu 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Ubuntu)
  - [Windows 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/Windows)
  - [Mac 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/01-Environment-Setup/MacOS)
- **2. 2단계: 파일 교체(7DOF 적응)**
  - [2단계: 파일 교체(7DOF 적응)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/02-Replace-Files-7DOF)
- **3. 시리얼 포트 확인**
  - [Ubuntu](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Ubuntu)
  - [Windows 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/Windows)
  - [Mac 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/03-Serial-Port/MacOS)
- **4. 로봇 암 캘리브레이션**
  - [Ubuntu 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Ubuntu)
  - [Windows 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/Windows)
  - [Mac 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/04-Calibration/MacOS)
- **5. 원격조작**
  - [Ubuntu 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Ubuntu)
  - [Windows 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/Windows)
  - [Mac 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/05-Teleoperation/MacOS)
- **6. 카메라 원격조작**
  - [Ubuntu 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Ubuntu)
  - [Windows 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/Windows)
  - [Mac 컴퓨터](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/06-Camera-Teleoperation/MacOS)
- **7. 데이터셋 수집**
  - [데이터셋 다시 보기, 재생](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Browse-and-Replay)
  - [데이터셋 수집 주의 사항](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Collection-Notes)
  - [Hugging Face 계정 등록(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Account)
  - [HuggingFace에 데이터셋 업로드(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/HF-Dataset-Upload)
  - [시연 데이터셋 수집-악수 200](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording-Handshake-200)
  - [시연 데이터셋 수집](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/07-Data-Collection/Teaching-and-Recording)
- **8. 모델 학습**
  - [클라우드 GPU 학습 환경 설정](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Cloud-GPU)
  - [학습 커맨드라인-ACT(입문 추천)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-ACT)
  - [학습 커맨드라인-Diffusion](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-Diffusion)
  - [학습 커맨드라인-pi0.5](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0.5)
  - [학습 커맨드라인-pi0(효과 최고)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0)
  - [학습 커맨드라인-pi0fast](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-pi0fast)
  - [학습 커맨드라인-smolvla(심화 추천)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Command-smolvla)
  - [HuggingFace에 모델 업로드(선택 사항)](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/HF-Model-Upload)
  - [LeRobot이 지원하는 모방학습 알고리즘](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Imitation-Learning-Algorithms)
  - [로컬 Ubuntu 학습](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Local-Ubuntu)
  - [모델 가중치 파일 얻기](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Model-Weights)
  - [학습 파라미터 제안](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/Training-Parameter-Tips)
  - [wandb 실시간 학습 곡선 확인](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/08-Training/WandB-Curves)
- **9. 모델 배포**
  - [커맨드라인 설명](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/CLI-Reference)
  - [추론 커맨드라인-ACT](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-ACT)
  - [추론 커맨드라인-Diffusion](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-Diffusion)
  - [추론 커맨드라인-pi0.5](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0.5)
  - [추론 커맨드라인-pi0](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-pi0)
  - [추론 커맨드라인-smolvla](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Command-smolvla)
  - [자주 발생하는 Bug 및 해결](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/Common-Bugs)
  - [NVIDIA DGX Spark 추론](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/DGX-Spark)
  - [D-Robotics RDK S100 추론](/ko/tutorials/robot-arms/so-arm101/lerobot-7dof/09-Inference/RDK-S100)

### AmazingHand 로봇 손 튜토리얼 개요

AmazingHand 로봇 손 통합 튜토리얼 입구: SCS0009 시리얼 서보 버전과 PWM 서보 버전의 제품 선택, 하드웨어 배선, 빠른 시작, 웹 제어, 데스크톱 제어 프로그램, 손 추적, 서보 디버깅과 FAQ.

- [튜토리얼 색인(이전 URL 포함)](./amazing-hand/index.md)
- [AmazingHand 로봇 손 튜토리얼 개요](./amazing-hand/README.md)
- [AmazingHand 제품 자료](./amazing-hand/00-product/product-info.md)
- [SCS0009와 PWM 버전 비교 및 선택](./amazing-hand/00-product/version-comparison.md)
- [다운로드와 리소스](./amazing-hand/00-product/downloads.md)
- [하드웨어 개요: 구조, CAD와 조립](./amazing-hand/01-hardware/overview.md)
- [SCS0009 배선, ID와 전원 공급](./amazing-hand/01-hardware/scs0009.md)
- [PWM 배선, GPIO와 전원 공급](./amazing-hand/01-hardware/pwm.md)
- [환경 카메라 키트 설치](./amazing-hand/01-hardware/camera-kit.md)
- [SCS0009 빠른 시작](./amazing-hand/02-quick-start/scs0009.md)
- [PWM 빠른 시작](./amazing-hand/02-quick-start/pwm.md)
- [AmazingHand 웹 제어](./amazing-hand/03-web-control/README.md)
- [SCS0009 웹 제어](./amazing-hand/03-web-control/scs0009.md)
- [PWM 웹 제어](./amazing-hand/03-web-control/pwm.md)
- [SCS0009 데스크톱 제어 프로그램(GUI와 CLI)](./amazing-hand/04-desktop/scs0009.md)
- [PWM 데스크톱 제어 프로그램(Tkinter GUI)](./amazing-hand/04-desktop/pwm.md)
- [SCS0009 손 추적(공식 dora Demo)](./amazing-hand/05-hand-tracking/scs0009.md)
- [PWM 손 추적(GUI 내장 MediaPipe)](./amazing-hand/05-hand-tracking/pwm.md)
- [SCS0009 서보 디버깅과 캘리브레이션](./amazing-hand/06-servo-tuning/scs0009.md)
- [PWM 서보 프로토콜, 명령과 캘리브레이션](./amazing-hand/06-servo-tuning/pwm.md)
- [Arduino Nano 사용 튜토리얼](./amazing-hand/07-arduino/arduino-nano.md)
- [Arduino와 Python 예제](./amazing-hand/07-arduino/examples.md)
- [자주 묻는 질문(FAQ)](./amazing-hand/08-faq/faq.md)

### Lekiwi

완전 오픈소스 모바일 로봇 카. LeRobot 모방 학습 프레임워크 호환, SO101 팔 지원.

- [Lekiwi 튜토리얼](./lekiwi/Lekiwi-Tutorial.md)
- [Lekiwi 조립 튜토리얼](./lekiwi/Lekiwi-Assembly.md)
- [제품 정보](./lekiwi/Lekiwi-Product-Info.md)

### SR-Support 자기 기립 로봇 튜토리얼

SR-Support 2자유도 자기 기립 장치의 전체 튜토리얼. 기초와 환경 설정부터 플래싱, 조립, 영점 조정, 캘리브레이션, 자기 기립 사용법, 문제 해결까지 다룹니다.

- [SR-Support 자기 기립 로봇 튜토리얼](./sr-support/index.md)
- [01 기초](./sr-support/01-basics.md)
- [02 환경 설정 (venv, 플래시 도구와 펌웨어)](./sr-support/02-environment.md)
- [03 메인 펌웨어 플래싱](./sr-support/03-build-flash.md)
- [04 조립: 프린팅, 제작, 배선](./sr-support/04-assembly.md)
- [05 영점 캘리브레이션 (화살표 키; DIY 제작 필수)](./sr-support/05-zero-tool.md)
- [06 디버그와 캘리브레이션](./sr-support/06-debug-and-calibrate.md)
- [07 자기 기립 사용법과 모니터링](./sr-support/07-self-righting.md)
- [08 WiFi 상태 페이지와 프로비저닝](./sr-support/08-wifi.md)
- [09 MuJoCo 시뮬레이션과 라이브 트윈](./sr-support/09-mujoco.md)
- [10 문제 해결](./sr-support/10-troubleshooting.md)
- [11 레퍼런스: 모델, 파라미터 및 라이선스](./sr-support/11-reference.md)

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
- [XLeRobot Docker 튜토리얼 — Jetson AGX Orin](/ko/tutorials/jetson-agx-orin/xlerobot-docker/deployment/01-Overview)
- [XLeRobot Docker 튜토리얼 — Jetson Orin Nano](/ko/tutorials/jetson-orin-nano/xlerobot-docker/deployment/01-Overview)

---

## 지원

문제가 있으면 연락해 주세요：

- 📧 이메일：support@juxitech.com
- 💬 GitHub Issues：[문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)

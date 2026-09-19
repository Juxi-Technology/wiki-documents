---
title: 로봇 액세서리
description: "Juxi Technology 로봇 액세서리 시리즈 튜토리얼 홈——KWS 음성, ESP32-NanoCam, Feetech 서보, 카메라, 사운드 카드 등"
---

# 로봇 액세서리

로봇 액세서리 튜토리얼에 오신 것을 환영합니다! 다양한 액세서리와 주변기기 사용 가이드를 담고 있습니다.

---

## 제품 목록

- [USB 자동 초점 카메라](./usb-auto-focus-camera.md)
- [Jetson CSI 카메라](./jetson-csi-camera.md)

- [2자유도 짐벌](./2dof-camera-gimbal.md)

- [심박·혈중 산소 센서](./heart-rate-spo2.md)

### KWS 음성 인식 모듈

AI 웨이크 사운드 카드. 오프라인 음성 웨이크, 사용자 지정 웨이크 워드, 저전력 동작 지원.

- [KWS 음성 인식 모듈 홈](./KWS-speech-recognition-module/index.md)
- [Jetson Nano 직렬 통신](./KWS-speech-recognition-module/Jetson-Nano-serial-communication.md)
- [Jetson 직렬 통신](./KWS-speech-recognition-module/Jetson-serial-communication.md)
- [PC 직렬 통신](./KWS-speech-recognition-module/PC-serial-communication.md)
- [ROS2 RViz2 시각화](./KWS-speech-recognition-module/ROS2-rviz2-visualization.md)
- [중문/영문 인식어 펌웨어 다운로드 및 굽기](./KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words.md)
- [라즈베리파이 직렬 통신](./KWS-speech-recognition-module/raspberry-pi-serial-communication.md)

### ESP32-NanoCam 영상 전송 모듈

ESP32-S3 영상 전송과 AI 비전 모듈. 8가지 AI 모드, AP+STA 듀얼 모드 영상 전송과 음성 상호작용을 지원합니다.

- [빠른 시작](./esp32-nanocam/ESP32-NanoCam-Quick-Start.md)
- [하드웨어 사양서](./esp32-nanocam/ESP32-NanoCam-Hardware-Spec.md)
- [시리얼 프로토콜 매뉴얼](./esp32-nanocam/ESP32-NanoCam-Serial-Protocol.md)
- [AI 비전 튜토리얼 제1장: 환경 구축](./esp32-nanocam/Ch01-Environment-Setup.md)

#### AI 비전 튜토리얼(11장)
- [3장: 카메라 기초](./esp32-nanocam/Ch03-Camera-Basics.md)
- [4장: 얼굴 검출](./esp32-nanocam/Ch04-Face-Detection.md)
- [5장: 고양이 얼굴 검출](./esp32-nanocam/Ch05-Cat-Face-Detection.md)
- [6장: 색상 인식](./esp32-nanocam/Ch06-Color-Recognition.md)
- [7장: QR 코드 스캔](./esp32-nanocam/Ch07-QR-Code-Scanning.md)
- [8장: 얼굴 인식](./esp32-nanocam/Ch08-Face-Recognition.md)
- [9장: 음성 대화](./esp32-nanocam/Ch09-Voice-Chat.md)
- [10장: AI 비전 이해](./esp32-nanocam/Ch10-AI-Vision-Understanding.md)
- [11장: ESP-Claw 음성 제어](./esp32-nanocam/Ch11-ESP-Claw-Voice-Control.md)

### CSI 카메라 사용 튜토리얼

Jetson / 라즈베리파이 CSI 카메라, 자동 초점 카메라, JetCam / Jupyter Lab 사용 가이드.

- [Jetson CSI 카메라 설정](./csi-camera/01-Jetson-CSI-Setup.md)
- [자동 초점 카메라 사용](./csi-camera/02-Auto-Focus-Camera.md)
- [Jupyter Lab 사용](./csi-camera/03-JupyterLab.md)
- [JetCam 사용](./csi-camera/04-JetCam.md)
- [IMX219(라즈베리파이)](./csi-camera/05-IMX219-RaspberryPi.md)

### AI 음성 인터랙션 모듈

CI1302 오프라인 음성 인터랙션 모듈 전 플랫폼 튜토리얼: 퀵 스타트, 펌웨어 플래싱, 웨이크 워드/명령어 수정, 프로토콜 매뉴얼, Arduino/Jetson/RDK/라즈베리파이/PC 통신(시리얼 + IIC).

- [퀵 스타트](./ai-voice-module/Quick-Start.md)
- [제품 자료](./ai-voice-module/Product-Info.md)
- [펌웨어 플래싱](./ai-voice-module/Firmware-Flashing.md)
- [웨이크 워드 및 명령어 수정](./ai-voice-module/Wake-Word-Commands-Edit.md)
- [사용자 정의 프로토콜 항목 제작](./ai-voice-module/Custom-Protocol-Entries.md)
- [ROS1 음성 인터랙션](./ai-voice-module/ROS1-Voice-Interaction.md)
- [ROS2 음성 인터랙션](./ai-voice-module/ROS2-Voice-Interaction.md)
- [시리얼 프로토콜](./ai-voice-module/Serial-Protocol.md)
- [IIC 프로토콜](./ai-voice-module/IIC-Protocol.md)
- [PC 통신](./ai-voice-module/PC-Communication.md)
- [Arduino: 시리얼 통신](./ai-voice-module/Arduino-Serial-Communication.md)
- [Arduino: IIC 통신](./ai-voice-module/Arduino-IIC-Communication.md)
- [Jetson: 시리얼 통신](./ai-voice-module/Jetson-Serial-Communication.md)
- [Jetson: IIC 통신](./ai-voice-module/Jetson-IIC-Communication.md)
- [RDK: 시리얼 통신](./ai-voice-module/RDK-Serial-Communication.md)
- [RDK: IIC 통신](./ai-voice-module/RDK-IIC-Communication.md)
- [라즈베리파이: 시리얼 통신](./ai-voice-module/RaspberryPi-Serial-Communication.md)
- [라즈베리파이: IIC 통신](./ai-voice-module/RaspberryPi-IIC-Communication.md)

### 기타 액세서리

- [0.91 OLED 스크린 튜토리얼](./0.91-oled-screen-tutorial.md)
- [4K HDMI 캡처 튜토리얼](./4k-hdmi-capture-tutorial.md)
- [KVM 스위처 튜토리얼](./kvm-switch-tutorial.md)
- [USB 사운드 카드 튜토리얼](./usb-audio-card-tutorial.md)

---

#### Feetech 서보
- [STS3215 & SCS0009 디버깅 튜토리얼](./feetech/Feetech-STS3215&SCS0009-Tutorial.md)
- [SCS 통신 프로토콜](./feetech/Feetech-SCS_Communication_Protocol.md)
- [자기 엔코더 STS 서보 - 메모리 테이블 분석](./feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis.md)
- [전위차계 SCSCL 서보 - 메모리 테이블 분석](./feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis.md)
- [SCS0009 서보 디버깅 도구 사용 튜토리얼](./feetech/SCS0009-Debug-Tool.md)

## 지원

문제가 있으면 연락해 주세요：

- 📧 이메일：support@juxitech.com
- 💬 GitHub Issues：[문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)

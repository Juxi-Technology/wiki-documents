---
title: Jetson Orin NX Super 개발 키트
description: 鉅犀科技 NVIDIA Jetson Orin NX SUPER 개발 키트 — 117/157 TOPS 엣지 AI 컴퓨팅 플랫폼, Ubuntu 22.04 및 256GB NVMe SSD 사전 설치
keywords: [jetson, orin nx, edge ai, 엣지 컴퓨팅, leRobot, 로봇]
---

# Jetson Orin NX Super 개발 키트

> **[스토어에서 구매](https://www.juxitech.com/ko/products/nvidia-jetson-orin-nx-super-developer-kit)**

## 제품 개요

NVIDIA Jetson Orin NX SUPER 개발 키트는 고급 로봇 개발자, 생성형 AI 연구자, 임베디드 시스템 엔지니어를 위한 고성능 엣지 AI 컴퓨팅 플랫폼입니다. Jetson Orin NX SUPER 모듈을 채택해 최대 **117 TOPS(8GB) / 157 TOPS(16GB)** AI 성능을 제공합니다 — 1세대 Jetson Nano의 234배 / 314배입니다.

개봉 즉시 사용 가능하며 스토리지 별도 구매나 시스템 설치가 필요 없습니다:

- **Ubuntu 22.04** 사전 설치
- **256GB NVMe PCIe 3.0 x4 SSD** 사전 구성(읽기 최대 2800MB/s)
- 2.4G/5G 듀얼 밴드 WiFi 5 + 블루투스 5.0(4dBi 고이득 안테나)
- PWM 제어 볼베어링 팬(수명 50,000시간)
- 아크릴 케이스, 카메라 마운트 홀 가공 완료

**적용 시나리오**:대규모 언어 모델 엣지 배포, 고급 컴퓨터 비전, LeRobot SO-ARM 로봇 개발.

## 제품 사양

| 카테고리 | 사양 |
|------|------|
| 코어 모듈 | NVIDIA Jetson Orin NX SUPER |
| AI 성능 | 117 TOPS(8GB)/ 157 TOPS(16GB) |
| CPU | 6코어 NVIDIA Carmel ARMv8.2 @ 2.0GHz |
| GPU | NVIDIA Ampere 아키텍처, 1792 CUDA 코어 + 56 Tensor 코어 + 2 NVDLA 엔진 |
| 메모리 | 8GB / 16GB LPDDR5(102.4 GB/s) |
| 스토리지 | 256GB NVMe PCIe 3.0 x4 SSD(읽기 최대 2800MB/s) |
| 무선 | 2.4G/5G 듀얼 밴드 WiFi 5 + 블루투스 5.0, 4dBi 고이득 듀얼 안테나 |
| 냉각 | PWM 볼베어링 팬(50,000시간) + 알루미늄 히트싱크 |
| 영상 출력 | DP 1.4, 최대 4K@60Hz (H.265) |
| 인터페이스 | 4× USB 3.2, DP 4K60Hz, 40핀 GPIO 헤더 |
| 시스템 | Ubuntu 22.04 사전 설치 |

## 하드웨어 연결

### 빠른 시작

1. 전원 어댑터(19V 40W) 연결
2. DP-HDMI 케이블로 모니터 연결
3. 키보드/마우스(USB 3.2) 연결
4. 부팅 후 사전 설치된 Ubuntu 22.04 진입

### 카메라 설치

아크릴 케이스에 카메라 마운트 홀이 가공되어 있으며, 듀얼 카메라 설치를 지원합니다(CSI / USB).

## 소프트웨어 구성

### PyTorch GPU 확인

```python
import torch
print(torch.cuda.is_available())  # True가 출력되어야 함
```

### LeRobot 설치(SO-ARM100/101 개발)

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

### 참고

- [Jetson Orin PyTorch 호환성 문제](/ko/tutorials/learning-resources/jetson-orin-pytorch-compatibility)
- [SO-ARM101 튜토리얼](/ko/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)

## 키트 변형

| 키트 유형 | 추가 구성품 | 적용 시나리오 |
|---------|---------|---------|
| **표준 키트** | 메인보드 + 아크릴 케이스 + 256GB SSD + WiFi/BT + 안테나 + 19V 40W 전원 + DP-HDMI 케이블 + Type-C 케이블 + 드라이버 | 범용 고성능 AI 개발 |
| **OLED 디스플레이 키트** | + 0.91인치 OLED 상태 디스플레이 | 시스템 리소스 실시간 모니터링 |
| **USB 오디오 키트** | + USB 사운드 카드(스피커 + 마이크, 노이즈 저감/에코 제거) | 음성 상호작용, LLM 음성 어시스턴트 |
| **IMX219 카메라 키트** | + IMX219 CSI 카메라(77° FOV, 8MP) + 알루미늄 조절식 마운트 | 네이티브 CSI 비전 |
| **자동 초점 카메라 키트** | + 86° 자동 초점 USB 카메라(1080P) + 알루미늄 조절식 마운트 | 범용 비전, 로봇 팔 |
| **SO-ARM100/101 로봇 키트** | + USB 3.0 HUB + 자동 초점 카메라 + 전용 설치 마운트 | 로봇 팔 비전 개발 |

## 버전 선택

| 버전 | AI 성능 | 추천 시나리오 |
|------|---------|---------|
| **8GB** | 117 TOPS | 고급 AI 개발, 중급 로봇 프로젝트, LLM 엣지 배포 |
| **16GB** | 157 TOPS | 고성능 임베디드 지능, 대규모 모델 엣지 추론, 복잡한 비전 작업 |

## 자주 묻는 질문

**Q: 표준 Orin NX보다 얼마나 빠른가요?**
1.7배 빠름(SUPER 버전 최적화).

**Q: 시스템을 직접 설치해야 하나요?**
아니요. Ubuntu 22.04와 256GB SSD가 사전 설치되어 있어 전원만 켜면 됩니다.

**Q: SO-ARM101을 지원하나요?**
완전 호환. 전용 로봇 비전 키트(카메라 + 마운트)가 함께 제공되며 LeRobot 생태계와 원활하게 연동됩니다.

**Q: 냉각 소음은 어떤가요?**
PWM 볼베어링 팬으로 40W 풀로드에서도 안정적인 성능과 낮은 소음. 수명 50,000시간(유압 팬보다 10배 내구).

## 지원

- 📧 이메일: support@juxitech.com
- 🌐 공식 사이트: [www.juxitech.com](https://www.juxitech.com)
- 💬 [문제 피드백](https://github.com/Juxi-Technology/wiki-documents/issues)

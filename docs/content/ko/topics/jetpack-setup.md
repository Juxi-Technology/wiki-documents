---
title: JetPack 플래싱 및 시스템 설정
description: "NVIDIA Jetson 플랫폼 JetPack 플래싱 가이드——SDK Manager와 공식 이미지 두 방식, 플래시 실패 트러블슈팅, 시스템 기본 설정"
keywords: [jetson, jetpack, 플래싱, 시스템 설정, nvidia]
---

# JetPack 플래싱 및 시스템 설정

> 📌 Jetson AGX Orin 공식 개발자 키트(JetPack 7.2)를 사용하시나요? 전용 시리즈를 참고하십시오: [빠른 시작](/ko/tutorials/jetson-agx-orin/quick-start).

> 📌 Jetson Orin Nano Super 공식 개발자 키트(JetPack 7.2.1)를 사용하시나요? 전용 시리즈를 참고하십시오: [빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start).

> NVIDIA Jetson 플랫폼을 처음 접하는 개발자용. JUXI Jetson 개발 키트는 출고 시 Ubuntu 22.04가 사전 설치되어 있습니다. 본 문서는 OS 재설치 또는 JetPack 버전 변경 시 참고용입니다.

## 1. JetPack이란?

JetPack은 NVIDIA가 Jetson 플랫폼용으로 제공하는 SDK 패키지로, 다음을 포함합니다:

- Ubuntu 시스템 이미지
- CUDA / cuDNN / TensorRT
- 멀티미디어 API(L4T)

**버전 대응**(일반):

| Jetson 보드 | 권장 JetPack | 시스템 |
|------------|-------------|------|
| Orin NX / Nano | JetPack 6.x | Ubuntu 22.04 |
| Xavier NX / AGX | JetPack 5.x | Ubuntu 20.04 |
| Orin Nano Super(NVIDIA 공식 키트) | JetPack 7.2.1 | Ubuntu 24.04 |

> JUXI [Jetson Orin NX Super 개발 키트](/ko/products/jetson-orin-nx-super-kit)는 Ubuntu 22.04(JetPack 6.x 생태계) 사전 설치.

> [NVIDIA Jetson Orin Nano Super 개발자 키트](/ko/products/jetson-orin-nano-devkit)(Juxi가 판매하는 NVIDIA 공식 키트)는 **스토리지 없이, 시스템이 사전 설치되지 않은 상태**로 출고되며 동봉된 microSD 카드도 빈 상태입니다. JetPack 7.2.1은 Jetson ISO 방식으로 설치하십시오 — [Jetson Orin Nano 시리즈 빠른 시작](/ko/tutorials/jetson-orin-nano/quick-start)을 참조하십시오.

## 2. 플래시 방법

### 방법 1: 공식 이미지(Ubuntu 부팅)

기존 Ubuntu 호스트 또는 USB 부팅 환경에 적합:

```bash
# 1. NVIDIA 공식 사이트에서 해당 보드의 드라이버 패키지(Driver Package) 다운로드
# 2. 압축 해제 후 Linux_for_Tegra 디렉터리로 이동
cd Linux_for_Tegra
sudo ./apply_binaries.sh
# 3. Jetson을 Recovery 모드로 진입(REC 버튼 누른 채 전원 인가)
# 4. 플래시
sudo ./flash.sh <board-name> mmcblk0p1
```

### 방법 2: SDK Manager(초보자 권장)

1. [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager) 설치
2. Jetson을 PC에 연결(Recovery 모드)
3. 보드 모델 → JetPack 버전 선택 → 구성요소 체크(권장: CUDA/TensorRT 전체 선택)
4. 플래시 + 최초 부팅 완료 대기

> ⚠️ 플래시 시간은 20~60분입니다. 중간에 **케이블을 뽑거나 전원을 끄지 마세요**.

## 3. 플래시 실패 트러블슈팅

| 현상 | 확인 |
|------|------|
| Recovery 모드 진입 불가 | REC 버튼 누른 채 전원 인가 확인, `lsusb`로 NVIDIA 장치 감지 확인 |
| 플래시 중간 실패 | **데이터 케이블** 교체(먼저 케이블 문제 배제); PC 절전 모드 해제; 재플래시 |
| 플래시 후 블랙 스크린 | 디스플레이 연결 확인(Orin은 DP); Recovery 모드 재진입 후 재플래시 |
| 버전 불일치 표시 | 보드 모델과 JetPack 버전 대응 확인(보드 측면 실크 프린트) |

## 4. 시스템 기본 설정

### 4.1 네트워크와 소스

```bash
# 국내 미러로 변경(옵션, apt 가속)
sudo sed -i 's|archive.ubuntu.com|mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

### 4.2 GPU 환경 확인

```bash
# JetPack/CUDA 확인
cat /etc/nv_tegra_release
nvcc --version
# PyTorch GPU 검증
python3 -c "import torch; print(torch.cuda.is_available())"
```

> PyTorch를 사용할 수 없다면 [Jetson Orin의 PyTorch 비호환 문제](/ko/tutorials/learning-resources/jetson-orin-pytorch-compatibility) 참조.

### 4.3 64G 메모리 모드 활성화(Orin)

```bash
sudo nvpmodel -m 0          # 최고 성능 모드
sudo jetson_clocks          # 주파수 상한 해제
```

### 4.4 루트 파티션 확장

JetPack 플래시 후 루트 파티션이 SD/eMMC 일부만 사용할 수 있습니다:

```bash
sudo systemctl enable --now nvresize             # 자동 확장
# 또는 수동:
sudo resize2fs /dev/nvme0n1p1                    # 실제 장치 기준
```

## 5. 자주 묻는 질문

**Q: 플래시 후 WiFi가 안 나와요?**

**A:** Orin 시리즈 코어 보드는 M.2 WiFi 모듈 외장 필요. 듀얼 밴드 안테나 연결을 확인하세요.

**Q: Recovery 모드 진입 방법?**

**A:** 전원 끄기 → REC(또는 BOOT) 버튼 누른 채 전원/Type-C 연결 → `lsusb`에서 `NVIDIA Corp.` 장치 확인 시 성공.

**Q: 필요한 저장 용량은?**

**A:** 권장 ≥128GB SSD(SD 카드는 쓰기 속도 병목). 256GB가 개발 키트 표준 구성입니다.

---

## 관련 링크

- [Jetson Orin NX Super 개발 키트](/ko/products/jetson-orin-nx-super-kit)
- [엣지 AI 배포 입문](/ko/topics/edge-ai-intro)
- [ROS 입문 튜토리얼](/ko/tutorials/ros-intro)

## 기술 지원

- 📧 이메일：support@juxitech.com
- 🌐 공식 사이트：[www.juxitech.com](https://www.juxitech.com)

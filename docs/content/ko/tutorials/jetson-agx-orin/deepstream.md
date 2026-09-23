---
title: 멀티 스트림 영상 분석 — DeepStream 9.1
sidebar_label: DeepStream 영상 분석
slug: /tutorials/deepstream
description: >-
  AGX Orin 개발자 키트에 DeepStream 9.1을 설치하고 레퍼런스 영상 분석
  애플리케이션을 실행합니다 — 공식 설치 옵션, 샘플 구성, JP7.2 관련
  참고 사항을 함께 다룹니다.
applies_to:
  product: NVIDIA Jetson AGX Orin Developer Kit (64GB)
  jetpack: "7.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-24
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-24
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-24
review_owner: cheny
---

# 멀티 스트림 영상 분석 — DeepStream 9.1

DeepStream은 가속화된 지능형 영상 분석(IVA) 파이프라인을 구축하기 위한 NVIDIA의
프레임워크이며, Jetson Orin에서는 **DeepStream 9.1이 JetPack 7.2에 포함되어
제공됩니다**. 본 튜토리얼은 NVIDIA 공식 설치 문서와 퀵 스타트 문서를 따르며,
아래의 모든 명령은 해당 페이지에서 인용한 것(또는 직접 요약한 것)입니다.

**버전 조합:** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔
TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(NVIDIA의 호환성 표
기준)*.

## 1. 설치

NVIDIA는 Jetson에서 네 가지 설치 방법을 제공하며, 공식 안내에서는 **신규
사용자에게 Docker**를 권장합니다(가장 빠르고 의존성이 없습니다):

- **방법 4 — Docker(신규 사용자 권장):** NGC DeepStream 컨테이너를 사용합니다 — [Docker Containers](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)를 참조하십시오.
- **방법 1 — SDK Manager:** "Additional SDKs"에서 **DeepStreamSDK**를 JetPack 7.2 GA 구성 요소와 함께 선택합니다.
- **방법 2 — tar 패키지:** `deepstream_sdk_v9.1.0_jetson.tbz2`를 ([NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag)에서) 다운로드한 후 다음과 같이 실행합니다:
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **방법 3 — Debian 패키지:** `deepstream-9.1_9.1.0-1_arm64.deb`를 `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb`로 설치합니다.

**필수 패키지**(네이티브 설치를 위한 공식 의존성 목록):

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **Juxi 참고:** 문서에 기록된 RTSP 문제(RTSP 스트림에서 애플리케이션이 EOS
> 상태로 멈추는 문제)가 발생하면, 위 패키지를 설치한 후
> `/opt/nvidia/deepstream/deepstream/`의 `update_rtpmanager.sh` 스크립트를 실행하십시오.

## 2. 클록 최대로 올리기(무엇이든 실행하기 전에)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

NVIDIA는 한 가지 예외를 명시합니다: **Jetson Orin Nano**는 MAXN SUPER를 위해
`-m 2`를 사용하고, 그 외 모든 Orin 모듈(AGX Orin 포함)은 `-m 0`을 사용합니다.
DeepStream 애플리케이션을 실행하기 전에 이 명령들을 실행하십시오.

## 3. 레퍼런스 애플리케이션 실행

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

예상되는 결과(NVIDIA 기준): 30개의 시뮬레이션된 1080p 스트림을 ResNet 추론으로
처리한 타일 디스플레이와 성능 지표 — **이 구성에서 약 30 FPS** — 가 터미널에
출력됩니다. 타일을 클릭하면 확대되고, 오른쪽 버튼을 클릭하면 타일 보기로
돌아갑니다.

살펴볼 만한 구성 파일(모두 해당 디렉터리에 있습니다):

| 구성 파일 | 용도 |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | 30 스트림 벤치마크 |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | 추적 + 보조 추론 |
| `source1_usb_dec_infer_resnet.txt` | **단일 USB 카메라** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | **CSI 카메라** 구성(드라이버 지원 여부는 사용하는 카메라에 따라 다릅니다) |
| `source2_1080p_dec_infer-resnet_demux.txt` | Demux 예제 |

공식 퀵 스타트 문서의 참고 사항:

- **새 모델의 첫 실행은 몇 분이 걸립니다** — TensorRT 엔진이 생성되기 때문입니다. 이후 실행에서는 생성된 엔진을 재사용합니다.
- GStreamer 요소가 초기화에 실패하면 캐시를 삭제하십시오: `rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **헤드리스 운영(모니터 없음):** 기본 EGL 싱크는 디스플레이가 필요합니다. 구성 파일에서는 대신 **RTSP 출력 싱크**를 지원합니다(30 스트림 구성의 `[sink2]` 그룹 참조) — 결과를 다른 머신으로 스트리밍합니다.
- 사전 컴파일된 모든 샘플 애플리케이션은 `/opt/nvidia/deepstream/deepstream-9.1/samples/` 아래에 있으며, 각각 README가 포함되어 있습니다.

## 4. JetPack 7.2 환경에서 DeepStream 9.1의 새로운 기능

- **에이전트 지원 파이프라인:** NVIDIA는 *DeepStream Coding Agent*(파이프라인 구축을 위한 AI 에이전트 지원)를 문서화하고 있습니다 — [문서](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent).
- **파이프라인의 LLM/VLM:** 레퍼런스 앱에는 영상 파이프라인과 대규모 모델 추론을 결합하기 위한 **deepstream-vllm-plugin**이 포함되어 있습니다 — [문서](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html)를 참조하십시오. DeepStream 외부에서 온디바이스 모델 추론을 수행하는 방법은 [로컬 LLM 추론](/ko/tutorials/jetson-agx-orin/local-llm)을 참조하십시오.
- **온디바이스 Triton:** Triton Inference Server를 네이티브로(Docker 없이) 실행하려면 samples 디렉터리에서 `sudo ./triton_backend_setup.sh`를 실행하십시오(Jetson용 Triton 2.68.0이 설치됩니다).

## 문제 해결 및 추가 자료

- [DeepStream 문제 해결 및 FAQ](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [성능 튜닝](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) — 레퍼런스 구성을 넘어설 때 필요합니다
- [샘플 구성 설명](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- 시스템 수준 문제(디스플레이, 전원, 저장 공간): [문제 해결](/ko/tutorials/jetson-agx-orin/troubleshooting)을 참조하십시오

## 출처

- [DeepStream 설치 가이드](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (2026-09-24 확인)
- [DeepStream 퀵 스타트 가이드](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (2026-09-24 확인)
- [JetPack 7.2.1 구성 요소 목록](https://developer.nvidia.com/embedded/jetpack/downloads) (2026-09-24 확인)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에
근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.

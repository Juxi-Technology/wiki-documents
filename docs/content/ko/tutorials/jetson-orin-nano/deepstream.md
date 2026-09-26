---
title: 영상 분석 파이프라인 — DeepStream 9.1
sidebar_label: DeepStream 영상 분석
slug: /tutorials/deepstream
description: >-
  Jetson Orin Nano Super 개발자 키트(8GB)에서 NVIDIA DeepStream 9.1 실행 —
  버전 조합, 설치, 디코드 제한, 메모리, 헤드리스 RTSP 출력을 다룹니다.
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetson-orin
    checked: 2026-09-26
  - source: https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/
    checked: 2026-09-26
  - source: https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html
    checked: 2026-09-26
  - source: https://docs.ultralytics.com/guides/nvidia-jetson/
    checked: 2026-09-26
review_owner: cheny
---

# 영상 분석 파이프라인 — DeepStream 9.1

DeepStream은 가속화된 지능형 영상 분석(IVA) 파이프라인을 구축하기 위한
NVIDIA의 SDK이며, DeepStream 9.1은 JetPack 7.2 기반 Jetson Orin에서 실행되는
릴리스입니다. 이 페이지는 8 GB Orin Nano Super 개발자 키트를 위한 버전 조합,
설치 경로, 디코드 제한, 첫 실행 시 예상 사항, 헤드리스 RTSP 출력, 메모리
참고 사항을 다룹니다.

## 1. 버전 조합

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT
10.16.1.7 ↔ GStreamer 1.24.2**(Docker 이미지 `deepstream:9.1`) —
[DeepStream 설치 가이드](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)의
*Platform and OS Compatibility* 표에 기재된 조합입니다.

DeepStream 8.0과 9.0은 **AGX Thor만** 기재했습니다. 9.1은 행에 Jetson Orin이
포함된 최초의 9.x 릴리스입니다("AGX Thor, Jetson Orin"). 이 행은 **"Jetson
Orin"**을 제품군으로 표기하며, 이전 행(DS 6.3 ~ DS 7.1)은 "Orin nano"를
명시적으로 기재했습니다. Orin Nano를 구체적으로 확인하는 9.1 릴리스 노트는
발견되지 않았습니다 — 지원은 그룹 라벨로 암시된 것으로 취급하십시오(아직
확인되지 않음). 기준 키트: JetPack 7.2.1 / L4T r39.2.1.

## 2. 이 키트가 디코드할 수 있는 것

[Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)
디코더는 NVDEC 하드웨어 엔진을 사용하며 **H.264, H.265, AV1, JPEG, MJPEG**를
지원합니다. 공개된 Orin Nano 모듈 사양:

| 기능 | 사양 |
|---|---|
| 비디오 디코드(H.265) | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| 비디오 인코드 | 하드웨어 인코더 없음 — "1080p30 supported by 1-2 CPU cores" |
| DLA · PVA | 없음 |

추론은
[Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)
플러그인에서 TensorRT 엔진으로 실행됩니다: FP16, FP32, INT8 모델(FP16과
INT8은 플랫폼에 따라 다름)이며, INT8에는 캘리브레이션 파일이 필요합니다.
플러그인의 `enable-dla` 옵션은 이 모듈에서 대상으로 삼을 엔진이 없습니다 —
Orin Nano 제품 페이지는 "DL Accelerator: -"와 "Vision Accelerator: -"로
기재하고 있습니다.

**8 GB에서:** 디코드된 프레임, 엔진, 애플리케이션 메모리가 하나의 풀을
공유하며, 작업을 오프로드할 DLA가 없습니다. 아래의 "30-스트림" 샘플은 1080p
스트림 30개를 디코드합니다. 이 모듈의 공개된 디코드 용량은 11x 1080p30
(H.265)이므로 더 적은 스트림 수나 더 낮은 해상도를 계획하십시오. 또한
**하드웨어 비디오 인코더가 없습니다** — 인코드된 출력(예: RTSP 스트리밍)은
CPU에서 실행됩니다.

## 3. 설치 — Docker 우선

NVIDIA 가이드에서는 이렇게 안내합니다: "Recommended for new users: use Method
4 (Docker container) for the quickest, dependency-free setup." Jetson의 네
가지 방법:

| 방법 | 설명 |
|---|---|
| 1 — SDK Manager | JetPack 7.2 GA 구성 요소와 함께 "Additional SDKs"에서 **DeepStreamSDK**를 선택합니다. |
| 2 — tar 패키지 | GitHub 릴리스 자산인 `deepstream_sdk_v9.1.0_jetson.tbz2`. |
| 3 — Debian 패키지 | `deepstream-9.1_9.1.0-1_arm64.deb`. |
| 4 — Docker(권장) | NGC(`nvcr.io`)의 Jetson 컨테이너. |

Jetson 컨테이너는 `nvcr.io/nvidia/deepstream:9.1-samples-multiarch`(레퍼런스
애플리케이션, 샘플 모델과 구성)와
`nvcr.io/nvidia/deepstream:9.1-triton-multiarch`(개발 라이브러리와 Triton
백엔드 포함)입니다. 전제 조건: `docker-ce`, NVIDIA Container Toolkit, NGC
계정, 그리고 `docker login nvcr.io`(사용자 이름 `$oauthtoken`, 비밀번호 =
NGC API 키)입니다.

> **중요**: NVIDIA는 이렇게 밝힙니다: "The Jetson Docker containers are for
> deployment only. They do not support DeepStream software development
> within a container." 애플리케이션은 키트에서 네이티브로 빌드하고
> 바이너리를 자체 이미지에 추가하십시오.

Docker에서는 대신 `user_additional_install.sh`를 실행하십시오(아래 EOS 관련
참고 참조). Triton 컨테이너의 "Failed to detect NVIDIA driver version"
메시지는 무해합니다.

> **Juxi 팁:** 최소한의 호스트 설치를 원한다면 SDK Manager에서 "Jetson OS"만
> 선택한 다음, `sudo apt install docker.io`,
> `sudo apt install nvidia-container`,
> `sudo apt install nvidia-l4t-gstreamer`,
> `sudo service docker restart`를 실행하십시오.

## 4. 클록 최대화 — 이 키트에 맞는 전원 모드로

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

퀵 스타트 문서에서 인용: "For Jetson Orin Nano modules, use sudo nvpmodel -m
2 instead of -m 0 to enable MAXN SUPER mode. For all other Jetson Orin modules
(including Orin NX), use -m 0." DeepStream 애플리케이션을 실행하기 전에 이
명령들을 실행하십시오. Super 구성으로 플래싱된 8 GB 키트에서 전원 모드는
**15W(모드 0)**, **25W(모드 1, 기본)**, **MAXN_SUPER(모드 2)**입니다.
MAXN_SUPER는 Super로 플래싱된 기기에만 존재합니다.

> **주의**: 25W / MAXN SUPER가 없거나 `nvpmodel -m 2`가 잘못된 전원 모드를
> 보고한다면, 해당 기기는 Super 구성으로 플래싱되지 않은 것입니다.
> [문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting)을 참조하십시오.

## 5. 첫 실행 — TensorRT 엔진은 처음 사용할 때 빌드됩니다

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

퀵 스타트 문서에서 인용: 기존 엔진 파일이 없는 모델의 경우 "it may take up
to a few minutes (depending on the platform and the model) for the file
generation and the application launch. For later runs, these generated engine
files can be reused for faster loading." FPS 지표가 터미널에 계속 출력됩니다.
퀵 스타트의 "(~30 FPS for this configuration)"는 문서의 일반적인 수치이며 —
**Orin Nano 측정값이 아닙니다**. 애플리케이션이 Gst 요소를 생성할 수 없다면
캐시를 지우고 다시 시도하십시오:
`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`. 다른 샘플 구성은 USB
및 CSI 카메라와 보조 추론을 사용하는 추적을 다룹니다.

## 6. RTSP 출력을 사용한 헤드리스 운영

퀵 스타트 문서는 디스플레이 없이 실행하는 방법을 설명합니다: 기본 구성은
EGL 기반 `nveglglessink` 렌더러(`[sink]` 그룹의 `type=2`)를 사용하며, 이는
실행 중인 X 서버가 필요합니다. 대신 RTSP 출력 싱크 그룹을 추가하고 —
`source30_1080p_dec_infer-resnet_tiled_display.txt`의 `[sink2]` 그룹이
예입니다 — EGL 싱크 그룹에 `enable=0`을 설정하십시오. 인코드된 RTSP 출력은
CPU에서 실행됩니다(2절: 하드웨어 인코더 없음).

> **Juxi 참고:** RTSP 스트림에서는 애플리케이션이 EOS에 도달하는 과정에서
> 멈출 수 있습니다(`rtpjitterbuffer` 문제). 베어 메탈에서는 퀵 스타트 의존성
> 패키지를 설치한 후 `/opt/nvidia/deepstream/deepstream/`의
> `update_rtpmanager.sh`를 한 번 실행하십시오. Docker에서는 대신
> `user_additional_install.sh`를 실행하십시오.

## 7. 8 GB를 위한 메모리 계획

NVIDIA의 메모리 효율 블로그는 이렇게 밝힙니다: "Jetson Orin Nano 8 GB
module, of the 8 GB physical DRAM, roughly 7.6 GB is usable after firmware and
kernel reservations." CPU와 GPU는 이 풀을 공유합니다. DeepStream 방식
파이프라인을 위한 문서화된 수단:

| 수단 | 회수할 수 있는 메모리 |
|---|---|
| 컨테이너 대신 베어 메탈로 실행 | 최대 70 MB |
| Python에서 C++ 애플리케이션으로 전환 | 최대 84 MB |
| Tiler/OSD 비활성화 후 FakeSink 사용 | 최대 258 MB |
| **합계** | **412 MB** |

Tiler/OSD를 비활성화하고 FakeSink를 사용하면 "removes display stages needed
for visualization but unnecessary in headless or production deployments. This
saves memory, reduces GPU load, and improves throughput." 위의 헤드리스 RTSP
경로와 함께 사용하십시오. 그래픽 데스크톱을 비활성화하면 최대 865 MB를
확보할 수 있습니다. 전체 8 GB 플레이북은
[8 GB에서의 메모리 효율](/ko/tutorials/jetson-orin-nano/memory-efficiency)을
참조하십시오.

## NVIDIA가 이 키트에 대해 공개하지 않는 것

Jetson용 공식 DeepStream 9.1 성능 페이지는 **Jetson AGX Thor**와 **Jetson AGX
Orin** 두 플랫폼만 다룹니다. Orin Nano FPS 수치는 공개되지 않았습니다. AGX
Orin 행을 Orin Nano 성능으로 읽지 마십시오. 규모 산정은 디코드 용량(2절)에서
시작하여 파이프라인이 들어갈 때까지 스트림 수와 해상도를 낮추십시오.

공개된 가장 근접한 데이터 포인트로,
[Ultralytics의 Jetson 벤치마크](https://docs.ultralytics.com/guides/nvidia-jetson/)는
Orin Nano Super에서 YOLO26n이 TensorRT FP16 엔진으로 ~4.57 ms/이미지
(~219 FPS), INT8로 ~3.80 ms/이미지(~263 FPS)(입력 640)라고 보고합니다 —
**벤더 데이터로, 이 키트의 7.2.1 스택이 아니라 JetPack 6.1 시대 소프트웨어에서
측정된 것**입니다. 추론 시간에는 전/후처리가 제외됩니다. 같은 출처에 따르면
PyTorch, TorchScript, TensorRT 내보내기 형식만 GPU를 사용하며, 다른 내보내기
형식은 CPU에서 실행됩니다.

## 문제 해결 및 추가 자료

- 시스템 수준 문제(전원 모드, 스토리지, 디스플레이):
  [문제 해결](/ko/tutorials/jetson-orin-nano/troubleshooting) ·
  [8 GB에서의 메모리 효율](/ko/tutorials/jetson-orin-nano/memory-efficiency).
- DeepStream 외부의 모델: [로컬 LLM 추론](/ko/tutorials/jetson-orin-nano/local-llm) ·
  공식 성능 참조:
  [DeepStream Performance](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html).

## 출처

- [DeepStream 설치 가이드](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) (2026-09-26 확인)
- [DeepStream 퀵 스타트 가이드](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html) (2026-09-26 확인)
- [DeepStream Docker 컨테이너](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html) (2026-09-26 확인)
- [DeepStream 성능](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html) (2026-09-26 확인)
- [Gst-nvvideo4linux2(하드웨어 디코더)](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html) (2026-09-26 확인)
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html) (2026-09-26 확인)
- [Jetson Orin 모듈 — 디코드, 인코드, 가속기 사양](https://developer.nvidia.com/embedded/jetson-orin) (2026-09-26 확인)
- [Maximizing memory efficiency to run bigger models on NVIDIA Jetson(개발자 블로그)](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/) (2026-09-26 확인)
- [Jetson Linux r39.2 Developer Guide — 전원 및 성능](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html) (2026-09-26 확인)
- [Ultralytics — NVIDIA Jetson 가이드(벤더 벤치마크)](https://docs.ultralytics.com/guides/nvidia-jetson/) (2026-09-26 확인)

*상태: 초안, cheny 검토 대기 중. 기재된 날짜 기준 NVIDIA 공식 문서에
근거하며, 아직 Juxi Technology가 실제 하드웨어에서 검증하지 않았습니다.*

---

NVIDIA® 및 Jetson™은 NVIDIA Corporation의 상표입니다. 이 페이지는 Juxi Technology가 게시하며 NVIDIA의 공식 발행물이 아닙니다.

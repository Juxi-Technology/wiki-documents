---
title: 視頻分析管道——DeepStream 9.1
sidebar_label: DeepStream 視頻分析
slug: /tutorials/deepstream
description: >-
  在 Jetson Orin Nano Super 開發套件（8GB）上執行 NVIDIA DeepStream 9.1——
  版本搭配、安裝、解碼限制、記憶體，以及無頭 RTSP 輸出。
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

# 視頻分析管道——DeepStream 9.1

DeepStream 是 NVIDIA 用於構建加速智能視頻分析（IVA）管線的 SDK，而 DeepStream 9.1 是在 JetPack 7.2 下於 Jetson Orin 上執行的版本。本頁涵蓋版本搭配、安裝途徑、解碼限制、首次執行的預期、無頭 RTSP 輸出，以及 8 GB Orin Nano Super 開發套件的記憶體注意事項。

## 1. 版本搭配

**DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔ TensorRT 10.16.1.7 ↔ GStreamer 1.24.2**（Docker 映像 `deepstream:9.1`），列出於 [DeepStream 安裝指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html) 的 *Platform and OS Compatibility* 表。

DeepStream 8.0 與 9.0 只列出 **AGX Thor**；9.1 是第一份資料列包含 Jetson Orin 的 9.x 版本（「AGX Thor, Jetson Orin」）——該列以 **「Jetson Orin」** 作為一個群組；更早的資料列（DS 6.3 到 DS 7.1）則明確寫出「Orin nano」。沒有找到特別確認 Orin Nano 的 9.1 發行說明——請把支援視為由群組標籤推得（尚未確認）。基準套件：JetPack 7.2.1 / L4T r39.2.1。

## 2. 本套件能解碼什麼

[Gst-nvvideo4linux2](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html) 解碼器使用 NVDEC 硬體引擎，支援 **H.264、H.265、AV1、JPEG 與 MJPEG**。已公布的 Orin Nano 模組能力：

| 能力 | 規格 |
|---|---|
| 視頻解碼（H.265） | 1x 4K60 · 2x 4K30 · 5x 1080p60 · 11x 1080p30 |
| 視頻編碼 | 無硬體編碼器——「1080p30 由 1-2 個 CPU 核心支援」 |
| DLA · PVA | 無 |

推論在 [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html) 外掛中於 TensorRT 引擎上執行：FP16、FP32 與 INT8 模型（FP16 與 INT8 依平台而定）；INT8 需要校正檔案。外掛的 `enable-dla` 選項在本模組上沒有可指定的引擎——Orin Nano 產品頁列出「DL Accelerator: -」與「Vision Accelerator: -」。

**在 8 GB 上：** 解碼後的畫格、引擎與應用程式記憶體共用同一個池，而且沒有 DLA 可以分擔工作。下方的「30 路視頻流」範例會解碼 30 路 1080p 視頻流；本模組公布的解碼能力是 11x 1080p30（H.265），所以請規劃更少的路數或更低的解析度。另外**沒有硬體視頻編碼器**——編碼輸出（例如 RTSP 串流）由 CPU 執行。

## 3. 安裝——Docker 優先

NVIDIA 的指南寫道：「推薦新使用者使用：以方法 4（Docker 容器）取得最快速、免依賴的安裝。」Jetson 上的四種方法：

| 方法 | 內容 |
|---|---|
| 1——SDK Manager | 在「Additional SDKs」中勾選 **DeepStreamSDK**，與 JetPack 7.2 GA 組件一起安裝。 |
| 2——tar 包 | `deepstream_sdk_v9.1.0_jetson.tbz2`，GitHub 發行附件。 |
| 3——Debian 包 | `deepstream-9.1_9.1.0-1_arm64.deb`。 |
| 4——Docker（推薦） | NGC（`nvcr.io`）上的 Jetson 容器。 |

Jetson 容器是 `nvcr.io/nvidia/deepstream:9.1-samples-multiarch`（參考應用、範例模型與配置）與 `nvcr.io/nvidia/deepstream:9.1-triton-multiarch`（另含 devel 函式庫與 Triton 後端）。前置條件：`docker-ce`、NVIDIA Container Toolkit、NGC 帳號，以及 `docker login nvcr.io`（使用者名稱 `$oauthtoken`，密碼 = 你的 NGC API 金鑰）。

> **重要：** NVIDIA 表示：「Jetson Docker 容器僅供部署。它們不支援在容器內進行 DeepStream 軟體開發。」請在套件上以原生方式構建應用程式，並將你的執行檔加入你自己的映像。

在 Docker 中，請改為執行 `user_additional_install.sh`（見下方的 EOS 說明）。Triton 容器的「Failed to detect NVIDIA driver version」訊息無害。

> **鉅犀提示：** 若想盡量精簡主機安裝，在 SDK Manager 中只勾選「Jetson OS」，然後執行 `sudo apt install docker.io`、`sudo apt install nvidia-container`、`sudo apt install nvidia-l4t-gstreamer` 與 `sudo service docker restart`。

## 4. 提升時鐘——使用本套件專屬的電源模式

```bash
sudo nvpmodel -m 2
sudo jetson_clocks
```

引自快速入門：「Jetson Orin Nano 模組請使用 sudo nvpmodel -m 2 而非 -m 0，以啟用 MAXN SUPER 模式。其他所有 Jetson Orin 模組（包括 Orin NX）則使用 -m 0。」請在執行 DeepStream 應用程式之前執行這些指令。在 Super 配置的 8 GB 套件上，電源模式為 **15W（模式 0）**、**25W（模式 1，預設）** 與 **MAXN_SUPER（模式 2）**；MAXN_SUPER 只存在於以 Super 配置刷機的機器上。

> **注意：** 如果找不到 25W / MAXN SUPER，或 `nvpmodel -m 2` 回報電源模式無效，表示這台機器不是以 Super 配置刷機的。見[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting)。

## 5. 首次執行——TensorRT 引擎在首次使用時構建

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

引自快速入門：對於沒有現成引擎檔案的模型，「檔案生成與應用程式啟動可能需要數分鐘（視平台與模型而定）。之後的執行可以重複使用這些生成的引擎檔案，載入更快。」FPS 指標會在終端中持續捲動。快速入門中的「（此配置約 30 FPS）」是文件的一般性數字——**不是 Orin Nano 的實測值**。如果應用程式無法建立 Gst 元件，請清除快取後重試：`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`。其他範例配置涵蓋 USB 與 CSI 攝像頭，以及搭配次級推論的追蹤。

## 6. 以 RTSP 輸出進行無頭操作

快速入門記載了無顯示器的執行方式：預設配置使用以 EGL 為基礎的 `nveglglessink` 渲染器（`[sink]` 群組中的 `type=2`），它需要執行中的 X 伺服器。請改為加入 RTSP 輸出 sink 群組——`source30_1080p_dec_infer-resnet_tiled_display.txt` 中的 `[sink2]` 群組就是範例——並把 EGL sink 群組設為 `enable=0`。編碼後的 RTSP 輸出由 CPU 執行（第 2 節：沒有硬體編碼器）。

> **鉅犀提示：** 使用 RTSP 串流時，應用程式可能卡在抵達 EOS（`rtpjitterbuffer` 問題）。在裸機上，請在安裝完快速入門的依賴套件後，於 `/opt/nvidia/deepstream/deepstream/` 目錄執行一次 `update_rtpmanager.sh`。在 Docker 中則改為執行 `user_additional_install.sh`。

## 7. 8 GB 的記憶體規劃

NVIDIA 的記憶體效率部落格指出：「Jetson Orin Nano 8 GB 模組的 8 GB 實體 DRAM，扣除固件與核心預留後約有 7.6 GB 可用。」CPU 與 GPU 共用這個池。DeepStream 式管線有文件記載的手段：

| 手段 | 可回收的記憶體 |
|---|---|
| 以裸機執行而非容器 | 最多 70 MB |
| 把應用程式從 Python 改為 C++ | 最多 84 MB |
| 停用 Tiler/OSD 並使用 FakeSink | 最多 258 MB |
| **合計** | **412 MB** |

停用 Tiler/OSD 並使用 FakeSink「移除了視覺化所需的顯示階段，而這些階段在無頭或正式部署中並不需要。這能節省記憶體、降低 GPU 負載並提升吞吐量」。這與上方的無頭 RTSP 路徑相輔相成；停用圖形桌面最多可釋出 865 MB。完整的 8 GB 攻略見[8 GB 的記憶體效率](/zh-hant/tutorials/jetson-orin-nano/memory-efficiency)。

## NVIDIA 沒有為本套件公布什麼

NVIDIA 針對 Jetson 的官方 DeepStream 9.1 性能頁只涵蓋兩個平台：**Jetson AGX Thor** 與 **Jetson AGX Orin**。沒有公布任何 Orin Nano 的 FPS 數字；不要把 AGX Orin 的資料列當成 Orin Nano 的性能。規劃規模時，請從解碼能力（第 2 節）出發，再逐步調低路數與解析度，直到管線裝得下為止。

最接近的已公布資料點：[Ultralytics 的 Jetson 基準測試](https://docs.ultralytics.com/guides/nvidia-jetson/)報告 YOLO26n 在 Orin Nano Super 上、640 輸入時，TensorRT FP16 引擎約 4.57 ms/張（約 219 FPS），INT8 約 3.80 ms/張（約 263 FPS）——**廠商資料，是在 JetPack 6.1 時代的軟體上測得，不是本套件的 7.2.1 堆疊**；推論時間不含前/後處理。同一來源指出，只有 PyTorch、TorchScript 與 TensorRT 匯出格式使用 GPU——其他匯出格式由 CPU 執行。

## 故障排除與延伸閱讀

- 系統層級問題（電源模式、儲存、顯示）：[故障排除](/zh-hant/tutorials/jetson-orin-nano/troubleshooting) · [8 GB 的記憶體效率](/zh-hant/tutorials/jetson-orin-nano/memory-efficiency)。
- DeepStream 之外的模型：[本地 LLM 推論](/zh-hant/tutorials/jetson-orin-nano/local-llm) · 官方性能參考：[DeepStream 性能](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html)。

## 資料來源

- [DeepStream 安裝指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)（查閱於 2026-09-26）
- [DeepStream 快速入門指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html)（查閱於 2026-09-26）
- [DeepStream Docker 容器](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)（查閱於 2026-09-26）
- [DeepStream 性能](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html)（查閱於 2026-09-26）
- [Gst-nvvideo4linux2（硬體解碼器）](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvvideo4linux2.html)（查閱於 2026-09-26）
- [Gst-nvinfer](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_plugin_gst-nvinfer.html)（查閱於 2026-09-26）
- [Jetson Orin 模組——解碼、編碼與加速器規格](https://developer.nvidia.com/embedded/jetson-orin)（查閱於 2026-09-26）
- [在 NVIDIA Jetson 上最大化記憶體效率以執行更大的模型（開發者部落格）](https://developer.nvidia.com/blog/maximizing-memory-efficiency-to-run-bigger-models-on-nvidia-jetson/)（查閱於 2026-09-26）
- [Jetson Linux r39.2 開發者指南——電源與性能](https://docs.nvidia.com/jetson/archives/r39.2/DeveloperGuide/SD/PlatformPowerAndPerformance/JetsonOrinNanoSeriesJetsonOrinNxSeriesAndJetsonAgxOrinSeries.html)（查閱於 2026-09-26）
- [Ultralytics——NVIDIA Jetson 指南（廠商基準測試）](https://docs.ultralytics.com/guides/nvidia-jetson/)（查閱於 2026-09-26）

*狀態：已於 2026-10-11 審核。內容以所列日期的 NVIDIA 官方文件為依據；尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。

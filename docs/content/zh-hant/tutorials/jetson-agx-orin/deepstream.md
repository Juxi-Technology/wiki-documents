---
title: 多路視頻分析——DeepStream 9.1
sidebar_label: DeepStream 視頻分析
slug: /tutorials/deepstream
description: >-
  在 AGX Orin 開發者套件上安裝 DeepStream 9.1 並執行參考視頻分析應用——涵蓋官方安裝選項、示例配置以及 JP7.2 專屬注意事項。
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
    note: its component table lags on some rows (VPI/PVA still show 7.2 values) — see the Sources caveat
review_owner: cheny
---

# 多路視頻分析——DeepStream 9.1

DeepStream 是 NVIDIA 用於構建加速智能視頻分析（IVA）管道的框架，並且
**DeepStream 9.1 隨 JetPack 7.2 一同發布**，適用於 Jetson Orin。本教程遵循
NVIDIA 官方的安裝與快速入門文檔；下文每一條命令均取自（或直接總結自）這些
官方頁面。

**版本搭配：** DeepStream 9.1 ↔ JetPack 7.2 GA ↔ L4T 39.2 ↔ CUDA 13.2 ↔
TensorRT 10.16.1.7 ↔ Ubuntu 24.04 ↔ GStreamer 1.24.2 *(依據 NVIDIA 官方兼容性
對照表)*。

## 1. 安裝

NVIDIA 在 Jetson 上提供四種安裝方式；官方說明推薦**新用戶使用 Docker**
（速度最快、免裝依賴）：

- **方式 4——Docker（推薦新用戶）：** 使用 NGC DeepStream 容器——參見 [Docker 容器](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_docker_containers.html)。
- **方式 1——SDK Manager：** 在「Additional SDKs」中勾選 **DeepStreamSDK**，與 JetPack 7.2 GA 組件一起安裝。
- **方式 2——tar 包：** 下載 `deepstream_sdk_v9.1.0_jetson.tbz2`（來自 [NVIDIA/DeepStream releases](https://github.com/DeepStream/releases/tag)），然後：
  ```bash
  sudo tar -xvf deepstream_sdk_v9.1.0_jetson.tbz2 -C /
  cd /opt/nvidia/deepstream/deepstream-9.1
  sudo ./install.sh
  sudo ldconfig
  ```
- **方式 3——Debian 包：** 用 `sudo apt-get install ./deepstream-9.1_9.1.0-1_arm64.deb` 安裝 `deepstream-9.1_9.1.0-1_arm64.deb`。

**前置依賴套件**（原生安裝的官方依賴清單）：

```bash
sudo apt install \
libssl3 libssl-dev libcurl4-openssl-dev \
libgstreamer1.0-0 gstreamer1.0-tools gstreamer1.0-plugins-good \
gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav \
libgstreamer-plugins-base1.0-dev libgstrtspserver-1.0-0 \
libjansson4 libyaml-cpp-dev libmosquitto1
```

> **鉅犀提示：** 如果你遇到官方文檔記載的 RTSP 問題（應用處理 RTSP 串流時卡在
> EOS），請在裝完上述依賴套件後，執行 `/opt/nvidia/deepstream/deepstream/`
> 目錄下的 `update_rtpmanager.sh` 腳本。

## 2. 提升時鐘頻率（執行任何程式之前）

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

NVIDIA 特別註明一個例外：**Jetson Orin Nano** 的 MAXN SUPER 模式要用 `-m 2`；
其他所有 Orin 模組（包括 AGX Orin）都用 `-m 0`。請在執行 DeepStream 應用之前
執行上述命令。

## 3. 執行參考應用

```bash
cd /opt/nvidia/deepstream/deepstream-9.1/samples/configs/deepstream-app
deepstream-app -c source30_1080p_dec_infer-resnet_tiled_display.txt
```

預期效果（據 NVIDIA 說明）：30 路模擬 1080p 視頻流經 ResNet 推論後的平鋪顯示
畫面，以及列印在終端中的性能指標——**此配置下約 30 FPS**。點擊任一畫面格即可
放大檢視；按右鍵可返回平鋪畫面。

值得探索的配置文件（均位於該目錄）：

| 配置 | 用途 |
|---|---|
| `source30_1080p_dec_infer-resnet_tiled_display.txt` | 30 路視頻流基準測試 |
| `source4_1080p_dec_infer-resnet_tracker_sgie_tiled_display.txt` | 追蹤 + 次級推論 |
| `source1_usb_dec_infer_resnet.txt` | **單路 USB 攝像頭** |
| `source1_csi_dec_infer_resnet.txt` · `source2_csi_usb_dec_infer_resnet.txt` | **CSI 攝像頭**方案（驅動支援取決於你的攝像頭） |
| `source2_1080p_dec_infer-resnet_demux.txt` | Demux 示例 |

官方快速入門中的注意事項：

- **新模型首次執行需要數分鐘**，期間會生成 TensorRT 引擎；之後的執行會直接複用它。
- 如果 GStreamer 元件（element）初始化失敗，請清除緩存：`rm ${HOME}/.cache/gstreamer-1.0/registry.aarch64.bin`
- **無顯示器執行（無頭模式）：** 預設的 EGL sink 需要接顯示器。配置文件支援改用 **RTSP 輸出 sink**（見 30 路視頻流配置中的 `[sink2]` 組）——把結果串流到另一台機器。
- 所有預編譯的示例應用都位於 `/opt/nvidia/deepstream/deepstream-9.1/samples/` 下——每個都附帶 README。

## 4. JetPack 7.2 上 DeepStream 9.1 的新變化

- **代理輔助構建管道：** NVIDIA 文檔介紹了 *DeepStream Coding Agent*（用 AI 代理輔助構建管道）——[文檔](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_AI_Agent.html) · [GitHub](https://github.com/DeepStream_Coding_Agent)。
- **管道中的 LLM/VLM：** 參考應用包含 **deepstream-vllm-plugin**，可將視頻管道與大模型推論結合——參見[官方文檔](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_ref_app_vllm_plugin.html)。如需在 DeepStream 之外進行本地模型推論，請參見 [本地 LLM 推論](/zh-hant/tutorials/jetson-agx-orin/local-llm)。
- **裝置上執行 Triton：** 如需以原生方式（不用 Docker）執行 Triton Inference Server，請在 samples 目錄下執行 `sudo ./triton_backend_setup.sh`（會為 Jetson 安裝 Triton 2.68.0）。

## 故障排除與延伸閱讀

- [DeepStream 故障排除與常見問題](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_troubleshooting.html)
- [性能調優](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Performance.html)——當你超出參考配置的範圍後就需要用到它
- [示例配置詳解](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_sample_configs_streams.html)
- 系統層面的問題（顯示、供電、儲存）：請參見[故障排除](/zh-hant/tutorials/jetson-agx-orin/troubleshooting)

## 資料來源

- [DeepStream 安裝指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Installation.html)（查閱於 2026-09-24）
- [DeepStream 快速入門指南](https://docs.nvidia.com/metropolis/deepstream/dev-guide/text/DS_Quickstart.html)（查閱於 2026-09-24）
- [JetPack 7.2.1 下載頁](https://developer.nvidia.com/embedded/jetpack/downloads)（查閱於 2026-09-24）——⚠️ 其組件表部分行滯後；實際安裝的版本請參見[下載](/zh-hant/tutorials/jetson-agx-orin/downloads)

*狀態：已於 2026-10-11 審核。內容依據為截至所列日期的 NVIDIA 官方文檔；尚未由
鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非
NVIDIA 官方出版物。

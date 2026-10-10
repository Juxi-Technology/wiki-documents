---
title: JetPack 7.2 上的機器人開發——Orin Nano 上哪些能用
sidebar_label: 機器人（現狀）
slug: /tutorials/robotics
description: >-
  Jetson Orin Nano Super 開發套件（8GB）在 JetPack 7.2.1 下進行機器人開發的
  如實現狀說明——涵蓋 ROS 2、Isaac ROS、Isaac Sim、LeRobot 風格技術棧，以及現階段不該納入規劃的部分。
applies_to:
  product: NVIDIA Jetson Orin Nano Super Developer Kit (8GB)
  jetpack: "7.2.1"
  l4t: "r39.2.1"
status: draft
hardware_verified: false
verified_against:
  - source: https://nvidia-isaac-ros.github.io/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/releases/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/performance/index.html
    checked: 2026-09-26
  - source: https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html
    checked: 2026-09-26
  - source: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html
    checked: 2026-09-26
  - source: https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html
    checked: 2026-09-26
  - source: https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml
    checked: 2026-09-26
  - source: https://packages.ubuntu.com/noble/python3
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md
    checked: 2026-09-26
  - source: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md
    checked: 2026-09-26
  - source: https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx
    checked: 2026-09-26
  - source: https://www.nvidia.com/en-us/ai/build-a-claw/
    checked: 2026-09-26
  - source: https://developer.nvidia.com/embedded/jetpack/downloads
    checked: 2026-09-26
review_owner: cheny
---

# JetPack 7.2 上的機器人開發——Orin Nano 上哪些能用

JetPack 7.2 把本套件帶到了新一代平台：Ubuntu 24.04、CUDA 13，以及塑造每一個 AI 工作負載的 8 GB 記憶體上限。機器人生態仍在追趕這個轉變。有些環節現在就能用。有些不能。有些還無法從任何官方頁面驗證。

本頁是現狀說明，不是教學。這裡的一切都只經過文件查證——鉅犀尚未在硬體上測試這些技術棧。閱讀任何機器人頁面時請留意日期：這個生態的多個部分在 2026 年 8 月與 9 月發生了變化。在下圖中，右側的大區塊在你的套件上執行；Isaac Sim 與 Isaac Lab 位於左側的 Omniverse 區塊，那是另一台主機。

![NVIDIA Jetson 軟體堆疊，左側為 DGX 與 Omniverse 主機](/images/jetson-orin-nano/robotics-diagram-jetpack7.2.png)

## 狀態表（2026-09-26 查核）

| 你需要什麼 | 在 JetPack 7.2.1 / Orin Nano（8GB）上的狀態 | 備註 |
|---|---|---|
| **ROS 2（核心）** | ✅ 可用 | JetPack 不會安裝也不要求任何 ROS 發行版。ROS 2 **Jazzy** 有官方的 Ubuntu 24.04 arm64 套件。一份 NVIDIA 員工的論壇回答（2026-09-07）稱 Jazzy 是「JetPack 7.2.1 推薦的 ROS 發行版」。論壇回答不是官方文件。安裝步驟見下文。 |
| **Isaac ROS**（硬體加速的 ROS 2） | ⚠️ 2026 年 8 月已發布——但有實質缺口 | Isaac ROS 4.6.0 發行說明：「新增對 Jetson Orin 的支援」與「新增對 JetPack 7.2 的支援」。Orin Nano Super 8GB 出現在 NVIDIA 的官方基準表中。但實作指南沒有 Orin Nano 章節、支援表期望配備 NVMe SSD，而且 NVIDIA 的 JetPack 頁面仍寫著「Coming soon」。詳見下文。 |
| **Isaac Sim / Isaac Lab**（模擬） | ⛔ 無法在本套件上執行 | 需要搭載 RTX GPU 的 x86_64 主機（最低 GeForce RTX 4080、16 GB VRAM、32 GB RAM）。不支援沒有 RT 核心的 GPU。aarch64 構建只適用於 DGX Spark。在模擬工作流程中，模擬器在 x86_64 機器上執行，而不是在 Jetson 上。 |
| **GR00T（人形基礎模型）** | ⛔ 不在本套件上 | GR00T 1.7 的後訓練需要至少 48 GB VRAM 的 GPU。NVIDIA 的參考工作流程使用 Jetson AGX Thor 作為實體機器人的邊緣電腦。同一套工作流程會把示範資料轉成 LeRobot 格式——軟體方向吻合，但算力不在這裡。 |
| **LeRobot 風格的 Python 技術棧**（SO-ARM101、LeKiwi、視覺套件） | ⚠️ 需要驗證 | Python 版本門檻已滿足（Ubuntu 24.04 內建 Python 3.12.3；LeRobot 需要 3.12 或更新版本）。但上游沒有官方的 JetPack 7.2 路徑，而有文件記載的 Jetson 途徑是由社群維護、針對 JetPack 6.2。投入之前請先測試你的確切技術棧。 |
| **DeepStream** | — 本次審查未驗證 | 另有專頁——見 [DeepStream 視頻分析](/zh-hant/tutorials/jetson-orin-nano/deepstream)。本次機器人審查沒有重新查核 DeepStream 支援矩陣。 |
| **TensorRT Edge-LLM** | — 本次審查未驗證 | 另有專頁——見[本地 LLM 推論](/zh-hant/tutorials/jetson-orin-nano/local-llm)。與機器人的關聯主要在 VLA 類模型。 |
| **NemoClaw（智能體技術棧）** | ⚠️ 可用，屬事實上的支援 | 安裝程式會自動偵測 Jetson（Orin 與 Thor），NVIDIA 網站也以「Install OpenClaw on Your NVIDIA Jetson Orin Nano™」宣傳。但官方平台矩陣沒有 Jetson 資料列，且該專案處於 alpha／「Early preview」階段。官方陳述的最低 RAM 是 8 GB（建議 16 GB），並有文件記載的記憶體不足風險。見[智能體 AI](/zh-hant/tutorials/jetson-orin-nano/agentic-ai)。 |

## JetPack 7.2 上的 Isaac ROS——官方頁面目前的說法

**NVIDIA 的頁面彼此矛盾。** JetPack 7.2.1 下載頁仍列出「NVIDIA Isaac™ ROS — Coming soon」。Isaac ROS 專案頁面則說支援已經發布。就 Isaac ROS 本身而言，專案頁面是更具體、也更新的來源：

- **Isaac ROS 4.6.0（2026-08-18）**——發行說明：「新增對 Jetson Orin 的支援」與「新增對 JetPack 7.2 的支援」。這是第一個具備該組合的 4.x 版本。
- **支援平台：**「本表定義的平台是 Isaac ROS 測試並正式支援的唯一硬體與軟體組合。」Jetson 資料列：「Jetson Thor (T5000 and T4000) and Jetson Orin」、JetPack 7.2、儲存「128+ GB NVMe SSD」。表中寫的是「Jetson Orin」（系列），而不是「Orin Nano」。
- **基準測試：** 性能表有專門的「Orin Nano Super 8GB」欄位，且是實際數據——例如 AprilTag Node 在 720p 下 104 fps，Mobile SAM graph 在 720p 下 4.80 fps。這些是 NVIDIA 為此裝置公布的數字，不是鉅犀的實測。較重的工作負載顯示為破折號（「–」）：FoundationPose、Grounding DINO 與完整 SAM 並未列為可執行。
- **Isaac ROS 5.0.0（2026-09-21）** 轉向 ROS 2 Lyrical Luth。公開的 ROS 2 apt 倉庫不提供 Ubuntu 24.04 的 ROS 2 Lyrical 套件；NVIDIA 在自己的 Isaac ROS Buildfarm CDN 上發布它們。Isaac ROS 4.6 仍留在 ROS 2 Jazzy。若要走主流的 Jazzy 技術棧，請選 4.6。

**投入之前必須知道的缺口：**

- **沒有 Orin Nano 的設定章節。** Jetson 實作指南只涵蓋 Jetson AGX Thor 與 Jetson AGX Orin；唯一與 Orin Nano 相關的連結是電源設定指南。
- **預期你要有 NVMe SSD。** 儲存欄寫著「128+ GB NVMe SSD」。本套件出貨時完全沒有附儲存裝置，因此只靠 microSD 的配置超出官方陳述的預期（見[快速開始](/zh-hant/tutorials/jetson-orin-nano/quick-start)）。
- **版本落差。** 4.6 的設定頁要求你從 `cat /etc/nv_tegra_release` 確認「R39 (release), REVISION: 2.0」（L4T r39.2.0）；本套件出貨為 JetPack 7.2.1 = L4T r39.2.1。遷移正式生產的機器人之前，請先在 Docker 中驗證。
- **攝像頭與 OpenCV。** Intel RealSense 攝像頭「僅支援 Docker 模式。不支援虛擬環境與裸機模式」。JetPack 7.2 另會安裝 OpenCV 4.8.0，而 Isaac ROS 是以 4.6.0 測試——修正方式在下方的安裝步驟中。
- **5.0 的一項退步。** 在 Isaac ROS 5.0 中，DNN 影像編碼器的吞吐量可能低於 4.6。如果那個節點對你很重要，請考慮 4.6。

> **重要：** 如果 Isaac ROS 在你的關鍵路徑上，請權衡時機。JetPack 7.2 上的支援是真的，但很新（2026 年 8 月），且 Orin Nano 的文件很薄。本套件在 JetPack 6.2 時代（Isaac ROS 3.2 Update 1，2025 年 1 月）就已經是受支援的 Isaac ROS 目標。需要最成熟組合、又承受不了首發版動盪的團隊，有充分理由留在 JetPack 6.2 時代的配置。其他人：搬到 7.2.1，但投入之前先在本套件的 Docker 中驗證你的確切管線。

## 模擬與訓練——另一台機器

Isaac Sim 6.0 無法在本套件上執行。Linux x86_64 路徑公布的門檻：GeForce RTX 4080、16 GB VRAM、32 GB RAM、50 GB SSD。「不支援沒有 RT 核心的 GPU（A100、H100）。」aarch64 構建「目前僅支援 DGX Spark 系統」。在 Isaac ROS 的模擬工作流程中，「Isaac Sim 在提供感測器資料與世界資訊的 x86_64 機器上執行」——Jetson 是部署目標。

在機器人學習的重負載端，分工也一樣：GR00T 1.7 的後訓練需要至少 48 GB VRAM，而 NVIDIA 的參考工作流程使用 Jetson AGX Thor 作為實體機器人的邊緣電腦。原則：在 PC 上模擬與訓練，在套件上部署與執行推論。如果你考慮 Orin Nano 的原因是 Isaac Sim，那它不適合這份工作。

## LeRobot 與 Python 機器人技術棧——相容性問題

1. **Python 版本問題有明確答案：3.12 沒問題。** Ubuntu 24.04 的系統 Python 是 3.12.3，而 LeRobot（0.6.2）需要 Python 3.12 或更新版本。這次升級不會在 Python 版本上擋住 LeRobot。
2. **但上游沒有 JetPack 7.2 路徑。** LeRobot 的官方安裝頁指出，在 Jetson 上預設沒有 GPU 加速的視頻解碼（該函式庫會退回 pyav）、aarch64 的 torchcodec wheel 需要 PyTorch 2.11 或更新版本，而且它的 Jetson Docker 構建以 **JetPack 6.2** 為目標、由社群維護。沒有任何官方聲明表示目前的 LeRobot 已為 JetPack 7.2 的 CUDA 13 備妥 aarch64 CUDA wheel。
3. **所以結論是「需要驗證」——不是「支援」，也不是「壞掉」。** 在本套件上圍繞 LeRobot 做設計之前，請先測試你的確切技術棧：安裝它、跑一個小策略，並確認推論用到 GPU。

> **鉅犀提示：** 我們的機器人套件（SO-ARM101、LeKiwi、視覺套件）都以 LeRobot 為基礎。在 JetPack 7.2.1 下的本套件上，上游與鉅犀都還沒有已測試的路徑。JetPack 6.2 是社群維護途徑的參考平台。把專案時程押在本套件的 LeRobot 上之前，請先與鉅犀支援確認（見[下載](/zh-hant/tutorials/jetson-orin-nano/downloads)）。

## 目前就能跑什麼

### ROS 2 Jazzy——基礎

JetPack 不含 ROS。可行的途徑是官方 ROS 2 Jazzy 的 Ubuntu 24.04（arm64）deb 安裝，整理自 ROS 2 文件：

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
sudo apt install ros-jazzy-ros-base    # or: ros-jazzy-desktop
source /opt/ros/jazzy/setup.bash
```

### Isaac ROS 4.6——當你需要加速感知時

從 NVIDIA 的 apt 倉庫安裝（官方頁面列出確切的 keyring 指令）：倉庫 `https://isaac.download.nvidia.com/isaac-ros/release-4.6`、頻道 `noble-jetpack`；中國鏡像 `isaac.download.nvidia.cn`。然後：

```bash
sudo apt-get install isaac-ros-cli
mkdir -p ~/workspaces/isaac_ros-dev/src
echo 'export ISAAC_ROS_WS="${ISAAC_ROS_WS:-${HOME}/workspaces/isaac_ros-dev/}"' >> ~/.bashrc
```

先移除一次預裝的 OpenCV 4.8.0（見上方的缺口清單）；Isaac ROS 之後會自動安裝它鎖定的 OpenCV 4.6.0：

```bash
sudo apt-get remove -y libopencv* opencv*
```

NVIDIA 建議使用 Docker：「對多數使用者而言，Docker 是推薦選項。它提供與主機系統最高程度的隔離。」這也符合 RealSense 攝像頭的要求（僅限 Docker）。

### NemoClaw 與智能體技術棧

安裝程式會自動偵測 NVIDIA Jetson 裝置（Orin 與 Thor），並套用 JetPack 專屬的主機配置。兩個但書：該專案處於 alpha（「Early preview」），且其官方平台矩陣沒有 Jetson 資料列，所以支援屬於事實上的、而非官方聲明。官方陳述的最低 RAM 是 8 GB（建議 16 GB），約 2.4 GB 的沙箱映像有文件記載的記憶體不足風險。見[智能體 AI](/zh-hant/tutorials/jetson-orin-nano/agentic-ai)。

## 建議

- **只用 ROS 2：** 現在就以 JetPack 7.2.1 + ROS 2 Jazzy 來建置。這可行。
- **Isaac ROS 是你的關鍵：** 自 2026 年 8 月起受支援，但很新，且 Orin Nano 文件很薄。請在 Docker 中驗證；規劃 NVMe。如果你需要最成熟的組合，留在 JetPack 6.2 時代的配置依然站得住腳——重建成本（無論走哪條路）見[遷移指南](/zh-hant/tutorials/jetson-orin-nano/jetpack-6-to-7)。
- **需要模擬或訓練：** 請另外編列一台 RTX PC（Isaac Sim），以及一台 Thor 等級裝置處理 GR00T 級的工作。本套件兩者都做不了。
- **以 LeRobot 為基礎：** 需要驗證。請先測試；有文件記載的途徑以 JetPack 6.2 為參考。
- **不要為了以下用途買本套件：** Isaac Sim、GR00T 後訓練，或即時執行完整 SAM / Grounding DINO / FoundationPose 級的工作負載——後三者在 NVIDIA 針對此裝置的基準表中並未列為可執行。

## 仍未明朗

- **micro-ROS：** 找不到官方針對 Jetson 的頁面（兩個官方 micro.ros.org 網址目前回傳 404）。請把這個組合視為未經驗證。
- **Isaac ROS 5.0 之後的 ROS 發行版：** 推薦 Jazzy 的論壇回答早於 5.0（2026-09-21）；找不到 5.0 之後的聲明。
- **JetPack 7.2 上的 LeRobot：** 沒有官方聲明；投入之前請先確認 CUDA 13 的 PyTorch aarch64 wheel 供應情況。
- **只用 microSD 的配置搭配 Isaac ROS：** 支援表寫的是 NVMe，但沒有針對 Orin Nano 另行重申。
- **「Jetson Orin」與「Orin Nano」之別：** 平台表用的是系列名稱；「Orin Nano Super 8GB」只出現在基準表。NVIDIA 是否把兩者視為不同的支援聲明，尚未釐清。
- **DeepStream 與 TensorRT Edge-LLM：** 本次機器人審查未重新驗證——見各自的專頁。

## 資料來源

- [Isaac ROS——Getting Started](https://nvidia-isaac-ros.github.io/getting_started/index.html)（支援平台、Docker、ROS 2 Lyrical；查閱於 2026-09-26）
- [Isaac ROS 4.6——Getting Started](https://nvidia-isaac-ros.github.io/v/release-4.6/getting_started/index.html)（Jazzy 搭配、apt 安裝、OpenCV 注意事項；查閱於 2026-09-26）
- [Isaac ROS 5.0——Getting Started](https://nvidia-isaac-ros.github.io/v/release-5.0/getting_started/index.html)（x86_64 上的 Isaac Sim；查閱於 2026-09-26）
- [Isaac ROS——發行說明](https://nvidia-isaac-ros.github.io/releases/index.html)（4.6.0 與 5.0.0 說明；RealSense 與 DNN 編碼器限制；查閱於 2026-09-26）
- [Isaac ROS——性能](https://nvidia-isaac-ros.github.io/performance/index.html)（Orin Nano Super 8GB 基準欄位；查閱於 2026-09-26）
- [Isaac ROS Buildfarm CDN](https://nvidia-isaac-ros.github.io/getting_started/isaac_ros_buildfarm_cdn.html)（Ubuntu 24.04 的 ROS 2 Lyrical 套件；查閱於 2026-09-26）
- [Isaac Sim 6.0 安裝需求](https://docs.isaacsim.omniverse.nvidia.com/6.0.0/installation/requirements.html)（查閱於 2026-09-26）
- [GR00T 端到端工作流程——前置條件](https://docs.nvidia.com/learning/physical-ai/gr00t-e2e-workflow/latest/getting-started/prerequisites.html)（查閱於 2026-09-26）
- [NVIDIA 開發者論壇——「Is ROS2 Jazzy the correct version...」（員工回答；論壇，非官方文件）](https://forums.developer.nvidia.com/t/is-ros2-jazzy-the-correct-version-to-use-with-jetpack-7-2-1-ubuntu-24-04/382439)（查閱於 2026-09-26）
- [ROS 2 Jazzy 安裝——deb 套件（上游）](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/Ubuntu-Install-Debs.rst)（查閱於 2026-09-26）
- [ROS 2 Jazzy 安裝——apt 倉庫（上游）](https://raw.githubusercontent.com/ros2/ros2_documentation/jazzy/source/Installation/_Apt-Repositories.rst)（查閱於 2026-09-26）
- [LeRobot 安裝指南（上游）](https://raw.githubusercontent.com/huggingface/lerobot/main/docs/source/installation.mdx)（查閱於 2026-09-26）
- [LeRobot pyproject.toml（上游）](https://raw.githubusercontent.com/huggingface/lerobot/main/pyproject.toml)（Python 與 torchcodec 版本鎖定；查閱於 2026-09-26）
- [Ubuntu Noble——python3 套件](https://packages.ubuntu.com/noble/python3)（Python 3.12.3；查閱於 2026-09-26）
- [NemoClaw——前置條件](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/get-started/prerequisites.md)（查閱於 2026-09-26）
- [NemoClaw——平台支援矩陣](https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/platform-support.md)（alpha 階段；沒有 Jetson 資料列；查閱於 2026-09-26）
- [NemoClaw——安裝程式故障排除（Jetson 自動偵測）](https://raw.githubusercontent.com/NVIDIA/NemoClaw/main/docs/reference/troubleshooting.mdx)（查閱於 2026-09-26）
- [NVIDIA——Build a Claw（「Install OpenClaw on Your NVIDIA Jetson Orin Nano™」）](https://www.nvidia.com/en-us/ai/build-a-claw/)（查閱於 2026-09-26）
- [JetPack 7.2.1 下載頁（元件矩陣將 Isaac ROS 列為「Coming soon」）](https://developer.nvidia.com/embedded/jetpack/downloads)（查閱於 2026-09-26）

*狀態：已於 2026-10-11 審核。生態可用性變化很快——在依賴本表之前，請重新查核文中連結的 NVIDIA 與上游頁面。尚未由鉅犀科技在實體硬體上驗證。*

---

NVIDIA® 與 Jetson™ 是 NVIDIA Corporation 的商標。本頁面由鉅犀科技發布，並非 NVIDIA 官方出版物。

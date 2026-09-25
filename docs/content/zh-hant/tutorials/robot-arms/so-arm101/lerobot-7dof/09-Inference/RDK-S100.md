---
title: "地瓜機器人 RDK S100推理"
description: "在地瓜機器人 RDK S100 上部署 7-DOF SO-ARM101 的 ACT 推理：依原廠工具鏈完成 ONNX 導出、量化編譯與板端運行。"
---

# 地瓜機器人 RDK S100推理

具體實現流程可以參考這個鏈接[LeRobot ACT Policy 全流程文檔](https://horizonrobotics.feishu.cn/docx/HSr8dBdZ0oQ5OwxPQvBcsuyZnWe)



## 在 RDK S100/S100P 上進行 ACT 模型端到端部署

本節將帶你完成 ACT 模型在地瓜機器人 RDK S100 系列硬件的完整部署閉環。整個過程分為三個核心階段：**模型導出**、**量化編譯** 和 **板端運行**。

**前置說明：**

- **開發機 \(Host\)：**用於執行步驟 1 和步驟 2，通常為你的模型訓練機（需具備較好性能並安裝 Docker）。

- **板端 \(Edge\)：**地瓜機器人 RDK S100/S100P，用於執行步驟 3。

- **工具鏈：**本文依賴 `rdk_LeRobot_tools` 倉庫，詳情可參考 [GitHub 倉庫地址](https://github.com/D-Robotics/rdk_LeRobot_tools)。

**版本兼容性重要提示 \(必讀\)：** 當前版本的 `rdk_LeRobot_tools` ONNX 導出流程完美兼容 **LeRobot datasets v2\.1** 版本。由於最新的 v3\.0 版本存在數據結構修改，**強烈建議**在進行本章節操作前，將原始的 `lerobot` 主倉庫切換至兼容 v2\.1 的特定 commit，以確保導出流程順暢。 

*推薦使用的 Commit ID：* `8cfab3882480bdde38e42d93a9752de5ed42cae2`



### 階段一：模型 ONNX 格式導出 💻 \(在開發機進行\)

首先，我們需要將** PyTorch 訓練好的 **模型導出為中間格式（ONNX）。



#### **1\. 拉取工具鏈倉庫** 

進入你的 `lerobot` 工作目錄，克隆 RDK 專屬工具鏈：

```Bash
cd lerobot

# 1. 切換到兼容 v2.1 datasets 的穩定版本
git checkout 8cfab3882480bdde38e42d93a9752de5ed42cae2

# 2. 拉取地瓜機器人 RDK 專屬工具鏈
git clone https://github.com/D-Robotics/rdk_LeRobot_tools.git
```



#### **2\. 配置導出參數** 

編輯 `rdk_LeRobot_tools/bpu_export_config.yaml` 文件，根據你的實際路徑修改配置：

```YAML
dataset:
  root: "data/so101_pick_place" # 你的數據集絕對或相對地址
act_path: "outputs/train/act_so101/checkpoints/050000/pretrained_model" # 原始 PyTorch 模型權重地址
type: "nash-e" # 目標硬件架構，RDK S100 對應 nash-e / S100P 對應 nash-m
```



#### 3\. 執行導出腳本

```Bash
# 導出 ONNX (開發機)
python export_bpu_actpolicy.py --config bpu_export_config.yaml
```

✅ **成功標誌**：當前目錄下生成 `bpu_export_output` 文件夾，內部包含後續所需的 `build_all.sh` 腳本和量化校準數據。



### 階段二：編譯 BPU 模型 🐳 \(在開發機 Docker 環境進行\)

地瓜機器人的 BPU 模型量化與編譯需要依賴 OpenExplorer \(OE\) 環境。我們推薦使用 Docker 來隔離環境。



#### **1\.** **準備 Docker 環境與鏡像** 

確保開發機已安裝 Docker（[官方安裝指南](https://docs.docker.com/engine/install/)）。下載推薦的 CPU 鏡像並加載：

```Bash
# 加載下載好的離線鏡像壓縮包
sudo docker load -i ai_toolchain_ubuntu_22_s100_xxx.tar
```



#### **2\. 啟動編譯容器**

**避坑指南**：編譯模型需要較大的共享內存。請務必添加 `--shm-size=15g` 參數，否則極易引發 IPC 內存報錯。

將開發機的工作目錄（包含剛才導出的文件夾）掛載到容器內：

```Bash
sudo docker run -it --rm \
  --network host \
  --shm-size=15g \
  -v "$(pwd)":/workspace \
  --workdir /workspace \
  <docker-image-name> /bin/bash
```

\(注：請將 `<docker-image-name>` 替換為你通過 `sudo docker images` 查看到的實際鏡像名。\)



#### **3\.** **容器內執行編譯** 

進入容器內部後，執行一鍵編譯腳本：

```Bash
cd /workspace/bpu_export_output
bash build_all.sh
```



#### **4\.** **檢查編譯產物** 

編譯完成後，會在 `bpu_export_output` 下生成 `bpu_output/` 文件夾。這裏面包含了 RDK 板端運行所需的全部核心文件： 

- 點擊查看 `bpu_output/` 目錄結構

    - `BPU_ACTPolicy_TransformerLayers.hbm` \(量化後的模型文件\)

    - `BPU_ACTPolicy_VisionEncoder.hbm` \(量化後的模型文件\)

    - `action_mean.npy` 等若干數據集歸一化參數

    - `camera1_mean.npy` 等相機統計參數

---

### 階段三：板端部署與推理 🤖 \(在 RDK S100 上進行\)

**前置條件檢查：**

1. RDK 板端已配置好 `D-Robotics/lerobot` 運行環境，並安裝 `hbm_runtime`。

2. 已通過 `scp`、U盤等方式，將上一步生成的整個 `bpu_output/` 文件夾完整拷貝至 RDK 板端。

3. 已完成基礎的遙操作配置，確保機械臂串口、相機 USB 端口及校準文件配置無誤。



#### **1\.** **運行 BPU 加速推理**

在 RDK 板端終端，進入工具鏈目錄並啟動控制腳本：

```Bash
cd rdk_LeRobot_tools

python bpu_control_robot.py \
  --bpu-act-path ../bpu_output \
  --fps 30 \
  --inference-time 60
```



---

### 🛠️ 常見故障排查 \(Troubleshooting\)

在實際部署中如果遇到問題，請對照以下清單排查：

- **機械臂沒有動作？**

    - 檢查設備掛載情況：終端輸入 `ls /dev/ttyACM*`，確認機械臂對應的串口號是否正確。

    - 檢查權限：嘗試使用 `sudo` 運行推理腳本，或將當前用戶加入 `dialout` 用戶組。

- **相機拉流報錯 / 畫面異常 / 機械臂原地抖動？**

    - 確認相機索引號（Camera Index）是否因熱插拔發生了漂移，檢查代碼中的相機參數配置是否與實際 `/dev/video*` 對應。

- **開發機複製容器生成的文件時提示“權限不夠”？**

    - Docker 掛載目錄產生的文件歸屬默認為 root，在開發機執行 `sudo chown -R $USER:$USER bpu_export_output` 即可修復。


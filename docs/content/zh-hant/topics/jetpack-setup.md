---
title: JetPack 刷機與系統配置
description: "NVIDIA Jetson 平台 JetPack 刷機指南——SDK Manager 與官方鏡像兩種方式,刷機失敗排錯,系統基礎配置"
keywords: [jetson, jetpack, 刷機, 系統配置, nvidia]
---

# JetPack 刷機與系統配置

> 面向首次接觸 NVIDIA Jetson 平台的開發者。鉅犀科技 Jetson 開發套件出廠已預裝 Ubuntu 22.04,本文檔用於重裝系統或更換 JetPack 版本時參考。

## 1. JetPack 是什麼?

JetPack 是 NVIDIA 為 Jetson 平台提供的 SDK 包,包含:

- Ubuntu 系統鏡像
- CUDA / cuDNN / TensorRT
- 多媒體 API(L4T)

**版本對應**(常用):

| Jetson 板卡 | 推薦 JetPack | 系統 |
|------------|-------------|------|
| Orin NX / Nano | JetPack 6.x | Ubuntu 22.04 |
| Xavier NX / AGX | JetPack 5.x | Ubuntu 20.04 |

> 鉅犀科技 [Jetson Orin NX Super 開發套件](/zh-hant/products/jetson-orin-nx-super-kit) 預裝 Ubuntu 22.04(JetPack 6.x 生態)。

## 2. 刷機方式

### 方式一:官方鏡像(Ubuntu 引導)

```bash
# 1. 從 NVIDIA 官網下載對應板卡的驅動包
# 2. 解壓並進入 Linux_for_Tegra 目錄
cd Linux_for_Tegra
sudo ./apply_binaries.sh

# 3. 將 Jetson 進入 Recovery 模式(按住 REC 鍵上電)
# 4. 刷機
sudo ./flash.sh <board-name> mmcblk0p1
```

### 方式二:SDK Manager(推薦新手)

1. 安裝 [NVIDIA SDK Manager](https://developer.nvidia.com/sdk-manager)
2. 連接 Jetson 到 PC(Recovery 模式)
3. 選擇板卡型號 → JetPack 版本 → 勾選組件(建議全選 CUDA/TensorRT)
4. 等待燒錄 + 首次引導完成

> ⚠️ 刷機時間較長(20-60 分鐘),過程中**不要拔線斷電**。

## 3. 刷機失敗排錯

| 現象 | 排查 |
|------|------|
| 無法進入 Recovery 模式 | 確認按住 REC 鍵後上電,用 `lsusb` 檢查是否檢測到 NVIDIA 設備 |
| 刷機中途失敗 | 換一根**數據線**;關掉 PC 省電模式;重新刷 |
| 刷完黑屏 | 檢查顯示器接口(Orin 用 DP);重新進入 Recovery 重刷 |
| 提示版本不匹配 | 確認選擇的板卡型號與 JetPack 版本對應 |

## 4. 系統基礎配置

### 4.1 網路與源

```bash
# 換用鏡像源(可選,加速 apt)
sudo sed -i 's|archive.ubuntu.com|mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

### 4.2 確認 GPU 環境

```bash
cat /etc/nv_tegra_release
nvcc --version

python3 -c "import torch; print(torch.cuda.is_available())"
```

> 若 PyTorch 不可用,參考 [Jetson Orin 上 PyTorch 不相容問題](/zh-hant/tutorials/learning-resources/jetson-orin-pytorch-compatibility)。

### 4.3 開啟最高性能模式(Orin)

```bash
sudo nvpmodel -m 0
sudo jetson_clocks
```

### 4.4 擴容根分區

```bash
sudo systemctl enable --now nvresize
# 或手動:
sudo resize2fs /dev/nvme0n1p1
```

## 5. 常見問題

**Q: 刷機後沒有 WiFi?**

**A:** Orin 系列核心板需外接 M.2 WiFi 模組;檢查雙頻天線是否接好。

**Q: 如何進入 Recovery 模式?**

**A:** 斷電 → 按住 REC(或 BOOT)鍵 → 插入電源/Type-C → `lsusb` 確認出現 `NVIDIA Corp.` 設備即成功。

**Q: 需要多大的存儲?**

**A:** 建議 ≥128GB SSD。256GB 是開發套件標準配置。

---

## 相關鏈接

- [Jetson Orin NX Super 開發套件](/zh-hant/products/jetson-orin-nx-super-kit)
- [邊緣 AI 部署入門](/zh-hant/topics/edge-ai-intro)
- [ROS 入門教程](/zh-hant/tutorials/ros-intro)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)

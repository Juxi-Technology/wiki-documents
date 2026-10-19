---
title: "KVM 切換器 · 使用教程總覽"
description: "2 進 3 出 USB 鍵鼠切換器：一套鍵鼠（和外設）在兩台電腦間一鍵切換；內建 3 口 USB HUB；還有無線序列埠功能——把開發板/感測器的序列埠接到 6 針口，資料同時透傳到「電腦序列埠 + 手機藍牙」。"
---

# KVM 切換器 · 使用教程總覽

> 適用產品：鉅犀科技 **KVM&HUB&TTL** 雙機鍵鼠切換器（USB 2.0）
> 版本 v1.0（2026-10-14）｜教程按「功能模組」拆分為多篇，按需查閱

---

## 按模組查找

| 我要做什麼 | 看哪篇 |
|---|---|
| 先讓裝置跑起來 | 本篇 →「快速上手」 |
| 在兩台電腦之間切換鍵鼠/外設 | [01 - 雙機切換（按鍵與紅外）](/zh-hant/tutorials/accessories/kvm-switch/01-Switching-Between-Two-Computers) |
| 當 USB HUB（一分三）用 | [02 - HUB 功能（一分三）](/zh-hant/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) |
| **用手機藍牙連接、收發資料** | [03 - 藍牙功能](/zh-hant/tutorials/accessories/kvm-switch/03-Bluetooth) |
| **6 針 TTL 序列埠接線、電腦端看資料** | [04 - TTL 序列埠（無線序列埠）](/zh-hant/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) |
| **了解 10 針擴充埠** | [05 - 十針擴充埠](/zh-hant/tutorials/accessories/kvm-switch/05-10-Pin-Expansion-Header) |
| 控制沒有顯示器的開發板/主機 | [06 - 無顯示器主機（擷取卡+OBS）](/zh-hant/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |
| 常見問題與注意事項 | [07 - 常見問題與注意事項](/zh-hant/tutorials/accessories/kvm-switch/07-FAQ-and-Precautions) |

## 產品一句話

**2 進 3 出 USB 鍵鼠切換器**：一套鍵鼠（和外設）在兩台電腦間一鍵切換；內建 3 口 USB HUB；還有**無線序列埠功能**——把開發板/感測器的序列埠接到 6 針口，資料同時透傳到「電腦序列埠 + 手機藍牙」。

## 介面速覽

| 位置 | 名稱 | 說明 |
|---|---|---|
| 左側 / 右側 | PC1 / PC2 介面（Type-C） | 分別連接兩台電腦 |
| 底部 | USB-A × 3 | 接鍵鼠/U 盤/印表機等，整體跟隨切換 |
| 頂部 | 電源口（Type-C） | 輔助供電（主機供電不足時使用） |
| 中部 | 切換按鍵 | 單擊切換；長按進藍牙模式 |
| 左上 | 紅外接收頭 | 配合紅外遙控器切換 |
| 右下 | TTL 序列埠（6 針） | 無線序列埠功能（見 04 篇） |
| 右下 | 10 針排座 | 擴充介面（見 05 篇） |
| 右上 | 藍牙模組（內建） | 無線序列埠功能（見 03 篇） |

**指示燈**：PC1/PC2（目前通道）｜電源｜UART 序列埠（收發時閃動）｜藍牙（長按後亮起）

## 快速上手（5 分鐘）

1. 電腦 A → Type-C 線 → **PC1** 口；電腦 B → **PC2** 口（只接一台也行，此時就是純 HUB）；
2. 鍵盤/滑鼠（或無線接收器）插到任意 **USB-A** 口；
3. 按一下切換按鍵，看 **PC1/PC2 指示燈**確認目前連在哪台電腦；
4. 主機供電不足時，把**電源口**也接上 Type-C 供電。

（配圖：教程原圖 01 - 功能分布）

## 兩個重要提醒

- 本產品**不切換視訊畫面**：每台電腦各接自己的顯示器；無顯示器的主機用擷取卡方案（見 06 篇）；
- 本產品為 **USB 2.0**：鍵鼠/印表機/U 盤/加密狗完全夠用，高速儲存等建議直連電腦。

---

*（各功能模組的詳細說明請點擊上方「按模組查找」表格中的對應篇目。）*

<RelatedProducts slugs="kvm-switch" />

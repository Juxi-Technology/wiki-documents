---
title: "07 · 常見問題與注意事項"
description: "Q1：能切換顯示器畫面嗎？"
---

# 07 · 常見問題與注意事項

> [← 返回教程總覽](/zh-hant/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start)｜適用產品：鉅犀科技 KVM&HUB&TTL
> 各模組的專屬問題見對應篇章（藍牙 → 03 篇；TTL 序列埠 → 04 篇）。

## 常見問題

**Q1：能切換顯示器畫面嗎？**
不能。本產品切換鍵鼠與 USB 裝置；兩台電腦各接自己的顯示器，無顯示器的主機用擷取卡方案（見 [06 篇](/zh-hant/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS)）。

**Q2：需要裝驅動嗎？**
不需要，免驅（Windows / macOS / Linux / 國產系統）。

**Q3：能接行動硬碟嗎？**
本產品為 USB 2.0，高速儲存、擷取卡建議直連電腦；U 盤、鍵鼠、印表機、加密狗等沒有問題。

**Q4：手機藍牙連不上 / 彈 PIN 碼？**
請不要用系統藍牙「配對」，裝 **BleUart** App 在應用內連接（見 [03 篇](/zh-hant/tutorials/accessories/kvm-switch/03-Bluetooth)）。

**Q5：手機和電腦能同時連藍牙嗎？**
不能——同一時間只允許一個主裝置連接；電腦端**序列埠**（USB）不受影響，可同時使用。

**Q6：切換的時候 USB 裝置會掉一下？**
正常：裝置隨切換在電腦間「移動」，另一台電腦重新識別（部分裝置需幾秒）。

**Q7：可以只當 HUB 用嗎？**
可以，只接一台電腦時即為 3 口 USB HUB（見 [02 篇](/zh-hant/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three)）。

**Q8：支援遊戲滑鼠嗎？**
鍵鼠走標準 USB 2.0 HID，辦公與除錯場景無感；電競級高回報率裝置請謹慎。

## 注意事項

- TTL 口電平為 **3.3V**，請勿接入 5V 訊號電平；`3V3/5V` 為**輸出**針，切勿反向灌入電源；
- USB 2.0 頻寬有限，請按 [02 篇](/zh-hant/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) 的建議選擇裝置；
- 請勿私自拆解、改焊；靜電敏感，接觸前請先放電；
- 產品功能與介面以實物為準；本教程如有更新，以最新版本為準。

## 版本記錄

| 版本 | 日期 | 說明 |
|---|---|---|
| v1.0 | 2026-10-14 | 初版：按功能模組拆分（切換/HUB/藍牙/TTL/十針/擷取卡/FAQ） |

<RelatedProducts slugs="kvm-switch" />

---
title: "01 · 雙機切換（按鍵與紅外）"
description: "一套鍵鼠（和插在 USB-A 口的外設）在兩台電腦之間切換，同一時間只連接其中一台。"
---

# 01 · 雙機切換（按鍵與紅外）

> [← 返回教程總覽](/zh-hant/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start)｜適用產品：鉅犀科技 KVM&HUB&TTL

一套鍵鼠（和插在 USB-A 口的外設）在**兩台電腦之間**切換，同一時間只連接其中一台。

## 切換方法

### ① 按鍵切換
按一下裝置中間的**切換按鍵**，PC1 ⇄ PC2 互換。對應側的 **PC1/PC2 指示燈**點亮，表示目前連的是哪台電腦。

### ② 紅外遙控切換
用**紅外遙控器**對準裝置上的紅外接收頭（左上角），按下遙控器切換鍵即可。
（遙控器是否隨附，以所購套餐為準。）

（配圖：教程原圖 05 - 按鍵與紅外切換）

## 兩種使用形態

| 形態 | 接法 | 說明 |
|---|---|---|
| 兩台電腦都有顯示器 | 各自接顯示器 | 鍵鼠隨切隨用（見 00 篇快速上手） |
| 一台沒有顯示器（開發板等） | 另一台接顯示器 + 擷取卡方案 | 見 [06 - 無顯示器主機（擷取卡+OBS）](/zh-hant/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |

## 切換時的正常現象

- 接在 USB-A 上的裝置會從「目前電腦」上暫時消失、出現在「另一台電腦」上（加密狗/印表機等可能需要幾秒重新識別）；
- **藍牙無線通道不受切換影響**（長連接不掉），電腦端序列埠會隨切換短暫斷開、切回後自動恢復（見 [03](/zh-hant/tutorials/accessories/kvm-switch/03-Bluetooth)/[04](/zh-hant/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) 篇）。

## 排查

**按了沒反應？** 看 PC1/PC2 指示燈確認目前通道；確認目標電腦已用 Type-C 接好並開機；再按一下切回原電腦驗證。

<RelatedProducts slugs="kvm-switch" />

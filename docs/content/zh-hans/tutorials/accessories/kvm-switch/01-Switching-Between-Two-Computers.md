---
title: "01 · 双机切换（按键与红外）"
description: "一套键鼠（和插在 USB-A 口的外设）在两台电脑之间切换，同一时间只连接其中一台。"
---

# 01 · 双机切换（按键与红外）

> [← 返回教程总览](/zh-hans/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start)｜适用产品：钜犀科技 KVM&HUB&TTL

一套键鼠（和插在 USB-A 口的外设）在**两台电脑之间**切换，同一时间只连接其中一台。

## 切换方法

### ① 按键切换
按一下设备中间的**切换按键**，PC1 ⇄ PC2 互换。对应侧的 **PC1/PC2 指示灯**点亮，表示当前连的是哪台电脑。

### ② 红外遥控切换
用**红外遥控器**对准设备上的红外接收头（左上角），按下遥控器切换键即可。
（遥控器是否随附，以所购套餐为准。）

（配图：教程原图 05 - 按键与红外切换）

## 两种使用形态

| 形态 | 接法 | 说明 |
|---|---|---|
| 两台电脑都有显示器 | 各自接显示器 | 键鼠随切随用（见 00 篇快速上手） |
| 一台没有显示器（开发板等） | 另一台接显示器 + 采集卡方案 | 见 [06 - 无显示器主机（采集卡+OBS）](/zh-hans/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |

## 切换时的正常现象

- 接在 USB-A 上的设备会从"当前电脑"上暂时消失、出现在"另一台电脑"上（加密狗/打印机等可能需要几秒重新识别）；
- **蓝牙无线通道不受切换影响**（长连接不掉），电脑端串口会随切换短暂断开、切回后自动恢复（见 [03](/zh-hans/tutorials/accessories/kvm-switch/03-Bluetooth)/[04](/zh-hans/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) 篇）。

## 排查

**按了没反应？** 看 PC1/PC2 指示灯确认当前通道；确认目标电脑已用 Type-C 接好并开机；再按一下切回原电脑验证。

<RelatedProducts slugs="kvm-switch" />

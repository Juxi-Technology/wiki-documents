---
title: "KVM 切换器 · 使用教程总览"
description: "2 进 3 出 USB 键鼠切换器：一套键鼠（和外设）在两台电脑间一键切换；自带 3 口 USB HUB；还有无线串口功能——把开发板/传感器的串口接到 6 针口，数据同时透传到\"电脑串口 + 手机蓝牙\"。"
---

# KVM 切换器 · 使用教程总览

> 适用产品：钜犀科技 **KVM&HUB&TTL** 双机键鼠切换器（USB 2.0）
> 版本 v1.0（2026-10-14）｜教程按"功能模块"拆分为多篇，按需查阅

---

## 按模块查找

| 我要做什么 | 看哪篇 |
|---|---|
| 先让设备跑起来 | 本篇 →「快速上手」 |
| 在两台电脑之间切换键鼠/外设 | [01 - 双机切换（按键与红外）](/zh-hans/tutorials/accessories/kvm-switch/01-Switching-Between-Two-Computers) |
| 当 USB HUB（一分三）用 | [02 - HUB 功能（一分三）](/zh-hans/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) |
| **用手机蓝牙连接、收发数据** | [03 - 蓝牙功能](/zh-hans/tutorials/accessories/kvm-switch/03-Bluetooth) |
| **6 针 TTL 串口接线、电脑端看数据** | [04 - TTL 串口（无线串口）](/zh-hans/tutorials/accessories/kvm-switch/04-TTL-Serial-Port) |
| **了解 10 针扩展口** | [05 - 十针扩展口](/zh-hans/tutorials/accessories/kvm-switch/05-10-Pin-Expansion-Header) |
| 控制没有显示器的开发板/主机 | [06 - 无显示器主机（采集卡+OBS）](/zh-hans/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS) |
| 常见问题与注意事项 | [07 - 常见问题与注意事项](/zh-hans/tutorials/accessories/kvm-switch/07-FAQ-and-Precautions) |

## 产品一句话

**2 进 3 出 USB 键鼠切换器**：一套键鼠（和外设）在两台电脑间一键切换；自带 3 口 USB HUB；还有**无线串口功能**——把开发板/传感器的串口接到 6 针口，数据同时透传到"电脑串口 + 手机蓝牙"。

## 接口速览

| 位置 | 名称 | 说明 |
|---|---|---|
| 左侧 / 右侧 | PC1 / PC2 接口（Type-C） | 分别连接两台电脑 |
| 底部 | USB-A × 3 | 接键鼠/U 盘/打印机等，整体跟随切换 |
| 顶部 | 电源口（Type-C） | 辅助供电（主机供电不足时使用） |
| 中部 | 切换按键 | 单击切换；长按进蓝牙模式 |
| 左上 | 红外接收头 | 配合红外遥控器切换 |
| 右下 | TTL 串口（6 针） | 无线串口功能（见 04 篇） |
| 右下 | 10 针排座 | 扩展接口（见 05 篇） |
| 右上 | 蓝牙模块（内置） | 无线串口功能（见 03 篇） |

**指示灯**：PC1/PC2（当前通道）｜电源｜UART 串口（收发时闪动）｜蓝牙（长按后亮起）

## 快速上手（5 分钟）

1. 电脑 A → Type-C 线 → **PC1** 口；电脑 B → **PC2** 口（只接一台也行，此时就是纯 HUB）；
2. 键盘/鼠标（或无线接收器）插到任意 **USB-A** 口；
3. 按一下切换按键，看 **PC1/PC2 指示灯**确认当前连在哪台电脑；
4. 主机供电不足时，把**电源口**也接上 Type-C 供电。

（配图：教程原图 01 - 功能分布）

## 两个重要提醒

- 本产品**不切换视频画面**：每台电脑各接自己的显示器；无显示器的主机用采集卡方案（见 06 篇）；
- 本产品为 **USB 2.0**：键鼠/打印机/U 盘/加密狗完全够用，高速存储等建议直连电脑。

---

*（各功能模块的详细说明请点击上方「按模块查找」表格中的对应篇目。）*

<RelatedProducts slugs="kvm-switch" />

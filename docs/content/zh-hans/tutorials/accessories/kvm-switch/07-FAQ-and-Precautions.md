---
title: "07 · 常见问题与注意事项"
description: "Q1：能切换显示器画面吗？"
---

# 07 · 常见问题与注意事项

> [← 返回教程总览](/zh-hans/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start)｜适用产品：钜犀科技 KVM&HUB&TTL
> 各模块的专属问题见对应篇章（蓝牙 → 03 篇；TTL 串口 → 04 篇）。

## 常见问题

**Q1：能切换显示器画面吗？**
不能。本产品切换键鼠与 USB 设备；两台电脑各接自己的显示器，无显示器的主机用采集卡方案（见 [06 篇](/zh-hans/tutorials/accessories/kvm-switch/06-Headless-Host-Capture-Card-and-OBS)）。

**Q2：需要装驱动吗？**
不需要，免驱（Windows / macOS / Linux / 国产系统）。

**Q3：能接移动硬盘吗？**
本产品为 USB 2.0，高速存储、采集卡建议直连电脑；U 盘、键鼠、打印机、加密狗等没有问题。

**Q4：手机蓝牙连不上 / 弹 PIN 码？**
请不要用系统蓝牙"配对"，装 **BleUart** App 在应用内连接（见 [03 篇](/zh-hans/tutorials/accessories/kvm-switch/03-Bluetooth)）。

**Q5：手机和电脑能同时连蓝牙吗？**
不能——同一时间只允许一个主设备连接；电脑端**串口**（USB）不受影响，可同时使用。

**Q6：切换的时候 USB 设备会掉一下？**
正常：设备随切换在电脑间"移动"，另一台电脑重新识别（部分设备需几秒）。

**Q7：可以只当 HUB 用吗？**
可以，只接一台电脑时即为 3 口 USB HUB（见 [02 篇](/zh-hans/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three)）。

**Q8：支持游戏鼠标吗？**
键鼠走标准 USB 2.0 HID，办公与调试场景无感；电竞级高回报率设备请谨慎。

## 注意事项

- TTL 口电平为 **3.3V**，请勿接入 5V 信号电平；`3V3/5V` 为**输出**针，切勿反向灌入电源；
- USB 2.0 带宽有限，请按 [02 篇](/zh-hans/tutorials/accessories/kvm-switch/02-HUB-Function-One-to-Three) 的建议选择设备；
- 请勿私自拆解、改焊；静电敏感，接触前请先放电；
- 产品功能与接口以实物为准；本教程如有更新，以最新版本为准。

## 版本记录

| 版本 | 日期 | 说明 |
|---|---|---|
| v1.0 | 2026-10-14 | 初版：按功能模块拆分（切换/HUB/蓝牙/TTL/十针/采集卡/FAQ） |

<RelatedProducts slugs="kvm-switch" />

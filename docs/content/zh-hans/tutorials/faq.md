---
title: 常见问题 FAQ
description: "钜犀科技产品常见问题 FAQ——机械臂、IMU 惯导与传感器等安装调试高频问题的解决方案。"
keywords: [faq, 常见问题, 故障排除, troubleshooting]
---

# 常见问题 FAQ

汇总钜犀科技各产品的高频问题与解决方案。按产品分类,快速定位你的问题。

---

## 机械臂 · SO-ARM101

**Q: 机械臂无法识别端口?**

**A:** 运行 `lerobot-find-port` 查找端口。确认 USB 连接牢固,主动臂/从动臂分别插在 leader/follower 对应接口。Linux 下需要授权串口:`sudo chmod 666 /dev/ttyACM*`。

**Q: 出现 `Could not connect on port "/dev/ttyACM0"` 报错?**

**A:** 确认 `/dev/ttyACM*` 存在且已授权串口权限,然后重试。

**Q: 校准时报 `Magnitude 30841 exceeds 2047`?**

**A:** 对机械臂重新断电再上电,再次尝试校准。

**Q: 舵机报 `ConnectionError: Failed to sync read 'Present_Position' on ids=[1,2,...,6]`?**

**A:** 检查对应端口号的机械臂是否接通电源,总线舵机是否连接正常。

**Q: 出现 `Motor 'gripper' was not found`?**

**A:** 检查通讯线是否与舵机连接正常,电源电压是否正确。

**Q: 需要更高版本的 PyTorch 但 GPU 不可用?**

**A:** 参考 [Jetson Orin 上 PyTorch 不兼容问题](/zh-hans/tutorials/learning-resources/jetson-orin-pytorch-compatibility)。

---

## 传感器 · IMU 惯导模块

**Q: IMU 数据漂移严重?**

**A:** 先执行[整体校准](/zh-hans/tutorials/sensors/imu/calibration);确认模块固定牢固;环境温度变化大时补充温度校准。

**Q: 磁力计数据不准?**

**A:** 执行磁力计校准,校准过程中水平缓慢旋转覆盖所有朝向,远离电机等强磁场源。

**Q: ROS 话题收不到数据?**

**A:** 确认串口权限(`sudo chmod 666 /dev/ttyUSB*`),检查 launch 文件中的端口参数。

---

## 配件 · KWS 语音识别模块

**Q: 语音模块没有响应?**

**A:** 确认已烧录出厂固件。未烧录固件的芯片到手后需要先烧录,参考[固件下载与烧录](/zh-hans/tutorials/accessories/KWS-speech-recognition-module/download-and-burn-firmware-for-chinese-and-english-recognition-words)。

**Q: 串口通信无数据返回?**

**A:** 确认波特率与教程一致,接线无误(RX/TX 交叉)。

---

## 配件 · 心率血氧传感器

**Q: 初始化失败(init fail)?**

**A:** 确认接线正确:IIC 模式下设备地址默认 0x57,UART 模式波特率 9600。

**Q: 数据读数不稳定?**

**A:** 确保传感器与皮肤接触良好,手指平稳放置避免移动。

---

## 配件 · USB 摄像头 / CSI 摄像头

**Q: 摄像头无法识别?**

**A:** 确认 USB 线缆连接牢固,换 USB 端口;运行 `ls /dev/video*` 与 `v4l2-ctl --list-devices` 查看设备。

**Q: CSI 摄像头未被识别?**

**A:** 确认排线连接正确且方向无误(金属触点朝向主板),并在**断电状态**下连接;检查 JetPack 版本 ≥ 5.0。

**Q: GStreamer 管道报错?**

**A:** 确认 JetPack 版本 ≥ 5.0,运行 `apt list --installed | grep nvarguscamerasrc` 确认 GStreamer 插件已安装。

---

## 配件 · 其他

**Q: 4K HDMI 采集卡画面黑屏?**

**A:** 确认 HDMI 接口类型(HDMI/Micro HDMI/DP 转 HDMI),使用对应转接头。

**Q: OLED 屏幕不亮?**

**A:** 检查 I2C 接线(SCL/SDA)是否正确,确认引脚无短路——接错可能导致主板硬件损坏。

**Q: USB 免驱声卡无法识别?**

**A:** 即插即用设备,确认 USB 口供电正常,系统音频输出设备中切换默认设备。

**Q: 2 自由度云台舵机不响应?**

**A:** 检查舵机电源供电是否充足(SCS 舵机需外部供电 6-8.4V)。

---

## 通用问题

**Q: 教程里的飞书链接打不开?**
**A:** 飞书文档仅对内部/协作者可见。公开文档请优先使用本 wiki 页面,或联系 support@juxitech.com。

**Q: 需要在哪个平台上运行?**
**A:** 产品均支持 PC(Linux/Windows)、Jetson、树莓派等主流平台,详见各教程"系统要求"。

**Q: 如何获得技术支持?**
**A:**
- 📧 support@juxitech.com
- 💬 [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues)
- 📺 [B站](https://space.bilibili.com/3546906737248821) 评论区

---

## 相关链接

- [机械臂选型指南](/zh-hans/tutorials/robot-arms/select-guide)
- [下载中心](/zh-hans/downloads/)
- [成功案例](/zh-hans/cases/)
